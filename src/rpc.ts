import { WorkerEntrypoint } from 'cloudflare:workers';
import { nanoid } from 'nanoid';

export class MCPClientRPC extends WorkerEntrypoint<Env> {
	/**
	 * Connect to an MCP server
	 * @param serverId MCP server ID from meta-mcp
	 * @param serverUrl URL of the MCP server
	 * @param serverName Name of the MCP server
	 */
	async connectToServer(serverId: string, serverUrl: string, serverName: string) {
		try {
			const connectionId = nanoid();

			// Record connection attempt
			await this.env.DB.prepare(`
				INSERT INTO mcp_connections (id, server_id, connection_url, status, created_at)
				VALUES (?, ?, ?, ?, ?)
			`).bind(
				connectionId,
				serverId,
				serverUrl,
				'connecting',
				Date.now()
			).run();

			// Get or create Agent instance
			const agentId = this.env.MyAgent.idFromName(`mcp-client-${serverId}`);
			const agent = this.env.MyAgent.get(agentId);

			// Add MCP server to agent
			const response = await agent.fetch(`${this.env.HOST}/add-mcp`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: serverName,
					url: serverUrl
				})
			});

			if (!response.ok) {
				throw new Error('Failed to add MCP server to agent');
			}

			// Get server tools by calling the agent
			const toolsResponse = await agent.fetch(`${this.env.HOST}/mcp/${serverName}/tools`);
			let tools: any[] = [];

			if (toolsResponse.ok) {
				const toolsData = await toolsResponse.json();
				tools = toolsData.tools || [];
			}

			// Update connection status
			await this.env.DB.prepare(`
				UPDATE mcp_connections
				SET status = 'connected', last_ping = ?
				WHERE id = ?
			`).bind(Date.now(), connectionId).run();

			// Store tools in database
			for (const tool of tools) {
				await this.env.DB.prepare(`
					INSERT INTO mcp_tools (id, server_id, tool_name, description, input_schema)
					VALUES (?, ?, ?, ?, ?)
				`).bind(
					nanoid(),
					serverId,
					tool.name,
					tool.description || '',
					JSON.stringify(tool.inputSchema || {})
				).run();
			}

			return {
				success: true,
				connectionId,
				tools,
				serverName
			};
		} catch (error) {
			console.error('Failed to connect to MCP server:', error);

			// Update connection status
			await this.env.DB.prepare(`
				UPDATE mcp_connections
				SET status = 'error', error_message = ?
				WHERE server_id = ? AND connection_url = ?
			`).bind(
				error instanceof Error ? error.message : 'Unknown error',
				serverId,
				serverUrl
			).run();

			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			};
		}
	}

	/**
	 * Call a tool on a connected MCP server
	 * @param connectionId Connection ID from connectToServer
	 * @param toolName Name of the tool to call
	 * @param args Arguments for the tool
	 */
	async callTool(connectionId: string, toolName: string, args: any) {
		try {
			// Get connection info
			const connection = await this.env.DB.prepare(`
				SELECT * FROM mcp_connections WHERE id = ?
			`).bind(connectionId).first() as any;

			if (!connection) {
				return {
					success: false,
					error: 'Connection not found'
				};
			}

			if (connection.status !== 'connected') {
				return {
					success: false,
					error: `Connection is ${connection.status}`
				};
			}

			// Get server info
			const server = await this.env.DB.prepare(`
				SELECT * FROM mcp_servers WHERE id = ?
			`).bind(connection.server_id).first() as any;

			if (!server) {
				return {
					success: false,
					error: 'Server not found'
				};
			}

			// Get agent instance
			const agentId = this.env.MyAgent.idFromName(`mcp-client-${connection.server_id}`);
			const agent = this.env.MyAgent.get(agentId);

			// Call tool via agent
			const response = await agent.fetch(`${this.env.HOST}/mcp/${server.name}/tools/${toolName}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(args)
			});

			if (!response.ok) {
				throw new Error('Tool call failed');
			}

			const result = await response.json();

			// Update last ping
			await this.env.DB.prepare(`
				UPDATE mcp_connections
				SET last_ping = ?
				WHERE id = ?
			`).bind(Date.now(), connectionId).run();

			return {
				success: true,
				result
			};
		} catch (error) {
			console.error('Failed to call tool:', error);
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			};
		}
	}

	/**
	 * List all active connections
	 */
	async listConnections() {
		try {
			const result = await this.env.DB.prepare(`
				SELECT
					c.*,
					s.name as server_name,
					s.description as server_description
				FROM mcp_connections c
				LEFT JOIN mcp_servers s ON c.server_id = s.id
				ORDER BY c.created_at DESC
				LIMIT 100
			`).all();

			return {
				success: true,
				connections: result.results || []
			};
		} catch (error) {
			console.error('Failed to list connections:', error);
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			};
		}
	}

	/**
	 * Disconnect from MCP server
	 * @param connectionId Connection ID to disconnect
	 */
	async disconnectFromServer(connectionId: string) {
		try {
			// Update connection status
			await this.env.DB.prepare(`
				UPDATE mcp_connections
				SET status = 'disconnected'
				WHERE id = ?
			`).bind(connectionId).run();

			return {
				success: true,
				connectionId
			};
		} catch (error) {
			console.error('Failed to disconnect:', error);
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			};
		}
	}

	/**
	 * Get available tools for a connection
	 * @param connectionId Connection ID
	 */
	async getServerTools(connectionId: string) {
		try {
			// Get connection info
			const connection = await this.env.DB.prepare(`
				SELECT * FROM mcp_connections WHERE id = ?
			`).bind(connectionId).first() as any;

			if (!connection) {
				return {
					success: false,
					error: 'Connection not found'
				};
			}

			// Get tools from database
			const result = await this.env.DB.prepare(`
				SELECT * FROM mcp_tools WHERE server_id = ?
			`).bind(connection.server_id).all();

			return {
				success: true,
				tools: result.results || []
			};
		} catch (error) {
			console.error('Failed to get tools:', error);
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			};
		}
	}
}
