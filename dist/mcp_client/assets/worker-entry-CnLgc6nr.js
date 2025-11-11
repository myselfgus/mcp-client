import { EventEmitter } from "node:events";
import { Writable } from "node:stream";
import { AsyncLocalStorage } from "node:async_hooks";
import { DurableObject } from "cloudflare:workers";
const hrtime$1 = /* @__PURE__ */ Object.assign(function hrtime(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, { bigint: function bigint() {
  return BigInt(Date.now() * 1e6);
} });
class ReadStream {
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
}
class WriteStream {
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
}
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = () => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  };
  return Object.assign(fn, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
const NODE_VERSION = "22.14.0";
class Process extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type2, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type2 ? `${type2}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
}
const globalProcess = globalThis["process"];
const getBuiltinModule = globalProcess.getBuiltinModule;
const workerdProcess = getBuiltinModule("node:process");
const isWorkerdProcessV2 = globalThis.Cloudflare.compatibilityFlags.enable_nodejs_process_v2;
const unenvProcess = new Process({
  env: globalProcess.env,
  // `hrtime` is only available from workerd process v2
  hrtime: isWorkerdProcessV2 ? workerdProcess.hrtime : hrtime$1,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
const { exit, features, platform } = workerdProcess;
const {
  // Always implemented by workerd
  env,
  // Only implemented in workerd v2
  hrtime: hrtime2,
  // Always implemented by workerd
  nextTick
} = unenvProcess;
const {
  _channel,
  _disconnect,
  _events,
  _eventsCount,
  _handleQueue,
  _maxListeners,
  _pendingMessage,
  _send,
  assert,
  disconnect,
  mainModule
} = unenvProcess;
const {
  // @ts-expect-error `_debugEnd` is missing typings
  _debugEnd,
  // @ts-expect-error `_debugProcess` is missing typings
  _debugProcess,
  // @ts-expect-error `_exiting` is missing typings
  _exiting,
  // @ts-expect-error `_fatalException` is missing typings
  _fatalException,
  // @ts-expect-error `_getActiveHandles` is missing typings
  _getActiveHandles,
  // @ts-expect-error `_getActiveRequests` is missing typings
  _getActiveRequests,
  // @ts-expect-error `_kill` is missing typings
  _kill,
  // @ts-expect-error `_linkedBinding` is missing typings
  _linkedBinding,
  // @ts-expect-error `_preload_modules` is missing typings
  _preload_modules,
  // @ts-expect-error `_rawDebug` is missing typings
  _rawDebug,
  // @ts-expect-error `_startProfilerIdleNotifier` is missing typings
  _startProfilerIdleNotifier,
  // @ts-expect-error `_stopProfilerIdleNotifier` is missing typings
  _stopProfilerIdleNotifier,
  // @ts-expect-error `_tickCallback` is missing typings
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  availableMemory,
  // @ts-expect-error `binding` is missing typings
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  // @ts-expect-error `domain` is missing typings
  domain,
  emit,
  emitWarning,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  // @ts-expect-error `initgroups` is missing typings
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  memoryUsage,
  // @ts-expect-error `moduleLoadList` is missing typings
  moduleLoadList,
  off,
  on,
  once,
  // @ts-expect-error `openStdin` is missing typings
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  // @ts-expect-error `reallyExit` is missing typings
  reallyExit,
  ref: ref$1,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title: title$1,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = isWorkerdProcessV2 ? workerdProcess : unenvProcess;
const _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime2,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title: title$1,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
globalThis.process = _process;
const noop$1 = Object.assign(() => {
}, { __unenv__: true });
const _console = globalThis.console;
const _ignoreErrors = true;
const _stderr = new Writable();
const _stdout = new Writable();
const Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
const _times = /* @__PURE__ */ new Map();
const _stdoutErrorHandler = noop$1;
const _stderrErrorHandler = noop$1;
const workerdConsole = globalThis["console"];
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
globalThis.console = workerdConsole;
const _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
const _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
const nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
class PerformanceEntry {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
}
const PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
class PerformanceMeasure extends PerformanceEntry {
  entryType = "measure";
}
class PerformanceResourceTiming extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
}
class PerformanceObserverEntryList {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type2) {
    return [];
  }
}
class Performance {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type2) {
    return this._entries.filter((e) => e.name === name && (!type2 || e.entryType === type2));
  }
  getEntriesByType(type2) {
    return this._entries.filter((e) => e.entryType === type2);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type2, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type2, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
}
class PerformanceObserver {
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
}
const performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
let MessageType = /* @__PURE__ */ (function(MessageType$1) {
  MessageType$1["CF_AGENT_CHAT_MESSAGES"] = "cf_agent_chat_messages";
  MessageType$1["CF_AGENT_USE_CHAT_REQUEST"] = "cf_agent_use_chat_request";
  MessageType$1["CF_AGENT_USE_CHAT_RESPONSE"] = "cf_agent_use_chat_response";
  MessageType$1["CF_AGENT_CHAT_CLEAR"] = "cf_agent_chat_clear";
  MessageType$1["CF_AGENT_CHAT_REQUEST_CANCEL"] = "cf_agent_chat_request_cancel";
  MessageType$1["CF_AGENT_MCP_SERVERS"] = "cf_agent_mcp_servers";
  MessageType$1["CF_MCP_AGENT_EVENT"] = "cf_mcp_agent_event";
  MessageType$1["CF_AGENT_STATE"] = "cf_agent_state";
  MessageType$1["RPC"] = "rpc";
  return MessageType$1;
})({});
if (!globalThis.EventTarget || !globalThis.Event) {
  console.error(`
  PartySocket requires a global 'EventTarget' class to be available!
  You can polyfill this global by adding this to your code before any partysocket imports: 
  
  \`\`\`
  import 'partysocket/event-target-polyfill';
  \`\`\`
  Please file an issue at https://github.com/partykit/partykit if you're still having trouble.
`);
}
var _a;
typeof process !== "undefined" && typeof ((_a = process.versions) == null ? void 0 : _a.node) !== "undefined" && typeof document === "undefined";
/*!
 * Reconnecting WebSocket
 * by Pedro Ladaria <pedro.ladaria@gmail.com>
 * https://github.com/pladaria/reconnecting-websocket
 * License MIT
 */
function camelCaseToKebabCase$1(str) {
  if (str === str.toUpperCase() && str !== str.toLowerCase()) return str.toLowerCase().replace(/_/g, "-");
  let kebabified = str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  kebabified = kebabified.startsWith("-") ? kebabified.slice(1) : kebabified;
  return kebabified.replace(/_/g, "-").replace(/-$/, "");
}
const urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let nanoid = (size = 21) => {
  let id = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size |= 0));
  while (size--) {
    id += urlAlphabet[bytes[size] & 63];
  }
  return id;
};
var util$1;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items2) => {
    const obj = {};
    for (const item of items2) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util$1 || (util$1 = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util$1.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
const getParsedType = (data2) => {
  const t = typeof data2;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data2) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data2)) {
        return ZodParsedType.array;
      }
      if (data2 === null) {
        return ZodParsedType.null;
      }
      if (data2.then && typeof data2.then === "function" && data2.catch && typeof data2.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data2 instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data2 instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data2 instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
const ZodIssueCode = util$1.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util$1.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
const errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util$1.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util$1.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util$1.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util$1.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util$1.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util$1.assertNever(issue);
  }
  return { message };
};
let overrideErrorMap = errorMap;
function getErrorMap() {
  return overrideErrorMap;
}
const makeIssue = (params) => {
  const { data: data2, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data: data2, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
const INVALID = Object.freeze({
  status: "aborted"
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));
class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
const handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description: description2 } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description: description2 };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description: description2 };
}
class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data2, params) {
    const result = this.safeParse(data2, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data2, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: data2,
      parsedType: getParsedType(data2)
    };
    const result = this._parseSync({ data: data2, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data2) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: data2,
      parsedType: getParsedType(data2)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data: data2, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data: data2, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data2, params) {
    const result = await this.safeParseAsync(data2, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data2, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: data2,
      parsedType: getParsedType(data2)
    };
    const maybeAsyncResult = this._parse({ data: data2, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data2) => {
          if (!data2) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data2) => this["~validate"](data2)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description2) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description: description2
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util$1.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data2) => regex.test(data2), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util$1.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util$1.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util$1.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util$1.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util$1.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util$1.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util$1.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util$1.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util$1.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util$1.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util$1.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
const getDiscriminator = (type2) => {
  if (type2 instanceof ZodLazy) {
    return getDiscriminator(type2.schema);
  } else if (type2 instanceof ZodEffects) {
    return getDiscriminator(type2.innerType());
  } else if (type2 instanceof ZodLiteral) {
    return [type2.value];
  } else if (type2 instanceof ZodEnum) {
    return type2.options;
  } else if (type2 instanceof ZodNativeEnum) {
    return util$1.objectValues(type2.enum);
  } else if (type2 instanceof ZodDefault) {
    return getDiscriminator(type2._def.innerType);
  } else if (type2 instanceof ZodUndefined) {
    return [void 0];
  } else if (type2 instanceof ZodNull) {
    return [null];
  } else if (type2 instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type2.unwrap())];
  } else if (type2 instanceof ZodNullable) {
    return [null, ...getDiscriminator(type2.unwrap())];
  } else if (type2 instanceof ZodBranded) {
    return getDiscriminator(type2.unwrap());
  } else if (type2 instanceof ZodReadonly) {
    return getDiscriminator(type2.unwrap());
  } else if (type2 instanceof ZodCatch) {
    return getDiscriminator(type2._def.innerType);
  } else {
    return [];
  }
};
class ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type2 of options) {
      const discriminatorValues = getDiscriminator(type2.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type2);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util$1.objectKeys(b);
    const sharedKeys = util$1.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items2 = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items2).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items2);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
class ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
}
class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
class ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util$1.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
  _parse(input) {
    const nativeEnumValues = util$1.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util$1.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util$1.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util$1.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util$1.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data2) => {
      return this._def.type.parseAsync(data2, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util$1.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type2, params) => {
  return new ZodOptional({
    innerType: type2,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type2, params) => {
  return new ZodNullable({
    innerType: type2,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data2 = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data2 = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data: data2,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type2, params) => {
  return new ZodDefault({
    innerType: type2,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type2, params) => {
  return new ZodCatch({
    innerType: type2,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data2 = ctx.data;
    return this._def.type._parse({
      data: data2,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}
class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data2) => {
      if (isValid(data2)) {
        data2.value = Object.freeze(data2.value);
      }
      return data2;
    };
    return isAsync(result) ? result.then((data2) => freeze(data2)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type2, params) => {
  return new ZodReadonly({
    innerType: type2,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const stringType = ZodString.create;
const numberType = ZodNumber.create;
const booleanType = ZodBoolean.create;
const anyType = ZodAny.create;
const unknownType = ZodUnknown.create;
ZodNever.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
const unionType = ZodUnion.create;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
ZodIntersection.create;
ZodTuple.create;
const recordType = ZodRecord.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
ZodPromise.create;
const optionalType = ZodOptional.create;
ZodNullable.create;
const NEVER = INVALID;
const LATEST_PROTOCOL_VERSION = "2025-06-18";
const SUPPORTED_PROTOCOL_VERSIONS = [LATEST_PROTOCOL_VERSION, "2025-03-26", "2024-11-05", "2024-10-07"];
const JSONRPC_VERSION = "2.0";
const ProgressTokenSchema = unionType([stringType(), numberType().int()]);
const CursorSchema = stringType();
const RequestMetaSchema = objectType({
  /**
   * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
   */
  progressToken: optionalType(ProgressTokenSchema)
}).passthrough();
const BaseRequestParamsSchema = objectType({
  _meta: optionalType(RequestMetaSchema)
}).passthrough();
const RequestSchema = objectType({
  method: stringType(),
  params: optionalType(BaseRequestParamsSchema)
});
const BaseNotificationParamsSchema = objectType({
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optionalType(objectType({}).passthrough())
}).passthrough();
const NotificationSchema = objectType({
  method: stringType(),
  params: optionalType(BaseNotificationParamsSchema)
});
const ResultSchema = objectType({
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optionalType(objectType({}).passthrough())
}).passthrough();
const RequestIdSchema = unionType([stringType(), numberType().int()]);
const JSONRPCRequestSchema = objectType({
  jsonrpc: literalType(JSONRPC_VERSION),
  id: RequestIdSchema
}).merge(RequestSchema).strict();
const isJSONRPCRequest = (value) => JSONRPCRequestSchema.safeParse(value).success;
const JSONRPCNotificationSchema = objectType({
  jsonrpc: literalType(JSONRPC_VERSION)
}).merge(NotificationSchema).strict();
const isJSONRPCNotification = (value) => JSONRPCNotificationSchema.safeParse(value).success;
const JSONRPCResponseSchema = objectType({
  jsonrpc: literalType(JSONRPC_VERSION),
  id: RequestIdSchema,
  result: ResultSchema
}).strict();
const isJSONRPCResponse = (value) => JSONRPCResponseSchema.safeParse(value).success;
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2[ErrorCode2["ConnectionClosed"] = -32e3] = "ConnectionClosed";
  ErrorCode2[ErrorCode2["RequestTimeout"] = -32001] = "RequestTimeout";
  ErrorCode2[ErrorCode2["ParseError"] = -32700] = "ParseError";
  ErrorCode2[ErrorCode2["InvalidRequest"] = -32600] = "InvalidRequest";
  ErrorCode2[ErrorCode2["MethodNotFound"] = -32601] = "MethodNotFound";
  ErrorCode2[ErrorCode2["InvalidParams"] = -32602] = "InvalidParams";
  ErrorCode2[ErrorCode2["InternalError"] = -32603] = "InternalError";
})(ErrorCode || (ErrorCode = {}));
const JSONRPCErrorSchema = objectType({
  jsonrpc: literalType(JSONRPC_VERSION),
  id: RequestIdSchema,
  error: objectType({
    /**
     * The error type that occurred.
     */
    code: numberType().int(),
    /**
     * A short description of the error. The message SHOULD be limited to a concise single sentence.
     */
    message: stringType(),
    /**
     * Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).
     */
    data: optionalType(unknownType())
  })
}).strict();
const isJSONRPCError = (value) => JSONRPCErrorSchema.safeParse(value).success;
const JSONRPCMessageSchema = unionType([JSONRPCRequestSchema, JSONRPCNotificationSchema, JSONRPCResponseSchema, JSONRPCErrorSchema]);
const EmptyResultSchema = ResultSchema.strict();
const CancelledNotificationSchema = NotificationSchema.extend({
  method: literalType("notifications/cancelled"),
  params: BaseNotificationParamsSchema.extend({
    /**
     * The ID of the request to cancel.
     *
     * This MUST correspond to the ID of a request previously issued in the same direction.
     */
    requestId: RequestIdSchema,
    /**
     * An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.
     */
    reason: stringType().optional()
  })
});
const IconSchema = objectType({
  /**
   * URL or data URI for the icon.
   */
  src: stringType(),
  /**
   * Optional MIME type for the icon.
   */
  mimeType: optionalType(stringType()),
  /**
   * Optional array of strings that specify sizes at which the icon can be used.
   * Each string should be in WxH format (e.g., `"48x48"`, `"96x96"`) or `"any"` for scalable formats like SVG.
   *
   * If not provided, the client should assume that the icon can be used at any size.
   */
  sizes: optionalType(arrayType(stringType()))
}).passthrough();
const IconsSchema = objectType({
  /**
   * Optional set of sized icons that the client can display in a user interface.
   *
   * Clients that support rendering icons MUST support at least the following MIME types:
   * - `image/png` - PNG images (safe, universal compatibility)
   * - `image/jpeg` (and `image/jpg`) - JPEG images (safe, universal compatibility)
   *
   * Clients that support rendering icons SHOULD also support:
   * - `image/svg+xml` - SVG images (scalable but requires security precautions)
   * - `image/webp` - WebP images (modern, efficient format)
   */
  icons: arrayType(IconSchema).optional()
}).passthrough();
const BaseMetadataSchema = objectType({
  /** Intended for programmatic or logical use, but used as a display name in past specs or fallback */
  name: stringType(),
  /**
   * Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
   * even by those unfamiliar with domain-specific terminology.
   *
   * If not provided, the name should be used for display (except for Tool,
   * where `annotations.title` should be given precedence over using `name`,
   * if present).
   */
  title: optionalType(stringType())
}).passthrough();
const ImplementationSchema = BaseMetadataSchema.extend({
  version: stringType(),
  /**
   * An optional URL of the website for this implementation.
   */
  websiteUrl: optionalType(stringType())
}).merge(IconsSchema);
const ClientCapabilitiesSchema = objectType({
  /**
   * Experimental, non-standard capabilities that the client supports.
   */
  experimental: optionalType(objectType({}).passthrough()),
  /**
   * Present if the client supports sampling from an LLM.
   */
  sampling: optionalType(objectType({}).passthrough()),
  /**
   * Present if the client supports eliciting user input.
   */
  elicitation: optionalType(objectType({}).passthrough()),
  /**
   * Present if the client supports listing roots.
   */
  roots: optionalType(objectType({
    /**
     * Whether the client supports issuing notifications for changes to the roots list.
     */
    listChanged: optionalType(booleanType())
  }).passthrough())
}).passthrough();
const InitializeRequestSchema = RequestSchema.extend({
  method: literalType("initialize"),
  params: BaseRequestParamsSchema.extend({
    /**
     * The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.
     */
    protocolVersion: stringType(),
    capabilities: ClientCapabilitiesSchema,
    clientInfo: ImplementationSchema
  })
});
const ServerCapabilitiesSchema = objectType({
  /**
   * Experimental, non-standard capabilities that the server supports.
   */
  experimental: optionalType(objectType({}).passthrough()),
  /**
   * Present if the server supports sending log messages to the client.
   */
  logging: optionalType(objectType({}).passthrough()),
  /**
   * Present if the server supports sending completions to the client.
   */
  completions: optionalType(objectType({}).passthrough()),
  /**
   * Present if the server offers any prompt templates.
   */
  prompts: optionalType(objectType({
    /**
     * Whether this server supports issuing notifications for changes to the prompt list.
     */
    listChanged: optionalType(booleanType())
  }).passthrough()),
  /**
   * Present if the server offers any resources to read.
   */
  resources: optionalType(objectType({
    /**
     * Whether this server supports clients subscribing to resource updates.
     */
    subscribe: optionalType(booleanType()),
    /**
     * Whether this server supports issuing notifications for changes to the resource list.
     */
    listChanged: optionalType(booleanType())
  }).passthrough()),
  /**
   * Present if the server offers any tools to call.
   */
  tools: optionalType(objectType({
    /**
     * Whether this server supports issuing notifications for changes to the tool list.
     */
    listChanged: optionalType(booleanType())
  }).passthrough())
}).passthrough();
const InitializeResultSchema = ResultSchema.extend({
  /**
   * The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.
   */
  protocolVersion: stringType(),
  capabilities: ServerCapabilitiesSchema,
  serverInfo: ImplementationSchema,
  /**
   * Instructions describing how to use the server and its features.
   *
   * This can be used by clients to improve the LLM's understanding of available tools, resources, etc. It can be thought of like a "hint" to the model. For example, this information MAY be added to the system prompt.
   */
  instructions: optionalType(stringType())
});
const InitializedNotificationSchema = NotificationSchema.extend({
  method: literalType("notifications/initialized")
});
const isInitializedNotification = (value) => InitializedNotificationSchema.safeParse(value).success;
const PingRequestSchema = RequestSchema.extend({
  method: literalType("ping")
});
const ProgressSchema = objectType({
  /**
   * The progress thus far. This should increase every time progress is made, even if the total is unknown.
   */
  progress: numberType(),
  /**
   * Total number of items to process (or total progress required), if known.
   */
  total: optionalType(numberType()),
  /**
   * An optional message describing the current progress.
   */
  message: optionalType(stringType())
}).passthrough();
const ProgressNotificationSchema = NotificationSchema.extend({
  method: literalType("notifications/progress"),
  params: BaseNotificationParamsSchema.merge(ProgressSchema).extend({
    /**
     * The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
     */
    progressToken: ProgressTokenSchema
  })
});
const PaginatedRequestSchema = RequestSchema.extend({
  params: BaseRequestParamsSchema.extend({
    /**
     * An opaque token representing the current pagination position.
     * If provided, the server should return results starting after this cursor.
     */
    cursor: optionalType(CursorSchema)
  }).optional()
});
const PaginatedResultSchema = ResultSchema.extend({
  /**
   * An opaque token representing the pagination position after the last returned result.
   * If present, there may be more results available.
   */
  nextCursor: optionalType(CursorSchema)
});
const ResourceContentsSchema = objectType({
  /**
   * The URI of this resource.
   */
  uri: stringType(),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: optionalType(stringType()),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optionalType(objectType({}).passthrough())
}).passthrough();
const TextResourceContentsSchema = ResourceContentsSchema.extend({
  /**
   * The text of the item. This must only be set if the item can actually be represented as text (not binary data).
   */
  text: stringType()
});
const Base64Schema = stringType().refine((val) => {
  try {
    atob(val);
    return true;
  } catch (_a2) {
    return false;
  }
}, { message: "Invalid Base64 string" });
const BlobResourceContentsSchema = ResourceContentsSchema.extend({
  /**
   * A base64-encoded string representing the binary data of the item.
   */
  blob: Base64Schema
});
const ResourceSchema = BaseMetadataSchema.extend({
  /**
   * The URI of this resource.
   */
  uri: stringType(),
  /**
   * A description of what this resource represents.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: optionalType(stringType()),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: optionalType(stringType()),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optionalType(objectType({}).passthrough())
}).merge(IconsSchema);
const ResourceTemplateSchema = BaseMetadataSchema.extend({
  /**
   * A URI template (according to RFC 6570) that can be used to construct resource URIs.
   */
  uriTemplate: stringType(),
  /**
   * A description of what this template is for.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: optionalType(stringType()),
  /**
   * The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.
   */
  mimeType: optionalType(stringType()),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optionalType(objectType({}).passthrough())
}).merge(IconsSchema);
const ListResourcesRequestSchema = PaginatedRequestSchema.extend({
  method: literalType("resources/list")
});
const ListResourcesResultSchema = PaginatedResultSchema.extend({
  resources: arrayType(ResourceSchema)
});
const ListResourceTemplatesRequestSchema = PaginatedRequestSchema.extend({
  method: literalType("resources/templates/list")
});
const ListResourceTemplatesResultSchema = PaginatedResultSchema.extend({
  resourceTemplates: arrayType(ResourceTemplateSchema)
});
const ReadResourceRequestSchema = RequestSchema.extend({
  method: literalType("resources/read"),
  params: BaseRequestParamsSchema.extend({
    /**
     * The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.
     */
    uri: stringType()
  })
});
const ReadResourceResultSchema = ResultSchema.extend({
  contents: arrayType(unionType([TextResourceContentsSchema, BlobResourceContentsSchema]))
});
const ResourceListChangedNotificationSchema = NotificationSchema.extend({
  method: literalType("notifications/resources/list_changed")
});
const SubscribeRequestSchema = RequestSchema.extend({
  method: literalType("resources/subscribe"),
  params: BaseRequestParamsSchema.extend({
    /**
     * The URI of the resource to subscribe to. The URI can use any protocol; it is up to the server how to interpret it.
     */
    uri: stringType()
  })
});
const UnsubscribeRequestSchema = RequestSchema.extend({
  method: literalType("resources/unsubscribe"),
  params: BaseRequestParamsSchema.extend({
    /**
     * The URI of the resource to unsubscribe from.
     */
    uri: stringType()
  })
});
const ResourceUpdatedNotificationSchema = NotificationSchema.extend({
  method: literalType("notifications/resources/updated"),
  params: BaseNotificationParamsSchema.extend({
    /**
     * The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
     */
    uri: stringType()
  })
});
const PromptArgumentSchema = objectType({
  /**
   * The name of the argument.
   */
  name: stringType(),
  /**
   * A human-readable description of the argument.
   */
  description: optionalType(stringType()),
  /**
   * Whether this argument must be provided.
   */
  required: optionalType(booleanType())
}).passthrough();
const PromptSchema = BaseMetadataSchema.extend({
  /**
   * An optional description of what this prompt provides
   */
  description: optionalType(stringType()),
  /**
   * A list of arguments to use for templating the prompt.
   */
  arguments: optionalType(arrayType(PromptArgumentSchema)),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optionalType(objectType({}).passthrough())
}).merge(IconsSchema);
const ListPromptsRequestSchema = PaginatedRequestSchema.extend({
  method: literalType("prompts/list")
});
const ListPromptsResultSchema = PaginatedResultSchema.extend({
  prompts: arrayType(PromptSchema)
});
const GetPromptRequestSchema = RequestSchema.extend({
  method: literalType("prompts/get"),
  params: BaseRequestParamsSchema.extend({
    /**
     * The name of the prompt or prompt template.
     */
    name: stringType(),
    /**
     * Arguments to use for templating the prompt.
     */
    arguments: optionalType(recordType(stringType()))
  })
});
const TextContentSchema = objectType({
  type: literalType("text"),
  /**
   * The text content of the message.
   */
  text: stringType(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optionalType(objectType({}).passthrough())
}).passthrough();
const ImageContentSchema = objectType({
  type: literalType("image"),
  /**
   * The base64-encoded image data.
   */
  data: Base64Schema,
  /**
   * The MIME type of the image. Different providers may support different image types.
   */
  mimeType: stringType(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optionalType(objectType({}).passthrough())
}).passthrough();
const AudioContentSchema = objectType({
  type: literalType("audio"),
  /**
   * The base64-encoded audio data.
   */
  data: Base64Schema,
  /**
   * The MIME type of the audio. Different providers may support different audio types.
   */
  mimeType: stringType(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optionalType(objectType({}).passthrough())
}).passthrough();
const EmbeddedResourceSchema = objectType({
  type: literalType("resource"),
  resource: unionType([TextResourceContentsSchema, BlobResourceContentsSchema]),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optionalType(objectType({}).passthrough())
}).passthrough();
const ResourceLinkSchema = ResourceSchema.extend({
  type: literalType("resource_link")
});
const ContentBlockSchema = unionType([
  TextContentSchema,
  ImageContentSchema,
  AudioContentSchema,
  ResourceLinkSchema,
  EmbeddedResourceSchema
]);
const PromptMessageSchema = objectType({
  role: enumType(["user", "assistant"]),
  content: ContentBlockSchema
}).passthrough();
const GetPromptResultSchema = ResultSchema.extend({
  /**
   * An optional description for the prompt.
   */
  description: optionalType(stringType()),
  messages: arrayType(PromptMessageSchema)
});
const PromptListChangedNotificationSchema = NotificationSchema.extend({
  method: literalType("notifications/prompts/list_changed")
});
const ToolAnnotationsSchema = objectType({
  /**
   * A human-readable title for the tool.
   */
  title: optionalType(stringType()),
  /**
   * If true, the tool does not modify its environment.
   *
   * Default: false
   */
  readOnlyHint: optionalType(booleanType()),
  /**
   * If true, the tool may perform destructive updates to its environment.
   * If false, the tool performs only additive updates.
   *
   * (This property is meaningful only when `readOnlyHint == false`)
   *
   * Default: true
   */
  destructiveHint: optionalType(booleanType()),
  /**
   * If true, calling the tool repeatedly with the same arguments
   * will have no additional effect on the its environment.
   *
   * (This property is meaningful only when `readOnlyHint == false`)
   *
   * Default: false
   */
  idempotentHint: optionalType(booleanType()),
  /**
   * If true, this tool may interact with an "open world" of external
   * entities. If false, the tool's domain of interaction is closed.
   * For example, the world of a web search tool is open, whereas that
   * of a memory tool is not.
   *
   * Default: true
   */
  openWorldHint: optionalType(booleanType())
}).passthrough();
const ToolSchema = BaseMetadataSchema.extend({
  /**
   * A human-readable description of the tool.
   */
  description: optionalType(stringType()),
  /**
   * A JSON Schema object defining the expected parameters for the tool.
   */
  inputSchema: objectType({
    type: literalType("object"),
    properties: optionalType(objectType({}).passthrough()),
    required: optionalType(arrayType(stringType()))
  }).passthrough(),
  /**
   * An optional JSON Schema object defining the structure of the tool's output returned in
   * the structuredContent field of a CallToolResult.
   */
  outputSchema: optionalType(objectType({
    type: literalType("object"),
    properties: optionalType(objectType({}).passthrough()),
    required: optionalType(arrayType(stringType()))
  }).passthrough()),
  /**
   * Optional additional tool information.
   */
  annotations: optionalType(ToolAnnotationsSchema),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optionalType(objectType({}).passthrough())
}).merge(IconsSchema);
const ListToolsRequestSchema = PaginatedRequestSchema.extend({
  method: literalType("tools/list")
});
const ListToolsResultSchema = PaginatedResultSchema.extend({
  tools: arrayType(ToolSchema)
});
const CallToolResultSchema = ResultSchema.extend({
  /**
   * A list of content objects that represent the result of the tool call.
   *
   * If the Tool does not define an outputSchema, this field MUST be present in the result.
   * For backwards compatibility, this field is always present, but it may be empty.
   */
  content: arrayType(ContentBlockSchema).default([]),
  /**
   * An object containing structured tool output.
   *
   * If the Tool defines an outputSchema, this field MUST be present in the result, and contain a JSON object that matches the schema.
   */
  structuredContent: objectType({}).passthrough().optional(),
  /**
   * Whether the tool call ended in an error.
   *
   * If not set, this is assumed to be false (the call was successful).
   *
   * Any errors that originate from the tool SHOULD be reported inside the result
   * object, with `isError` set to true, _not_ as an MCP protocol-level error
   * response. Otherwise, the LLM would not be able to see that an error occurred
   * and self-correct.
   *
   * However, any errors in _finding_ the tool, an error indicating that the
   * server does not support tool calls, or any other exceptional conditions,
   * should be reported as an MCP error response.
   */
  isError: optionalType(booleanType())
});
CallToolResultSchema.or(ResultSchema.extend({
  toolResult: unknownType()
}));
const CallToolRequestSchema = RequestSchema.extend({
  method: literalType("tools/call"),
  params: BaseRequestParamsSchema.extend({
    name: stringType(),
    arguments: optionalType(recordType(unknownType()))
  })
});
const ToolListChangedNotificationSchema = NotificationSchema.extend({
  method: literalType("notifications/tools/list_changed")
});
const LoggingLevelSchema = enumType(["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"]);
const SetLevelRequestSchema = RequestSchema.extend({
  method: literalType("logging/setLevel"),
  params: BaseRequestParamsSchema.extend({
    /**
     * The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/logging/message.
     */
    level: LoggingLevelSchema
  })
});
const LoggingMessageNotificationSchema = NotificationSchema.extend({
  method: literalType("notifications/message"),
  params: BaseNotificationParamsSchema.extend({
    /**
     * The severity of this log message.
     */
    level: LoggingLevelSchema,
    /**
     * An optional name of the logger issuing this message.
     */
    logger: optionalType(stringType()),
    /**
     * The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.
     */
    data: unknownType()
  })
});
const ModelHintSchema = objectType({
  /**
   * A hint for a model name.
   */
  name: stringType().optional()
}).passthrough();
const ModelPreferencesSchema = objectType({
  /**
   * Optional hints to use for model selection.
   */
  hints: optionalType(arrayType(ModelHintSchema)),
  /**
   * How much to prioritize cost when selecting a model.
   */
  costPriority: optionalType(numberType().min(0).max(1)),
  /**
   * How much to prioritize sampling speed (latency) when selecting a model.
   */
  speedPriority: optionalType(numberType().min(0).max(1)),
  /**
   * How much to prioritize intelligence and capabilities when selecting a model.
   */
  intelligencePriority: optionalType(numberType().min(0).max(1))
}).passthrough();
const SamplingMessageSchema = objectType({
  role: enumType(["user", "assistant"]),
  content: unionType([TextContentSchema, ImageContentSchema, AudioContentSchema])
}).passthrough();
const CreateMessageRequestSchema = RequestSchema.extend({
  method: literalType("sampling/createMessage"),
  params: BaseRequestParamsSchema.extend({
    messages: arrayType(SamplingMessageSchema),
    /**
     * An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.
     */
    systemPrompt: optionalType(stringType()),
    /**
     * A request to include context from one or more MCP servers (including the caller), to be attached to the prompt. The client MAY ignore this request.
     */
    includeContext: optionalType(enumType(["none", "thisServer", "allServers"])),
    temperature: optionalType(numberType()),
    /**
     * The maximum number of tokens to sample, as requested by the server. The client MAY choose to sample fewer tokens than requested.
     */
    maxTokens: numberType().int(),
    stopSequences: optionalType(arrayType(stringType())),
    /**
     * Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.
     */
    metadata: optionalType(objectType({}).passthrough()),
    /**
     * The server's preferences for which model to select.
     */
    modelPreferences: optionalType(ModelPreferencesSchema)
  })
});
const CreateMessageResultSchema = ResultSchema.extend({
  /**
   * The name of the model that generated the message.
   */
  model: stringType(),
  /**
   * The reason why sampling stopped.
   */
  stopReason: optionalType(enumType(["endTurn", "stopSequence", "maxTokens"]).or(stringType())),
  role: enumType(["user", "assistant"]),
  content: discriminatedUnionType("type", [TextContentSchema, ImageContentSchema, AudioContentSchema])
});
const BooleanSchemaSchema = objectType({
  type: literalType("boolean"),
  title: optionalType(stringType()),
  description: optionalType(stringType()),
  default: optionalType(booleanType())
}).passthrough();
const StringSchemaSchema = objectType({
  type: literalType("string"),
  title: optionalType(stringType()),
  description: optionalType(stringType()),
  minLength: optionalType(numberType()),
  maxLength: optionalType(numberType()),
  format: optionalType(enumType(["email", "uri", "date", "date-time"]))
}).passthrough();
const NumberSchemaSchema = objectType({
  type: enumType(["number", "integer"]),
  title: optionalType(stringType()),
  description: optionalType(stringType()),
  minimum: optionalType(numberType()),
  maximum: optionalType(numberType())
}).passthrough();
const EnumSchemaSchema = objectType({
  type: literalType("string"),
  title: optionalType(stringType()),
  description: optionalType(stringType()),
  enum: arrayType(stringType()),
  enumNames: optionalType(arrayType(stringType()))
}).passthrough();
const PrimitiveSchemaDefinitionSchema = unionType([BooleanSchemaSchema, StringSchemaSchema, NumberSchemaSchema, EnumSchemaSchema]);
const ElicitRequestSchema = RequestSchema.extend({
  method: literalType("elicitation/create"),
  params: BaseRequestParamsSchema.extend({
    /**
     * The message to present to the user.
     */
    message: stringType(),
    /**
     * The schema for the requested user input.
     */
    requestedSchema: objectType({
      type: literalType("object"),
      properties: recordType(stringType(), PrimitiveSchemaDefinitionSchema),
      required: optionalType(arrayType(stringType()))
    }).passthrough()
  })
});
const ElicitResultSchema = ResultSchema.extend({
  /**
   * The user's response action.
   */
  action: enumType(["accept", "decline", "cancel"]),
  /**
   * The collected user input content (only present if action is "accept").
   */
  content: optionalType(recordType(stringType(), unknownType()))
});
const ResourceTemplateReferenceSchema = objectType({
  type: literalType("ref/resource"),
  /**
   * The URI or URI template of the resource.
   */
  uri: stringType()
}).passthrough();
const PromptReferenceSchema = objectType({
  type: literalType("ref/prompt"),
  /**
   * The name of the prompt or prompt template
   */
  name: stringType()
}).passthrough();
const CompleteRequestSchema = RequestSchema.extend({
  method: literalType("completion/complete"),
  params: BaseRequestParamsSchema.extend({
    ref: unionType([PromptReferenceSchema, ResourceTemplateReferenceSchema]),
    /**
     * The argument's information
     */
    argument: objectType({
      /**
       * The name of the argument
       */
      name: stringType(),
      /**
       * The value of the argument to use for completion matching.
       */
      value: stringType()
    }).passthrough(),
    context: optionalType(objectType({
      /**
       * Previously-resolved variables in a URI template or prompt.
       */
      arguments: optionalType(recordType(stringType(), stringType()))
    }))
  })
});
const CompleteResultSchema = ResultSchema.extend({
  completion: objectType({
    /**
     * An array of completion values. Must not exceed 100 items.
     */
    values: arrayType(stringType()).max(100),
    /**
     * The total number of completion options available. This can exceed the number of values actually sent in the response.
     */
    total: optionalType(numberType().int()),
    /**
     * Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
     */
    hasMore: optionalType(booleanType())
  }).passthrough()
});
const RootSchema = objectType({
  /**
   * The URI identifying the root. This *must* start with file:// for now.
   */
  uri: stringType().startsWith("file://"),
  /**
   * An optional name for the root.
   */
  name: optionalType(stringType()),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optionalType(objectType({}).passthrough())
}).passthrough();
const ListRootsRequestSchema = RequestSchema.extend({
  method: literalType("roots/list")
});
const ListRootsResultSchema = ResultSchema.extend({
  roots: arrayType(RootSchema)
});
const RootsListChangedNotificationSchema = NotificationSchema.extend({
  method: literalType("notifications/roots/list_changed")
});
unionType([
  PingRequestSchema,
  InitializeRequestSchema,
  CompleteRequestSchema,
  SetLevelRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema,
  SubscribeRequestSchema,
  UnsubscribeRequestSchema,
  CallToolRequestSchema,
  ListToolsRequestSchema
]);
unionType([
  CancelledNotificationSchema,
  ProgressNotificationSchema,
  InitializedNotificationSchema,
  RootsListChangedNotificationSchema
]);
unionType([EmptyResultSchema, CreateMessageResultSchema, ElicitResultSchema, ListRootsResultSchema]);
unionType([PingRequestSchema, CreateMessageRequestSchema, ElicitRequestSchema, ListRootsRequestSchema]);
unionType([
  CancelledNotificationSchema,
  ProgressNotificationSchema,
  LoggingMessageNotificationSchema,
  ResourceUpdatedNotificationSchema,
  ResourceListChangedNotificationSchema,
  ToolListChangedNotificationSchema,
  PromptListChangedNotificationSchema
]);
unionType([
  EmptyResultSchema,
  InitializeResultSchema,
  CompleteResultSchema,
  GetPromptResultSchema,
  ListPromptsResultSchema,
  ListResourcesResultSchema,
  ListResourceTemplatesResultSchema,
  ReadResourceResultSchema,
  CallToolResultSchema,
  ListToolsResultSchema
]);
class McpError extends Error {
  constructor(code, message, data2) {
    super(`MCP error ${code}: ${message}`);
    this.code = code;
    this.data = data2;
    this.name = "McpError";
  }
}
const DEFAULT_REQUEST_TIMEOUT_MSEC = 6e4;
class Protocol {
  constructor(_options) {
    this._options = _options;
    this._requestMessageId = 0;
    this._requestHandlers = /* @__PURE__ */ new Map();
    this._requestHandlerAbortControllers = /* @__PURE__ */ new Map();
    this._notificationHandlers = /* @__PURE__ */ new Map();
    this._responseHandlers = /* @__PURE__ */ new Map();
    this._progressHandlers = /* @__PURE__ */ new Map();
    this._timeoutInfo = /* @__PURE__ */ new Map();
    this._pendingDebouncedNotifications = /* @__PURE__ */ new Set();
    this.setNotificationHandler(CancelledNotificationSchema, (notification) => {
      const controller = this._requestHandlerAbortControllers.get(notification.params.requestId);
      controller === null || controller === void 0 ? void 0 : controller.abort(notification.params.reason);
    });
    this.setNotificationHandler(ProgressNotificationSchema, (notification) => {
      this._onprogress(notification);
    });
    this.setRequestHandler(
      PingRequestSchema,
      // Automatic pong by default.
      (_request) => ({})
    );
  }
  _setupTimeout(messageId, timeout, maxTotalTimeout, onTimeout, resetTimeoutOnProgress = false) {
    this._timeoutInfo.set(messageId, {
      timeoutId: setTimeout(onTimeout, timeout),
      startTime: Date.now(),
      timeout,
      maxTotalTimeout,
      resetTimeoutOnProgress,
      onTimeout
    });
  }
  _resetTimeout(messageId) {
    const info = this._timeoutInfo.get(messageId);
    if (!info)
      return false;
    const totalElapsed = Date.now() - info.startTime;
    if (info.maxTotalTimeout && totalElapsed >= info.maxTotalTimeout) {
      this._timeoutInfo.delete(messageId);
      throw new McpError(ErrorCode.RequestTimeout, "Maximum total timeout exceeded", {
        maxTotalTimeout: info.maxTotalTimeout,
        totalElapsed
      });
    }
    clearTimeout(info.timeoutId);
    info.timeoutId = setTimeout(info.onTimeout, info.timeout);
    return true;
  }
  _cleanupTimeout(messageId) {
    const info = this._timeoutInfo.get(messageId);
    if (info) {
      clearTimeout(info.timeoutId);
      this._timeoutInfo.delete(messageId);
    }
  }
  /**
   * Attaches to the given transport, starts it, and starts listening for messages.
   *
   * The Protocol object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
   */
  async connect(transport) {
    var _a2, _b, _c;
    this._transport = transport;
    const _onclose = (_a2 = this.transport) === null || _a2 === void 0 ? void 0 : _a2.onclose;
    this._transport.onclose = () => {
      _onclose === null || _onclose === void 0 ? void 0 : _onclose();
      this._onclose();
    };
    const _onerror = (_b = this.transport) === null || _b === void 0 ? void 0 : _b.onerror;
    this._transport.onerror = (error) => {
      _onerror === null || _onerror === void 0 ? void 0 : _onerror(error);
      this._onerror(error);
    };
    const _onmessage = (_c = this._transport) === null || _c === void 0 ? void 0 : _c.onmessage;
    this._transport.onmessage = (message, extra) => {
      _onmessage === null || _onmessage === void 0 ? void 0 : _onmessage(message, extra);
      if (isJSONRPCResponse(message) || isJSONRPCError(message)) {
        this._onresponse(message);
      } else if (isJSONRPCRequest(message)) {
        this._onrequest(message, extra);
      } else if (isJSONRPCNotification(message)) {
        this._onnotification(message);
      } else {
        this._onerror(new Error(`Unknown message type: ${JSON.stringify(message)}`));
      }
    };
    await this._transport.start();
  }
  _onclose() {
    var _a2;
    const responseHandlers = this._responseHandlers;
    this._responseHandlers = /* @__PURE__ */ new Map();
    this._progressHandlers.clear();
    this._pendingDebouncedNotifications.clear();
    this._transport = void 0;
    (_a2 = this.onclose) === null || _a2 === void 0 ? void 0 : _a2.call(this);
    const error = new McpError(ErrorCode.ConnectionClosed, "Connection closed");
    for (const handler of responseHandlers.values()) {
      handler(error);
    }
  }
  _onerror(error) {
    var _a2;
    (_a2 = this.onerror) === null || _a2 === void 0 ? void 0 : _a2.call(this, error);
  }
  _onnotification(notification) {
    var _a2;
    const handler = (_a2 = this._notificationHandlers.get(notification.method)) !== null && _a2 !== void 0 ? _a2 : this.fallbackNotificationHandler;
    if (handler === void 0) {
      return;
    }
    Promise.resolve().then(() => handler(notification)).catch((error) => this._onerror(new Error(`Uncaught error in notification handler: ${error}`)));
  }
  _onrequest(request, extra) {
    var _a2, _b;
    const handler = (_a2 = this._requestHandlers.get(request.method)) !== null && _a2 !== void 0 ? _a2 : this.fallbackRequestHandler;
    const capturedTransport = this._transport;
    if (handler === void 0) {
      capturedTransport === null || capturedTransport === void 0 ? void 0 : capturedTransport.send({
        jsonrpc: "2.0",
        id: request.id,
        error: {
          code: ErrorCode.MethodNotFound,
          message: "Method not found"
        }
      }).catch((error) => this._onerror(new Error(`Failed to send an error response: ${error}`)));
      return;
    }
    const abortController = new AbortController();
    this._requestHandlerAbortControllers.set(request.id, abortController);
    const fullExtra = {
      signal: abortController.signal,
      sessionId: capturedTransport === null || capturedTransport === void 0 ? void 0 : capturedTransport.sessionId,
      _meta: (_b = request.params) === null || _b === void 0 ? void 0 : _b._meta,
      sendNotification: (notification) => this.notification(notification, { relatedRequestId: request.id }),
      sendRequest: (r, resultSchema, options) => this.request(r, resultSchema, { ...options, relatedRequestId: request.id }),
      authInfo: extra === null || extra === void 0 ? void 0 : extra.authInfo,
      requestId: request.id,
      requestInfo: extra === null || extra === void 0 ? void 0 : extra.requestInfo
    };
    Promise.resolve().then(() => handler(request, fullExtra)).then((result) => {
      if (abortController.signal.aborted) {
        return;
      }
      return capturedTransport === null || capturedTransport === void 0 ? void 0 : capturedTransport.send({
        result,
        jsonrpc: "2.0",
        id: request.id
      });
    }, (error) => {
      var _a3;
      if (abortController.signal.aborted) {
        return;
      }
      return capturedTransport === null || capturedTransport === void 0 ? void 0 : capturedTransport.send({
        jsonrpc: "2.0",
        id: request.id,
        error: {
          code: Number.isSafeInteger(error["code"]) ? error["code"] : ErrorCode.InternalError,
          message: (_a3 = error.message) !== null && _a3 !== void 0 ? _a3 : "Internal error"
        }
      });
    }).catch((error) => this._onerror(new Error(`Failed to send response: ${error}`))).finally(() => {
      this._requestHandlerAbortControllers.delete(request.id);
    });
  }
  _onprogress(notification) {
    const { progressToken, ...params } = notification.params;
    const messageId = Number(progressToken);
    const handler = this._progressHandlers.get(messageId);
    if (!handler) {
      this._onerror(new Error(`Received a progress notification for an unknown token: ${JSON.stringify(notification)}`));
      return;
    }
    const responseHandler = this._responseHandlers.get(messageId);
    const timeoutInfo = this._timeoutInfo.get(messageId);
    if (timeoutInfo && responseHandler && timeoutInfo.resetTimeoutOnProgress) {
      try {
        this._resetTimeout(messageId);
      } catch (error) {
        responseHandler(error);
        return;
      }
    }
    handler(params);
  }
  _onresponse(response) {
    const messageId = Number(response.id);
    const handler = this._responseHandlers.get(messageId);
    if (handler === void 0) {
      this._onerror(new Error(`Received a response for an unknown message ID: ${JSON.stringify(response)}`));
      return;
    }
    this._responseHandlers.delete(messageId);
    this._progressHandlers.delete(messageId);
    this._cleanupTimeout(messageId);
    if (isJSONRPCResponse(response)) {
      handler(response);
    } else {
      const error = new McpError(response.error.code, response.error.message, response.error.data);
      handler(error);
    }
  }
  get transport() {
    return this._transport;
  }
  /**
   * Closes the connection.
   */
  async close() {
    var _a2;
    await ((_a2 = this._transport) === null || _a2 === void 0 ? void 0 : _a2.close());
  }
  /**
   * Sends a request and wait for a response.
   *
   * Do not use this method to emit notifications! Use notification() instead.
   */
  request(request, resultSchema, options) {
    const { relatedRequestId, resumptionToken, onresumptiontoken } = options !== null && options !== void 0 ? options : {};
    return new Promise((resolve, reject) => {
      var _a2, _b, _c, _d, _e, _f;
      if (!this._transport) {
        reject(new Error("Not connected"));
        return;
      }
      if (((_a2 = this._options) === null || _a2 === void 0 ? void 0 : _a2.enforceStrictCapabilities) === true) {
        this.assertCapabilityForMethod(request.method);
      }
      (_b = options === null || options === void 0 ? void 0 : options.signal) === null || _b === void 0 ? void 0 : _b.throwIfAborted();
      const messageId = this._requestMessageId++;
      const jsonrpcRequest = {
        ...request,
        jsonrpc: "2.0",
        id: messageId
      };
      if (options === null || options === void 0 ? void 0 : options.onprogress) {
        this._progressHandlers.set(messageId, options.onprogress);
        jsonrpcRequest.params = {
          ...request.params,
          _meta: {
            ...((_c = request.params) === null || _c === void 0 ? void 0 : _c._meta) || {},
            progressToken: messageId
          }
        };
      }
      const cancel = (reason) => {
        var _a3;
        this._responseHandlers.delete(messageId);
        this._progressHandlers.delete(messageId);
        this._cleanupTimeout(messageId);
        (_a3 = this._transport) === null || _a3 === void 0 ? void 0 : _a3.send({
          jsonrpc: "2.0",
          method: "notifications/cancelled",
          params: {
            requestId: messageId,
            reason: String(reason)
          }
        }, { relatedRequestId, resumptionToken, onresumptiontoken }).catch((error) => this._onerror(new Error(`Failed to send cancellation: ${error}`)));
        reject(reason);
      };
      this._responseHandlers.set(messageId, (response) => {
        var _a3;
        if ((_a3 = options === null || options === void 0 ? void 0 : options.signal) === null || _a3 === void 0 ? void 0 : _a3.aborted) {
          return;
        }
        if (response instanceof Error) {
          return reject(response);
        }
        try {
          const result = resultSchema.parse(response.result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      (_d = options === null || options === void 0 ? void 0 : options.signal) === null || _d === void 0 ? void 0 : _d.addEventListener("abort", () => {
        var _a3;
        cancel((_a3 = options === null || options === void 0 ? void 0 : options.signal) === null || _a3 === void 0 ? void 0 : _a3.reason);
      });
      const timeout = (_e = options === null || options === void 0 ? void 0 : options.timeout) !== null && _e !== void 0 ? _e : DEFAULT_REQUEST_TIMEOUT_MSEC;
      const timeoutHandler = () => cancel(new McpError(ErrorCode.RequestTimeout, "Request timed out", { timeout }));
      this._setupTimeout(messageId, timeout, options === null || options === void 0 ? void 0 : options.maxTotalTimeout, timeoutHandler, (_f = options === null || options === void 0 ? void 0 : options.resetTimeoutOnProgress) !== null && _f !== void 0 ? _f : false);
      this._transport.send(jsonrpcRequest, { relatedRequestId, resumptionToken, onresumptiontoken }).catch((error) => {
        this._cleanupTimeout(messageId);
        reject(error);
      });
    });
  }
  /**
   * Emits a notification, which is a one-way message that does not expect a response.
   */
  async notification(notification, options) {
    var _a2, _b;
    if (!this._transport) {
      throw new Error("Not connected");
    }
    this.assertNotificationCapability(notification.method);
    const debouncedMethods = (_b = (_a2 = this._options) === null || _a2 === void 0 ? void 0 : _a2.debouncedNotificationMethods) !== null && _b !== void 0 ? _b : [];
    const canDebounce = debouncedMethods.includes(notification.method) && !notification.params && !(options === null || options === void 0 ? void 0 : options.relatedRequestId);
    if (canDebounce) {
      if (this._pendingDebouncedNotifications.has(notification.method)) {
        return;
      }
      this._pendingDebouncedNotifications.add(notification.method);
      Promise.resolve().then(() => {
        var _a3;
        this._pendingDebouncedNotifications.delete(notification.method);
        if (!this._transport) {
          return;
        }
        const jsonrpcNotification2 = {
          ...notification,
          jsonrpc: "2.0"
        };
        (_a3 = this._transport) === null || _a3 === void 0 ? void 0 : _a3.send(jsonrpcNotification2, options).catch((error) => this._onerror(error));
      });
      return;
    }
    const jsonrpcNotification = {
      ...notification,
      jsonrpc: "2.0"
    };
    await this._transport.send(jsonrpcNotification, options);
  }
  /**
   * Registers a handler to invoke when this protocol object receives a request with the given method.
   *
   * Note that this will replace any previous request handler for the same method.
   */
  setRequestHandler(requestSchema, handler) {
    const method = requestSchema.shape.method.value;
    this.assertRequestHandlerCapability(method);
    this._requestHandlers.set(method, (request, extra) => {
      return Promise.resolve(handler(requestSchema.parse(request), extra));
    });
  }
  /**
   * Removes the request handler for the given method.
   */
  removeRequestHandler(method) {
    this._requestHandlers.delete(method);
  }
  /**
   * Asserts that a request handler has not already been set for the given method, in preparation for a new one being automatically installed.
   */
  assertCanSetRequestHandler(method) {
    if (this._requestHandlers.has(method)) {
      throw new Error(`A request handler for ${method} already exists, which would be overridden`);
    }
  }
  /**
   * Registers a handler to invoke when this protocol object receives a notification with the given method.
   *
   * Note that this will replace any previous notification handler for the same method.
   */
  setNotificationHandler(notificationSchema, handler) {
    this._notificationHandlers.set(notificationSchema.shape.method.value, (notification) => Promise.resolve(handler(notificationSchema.parse(notification))));
  }
  /**
   * Removes the notification handler for the given method.
   */
  removeNotificationHandler(method) {
    this._notificationHandlers.delete(method);
  }
}
function mergeCapabilities(base, additional) {
  return Object.entries(additional).reduce((acc, [key, value]) => {
    if (value && typeof value === "object") {
      acc[key] = acc[key] ? { ...acc[key], ...value } : value;
    } else {
      acc[key] = value;
    }
    return acc;
  }, { ...base });
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var uri_all$1 = { exports: {} };
/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
var uri_all = uri_all$1.exports;
var hasRequiredUri_all;
function requireUri_all() {
  if (hasRequiredUri_all) return uri_all$1.exports;
  hasRequiredUri_all = 1;
  (function(module, exports) {
    (function(global2, factory) {
      factory(exports);
    })(uri_all, (function(exports2) {
      function merge() {
        for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
          sets[_key] = arguments[_key];
        }
        if (sets.length > 1) {
          sets[0] = sets[0].slice(0, -1);
          var xl = sets.length - 1;
          for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
          }
          sets[xl] = sets[xl].slice(1);
          return sets.join("");
        } else {
          return sets[0];
        }
      }
      function subexp(str) {
        return "(?:" + str + ")";
      }
      function typeOf(o) {
        return o === void 0 ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
      }
      function toUpperCase(str) {
        return str.toUpperCase();
      }
      function toArray(obj) {
        return obj !== void 0 && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
      }
      function assign(target, source) {
        var obj = target;
        if (source) {
          for (var key in source) {
            obj[key] = source[key];
          }
        }
        return obj;
      }
      function buildExps(isIRI) {
        var ALPHA$$ = "[A-Za-z]", DIGIT$$ = "[0-9]", HEXDIG$$2 = merge(DIGIT$$, "[A-Fa-f]"), PCT_ENCODED$2 = subexp(subexp("%[EFef]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%" + HEXDIG$$2 + HEXDIG$$2)), GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]", SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$), UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]", UNRESERVED$$2 = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$);
        subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*");
        subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]")) + "*");
        var DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$), IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$), H16$ = subexp(HEXDIG$$2 + "{1,4}"), LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$), IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$), IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$), IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$), IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$), IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$), IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$), IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$), IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$), IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"), IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")), ZONEID$ = subexp(subexp(UNRESERVED$$2 + "|" + PCT_ENCODED$2) + "+");
        subexp("[vV]" + HEXDIG$$2 + "+\\." + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]") + "+");
        subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$)) + "*");
        var PCHAR$ = subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@]"));
        subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\@]")) + "+");
        subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*");
        return {
          NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
          NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
          NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
          ESCAPE: new RegExp(merge("[^]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          UNRESERVED: new RegExp(UNRESERVED$$2, "g"),
          OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$2, RESERVED$$), "g"),
          PCT_ENCODED: new RegExp(PCT_ENCODED$2, "g"),
          IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
          IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$")
          //RFC 6874, with relaxed parsing rules
        };
      }
      var URI_PROTOCOL = buildExps(false);
      var IRI_PROTOCOL = buildExps(true);
      var slicedToArray = /* @__PURE__ */ (function() {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }
          return _arr;
        }
        return function(arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      })();
      var toConsumableArray = function(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
          return arr2;
        } else {
          return Array.from(arr);
        }
      };
      var maxInt = 2147483647;
      var base = 36;
      var tMin = 1;
      var tMax = 26;
      var skew = 38;
      var damp = 700;
      var initialBias = 72;
      var initialN = 128;
      var delimiter = "-";
      var regexPunycode = /^xn--/;
      var regexNonASCII = /[^\0-\x7E]/;
      var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
      var errors = {
        "overflow": "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      };
      var baseMinusTMin = base - tMin;
      var floor = Math.floor;
      var stringFromCharCode = String.fromCharCode;
      function error$1(type2) {
        throw new RangeError(errors[type2]);
      }
      function map(array, fn) {
        var result = [];
        var length = array.length;
        while (length--) {
          result[length] = fn(array[length]);
        }
        return result;
      }
      function mapDomain(string, fn) {
        var parts = string.split("@");
        var result = "";
        if (parts.length > 1) {
          result = parts[0] + "@";
          string = parts[1];
        }
        string = string.replace(regexSeparators, ".");
        var labels = string.split(".");
        var encoded = map(labels, fn).join(".");
        return result + encoded;
      }
      function ucs2decode(string) {
        var output = [];
        var counter = 0;
        var length = string.length;
        while (counter < length) {
          var value = string.charCodeAt(counter++);
          if (value >= 55296 && value <= 56319 && counter < length) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
            } else {
              output.push(value);
              counter--;
            }
          } else {
            output.push(value);
          }
        }
        return output;
      }
      var ucs2encode = function ucs2encode2(array) {
        return String.fromCodePoint.apply(String, toConsumableArray(array));
      };
      var basicToDigit = function basicToDigit2(codePoint) {
        if (codePoint - 48 < 10) {
          return codePoint - 22;
        }
        if (codePoint - 65 < 26) {
          return codePoint - 65;
        }
        if (codePoint - 97 < 26) {
          return codePoint - 97;
        }
        return base;
      };
      var digitToBasic = function digitToBasic2(digit, flag) {
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
      };
      var adapt = function adapt2(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for (
          ;
          /* no initialization */
          delta > baseMinusTMin * tMax >> 1;
          k += base
        ) {
          delta = floor(delta / baseMinusTMin);
        }
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
      };
      var decode = function decode2(input) {
        var output = [];
        var inputLength = input.length;
        var i = 0;
        var n = initialN;
        var bias = initialBias;
        var basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
          basic = 0;
        }
        for (var j = 0; j < basic; ++j) {
          if (input.charCodeAt(j) >= 128) {
            error$1("not-basic");
          }
          output.push(input.charCodeAt(j));
        }
        for (var index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
          var oldi = i;
          for (
            var w = 1, k = base;
            ;
            /* no condition */
            k += base
          ) {
            if (index >= inputLength) {
              error$1("invalid-input");
            }
            var digit = basicToDigit(input.charCodeAt(index++));
            if (digit >= base || digit > floor((maxInt - i) / w)) {
              error$1("overflow");
            }
            i += digit * w;
            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (digit < t) {
              break;
            }
            var baseMinusT = base - t;
            if (w > floor(maxInt / baseMinusT)) {
              error$1("overflow");
            }
            w *= baseMinusT;
          }
          var out = output.length + 1;
          bias = adapt(i - oldi, out, oldi == 0);
          if (floor(i / out) > maxInt - n) {
            error$1("overflow");
          }
          n += floor(i / out);
          i %= out;
          output.splice(i++, 0, n);
        }
        return String.fromCodePoint.apply(String, output);
      };
      var encode = function encode2(input) {
        var output = [];
        input = ucs2decode(input);
        var inputLength = input.length;
        var n = initialN;
        var delta = 0;
        var bias = initialBias;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _currentValue2 = _step.value;
            if (_currentValue2 < 128) {
              output.push(stringFromCharCode(_currentValue2));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        var basicLength = output.length;
        var handledCPCount = basicLength;
        if (basicLength) {
          output.push(delimiter);
        }
        while (handledCPCount < inputLength) {
          var m = maxInt;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = void 0;
          try {
            for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var currentValue = _step2.value;
              if (currentValue >= n && currentValue < m) {
                m = currentValue;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
          var handledCPCountPlusOne = handledCPCount + 1;
          if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
            error$1("overflow");
          }
          delta += (m - n) * handledCPCountPlusOne;
          n = m;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = void 0;
          try {
            for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _currentValue = _step3.value;
              if (_currentValue < n && ++delta > maxInt) {
                error$1("overflow");
              }
              if (_currentValue == n) {
                var q = delta;
                for (
                  var k = base;
                  ;
                  /* no condition */
                  k += base
                ) {
                  var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (q < t) {
                    break;
                  }
                  var qMinusT = q - t;
                  var baseMinusT = base - t;
                  output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
          ++delta;
          ++n;
        }
        return output.join("");
      };
      var toUnicode = function toUnicode2(input) {
        return mapDomain(input, function(string) {
          return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
      };
      var toASCII = function toASCII2(input) {
        return mapDomain(input, function(string) {
          return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
        });
      };
      var punycode = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        "version": "2.1.0",
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        "ucs2": {
          "decode": ucs2decode,
          "encode": ucs2encode
        },
        "decode": decode,
        "encode": encode,
        "toASCII": toASCII,
        "toUnicode": toUnicode
      };
      var SCHEMES = {};
      function pctEncChar(chr) {
        var c = chr.charCodeAt(0);
        var e = void 0;
        if (c < 16) e = "%0" + c.toString(16).toUpperCase();
        else if (c < 128) e = "%" + c.toString(16).toUpperCase();
        else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        return e;
      }
      function pctDecChars(str) {
        var newStr = "";
        var i = 0;
        var il = str.length;
        while (i < il) {
          var c = parseInt(str.substr(i + 1, 2), 16);
          if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
          } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
              var c2 = parseInt(str.substr(i + 4, 2), 16);
              newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
              newStr += str.substr(i, 6);
            }
            i += 6;
          } else if (c >= 224) {
            if (il - i >= 9) {
              var _c = parseInt(str.substr(i + 4, 2), 16);
              var c3 = parseInt(str.substr(i + 7, 2), 16);
              newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
              newStr += str.substr(i, 9);
            }
            i += 9;
          } else {
            newStr += str.substr(i, 3);
            i += 3;
          }
        }
        return newStr;
      }
      function _normalizeComponentEncoding(components, protocol) {
        function decodeUnreserved2(str) {
          var decStr = pctDecChars(str);
          return !decStr.match(protocol.UNRESERVED) ? str : decStr;
        }
        if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_SCHEME, "");
        if (components.userinfo !== void 0) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.host !== void 0) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.path !== void 0) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.query !== void 0) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.fragment !== void 0) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        return components;
      }
      function _stripLeadingZeros(str) {
        return str.replace(/^0*(.*)/, "$1") || "0";
      }
      function _normalizeIPv4(host, protocol) {
        var matches = host.match(protocol.IPV4ADDRESS) || [];
        var _matches = slicedToArray(matches, 2), address = _matches[1];
        if (address) {
          return address.split(".").map(_stripLeadingZeros).join(".");
        } else {
          return host;
        }
      }
      function _normalizeIPv6(host, protocol) {
        var matches = host.match(protocol.IPV6ADDRESS) || [];
        var _matches2 = slicedToArray(matches, 3), address = _matches2[1], zone = _matches2[2];
        if (address) {
          var _address$toLowerCase$ = address.toLowerCase().split("::").reverse(), _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2), last = _address$toLowerCase$2[0], first = _address$toLowerCase$2[1];
          var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
          var lastFields = last.split(":").map(_stripLeadingZeros);
          var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
          var fieldCount = isLastFieldIPv4Address ? 7 : 8;
          var lastFieldsStart = lastFields.length - fieldCount;
          var fields = Array(fieldCount);
          for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || "";
          }
          if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
          }
          var allZeroFields = fields.reduce(function(acc, field, index) {
            if (!field || field === "0") {
              var lastLongest = acc[acc.length - 1];
              if (lastLongest && lastLongest.index + lastLongest.length === index) {
                lastLongest.length++;
              } else {
                acc.push({ index, length: 1 });
              }
            }
            return acc;
          }, []);
          var longestZeroFields = allZeroFields.sort(function(a, b) {
            return b.length - a.length;
          })[0];
          var newHost = void 0;
          if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
          } else {
            newHost = fields.join(":");
          }
          if (zone) {
            newHost += "%" + zone;
          }
          return newHost;
        } else {
          return host;
        }
      }
      var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
      var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === void 0;
      function parse(uriString) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var components = {};
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
        var matches = uriString.match(URI_PARSE);
        if (matches) {
          if (NO_MATCH_IS_UNDEFINED) {
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            if (isNaN(components.port)) {
              components.port = matches[5];
            }
          } else {
            components.scheme = matches[1] || void 0;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : void 0;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : void 0;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : void 0;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : void 0;
            if (isNaN(components.port)) {
              components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : void 0;
            }
          }
          if (components.host) {
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
          }
          if (components.scheme === void 0 && components.userinfo === void 0 && components.host === void 0 && components.port === void 0 && !components.path && components.query === void 0) {
            components.reference = "same-document";
          } else if (components.scheme === void 0) {
            components.reference = "relative";
          } else if (components.fragment === void 0) {
            components.reference = "absolute";
          } else {
            components.reference = "uri";
          }
          if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
          }
          var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
          if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
              try {
                components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
              } catch (e) {
                components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
              }
            }
            _normalizeComponentEncoding(components, URI_PROTOCOL);
          } else {
            _normalizeComponentEncoding(components, protocol);
          }
          if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
          }
        } else {
          components.error = components.error || "URI can not be parsed.";
        }
        return components;
      }
      function _recomposeAuthority(components, options) {
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        if (components.userinfo !== void 0) {
          uriTokens.push(components.userinfo);
          uriTokens.push("@");
        }
        if (components.host !== void 0) {
          uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function(_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
          }));
        }
        if (typeof components.port === "number" || typeof components.port === "string") {
          uriTokens.push(":");
          uriTokens.push(String(components.port));
        }
        return uriTokens.length ? uriTokens.join("") : void 0;
      }
      var RDS1 = /^\.\.?\//;
      var RDS2 = /^\/\.(\/|$)/;
      var RDS3 = /^\/\.\.(\/|$)/;
      var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
      function removeDotSegments(input) {
        var output = [];
        while (input.length) {
          if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
          } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
          } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
          } else if (input === "." || input === "..") {
            input = "";
          } else {
            var im = input.match(RDS5);
            if (im) {
              var s = im[0];
              input = input.slice(s.length);
              output.push(s);
            } else {
              throw new Error("Unexpected dot segment condition");
            }
          }
        }
        return output.join("");
      }
      function serialize(components) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
        if (components.host) {
          if (protocol.IPV6ADDRESS.test(components.host)) ;
          else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
            try {
              components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
            } catch (e) {
              components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
            }
          }
        }
        _normalizeComponentEncoding(components, protocol);
        if (options.reference !== "suffix" && components.scheme) {
          uriTokens.push(components.scheme);
          uriTokens.push(":");
        }
        var authority = _recomposeAuthority(components, options);
        if (authority !== void 0) {
          if (options.reference !== "suffix") {
            uriTokens.push("//");
          }
          uriTokens.push(authority);
          if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
          }
        }
        if (components.path !== void 0) {
          var s = components.path;
          if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
          }
          if (authority === void 0) {
            s = s.replace(/^\/\//, "/%2F");
          }
          uriTokens.push(s);
        }
        if (components.query !== void 0) {
          uriTokens.push("?");
          uriTokens.push(components.query);
        }
        if (components.fragment !== void 0) {
          uriTokens.push("#");
          uriTokens.push(components.fragment);
        }
        return uriTokens.join("");
      }
      function resolveComponents(base2, relative) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var skipNormalization = arguments[3];
        var target = {};
        if (!skipNormalization) {
          base2 = parse(serialize(base2, options), options);
          relative = parse(serialize(relative, options), options);
        }
        options = options || {};
        if (!options.tolerant && relative.scheme) {
          target.scheme = relative.scheme;
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
          } else {
            if (!relative.path) {
              target.path = base2.path;
              if (relative.query !== void 0) {
                target.query = relative.query;
              } else {
                target.query = base2.query;
              }
            } else {
              if (relative.path.charAt(0) === "/") {
                target.path = removeDotSegments(relative.path);
              } else {
                if ((base2.userinfo !== void 0 || base2.host !== void 0 || base2.port !== void 0) && !base2.path) {
                  target.path = "/" + relative.path;
                } else if (!base2.path) {
                  target.path = relative.path;
                } else {
                  target.path = base2.path.slice(0, base2.path.lastIndexOf("/") + 1) + relative.path;
                }
                target.path = removeDotSegments(target.path);
              }
              target.query = relative.query;
            }
            target.userinfo = base2.userinfo;
            target.host = base2.host;
            target.port = base2.port;
          }
          target.scheme = base2.scheme;
        }
        target.fragment = relative.fragment;
        return target;
      }
      function resolve(baseURI, relativeURI, options) {
        var schemelessOptions = assign({ scheme: "null" }, options);
        return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
      }
      function normalize(uri, options) {
        if (typeof uri === "string") {
          uri = serialize(parse(uri, options), options);
        } else if (typeOf(uri) === "object") {
          uri = parse(serialize(uri, options), options);
        }
        return uri;
      }
      function equal(uriA, uriB, options) {
        if (typeof uriA === "string") {
          uriA = serialize(parse(uriA, options), options);
        } else if (typeOf(uriA) === "object") {
          uriA = serialize(uriA, options);
        }
        if (typeof uriB === "string") {
          uriB = serialize(parse(uriB, options), options);
        } else if (typeOf(uriB) === "object") {
          uriB = serialize(uriB, options);
        }
        return uriA === uriB;
      }
      function escapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
      }
      function unescapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
      }
      var handler = {
        scheme: "http",
        domainHost: true,
        parse: function parse2(components, options) {
          if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
          }
          return components;
        },
        serialize: function serialize2(components, options) {
          var secure = String(components.scheme).toLowerCase() === "https";
          if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = void 0;
          }
          if (!components.path) {
            components.path = "/";
          }
          return components;
        }
      };
      var handler$1 = {
        scheme: "https",
        domainHost: handler.domainHost,
        parse: handler.parse,
        serialize: handler.serialize
      };
      function isSecure(wsComponents) {
        return typeof wsComponents.secure === "boolean" ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
      }
      var handler$2 = {
        scheme: "ws",
        domainHost: true,
        parse: function parse2(components, options) {
          var wsComponents = components;
          wsComponents.secure = isSecure(wsComponents);
          wsComponents.resourceName = (wsComponents.path || "/") + (wsComponents.query ? "?" + wsComponents.query : "");
          wsComponents.path = void 0;
          wsComponents.query = void 0;
          return wsComponents;
        },
        serialize: function serialize2(wsComponents, options) {
          if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = void 0;
          }
          if (typeof wsComponents.secure === "boolean") {
            wsComponents.scheme = wsComponents.secure ? "wss" : "ws";
            wsComponents.secure = void 0;
          }
          if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split("?"), _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2), path = _wsComponents$resourc2[0], query = _wsComponents$resourc2[1];
            wsComponents.path = path && path !== "/" ? path : void 0;
            wsComponents.query = query;
            wsComponents.resourceName = void 0;
          }
          wsComponents.fragment = void 0;
          return wsComponents;
        }
      };
      var handler$3 = {
        scheme: "wss",
        domainHost: handler$2.domainHost,
        parse: handler$2.parse,
        serialize: handler$2.serialize
      };
      var O = {};
      var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]";
      var HEXDIG$$ = "[0-9A-Fa-f]";
      var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$));
      var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
      var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
      var VCHAR$$ = merge(QTEXT$$, '[\\"\\\\]');
      var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
      var UNRESERVED = new RegExp(UNRESERVED$$, "g");
      var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
      var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
      var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
      var NOT_HFVALUE = NOT_HFNAME;
      function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(UNRESERVED) ? str : decStr;
      }
      var handler$4 = {
        scheme: "mailto",
        parse: function parse$$1(components, options) {
          var mailtoComponents = components;
          var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
          mailtoComponents.path = void 0;
          if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
              var hfield = hfields[x].split("=");
              switch (hfield[0]) {
                case "to":
                  var toAddrs = hfield[1].split(",");
                  for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                    to.push(toAddrs[_x]);
                  }
                  break;
                case "subject":
                  mailtoComponents.subject = unescapeComponent(hfield[1], options);
                  break;
                case "body":
                  mailtoComponents.body = unescapeComponent(hfield[1], options);
                  break;
                default:
                  unknownHeaders = true;
                  headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                  break;
              }
            }
            if (unknownHeaders) mailtoComponents.headers = headers;
          }
          mailtoComponents.query = void 0;
          for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
              try {
                addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
              } catch (e) {
                mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
              }
            } else {
              addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
          }
          return mailtoComponents;
        },
        serialize: function serialize$$1(mailtoComponents, options) {
          var components = mailtoComponents;
          var to = toArray(mailtoComponents.to);
          if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
              var toAddr = String(to[x]);
              var atIdx = toAddr.lastIndexOf("@");
              var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
              var domain2 = toAddr.slice(atIdx + 1);
              try {
                domain2 = !options.iri ? punycode.toASCII(unescapeComponent(domain2, options).toLowerCase()) : punycode.toUnicode(domain2);
              } catch (e) {
                components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
              }
              to[x] = localPart + "@" + domain2;
            }
            components.path = to.join(",");
          }
          var headers = mailtoComponents.headers = mailtoComponents.headers || {};
          if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
          if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
          var fields = [];
          for (var name in headers) {
            if (headers[name] !== O[name]) {
              fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
          }
          if (fields.length) {
            components.query = fields.join("&");
          }
          return components;
        }
      };
      var URN_PARSE = /^([^\:]+)\:(.*)/;
      var handler$5 = {
        scheme: "urn",
        parse: function parse$$1(components, options) {
          var matches = components.path && components.path.match(URN_PARSE);
          var urnComponents = components;
          if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = void 0;
            if (schemeHandler) {
              urnComponents = schemeHandler.parse(urnComponents, options);
            }
          } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
          }
          return urnComponents;
        },
        serialize: function serialize$$1(urnComponents, options) {
          var scheme = options.scheme || urnComponents.scheme || "urn";
          var nid = urnComponents.nid;
          var urnScheme = scheme + ":" + (options.nid || nid);
          var schemeHandler = SCHEMES[urnScheme];
          if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
          }
          var uriComponents = urnComponents;
          var nss = urnComponents.nss;
          uriComponents.path = (nid || options.nid) + ":" + nss;
          return uriComponents;
        }
      };
      var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
      var handler$6 = {
        scheme: "urn:uuid",
        parse: function parse2(urnComponents, options) {
          var uuidComponents = urnComponents;
          uuidComponents.uuid = uuidComponents.nss;
          uuidComponents.nss = void 0;
          if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
          }
          return uuidComponents;
        },
        serialize: function serialize2(uuidComponents, options) {
          var urnComponents = uuidComponents;
          urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
          return urnComponents;
        }
      };
      SCHEMES[handler.scheme] = handler;
      SCHEMES[handler$1.scheme] = handler$1;
      SCHEMES[handler$2.scheme] = handler$2;
      SCHEMES[handler$3.scheme] = handler$3;
      SCHEMES[handler$4.scheme] = handler$4;
      SCHEMES[handler$5.scheme] = handler$5;
      SCHEMES[handler$6.scheme] = handler$6;
      exports2.SCHEMES = SCHEMES;
      exports2.pctEncChar = pctEncChar;
      exports2.pctDecChars = pctDecChars;
      exports2.parse = parse;
      exports2.removeDotSegments = removeDotSegments;
      exports2.serialize = serialize;
      exports2.resolveComponents = resolveComponents;
      exports2.resolve = resolve;
      exports2.normalize = normalize;
      exports2.equal = equal;
      exports2.escapeComponent = escapeComponent;
      exports2.unescapeComponent = unescapeComponent;
      Object.defineProperty(exports2, "__esModule", { value: true });
    }));
  })(uri_all$1, uri_all$1.exports);
  return uri_all$1.exports;
}
var fastDeepEqual;
var hasRequiredFastDeepEqual;
function requireFastDeepEqual() {
  if (hasRequiredFastDeepEqual) return fastDeepEqual;
  hasRequiredFastDeepEqual = 1;
  fastDeepEqual = function equal(a, b) {
    if (a === b) return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
      if (a.constructor !== b.constructor) return false;
      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0; )
          if (!equal(a[i], b[i])) return false;
        return true;
      }
      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      for (i = length; i-- !== 0; ) {
        var key = keys[i];
        if (!equal(a[key], b[key])) return false;
      }
      return true;
    }
    return a !== a && b !== b;
  };
  return fastDeepEqual;
}
var ucs2length;
var hasRequiredUcs2length;
function requireUcs2length() {
  if (hasRequiredUcs2length) return ucs2length;
  hasRequiredUcs2length = 1;
  ucs2length = function ucs2length2(str) {
    var length = 0, len = str.length, pos = 0, value;
    while (pos < len) {
      length++;
      value = str.charCodeAt(pos++);
      if (value >= 55296 && value <= 56319 && pos < len) {
        value = str.charCodeAt(pos);
        if ((value & 64512) == 56320) pos++;
      }
    }
    return length;
  };
  return ucs2length;
}
var util;
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  util = {
    copy,
    checkDataType,
    checkDataTypes,
    coerceToTypes,
    toHash,
    getProperty,
    escapeQuotes,
    equal: requireFastDeepEqual(),
    ucs2length: requireUcs2length(),
    varOccurences,
    varReplace,
    schemaHasRules,
    schemaHasRulesExcept,
    schemaUnknownRules,
    toQuotedString,
    getPathExpr,
    getPath,
    getData,
    unescapeFragment,
    unescapeJsonPointer,
    escapeFragment,
    escapeJsonPointer
  };
  function copy(o, to) {
    to = to || {};
    for (var key in o) to[key] = o[key];
    return to;
  }
  function checkDataType(dataType, data2, strictNumbers, negate) {
    var EQUAL = negate ? " !== " : " === ", AND = negate ? " || " : " && ", OK2 = negate ? "!" : "", NOT = negate ? "" : "!";
    switch (dataType) {
      case "null":
        return data2 + EQUAL + "null";
      case "array":
        return OK2 + "Array.isArray(" + data2 + ")";
      case "object":
        return "(" + OK2 + data2 + AND + "typeof " + data2 + EQUAL + '"object"' + AND + NOT + "Array.isArray(" + data2 + "))";
      case "integer":
        return "(typeof " + data2 + EQUAL + '"number"' + AND + NOT + "(" + data2 + " % 1)" + AND + data2 + EQUAL + data2 + (strictNumbers ? AND + OK2 + "isFinite(" + data2 + ")" : "") + ")";
      case "number":
        return "(typeof " + data2 + EQUAL + '"' + dataType + '"' + (strictNumbers ? AND + OK2 + "isFinite(" + data2 + ")" : "") + ")";
      default:
        return "typeof " + data2 + EQUAL + '"' + dataType + '"';
    }
  }
  function checkDataTypes(dataTypes, data2, strictNumbers) {
    switch (dataTypes.length) {
      case 1:
        return checkDataType(dataTypes[0], data2, strictNumbers, true);
      default:
        var code = "";
        var types = toHash(dataTypes);
        if (types.array && types.object) {
          code = types.null ? "(" : "(!" + data2 + " || ";
          code += "typeof " + data2 + ' !== "object")';
          delete types.null;
          delete types.array;
          delete types.object;
        }
        if (types.number) delete types.integer;
        for (var t in types)
          code += (code ? " && " : "") + checkDataType(t, data2, strictNumbers, true);
        return code;
    }
  }
  var COERCE_TO_TYPES = toHash(["string", "number", "integer", "boolean", "null"]);
  function coerceToTypes(optionCoerceTypes, dataTypes) {
    if (Array.isArray(dataTypes)) {
      var types = [];
      for (var i = 0; i < dataTypes.length; i++) {
        var t = dataTypes[i];
        if (COERCE_TO_TYPES[t]) types[types.length] = t;
        else if (optionCoerceTypes === "array" && t === "array") types[types.length] = t;
      }
      if (types.length) return types;
    } else if (COERCE_TO_TYPES[dataTypes]) {
      return [dataTypes];
    } else if (optionCoerceTypes === "array" && dataTypes === "array") {
      return ["array"];
    }
  }
  function toHash(arr) {
    var hash = {};
    for (var i = 0; i < arr.length; i++) hash[arr[i]] = true;
    return hash;
  }
  var IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  var SINGLE_QUOTE = /'|\\/g;
  function getProperty(key) {
    return typeof key == "number" ? "[" + key + "]" : IDENTIFIER.test(key) ? "." + key : "['" + escapeQuotes(key) + "']";
  }
  function escapeQuotes(str) {
    return str.replace(SINGLE_QUOTE, "\\$&").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\f/g, "\\f").replace(/\t/g, "\\t");
  }
  function varOccurences(str, dataVar) {
    dataVar += "[^0-9]";
    var matches = str.match(new RegExp(dataVar, "g"));
    return matches ? matches.length : 0;
  }
  function varReplace(str, dataVar, expr) {
    dataVar += "([^0-9])";
    expr = expr.replace(/\$/g, "$$$$");
    return str.replace(new RegExp(dataVar, "g"), expr + "$1");
  }
  function schemaHasRules(schema, rules2) {
    if (typeof schema == "boolean") return !schema;
    for (var key in schema) if (rules2[key]) return true;
  }
  function schemaHasRulesExcept(schema, rules2, exceptKeyword) {
    if (typeof schema == "boolean") return !schema && exceptKeyword != "not";
    for (var key in schema) if (key != exceptKeyword && rules2[key]) return true;
  }
  function schemaUnknownRules(schema, rules2) {
    if (typeof schema == "boolean") return;
    for (var key in schema) if (!rules2[key]) return key;
  }
  function toQuotedString(str) {
    return "'" + escapeQuotes(str) + "'";
  }
  function getPathExpr(currentPath, expr, jsonPointers, isNumber) {
    var path = jsonPointers ? "'/' + " + expr + (isNumber ? "" : ".replace(/~/g, '~0').replace(/\\//g, '~1')") : isNumber ? "'[' + " + expr + " + ']'" : "'[\\'' + " + expr + " + '\\']'";
    return joinPaths(currentPath, path);
  }
  function getPath(currentPath, prop, jsonPointers) {
    var path = jsonPointers ? toQuotedString("/" + escapeJsonPointer(prop)) : toQuotedString(getProperty(prop));
    return joinPaths(currentPath, path);
  }
  var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
  var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function getData($data, lvl, paths) {
    var up, jsonPointer, data2, matches;
    if ($data === "") return "rootData";
    if ($data[0] == "/") {
      if (!JSON_POINTER.test($data)) throw new Error("Invalid JSON-pointer: " + $data);
      jsonPointer = $data;
      data2 = "rootData";
    } else {
      matches = $data.match(RELATIVE_JSON_POINTER);
      if (!matches) throw new Error("Invalid JSON-pointer: " + $data);
      up = +matches[1];
      jsonPointer = matches[2];
      if (jsonPointer == "#") {
        if (up >= lvl) throw new Error("Cannot access property/index " + up + " levels up, current level is " + lvl);
        return paths[lvl - up];
      }
      if (up > lvl) throw new Error("Cannot access data " + up + " levels up, current level is " + lvl);
      data2 = "data" + (lvl - up || "");
      if (!jsonPointer) return data2;
    }
    var expr = data2;
    var segments = jsonPointer.split("/");
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i];
      if (segment) {
        data2 += getProperty(unescapeJsonPointer(segment));
        expr += " && " + data2;
      }
    }
    return expr;
  }
  function joinPaths(a, b) {
    if (a == '""') return b;
    return (a + " + " + b).replace(/([^\\])' \+ '/g, "$1");
  }
  function unescapeFragment(str) {
    return unescapeJsonPointer(decodeURIComponent(str));
  }
  function escapeFragment(str) {
    return encodeURIComponent(escapeJsonPointer(str));
  }
  function escapeJsonPointer(str) {
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  function unescapeJsonPointer(str) {
    return str.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  return util;
}
var schema_obj;
var hasRequiredSchema_obj;
function requireSchema_obj() {
  if (hasRequiredSchema_obj) return schema_obj;
  hasRequiredSchema_obj = 1;
  var util2 = requireUtil();
  schema_obj = SchemaObject;
  function SchemaObject(obj) {
    util2.copy(obj, this);
  }
  return schema_obj;
}
var jsonSchemaTraverse = { exports: {} };
var hasRequiredJsonSchemaTraverse;
function requireJsonSchemaTraverse() {
  if (hasRequiredJsonSchemaTraverse) return jsonSchemaTraverse.exports;
  hasRequiredJsonSchemaTraverse = 1;
  var traverse = jsonSchemaTraverse.exports = function(schema, opts, cb) {
    if (typeof opts == "function") {
      cb = opts;
      opts = {};
    }
    cb = opts.cb || cb;
    var pre = typeof cb == "function" ? cb : cb.pre || function() {
    };
    var post = cb.post || function() {
    };
    _traverse(opts, pre, post, schema, "", schema);
  };
  traverse.keywords = {
    additionalItems: true,
    items: true,
    contains: true,
    additionalProperties: true,
    propertyNames: true,
    not: true
  };
  traverse.arrayKeywords = {
    items: true,
    allOf: true,
    anyOf: true,
    oneOf: true
  };
  traverse.propsKeywords = {
    definitions: true,
    properties: true,
    patternProperties: true,
    dependencies: true
  };
  traverse.skipKeywords = {
    default: true,
    enum: true,
    const: true,
    required: true,
    maximum: true,
    minimum: true,
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    multipleOf: true,
    maxLength: true,
    minLength: true,
    pattern: true,
    format: true,
    maxItems: true,
    minItems: true,
    uniqueItems: true,
    maxProperties: true,
    minProperties: true
  };
  function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
    if (schema && typeof schema == "object" && !Array.isArray(schema)) {
      pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      for (var key in schema) {
        var sch = schema[key];
        if (Array.isArray(sch)) {
          if (key in traverse.arrayKeywords) {
            for (var i = 0; i < sch.length; i++)
              _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
          }
        } else if (key in traverse.propsKeywords) {
          if (sch && typeof sch == "object") {
            for (var prop in sch)
              _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
          }
        } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
          _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
        }
      }
      post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    }
  }
  function escapeJsonPtr(str) {
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return jsonSchemaTraverse.exports;
}
var resolve_1;
var hasRequiredResolve;
function requireResolve() {
  if (hasRequiredResolve) return resolve_1;
  hasRequiredResolve = 1;
  var URI = requireUri_all(), equal = requireFastDeepEqual(), util2 = requireUtil(), SchemaObject = requireSchema_obj(), traverse = requireJsonSchemaTraverse();
  resolve_1 = resolve;
  resolve.normalizeId = normalizeId;
  resolve.fullPath = getFullPath;
  resolve.url = resolveUrl;
  resolve.ids = resolveIds;
  resolve.inlineRef = inlineRef;
  resolve.schema = resolveSchema;
  function resolve(compile, root, ref2) {
    var refVal = this._refs[ref2];
    if (typeof refVal == "string") {
      if (this._refs[refVal]) refVal = this._refs[refVal];
      else return resolve.call(this, compile, root, refVal);
    }
    refVal = refVal || this._schemas[ref2];
    if (refVal instanceof SchemaObject) {
      return inlineRef(refVal.schema, this._opts.inlineRefs) ? refVal.schema : refVal.validate || this._compile(refVal);
    }
    var res = resolveSchema.call(this, root, ref2);
    var schema, v, baseId;
    if (res) {
      schema = res.schema;
      root = res.root;
      baseId = res.baseId;
    }
    if (schema instanceof SchemaObject) {
      v = schema.validate || compile.call(this, schema.schema, root, void 0, baseId);
    } else if (schema !== void 0) {
      v = inlineRef(schema, this._opts.inlineRefs) ? schema : compile.call(this, schema, root, void 0, baseId);
    }
    return v;
  }
  function resolveSchema(root, ref2) {
    var p = URI.parse(ref2), refPath = _getFullPath(p), baseId = getFullPath(this._getId(root.schema));
    if (Object.keys(root.schema).length === 0 || refPath !== baseId) {
      var id = normalizeId(refPath);
      var refVal = this._refs[id];
      if (typeof refVal == "string") {
        return resolveRecursive.call(this, root, refVal, p);
      } else if (refVal instanceof SchemaObject) {
        if (!refVal.validate) this._compile(refVal);
        root = refVal;
      } else {
        refVal = this._schemas[id];
        if (refVal instanceof SchemaObject) {
          if (!refVal.validate) this._compile(refVal);
          if (id == normalizeId(ref2))
            return { schema: refVal, root, baseId };
          root = refVal;
        } else {
          return;
        }
      }
      if (!root.schema) return;
      baseId = getFullPath(this._getId(root.schema));
    }
    return getJsonPointer.call(this, p, baseId, root.schema, root);
  }
  function resolveRecursive(root, ref2, parsedRef) {
    var res = resolveSchema.call(this, root, ref2);
    if (res) {
      var schema = res.schema;
      var baseId = res.baseId;
      root = res.root;
      var id = this._getId(schema);
      if (id) baseId = resolveUrl(baseId, id);
      return getJsonPointer.call(this, parsedRef, baseId, schema, root);
    }
  }
  var PREVENT_SCOPE_CHANGE = util2.toHash(["properties", "patternProperties", "enum", "dependencies", "definitions"]);
  function getJsonPointer(parsedRef, baseId, schema, root) {
    parsedRef.fragment = parsedRef.fragment || "";
    if (parsedRef.fragment.slice(0, 1) != "/") return;
    var parts = parsedRef.fragment.split("/");
    for (var i = 1; i < parts.length; i++) {
      var part = parts[i];
      if (part) {
        part = util2.unescapeFragment(part);
        schema = schema[part];
        if (schema === void 0) break;
        var id;
        if (!PREVENT_SCOPE_CHANGE[part]) {
          id = this._getId(schema);
          if (id) baseId = resolveUrl(baseId, id);
          if (schema.$ref) {
            var $ref = resolveUrl(baseId, schema.$ref);
            var res = resolveSchema.call(this, root, $ref);
            if (res) {
              schema = res.schema;
              root = res.root;
              baseId = res.baseId;
            }
          }
        }
      }
    }
    if (schema !== void 0 && schema !== root.schema)
      return { schema, root, baseId };
  }
  var SIMPLE_INLINED = util2.toHash([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum"
  ]);
  function inlineRef(schema, limit) {
    if (limit === false) return false;
    if (limit === void 0 || limit === true) return checkNoRef(schema);
    else if (limit) return countKeys(schema) <= limit;
  }
  function checkNoRef(schema) {
    var item;
    if (Array.isArray(schema)) {
      for (var i = 0; i < schema.length; i++) {
        item = schema[i];
        if (typeof item == "object" && !checkNoRef(item)) return false;
      }
    } else {
      for (var key in schema) {
        if (key == "$ref") return false;
        item = schema[key];
        if (typeof item == "object" && !checkNoRef(item)) return false;
      }
    }
    return true;
  }
  function countKeys(schema) {
    var count = 0, item;
    if (Array.isArray(schema)) {
      for (var i = 0; i < schema.length; i++) {
        item = schema[i];
        if (typeof item == "object") count += countKeys(item);
        if (count == Infinity) return Infinity;
      }
    } else {
      for (var key in schema) {
        if (key == "$ref") return Infinity;
        if (SIMPLE_INLINED[key]) {
          count++;
        } else {
          item = schema[key];
          if (typeof item == "object") count += countKeys(item) + 1;
          if (count == Infinity) return Infinity;
        }
      }
    }
    return count;
  }
  function getFullPath(id, normalize) {
    if (normalize !== false) id = normalizeId(id);
    var p = URI.parse(id);
    return _getFullPath(p);
  }
  function _getFullPath(p) {
    return URI.serialize(p).split("#")[0] + "#";
  }
  var TRAILING_SLASH_HASH = /#\/?$/;
  function normalizeId(id) {
    return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
  }
  function resolveUrl(baseId, id) {
    id = normalizeId(id);
    return URI.resolve(baseId, id);
  }
  function resolveIds(schema) {
    var schemaId = normalizeId(this._getId(schema));
    var baseIds = { "": schemaId };
    var fullPaths = { "": getFullPath(schemaId, false) };
    var localRefs = {};
    var self2 = this;
    traverse(schema, { allKeys: true }, function(sch, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (jsonPtr === "") return;
      var id = self2._getId(sch);
      var baseId = baseIds[parentJsonPtr];
      var fullPath = fullPaths[parentJsonPtr] + "/" + parentKeyword;
      if (keyIndex !== void 0)
        fullPath += "/" + (typeof keyIndex == "number" ? keyIndex : util2.escapeFragment(keyIndex));
      if (typeof id == "string") {
        id = baseId = normalizeId(baseId ? URI.resolve(baseId, id) : id);
        var refVal = self2._refs[id];
        if (typeof refVal == "string") refVal = self2._refs[refVal];
        if (refVal && refVal.schema) {
          if (!equal(sch, refVal.schema))
            throw new Error('id "' + id + '" resolves to more than one schema');
        } else if (id != normalizeId(fullPath)) {
          if (id[0] == "#") {
            if (localRefs[id] && !equal(sch, localRefs[id]))
              throw new Error('id "' + id + '" resolves to more than one schema');
            localRefs[id] = sch;
          } else {
            self2._refs[id] = fullPath;
          }
        }
      }
      baseIds[jsonPtr] = baseId;
      fullPaths[jsonPtr] = fullPath;
    });
    return localRefs;
  }
  return resolve_1;
}
var error_classes;
var hasRequiredError_classes;
function requireError_classes() {
  if (hasRequiredError_classes) return error_classes;
  hasRequiredError_classes = 1;
  var resolve = requireResolve();
  error_classes = {
    Validation: errorSubclass(ValidationError),
    MissingRef: errorSubclass(MissingRefError)
  };
  function ValidationError(errors) {
    this.message = "validation failed";
    this.errors = errors;
    this.ajv = this.validation = true;
  }
  MissingRefError.message = function(baseId, ref2) {
    return "can't resolve reference " + ref2 + " from id " + baseId;
  };
  function MissingRefError(baseId, ref2, message) {
    this.message = message || MissingRefError.message(baseId, ref2);
    this.missingRef = resolve.url(baseId, ref2);
    this.missingSchema = resolve.normalizeId(resolve.fullPath(this.missingRef));
  }
  function errorSubclass(Subclass) {
    Subclass.prototype = Object.create(Error.prototype);
    Subclass.prototype.constructor = Subclass;
    return Subclass;
  }
  return error_classes;
}
var fastJsonStableStringify;
var hasRequiredFastJsonStableStringify;
function requireFastJsonStableStringify() {
  if (hasRequiredFastJsonStableStringify) return fastJsonStableStringify;
  hasRequiredFastJsonStableStringify = 1;
  fastJsonStableStringify = function(data2, opts) {
    if (!opts) opts = {};
    if (typeof opts === "function") opts = { cmp: opts };
    var cycles = typeof opts.cycles === "boolean" ? opts.cycles : false;
    var cmp = opts.cmp && /* @__PURE__ */ (function(f) {
      return function(node) {
        return function(a, b) {
          var aobj = { key: a, value: node[a] };
          var bobj = { key: b, value: node[b] };
          return f(aobj, bobj);
        };
      };
    })(opts.cmp);
    var seen = [];
    return (function stringify(node) {
      if (node && node.toJSON && typeof node.toJSON === "function") {
        node = node.toJSON();
      }
      if (node === void 0) return;
      if (typeof node == "number") return isFinite(node) ? "" + node : "null";
      if (typeof node !== "object") return JSON.stringify(node);
      var i, out;
      if (Array.isArray(node)) {
        out = "[";
        for (i = 0; i < node.length; i++) {
          if (i) out += ",";
          out += stringify(node[i]) || "null";
        }
        return out + "]";
      }
      if (node === null) return "null";
      if (seen.indexOf(node) !== -1) {
        if (cycles) return JSON.stringify("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      }
      var seenIndex = seen.push(node) - 1;
      var keys = Object.keys(node).sort(cmp && cmp(node));
      out = "";
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = stringify(node[key]);
        if (!value) continue;
        if (out) out += ",";
        out += JSON.stringify(key) + ":" + value;
      }
      seen.splice(seenIndex, 1);
      return "{" + out + "}";
    })(data2);
  };
  return fastJsonStableStringify;
}
var validate;
var hasRequiredValidate;
function requireValidate() {
  if (hasRequiredValidate) return validate;
  hasRequiredValidate = 1;
  validate = function generate_validate(it, $keyword, $ruleType) {
    var out = "";
    var $async = it.schema.$async === true, $refKeywords = it.util.schemaHasRulesExcept(it.schema, it.RULES.all, "$ref"), $id2 = it.self._getId(it.schema);
    if (it.opts.strictKeywords) {
      var $unknownKwd = it.util.schemaUnknownRules(it.schema, it.RULES.keywords);
      if ($unknownKwd) {
        var $keywordsMsg = "unknown keyword: " + $unknownKwd;
        if (it.opts.strictKeywords === "log") it.logger.warn($keywordsMsg);
        else throw new Error($keywordsMsg);
      }
    }
    if (it.isTop) {
      out += " var validate = ";
      if ($async) {
        it.async = true;
        out += "async ";
      }
      out += "function(data, dataPath, parentData, parentDataProperty, rootData) { 'use strict'; ";
      if ($id2 && (it.opts.sourceCode || it.opts.processCode)) {
        out += " " + ("/*# sourceURL=" + $id2 + " */") + " ";
      }
    }
    if (typeof it.schema == "boolean" || !($refKeywords || it.schema.$ref)) {
      var $keyword = "false schema";
      var $lvl = it.level;
      var $dataLvl = it.dataLevel;
      var $schema2 = it.schema[$keyword];
      var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
      var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
      var $breakOnError = !it.opts.allErrors;
      var $errorKeyword;
      var $data = "data" + ($dataLvl || "");
      var $valid = "valid" + $lvl;
      if (it.schema === false) {
        if (it.isTop) {
          $breakOnError = true;
        } else {
          out += " var " + $valid + " = false; ";
        }
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = "";
        if (it.createErrors !== false) {
          out += " { keyword: '" + ($errorKeyword || "false schema") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: {} ";
          if (it.opts.messages !== false) {
            out += " , message: 'boolean schema is false' ";
          }
          if (it.opts.verbose) {
            out += " , schema: false , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
          }
          out += " } ";
        } else {
          out += " {} ";
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          if (it.async) {
            out += " throw new ValidationError([" + __err + "]); ";
          } else {
            out += " validate.errors = [" + __err + "]; return false; ";
          }
        } else {
          out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        }
      } else {
        if (it.isTop) {
          if ($async) {
            out += " return data; ";
          } else {
            out += " validate.errors = null; return true; ";
          }
        } else {
          out += " var " + $valid + " = true; ";
        }
      }
      if (it.isTop) {
        out += " }; return validate; ";
      }
      return out;
    }
    if (it.isTop) {
      var $top = it.isTop, $lvl = it.level = 0, $dataLvl = it.dataLevel = 0, $data = "data";
      it.rootId = it.resolve.fullPath(it.self._getId(it.root.schema));
      it.baseId = it.baseId || it.rootId;
      delete it.isTop;
      it.dataPathArr = [""];
      if (it.schema.default !== void 0 && it.opts.useDefaults && it.opts.strictDefaults) {
        var $defaultMsg = "default is ignored in the schema root";
        if (it.opts.strictDefaults === "log") it.logger.warn($defaultMsg);
        else throw new Error($defaultMsg);
      }
      out += " var vErrors = null; ";
      out += " var errors = 0;     ";
      out += " if (rootData === undefined) rootData = data; ";
    } else {
      var $lvl = it.level, $dataLvl = it.dataLevel, $data = "data" + ($dataLvl || "");
      if ($id2) it.baseId = it.resolve.url(it.baseId, $id2);
      if ($async && !it.async) throw new Error("async schema in sync schema");
      out += " var errs_" + $lvl + " = errors;";
    }
    var $valid = "valid" + $lvl, $breakOnError = !it.opts.allErrors, $closingBraces1 = "", $closingBraces2 = "";
    var $errorKeyword;
    var $typeSchema = it.schema.type, $typeIsArray = Array.isArray($typeSchema);
    if ($typeSchema && it.opts.nullable && it.schema.nullable === true) {
      if ($typeIsArray) {
        if ($typeSchema.indexOf("null") == -1) $typeSchema = $typeSchema.concat("null");
      } else if ($typeSchema != "null") {
        $typeSchema = [$typeSchema, "null"];
        $typeIsArray = true;
      }
    }
    if ($typeIsArray && $typeSchema.length == 1) {
      $typeSchema = $typeSchema[0];
      $typeIsArray = false;
    }
    if (it.schema.$ref && $refKeywords) {
      if (it.opts.extendRefs == "fail") {
        throw new Error('$ref: validation keywords used in schema at path "' + it.errSchemaPath + '" (see option extendRefs)');
      } else if (it.opts.extendRefs !== true) {
        $refKeywords = false;
        it.logger.warn('$ref: keywords ignored in schema at path "' + it.errSchemaPath + '"');
      }
    }
    if (it.schema.$comment && it.opts.$comment) {
      out += " " + it.RULES.all.$comment.code(it, "$comment");
    }
    if ($typeSchema) {
      if (it.opts.coerceTypes) {
        var $coerceToTypes = it.util.coerceToTypes(it.opts.coerceTypes, $typeSchema);
      }
      var $rulesGroup = it.RULES.types[$typeSchema];
      if ($coerceToTypes || $typeIsArray || $rulesGroup === true || $rulesGroup && !$shouldUseGroup($rulesGroup)) {
        var $schemaPath = it.schemaPath + ".type", $errSchemaPath = it.errSchemaPath + "/type";
        var $schemaPath = it.schemaPath + ".type", $errSchemaPath = it.errSchemaPath + "/type", $method = $typeIsArray ? "checkDataTypes" : "checkDataType";
        out += " if (" + it.util[$method]($typeSchema, $data, it.opts.strictNumbers, true) + ") { ";
        if ($coerceToTypes) {
          var $dataType = "dataType" + $lvl, $coerced = "coerced" + $lvl;
          out += " var " + $dataType + " = typeof " + $data + "; var " + $coerced + " = undefined; ";
          if (it.opts.coerceTypes == "array") {
            out += " if (" + $dataType + " == 'object' && Array.isArray(" + $data + ") && " + $data + ".length == 1) { " + $data + " = " + $data + "[0]; " + $dataType + " = typeof " + $data + "; if (" + it.util.checkDataType(it.schema.type, $data, it.opts.strictNumbers) + ") " + $coerced + " = " + $data + "; } ";
          }
          out += " if (" + $coerced + " !== undefined) ; ";
          var arr1 = $coerceToTypes;
          if (arr1) {
            var $type, $i = -1, l1 = arr1.length - 1;
            while ($i < l1) {
              $type = arr1[$i += 1];
              if ($type == "string") {
                out += " else if (" + $dataType + " == 'number' || " + $dataType + " == 'boolean') " + $coerced + " = '' + " + $data + "; else if (" + $data + " === null) " + $coerced + " = ''; ";
              } else if ($type == "number" || $type == "integer") {
                out += " else if (" + $dataType + " == 'boolean' || " + $data + " === null || (" + $dataType + " == 'string' && " + $data + " && " + $data + " == +" + $data + " ";
                if ($type == "integer") {
                  out += " && !(" + $data + " % 1)";
                }
                out += ")) " + $coerced + " = +" + $data + "; ";
              } else if ($type == "boolean") {
                out += " else if (" + $data + " === 'false' || " + $data + " === 0 || " + $data + " === null) " + $coerced + " = false; else if (" + $data + " === 'true' || " + $data + " === 1) " + $coerced + " = true; ";
              } else if ($type == "null") {
                out += " else if (" + $data + " === '' || " + $data + " === 0 || " + $data + " === false) " + $coerced + " = null; ";
              } else if (it.opts.coerceTypes == "array" && $type == "array") {
                out += " else if (" + $dataType + " == 'string' || " + $dataType + " == 'number' || " + $dataType + " == 'boolean' || " + $data + " == null) " + $coerced + " = [" + $data + "]; ";
              }
            }
          }
          out += " else {   ";
          var $$outStack = $$outStack || [];
          $$outStack.push(out);
          out = "";
          if (it.createErrors !== false) {
            out += " { keyword: '" + ($errorKeyword || "type") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { type: '";
            if ($typeIsArray) {
              out += "" + $typeSchema.join(",");
            } else {
              out += "" + $typeSchema;
            }
            out += "' } ";
            if (it.opts.messages !== false) {
              out += " , message: 'should be ";
              if ($typeIsArray) {
                out += "" + $typeSchema.join(",");
              } else {
                out += "" + $typeSchema;
              }
              out += "' ";
            }
            if (it.opts.verbose) {
              out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
            }
            out += " } ";
          } else {
            out += " {} ";
          }
          var __err = out;
          out = $$outStack.pop();
          if (!it.compositeRule && $breakOnError) {
            if (it.async) {
              out += " throw new ValidationError([" + __err + "]); ";
            } else {
              out += " validate.errors = [" + __err + "]; return false; ";
            }
          } else {
            out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
          }
          out += " } if (" + $coerced + " !== undefined) {  ";
          var $parentData = $dataLvl ? "data" + ($dataLvl - 1 || "") : "parentData", $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : "parentDataProperty";
          out += " " + $data + " = " + $coerced + "; ";
          if (!$dataLvl) {
            out += "if (" + $parentData + " !== undefined)";
          }
          out += " " + $parentData + "[" + $parentDataProperty + "] = " + $coerced + "; } ";
        } else {
          var $$outStack = $$outStack || [];
          $$outStack.push(out);
          out = "";
          if (it.createErrors !== false) {
            out += " { keyword: '" + ($errorKeyword || "type") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { type: '";
            if ($typeIsArray) {
              out += "" + $typeSchema.join(",");
            } else {
              out += "" + $typeSchema;
            }
            out += "' } ";
            if (it.opts.messages !== false) {
              out += " , message: 'should be ";
              if ($typeIsArray) {
                out += "" + $typeSchema.join(",");
              } else {
                out += "" + $typeSchema;
              }
              out += "' ";
            }
            if (it.opts.verbose) {
              out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
            }
            out += " } ";
          } else {
            out += " {} ";
          }
          var __err = out;
          out = $$outStack.pop();
          if (!it.compositeRule && $breakOnError) {
            if (it.async) {
              out += " throw new ValidationError([" + __err + "]); ";
            } else {
              out += " validate.errors = [" + __err + "]; return false; ";
            }
          } else {
            out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
          }
        }
        out += " } ";
      }
    }
    if (it.schema.$ref && !$refKeywords) {
      out += " " + it.RULES.all.$ref.code(it, "$ref") + " ";
      if ($breakOnError) {
        out += " } if (errors === ";
        if ($top) {
          out += "0";
        } else {
          out += "errs_" + $lvl;
        }
        out += ") { ";
        $closingBraces2 += "}";
      }
    } else {
      var arr2 = it.RULES;
      if (arr2) {
        var $rulesGroup, i2 = -1, l2 = arr2.length - 1;
        while (i2 < l2) {
          $rulesGroup = arr2[i2 += 1];
          if ($shouldUseGroup($rulesGroup)) {
            if ($rulesGroup.type) {
              out += " if (" + it.util.checkDataType($rulesGroup.type, $data, it.opts.strictNumbers) + ") { ";
            }
            if (it.opts.useDefaults) {
              if ($rulesGroup.type == "object" && it.schema.properties) {
                var $schema2 = it.schema.properties, $schemaKeys = Object.keys($schema2);
                var arr3 = $schemaKeys;
                if (arr3) {
                  var $propertyKey, i3 = -1, l3 = arr3.length - 1;
                  while (i3 < l3) {
                    $propertyKey = arr3[i3 += 1];
                    var $sch = $schema2[$propertyKey];
                    if ($sch.default !== void 0) {
                      var $passData = $data + it.util.getProperty($propertyKey);
                      if (it.compositeRule) {
                        if (it.opts.strictDefaults) {
                          var $defaultMsg = "default is ignored for: " + $passData;
                          if (it.opts.strictDefaults === "log") it.logger.warn($defaultMsg);
                          else throw new Error($defaultMsg);
                        }
                      } else {
                        out += " if (" + $passData + " === undefined ";
                        if (it.opts.useDefaults == "empty") {
                          out += " || " + $passData + " === null || " + $passData + " === '' ";
                        }
                        out += " ) " + $passData + " = ";
                        if (it.opts.useDefaults == "shared") {
                          out += " " + it.useDefault($sch.default) + " ";
                        } else {
                          out += " " + JSON.stringify($sch.default) + " ";
                        }
                        out += "; ";
                      }
                    }
                  }
                }
              } else if ($rulesGroup.type == "array" && Array.isArray(it.schema.items)) {
                var arr4 = it.schema.items;
                if (arr4) {
                  var $sch, $i = -1, l4 = arr4.length - 1;
                  while ($i < l4) {
                    $sch = arr4[$i += 1];
                    if ($sch.default !== void 0) {
                      var $passData = $data + "[" + $i + "]";
                      if (it.compositeRule) {
                        if (it.opts.strictDefaults) {
                          var $defaultMsg = "default is ignored for: " + $passData;
                          if (it.opts.strictDefaults === "log") it.logger.warn($defaultMsg);
                          else throw new Error($defaultMsg);
                        }
                      } else {
                        out += " if (" + $passData + " === undefined ";
                        if (it.opts.useDefaults == "empty") {
                          out += " || " + $passData + " === null || " + $passData + " === '' ";
                        }
                        out += " ) " + $passData + " = ";
                        if (it.opts.useDefaults == "shared") {
                          out += " " + it.useDefault($sch.default) + " ";
                        } else {
                          out += " " + JSON.stringify($sch.default) + " ";
                        }
                        out += "; ";
                      }
                    }
                  }
                }
              }
            }
            var arr5 = $rulesGroup.rules;
            if (arr5) {
              var $rule, i5 = -1, l5 = arr5.length - 1;
              while (i5 < l5) {
                $rule = arr5[i5 += 1];
                if ($shouldUseRule($rule)) {
                  var $code = $rule.code(it, $rule.keyword, $rulesGroup.type);
                  if ($code) {
                    out += " " + $code + " ";
                    if ($breakOnError) {
                      $closingBraces1 += "}";
                    }
                  }
                }
              }
            }
            if ($breakOnError) {
              out += " " + $closingBraces1 + " ";
              $closingBraces1 = "";
            }
            if ($rulesGroup.type) {
              out += " } ";
              if ($typeSchema && $typeSchema === $rulesGroup.type && !$coerceToTypes) {
                out += " else { ";
                var $schemaPath = it.schemaPath + ".type", $errSchemaPath = it.errSchemaPath + "/type";
                var $$outStack = $$outStack || [];
                $$outStack.push(out);
                out = "";
                if (it.createErrors !== false) {
                  out += " { keyword: '" + ($errorKeyword || "type") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { type: '";
                  if ($typeIsArray) {
                    out += "" + $typeSchema.join(",");
                  } else {
                    out += "" + $typeSchema;
                  }
                  out += "' } ";
                  if (it.opts.messages !== false) {
                    out += " , message: 'should be ";
                    if ($typeIsArray) {
                      out += "" + $typeSchema.join(",");
                    } else {
                      out += "" + $typeSchema;
                    }
                    out += "' ";
                  }
                  if (it.opts.verbose) {
                    out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
                  }
                  out += " } ";
                } else {
                  out += " {} ";
                }
                var __err = out;
                out = $$outStack.pop();
                if (!it.compositeRule && $breakOnError) {
                  if (it.async) {
                    out += " throw new ValidationError([" + __err + "]); ";
                  } else {
                    out += " validate.errors = [" + __err + "]; return false; ";
                  }
                } else {
                  out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                }
                out += " } ";
              }
            }
            if ($breakOnError) {
              out += " if (errors === ";
              if ($top) {
                out += "0";
              } else {
                out += "errs_" + $lvl;
              }
              out += ") { ";
              $closingBraces2 += "}";
            }
          }
        }
      }
    }
    if ($breakOnError) {
      out += " " + $closingBraces2 + " ";
    }
    if ($top) {
      if ($async) {
        out += " if (errors === 0) return data;           ";
        out += " else throw new ValidationError(vErrors); ";
      } else {
        out += " validate.errors = vErrors; ";
        out += " return errors === 0;       ";
      }
      out += " }; return validate;";
    } else {
      out += " var " + $valid + " = errors === errs_" + $lvl + ";";
    }
    function $shouldUseGroup($rulesGroup2) {
      var rules2 = $rulesGroup2.rules;
      for (var i = 0; i < rules2.length; i++)
        if ($shouldUseRule(rules2[i])) return true;
    }
    function $shouldUseRule($rule2) {
      return it.schema[$rule2.keyword] !== void 0 || $rule2.implements && $ruleImplementsSomeKeyword($rule2);
    }
    function $ruleImplementsSomeKeyword($rule2) {
      var impl = $rule2.implements;
      for (var i = 0; i < impl.length; i++)
        if (it.schema[impl[i]] !== void 0) return true;
    }
    return out;
  };
  return validate;
}
var compile_1;
var hasRequiredCompile;
function requireCompile() {
  if (hasRequiredCompile) return compile_1;
  hasRequiredCompile = 1;
  var resolve = requireResolve(), util2 = requireUtil(), errorClasses = requireError_classes(), stableStringify = requireFastJsonStableStringify();
  var validateGenerator = requireValidate();
  var ucs2length2 = util2.ucs2length;
  var equal = requireFastDeepEqual();
  var ValidationError = errorClasses.Validation;
  compile_1 = compile;
  function compile(schema, root, localRefs, baseId) {
    var self2 = this, opts = this._opts, refVal = [void 0], refs = {}, patterns = [], patternsHash = {}, defaults = [], defaultsHash = {}, customRules = [];
    root = root || { schema, refVal, refs };
    var c = checkCompiling.call(this, schema, root, baseId);
    var compilation = this._compilations[c.index];
    if (c.compiling) return compilation.callValidate = callValidate;
    var formats = this._formats;
    var RULES = this.RULES;
    try {
      var v = localCompile(schema, root, localRefs, baseId);
      compilation.validate = v;
      var cv = compilation.callValidate;
      if (cv) {
        cv.schema = v.schema;
        cv.errors = null;
        cv.refs = v.refs;
        cv.refVal = v.refVal;
        cv.root = v.root;
        cv.$async = v.$async;
        if (opts.sourceCode) cv.source = v.source;
      }
      return v;
    } finally {
      endCompiling.call(this, schema, root, baseId);
    }
    function callValidate() {
      var validate2 = compilation.validate;
      var result = validate2.apply(this, arguments);
      callValidate.errors = validate2.errors;
      return result;
    }
    function localCompile(_schema, _root, localRefs2, baseId2) {
      var isRoot = !_root || _root && _root.schema == _schema;
      if (_root.schema != root.schema)
        return compile.call(self2, _schema, _root, localRefs2, baseId2);
      var $async = _schema.$async === true;
      var sourceCode = validateGenerator({
        isTop: true,
        schema: _schema,
        isRoot,
        baseId: baseId2,
        root: _root,
        schemaPath: "",
        errSchemaPath: "#",
        errorPath: '""',
        MissingRefError: errorClasses.MissingRef,
        RULES,
        validate: validateGenerator,
        util: util2,
        resolve,
        resolveRef,
        usePattern,
        useDefault,
        useCustomRule,
        opts,
        formats,
        logger: self2.logger,
        self: self2
      });
      sourceCode = vars(refVal, refValCode) + vars(patterns, patternCode) + vars(defaults, defaultCode) + vars(customRules, customRuleCode) + sourceCode;
      if (opts.processCode) sourceCode = opts.processCode(sourceCode, _schema);
      var validate2;
      try {
        var makeValidate = new Function(
          "self",
          "RULES",
          "formats",
          "root",
          "refVal",
          "defaults",
          "customRules",
          "equal",
          "ucs2length",
          "ValidationError",
          sourceCode
        );
        validate2 = makeValidate(
          self2,
          RULES,
          formats,
          root,
          refVal,
          defaults,
          customRules,
          equal,
          ucs2length2,
          ValidationError
        );
        refVal[0] = validate2;
      } catch (e) {
        self2.logger.error("Error compiling schema, function code:", sourceCode);
        throw e;
      }
      validate2.schema = _schema;
      validate2.errors = null;
      validate2.refs = refs;
      validate2.refVal = refVal;
      validate2.root = isRoot ? validate2 : _root;
      if ($async) validate2.$async = true;
      if (opts.sourceCode === true) {
        validate2.source = {
          code: sourceCode,
          patterns,
          defaults
        };
      }
      return validate2;
    }
    function resolveRef(baseId2, ref2, isRoot) {
      ref2 = resolve.url(baseId2, ref2);
      var refIndex = refs[ref2];
      var _refVal, refCode;
      if (refIndex !== void 0) {
        _refVal = refVal[refIndex];
        refCode = "refVal[" + refIndex + "]";
        return resolvedRef(_refVal, refCode);
      }
      if (!isRoot && root.refs) {
        var rootRefId = root.refs[ref2];
        if (rootRefId !== void 0) {
          _refVal = root.refVal[rootRefId];
          refCode = addLocalRef(ref2, _refVal);
          return resolvedRef(_refVal, refCode);
        }
      }
      refCode = addLocalRef(ref2);
      var v2 = resolve.call(self2, localCompile, root, ref2);
      if (v2 === void 0) {
        var localSchema = localRefs && localRefs[ref2];
        if (localSchema) {
          v2 = resolve.inlineRef(localSchema, opts.inlineRefs) ? localSchema : compile.call(self2, localSchema, root, localRefs, baseId2);
        }
      }
      if (v2 === void 0) {
        removeLocalRef(ref2);
      } else {
        replaceLocalRef(ref2, v2);
        return resolvedRef(v2, refCode);
      }
    }
    function addLocalRef(ref2, v2) {
      var refId = refVal.length;
      refVal[refId] = v2;
      refs[ref2] = refId;
      return "refVal" + refId;
    }
    function removeLocalRef(ref2) {
      delete refs[ref2];
    }
    function replaceLocalRef(ref2, v2) {
      var refId = refs[ref2];
      refVal[refId] = v2;
    }
    function resolvedRef(refVal2, code) {
      return typeof refVal2 == "object" || typeof refVal2 == "boolean" ? { code, schema: refVal2, inline: true } : { code, $async: refVal2 && !!refVal2.$async };
    }
    function usePattern(regexStr) {
      var index = patternsHash[regexStr];
      if (index === void 0) {
        index = patternsHash[regexStr] = patterns.length;
        patterns[index] = regexStr;
      }
      return "pattern" + index;
    }
    function useDefault(value) {
      switch (typeof value) {
        case "boolean":
        case "number":
          return "" + value;
        case "string":
          return util2.toQuotedString(value);
        case "object":
          if (value === null) return "null";
          var valueStr = stableStringify(value);
          var index = defaultsHash[valueStr];
          if (index === void 0) {
            index = defaultsHash[valueStr] = defaults.length;
            defaults[index] = value;
          }
          return "default" + index;
      }
    }
    function useCustomRule(rule, schema2, parentSchema, it) {
      if (self2._opts.validateSchema !== false) {
        var deps = rule.definition.dependencies;
        if (deps && !deps.every(function(keyword2) {
          return Object.prototype.hasOwnProperty.call(parentSchema, keyword2);
        }))
          throw new Error("parent schema must have all required keywords: " + deps.join(","));
        var validateSchema = rule.definition.validateSchema;
        if (validateSchema) {
          var valid = validateSchema(schema2);
          if (!valid) {
            var message = "keyword schema is invalid: " + self2.errorsText(validateSchema.errors);
            if (self2._opts.validateSchema == "log") self2.logger.error(message);
            else throw new Error(message);
          }
        }
      }
      var compile2 = rule.definition.compile, inline = rule.definition.inline, macro = rule.definition.macro;
      var validate2;
      if (compile2) {
        validate2 = compile2.call(self2, schema2, parentSchema, it);
      } else if (macro) {
        validate2 = macro.call(self2, schema2, parentSchema, it);
        if (opts.validateSchema !== false) self2.validateSchema(validate2, true);
      } else if (inline) {
        validate2 = inline.call(self2, it, rule.keyword, schema2, parentSchema);
      } else {
        validate2 = rule.definition.validate;
        if (!validate2) return;
      }
      if (validate2 === void 0)
        throw new Error('custom keyword "' + rule.keyword + '"failed to compile');
      var index = customRules.length;
      customRules[index] = validate2;
      return {
        code: "customRule" + index,
        validate: validate2
      };
    }
  }
  function checkCompiling(schema, root, baseId) {
    var index = compIndex.call(this, schema, root, baseId);
    if (index >= 0) return { index, compiling: true };
    index = this._compilations.length;
    this._compilations[index] = {
      schema,
      root,
      baseId
    };
    return { index, compiling: false };
  }
  function endCompiling(schema, root, baseId) {
    var i = compIndex.call(this, schema, root, baseId);
    if (i >= 0) this._compilations.splice(i, 1);
  }
  function compIndex(schema, root, baseId) {
    for (var i = 0; i < this._compilations.length; i++) {
      var c = this._compilations[i];
      if (c.schema == schema && c.root == root && c.baseId == baseId) return i;
    }
    return -1;
  }
  function patternCode(i, patterns) {
    return "var pattern" + i + " = new RegExp(" + util2.toQuotedString(patterns[i]) + ");";
  }
  function defaultCode(i) {
    return "var default" + i + " = defaults[" + i + "];";
  }
  function refValCode(i, refVal) {
    return refVal[i] === void 0 ? "" : "var refVal" + i + " = refVal[" + i + "];";
  }
  function customRuleCode(i) {
    return "var customRule" + i + " = customRules[" + i + "];";
  }
  function vars(arr, statement) {
    if (!arr.length) return "";
    var code = "";
    for (var i = 0; i < arr.length; i++)
      code += statement(i, arr);
    return code;
  }
  return compile_1;
}
var cache = { exports: {} };
var hasRequiredCache;
function requireCache() {
  if (hasRequiredCache) return cache.exports;
  hasRequiredCache = 1;
  var Cache = cache.exports = function Cache2() {
    this._cache = {};
  };
  Cache.prototype.put = function Cache_put(key, value) {
    this._cache[key] = value;
  };
  Cache.prototype.get = function Cache_get(key) {
    return this._cache[key];
  };
  Cache.prototype.del = function Cache_del(key) {
    delete this._cache[key];
  };
  Cache.prototype.clear = function Cache_clear() {
    this._cache = {};
  };
  return cache.exports;
}
var formats_1;
var hasRequiredFormats;
function requireFormats() {
  if (hasRequiredFormats) return formats_1;
  hasRequiredFormats = 1;
  var util2 = requireUtil();
  var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
  var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  var HOSTNAME = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i;
  var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  var URIREF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  var URITEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
  var URL2 = /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-)*(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-)*(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i;
  var UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
  var JSON_POINTER = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
  var JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
  var RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;
  formats_1 = formats;
  function formats(mode) {
    mode = mode == "full" ? "full" : "fast";
    return util2.copy(formats[mode]);
  }
  formats.fast = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,
    "date-time": /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i,
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    "uri-template": URITEMPLATE,
    url: URL2,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'willful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    hostname: HOSTNAME,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    // optimized http://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses
    ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
    regex,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: UUID,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": JSON_POINTER,
    "json-pointer-uri-fragment": JSON_POINTER_URI_FRAGMENT,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": RELATIVE_JSON_POINTER
  };
  formats.full = {
    date,
    time,
    "date-time": date_time,
    uri,
    "uri-reference": URIREF,
    "uri-template": URITEMPLATE,
    url: URL2,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: HOSTNAME,
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
    regex,
    uuid: UUID,
    "json-pointer": JSON_POINTER,
    "json-pointer-uri-fragment": JSON_POINTER_URI_FRAGMENT,
    "relative-json-pointer": RELATIVE_JSON_POINTER
  };
  function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  function date(str) {
    var matches = str.match(DATE);
    if (!matches) return false;
    var year = +matches[1];
    var month = +matches[2];
    var day = +matches[3];
    return month >= 1 && month <= 12 && day >= 1 && day <= (month == 2 && isLeapYear(year) ? 29 : DAYS[month]);
  }
  function time(str, full) {
    var matches = str.match(TIME);
    if (!matches) return false;
    var hour = matches[1];
    var minute = matches[2];
    var second = matches[3];
    var timeZone = matches[5];
    return (hour <= 23 && minute <= 59 && second <= 59 || hour == 23 && minute == 59 && second == 60) && (!full || timeZone);
  }
  var DATE_TIME_SEPARATOR = /t|\s/i;
  function date_time(str) {
    var dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length == 2 && date(dateTime[0]) && time(dateTime[1], true);
  }
  var NOT_URI_FRAGMENT = /\/|:/;
  function uri(str) {
    return NOT_URI_FRAGMENT.test(str) && URI.test(str);
  }
  var Z_ANCHOR = /[^\\]\\Z/;
  function regex(str) {
    if (Z_ANCHOR.test(str)) return false;
    try {
      new RegExp(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  return formats_1;
}
var ref;
var hasRequiredRef;
function requireRef() {
  if (hasRequiredRef) return ref;
  hasRequiredRef = 1;
  ref = function generate_ref(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $valid = "valid" + $lvl;
    var $async, $refCode;
    if ($schema2 == "#" || $schema2 == "#/") {
      if (it.isRoot) {
        $async = it.async;
        $refCode = "validate";
      } else {
        $async = it.root.schema.$async === true;
        $refCode = "root.refVal[0]";
      }
    } else {
      var $refVal = it.resolveRef(it.baseId, $schema2, it.isRoot);
      if ($refVal === void 0) {
        var $message = it.MissingRefError.message(it.baseId, $schema2);
        if (it.opts.missingRefs == "fail") {
          it.logger.error($message);
          var $$outStack = $$outStack || [];
          $$outStack.push(out);
          out = "";
          if (it.createErrors !== false) {
            out += " { keyword: '$ref' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { ref: '" + it.util.escapeQuotes($schema2) + "' } ";
            if (it.opts.messages !== false) {
              out += " , message: 'can\\'t resolve reference " + it.util.escapeQuotes($schema2) + "' ";
            }
            if (it.opts.verbose) {
              out += " , schema: " + it.util.toQuotedString($schema2) + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
            }
            out += " } ";
          } else {
            out += " {} ";
          }
          var __err = out;
          out = $$outStack.pop();
          if (!it.compositeRule && $breakOnError) {
            if (it.async) {
              out += " throw new ValidationError([" + __err + "]); ";
            } else {
              out += " validate.errors = [" + __err + "]; return false; ";
            }
          } else {
            out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
          }
          if ($breakOnError) {
            out += " if (false) { ";
          }
        } else if (it.opts.missingRefs == "ignore") {
          it.logger.warn($message);
          if ($breakOnError) {
            out += " if (true) { ";
          }
        } else {
          throw new it.MissingRefError(it.baseId, $schema2, $message);
        }
      } else if ($refVal.inline) {
        var $it = it.util.copy(it);
        $it.level++;
        var $nextValid = "valid" + $it.level;
        $it.schema = $refVal.schema;
        $it.schemaPath = "";
        $it.errSchemaPath = $schema2;
        var $code = it.validate($it).replace(/validate\.schema/g, $refVal.code);
        out += " " + $code + " ";
        if ($breakOnError) {
          out += " if (" + $nextValid + ") { ";
        }
      } else {
        $async = $refVal.$async === true || it.async && $refVal.$async !== false;
        $refCode = $refVal.code;
      }
    }
    if ($refCode) {
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.opts.passContext) {
        out += " " + $refCode + ".call(this, ";
      } else {
        out += " " + $refCode + "( ";
      }
      out += " " + $data + ", (dataPath || '')";
      if (it.errorPath != '""') {
        out += " + " + it.errorPath;
      }
      var $parentData = $dataLvl ? "data" + ($dataLvl - 1 || "") : "parentData", $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : "parentDataProperty";
      out += " , " + $parentData + " , " + $parentDataProperty + ", rootData)  ";
      var __callValidate = out;
      out = $$outStack.pop();
      if ($async) {
        if (!it.async) throw new Error("async schema referenced by sync schema");
        if ($breakOnError) {
          out += " var " + $valid + "; ";
        }
        out += " try { await " + __callValidate + "; ";
        if ($breakOnError) {
          out += " " + $valid + " = true; ";
        }
        out += " } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; ";
        if ($breakOnError) {
          out += " " + $valid + " = false; ";
        }
        out += " } ";
        if ($breakOnError) {
          out += " if (" + $valid + ") { ";
        }
      } else {
        out += " if (!" + __callValidate + ") { if (vErrors === null) vErrors = " + $refCode + ".errors; else vErrors = vErrors.concat(" + $refCode + ".errors); errors = vErrors.length; } ";
        if ($breakOnError) {
          out += " else { ";
        }
      }
    }
    return out;
  };
  return ref;
}
var allOf;
var hasRequiredAllOf;
function requireAllOf() {
  if (hasRequiredAllOf) return allOf;
  hasRequiredAllOf = 1;
  allOf = function generate_allOf(it, $keyword, $ruleType) {
    var out = " ";
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $it = it.util.copy(it);
    var $closingBraces = "";
    $it.level++;
    var $nextValid = "valid" + $it.level;
    var $currentBaseId = $it.baseId, $allSchemasEmpty = true;
    var arr1 = $schema2;
    if (arr1) {
      var $sch, $i = -1, l1 = arr1.length - 1;
      while ($i < l1) {
        $sch = arr1[$i += 1];
        if (it.opts.strictKeywords ? typeof $sch == "object" && Object.keys($sch).length > 0 || $sch === false : it.util.schemaHasRules($sch, it.RULES.all)) {
          $allSchemasEmpty = false;
          $it.schema = $sch;
          $it.schemaPath = $schemaPath + "[" + $i + "]";
          $it.errSchemaPath = $errSchemaPath + "/" + $i;
          out += "  " + it.validate($it) + " ";
          $it.baseId = $currentBaseId;
          if ($breakOnError) {
            out += " if (" + $nextValid + ") { ";
            $closingBraces += "}";
          }
        }
      }
    }
    if ($breakOnError) {
      if ($allSchemasEmpty) {
        out += " if (true) { ";
      } else {
        out += " " + $closingBraces.slice(0, -1) + " ";
      }
    }
    return out;
  };
  return allOf;
}
var anyOf;
var hasRequiredAnyOf;
function requireAnyOf() {
  if (hasRequiredAnyOf) return anyOf;
  hasRequiredAnyOf = 1;
  anyOf = function generate_anyOf(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $valid = "valid" + $lvl;
    var $errs = "errs__" + $lvl;
    var $it = it.util.copy(it);
    var $closingBraces = "";
    $it.level++;
    var $nextValid = "valid" + $it.level;
    var $noEmptySchema = $schema2.every(function($sch2) {
      return it.opts.strictKeywords ? typeof $sch2 == "object" && Object.keys($sch2).length > 0 || $sch2 === false : it.util.schemaHasRules($sch2, it.RULES.all);
    });
    if ($noEmptySchema) {
      var $currentBaseId = $it.baseId;
      out += " var " + $errs + " = errors; var " + $valid + " = false;  ";
      var $wasComposite = it.compositeRule;
      it.compositeRule = $it.compositeRule = true;
      var arr1 = $schema2;
      if (arr1) {
        var $sch, $i = -1, l1 = arr1.length - 1;
        while ($i < l1) {
          $sch = arr1[$i += 1];
          $it.schema = $sch;
          $it.schemaPath = $schemaPath + "[" + $i + "]";
          $it.errSchemaPath = $errSchemaPath + "/" + $i;
          out += "  " + it.validate($it) + " ";
          $it.baseId = $currentBaseId;
          out += " " + $valid + " = " + $valid + " || " + $nextValid + "; if (!" + $valid + ") { ";
          $closingBraces += "}";
        }
      }
      it.compositeRule = $it.compositeRule = $wasComposite;
      out += " " + $closingBraces + " if (!" + $valid + ") {   var err =   ";
      if (it.createErrors !== false) {
        out += " { keyword: 'anyOf' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: {} ";
        if (it.opts.messages !== false) {
          out += " , message: 'should match some schema in anyOf' ";
        }
        if (it.opts.verbose) {
          out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError(vErrors); ";
        } else {
          out += " validate.errors = vErrors; return false; ";
        }
      }
      out += " } else {  errors = " + $errs + "; if (vErrors !== null) { if (" + $errs + ") vErrors.length = " + $errs + "; else vErrors = null; } ";
      if (it.opts.allErrors) {
        out += " } ";
      }
    } else {
      if ($breakOnError) {
        out += " if (true) { ";
      }
    }
    return out;
  };
  return anyOf;
}
var comment;
var hasRequiredComment;
function requireComment() {
  if (hasRequiredComment) return comment;
  hasRequiredComment = 1;
  comment = function generate_comment(it, $keyword, $ruleType) {
    var out = " ";
    var $schema2 = it.schema[$keyword];
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    !it.opts.allErrors;
    var $comment = it.util.toQuotedString($schema2);
    if (it.opts.$comment === true) {
      out += " console.log(" + $comment + ");";
    } else if (typeof it.opts.$comment == "function") {
      out += " self._opts.$comment(" + $comment + ", " + it.util.toQuotedString($errSchemaPath) + ", validate.root.schema);";
    }
    return out;
  };
  return comment;
}
var _const;
var hasRequired_const;
function require_const() {
  if (hasRequired_const) return _const;
  hasRequired_const = 1;
  _const = function generate_const(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $valid = "valid" + $lvl;
    var $isData = it.opts.$data && $schema2 && $schema2.$data;
    if ($isData) {
      out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
    }
    if (!$isData) {
      out += " var schema" + $lvl + " = validate.schema" + $schemaPath + ";";
    }
    out += "var " + $valid + " = equal(" + $data + ", schema" + $lvl + "); if (!" + $valid + ") {   ";
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = "";
    if (it.createErrors !== false) {
      out += " { keyword: 'const' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { allowedValue: schema" + $lvl + " } ";
      if (it.opts.messages !== false) {
        out += " , message: 'should be equal to constant' ";
      }
      if (it.opts.verbose) {
        out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
      }
      out += " } ";
    } else {
      out += " {} ";
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      if (it.async) {
        out += " throw new ValidationError([" + __err + "]); ";
      } else {
        out += " validate.errors = [" + __err + "]; return false; ";
      }
    } else {
      out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
    }
    out += " }";
    if ($breakOnError) {
      out += " else { ";
    }
    return out;
  };
  return _const;
}
var contains;
var hasRequiredContains;
function requireContains() {
  if (hasRequiredContains) return contains;
  hasRequiredContains = 1;
  contains = function generate_contains(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $valid = "valid" + $lvl;
    var $errs = "errs__" + $lvl;
    var $it = it.util.copy(it);
    var $closingBraces = "";
    $it.level++;
    var $nextValid = "valid" + $it.level;
    var $idx = "i" + $lvl, $dataNxt = $it.dataLevel = it.dataLevel + 1, $nextData = "data" + $dataNxt, $currentBaseId = it.baseId, $nonEmptySchema = it.opts.strictKeywords ? typeof $schema2 == "object" && Object.keys($schema2).length > 0 || $schema2 === false : it.util.schemaHasRules($schema2, it.RULES.all);
    out += "var " + $errs + " = errors;var " + $valid + ";";
    if ($nonEmptySchema) {
      var $wasComposite = it.compositeRule;
      it.compositeRule = $it.compositeRule = true;
      $it.schema = $schema2;
      $it.schemaPath = $schemaPath;
      $it.errSchemaPath = $errSchemaPath;
      out += " var " + $nextValid + " = false; for (var " + $idx + " = 0; " + $idx + " < " + $data + ".length; " + $idx + "++) { ";
      $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
      var $passData = $data + "[" + $idx + "]";
      $it.dataPathArr[$dataNxt] = $idx;
      var $code = it.validate($it);
      $it.baseId = $currentBaseId;
      if (it.util.varOccurences($code, $nextData) < 2) {
        out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
      } else {
        out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
      }
      out += " if (" + $nextValid + ") break; }  ";
      it.compositeRule = $it.compositeRule = $wasComposite;
      out += " " + $closingBraces + " if (!" + $nextValid + ") {";
    } else {
      out += " if (" + $data + ".length == 0) {";
    }
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = "";
    if (it.createErrors !== false) {
      out += " { keyword: 'contains' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: {} ";
      if (it.opts.messages !== false) {
        out += " , message: 'should contain a valid item' ";
      }
      if (it.opts.verbose) {
        out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
      }
      out += " } ";
    } else {
      out += " {} ";
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      if (it.async) {
        out += " throw new ValidationError([" + __err + "]); ";
      } else {
        out += " validate.errors = [" + __err + "]; return false; ";
      }
    } else {
      out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
    }
    out += " } else { ";
    if ($nonEmptySchema) {
      out += "  errors = " + $errs + "; if (vErrors !== null) { if (" + $errs + ") vErrors.length = " + $errs + "; else vErrors = null; } ";
    }
    if (it.opts.allErrors) {
      out += " } ";
    }
    return out;
  };
  return contains;
}
var dependencies;
var hasRequiredDependencies;
function requireDependencies() {
  if (hasRequiredDependencies) return dependencies;
  hasRequiredDependencies = 1;
  dependencies = function generate_dependencies(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $errs = "errs__" + $lvl;
    var $it = it.util.copy(it);
    var $closingBraces = "";
    $it.level++;
    var $nextValid = "valid" + $it.level;
    var $schemaDeps = {}, $propertyDeps = {}, $ownProperties = it.opts.ownProperties;
    for ($property in $schema2) {
      if ($property == "__proto__") continue;
      var $sch = $schema2[$property];
      var $deps = Array.isArray($sch) ? $propertyDeps : $schemaDeps;
      $deps[$property] = $sch;
    }
    out += "var " + $errs + " = errors;";
    var $currentErrorPath = it.errorPath;
    out += "var missing" + $lvl + ";";
    for (var $property in $propertyDeps) {
      $deps = $propertyDeps[$property];
      if ($deps.length) {
        out += " if ( " + $data + it.util.getProperty($property) + " !== undefined ";
        if ($ownProperties) {
          out += " && Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($property) + "') ";
        }
        if ($breakOnError) {
          out += " && ( ";
          var arr1 = $deps;
          if (arr1) {
            var $propertyKey, $i = -1, l1 = arr1.length - 1;
            while ($i < l1) {
              $propertyKey = arr1[$i += 1];
              if ($i) {
                out += " || ";
              }
              var $prop = it.util.getProperty($propertyKey), $useData = $data + $prop;
              out += " ( ( " + $useData + " === undefined ";
              if ($ownProperties) {
                out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
              }
              out += ") && (missing" + $lvl + " = " + it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop) + ") ) ";
            }
          }
          out += ")) {  ";
          var $propertyPath = "missing" + $lvl, $missingProperty = "' + " + $propertyPath + " + '";
          if (it.opts._errorDataPathProperty) {
            it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + " + " + $propertyPath;
          }
          var $$outStack = $$outStack || [];
          $$outStack.push(out);
          out = "";
          if (it.createErrors !== false) {
            out += " { keyword: 'dependencies' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { property: '" + it.util.escapeQuotes($property) + "', missingProperty: '" + $missingProperty + "', depsCount: " + $deps.length + ", deps: '" + it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", ")) + "' } ";
            if (it.opts.messages !== false) {
              out += " , message: 'should have ";
              if ($deps.length == 1) {
                out += "property " + it.util.escapeQuotes($deps[0]);
              } else {
                out += "properties " + it.util.escapeQuotes($deps.join(", "));
              }
              out += " when property " + it.util.escapeQuotes($property) + " is present' ";
            }
            if (it.opts.verbose) {
              out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
            }
            out += " } ";
          } else {
            out += " {} ";
          }
          var __err = out;
          out = $$outStack.pop();
          if (!it.compositeRule && $breakOnError) {
            if (it.async) {
              out += " throw new ValidationError([" + __err + "]); ";
            } else {
              out += " validate.errors = [" + __err + "]; return false; ";
            }
          } else {
            out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
          }
        } else {
          out += " ) { ";
          var arr2 = $deps;
          if (arr2) {
            var $propertyKey, i2 = -1, l2 = arr2.length - 1;
            while (i2 < l2) {
              $propertyKey = arr2[i2 += 1];
              var $prop = it.util.getProperty($propertyKey), $missingProperty = it.util.escapeQuotes($propertyKey), $useData = $data + $prop;
              if (it.opts._errorDataPathProperty) {
                it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
              }
              out += " if ( " + $useData + " === undefined ";
              if ($ownProperties) {
                out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
              }
              out += ") {  var err =   ";
              if (it.createErrors !== false) {
                out += " { keyword: 'dependencies' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { property: '" + it.util.escapeQuotes($property) + "', missingProperty: '" + $missingProperty + "', depsCount: " + $deps.length + ", deps: '" + it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", ")) + "' } ";
                if (it.opts.messages !== false) {
                  out += " , message: 'should have ";
                  if ($deps.length == 1) {
                    out += "property " + it.util.escapeQuotes($deps[0]);
                  } else {
                    out += "properties " + it.util.escapeQuotes($deps.join(", "));
                  }
                  out += " when property " + it.util.escapeQuotes($property) + " is present' ";
                }
                if (it.opts.verbose) {
                  out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
                }
                out += " } ";
              } else {
                out += " {} ";
              }
              out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ";
            }
          }
        }
        out += " }   ";
        if ($breakOnError) {
          $closingBraces += "}";
          out += " else { ";
        }
      }
    }
    it.errorPath = $currentErrorPath;
    var $currentBaseId = $it.baseId;
    for (var $property in $schemaDeps) {
      var $sch = $schemaDeps[$property];
      if (it.opts.strictKeywords ? typeof $sch == "object" && Object.keys($sch).length > 0 || $sch === false : it.util.schemaHasRules($sch, it.RULES.all)) {
        out += " " + $nextValid + " = true; if ( " + $data + it.util.getProperty($property) + " !== undefined ";
        if ($ownProperties) {
          out += " && Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($property) + "') ";
        }
        out += ") { ";
        $it.schema = $sch;
        $it.schemaPath = $schemaPath + it.util.getProperty($property);
        $it.errSchemaPath = $errSchemaPath + "/" + it.util.escapeFragment($property);
        out += "  " + it.validate($it) + " ";
        $it.baseId = $currentBaseId;
        out += " }  ";
        if ($breakOnError) {
          out += " if (" + $nextValid + ") { ";
          $closingBraces += "}";
        }
      }
    }
    if ($breakOnError) {
      out += "   " + $closingBraces + " if (" + $errs + " == errors) {";
    }
    return out;
  };
  return dependencies;
}
var _enum;
var hasRequired_enum;
function require_enum() {
  if (hasRequired_enum) return _enum;
  hasRequired_enum = 1;
  _enum = function generate_enum(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $valid = "valid" + $lvl;
    var $isData = it.opts.$data && $schema2 && $schema2.$data;
    if ($isData) {
      out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
    }
    var $i = "i" + $lvl, $vSchema = "schema" + $lvl;
    if (!$isData) {
      out += " var " + $vSchema + " = validate.schema" + $schemaPath + ";";
    }
    out += "var " + $valid + ";";
    if ($isData) {
      out += " if (schema" + $lvl + " === undefined) " + $valid + " = true; else if (!Array.isArray(schema" + $lvl + ")) " + $valid + " = false; else {";
    }
    out += "" + $valid + " = false;for (var " + $i + "=0; " + $i + "<" + $vSchema + ".length; " + $i + "++) if (equal(" + $data + ", " + $vSchema + "[" + $i + "])) { " + $valid + " = true; break; }";
    if ($isData) {
      out += "  }  ";
    }
    out += " if (!" + $valid + ") {   ";
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = "";
    if (it.createErrors !== false) {
      out += " { keyword: 'enum' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { allowedValues: schema" + $lvl + " } ";
      if (it.opts.messages !== false) {
        out += " , message: 'should be equal to one of the allowed values' ";
      }
      if (it.opts.verbose) {
        out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
      }
      out += " } ";
    } else {
      out += " {} ";
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      if (it.async) {
        out += " throw new ValidationError([" + __err + "]); ";
      } else {
        out += " validate.errors = [" + __err + "]; return false; ";
      }
    } else {
      out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
    }
    out += " }";
    if ($breakOnError) {
      out += " else { ";
    }
    return out;
  };
  return _enum;
}
var format;
var hasRequiredFormat;
function requireFormat() {
  if (hasRequiredFormat) return format;
  hasRequiredFormat = 1;
  format = function generate_format(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    if (it.opts.format === false) {
      if ($breakOnError) {
        out += " if (true) { ";
      }
      return out;
    }
    var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
    if ($isData) {
      out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
      $schemaValue = "schema" + $lvl;
    } else {
      $schemaValue = $schema2;
    }
    var $unknownFormats = it.opts.unknownFormats, $allowUnknown = Array.isArray($unknownFormats);
    if ($isData) {
      var $format = "format" + $lvl, $isObject = "isObject" + $lvl, $formatType = "formatType" + $lvl;
      out += " var " + $format + " = formats[" + $schemaValue + "]; var " + $isObject + " = typeof " + $format + " == 'object' && !(" + $format + " instanceof RegExp) && " + $format + ".validate; var " + $formatType + " = " + $isObject + " && " + $format + ".type || 'string'; if (" + $isObject + ") { ";
      if (it.async) {
        out += " var async" + $lvl + " = " + $format + ".async; ";
      }
      out += " " + $format + " = " + $format + ".validate; } if (  ";
      if ($isData) {
        out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'string') || ";
      }
      out += " (";
      if ($unknownFormats != "ignore") {
        out += " (" + $schemaValue + " && !" + $format + " ";
        if ($allowUnknown) {
          out += " && self._opts.unknownFormats.indexOf(" + $schemaValue + ") == -1 ";
        }
        out += ") || ";
      }
      out += " (" + $format + " && " + $formatType + " == '" + $ruleType + "' && !(typeof " + $format + " == 'function' ? ";
      if (it.async) {
        out += " (async" + $lvl + " ? await " + $format + "(" + $data + ") : " + $format + "(" + $data + ")) ";
      } else {
        out += " " + $format + "(" + $data + ") ";
      }
      out += " : " + $format + ".test(" + $data + "))))) {";
    } else {
      var $format = it.formats[$schema2];
      if (!$format) {
        if ($unknownFormats == "ignore") {
          it.logger.warn('unknown format "' + $schema2 + '" ignored in schema at path "' + it.errSchemaPath + '"');
          if ($breakOnError) {
            out += " if (true) { ";
          }
          return out;
        } else if ($allowUnknown && $unknownFormats.indexOf($schema2) >= 0) {
          if ($breakOnError) {
            out += " if (true) { ";
          }
          return out;
        } else {
          throw new Error('unknown format "' + $schema2 + '" is used in schema at path "' + it.errSchemaPath + '"');
        }
      }
      var $isObject = typeof $format == "object" && !($format instanceof RegExp) && $format.validate;
      var $formatType = $isObject && $format.type || "string";
      if ($isObject) {
        var $async = $format.async === true;
        $format = $format.validate;
      }
      if ($formatType != $ruleType) {
        if ($breakOnError) {
          out += " if (true) { ";
        }
        return out;
      }
      if ($async) {
        if (!it.async) throw new Error("async format in sync schema");
        var $formatRef = "formats" + it.util.getProperty($schema2) + ".validate";
        out += " if (!(await " + $formatRef + "(" + $data + "))) { ";
      } else {
        out += " if (! ";
        var $formatRef = "formats" + it.util.getProperty($schema2);
        if ($isObject) $formatRef += ".validate";
        if (typeof $format == "function") {
          out += " " + $formatRef + "(" + $data + ") ";
        } else {
          out += " " + $formatRef + ".test(" + $data + ") ";
        }
        out += ") { ";
      }
    }
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = "";
    if (it.createErrors !== false) {
      out += " { keyword: 'format' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { format:  ";
      if ($isData) {
        out += "" + $schemaValue;
      } else {
        out += "" + it.util.toQuotedString($schema2);
      }
      out += "  } ";
      if (it.opts.messages !== false) {
        out += ` , message: 'should match format "`;
        if ($isData) {
          out += "' + " + $schemaValue + " + '";
        } else {
          out += "" + it.util.escapeQuotes($schema2);
        }
        out += `"' `;
      }
      if (it.opts.verbose) {
        out += " , schema:  ";
        if ($isData) {
          out += "validate.schema" + $schemaPath;
        } else {
          out += "" + it.util.toQuotedString($schema2);
        }
        out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
      }
      out += " } ";
    } else {
      out += " {} ";
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      if (it.async) {
        out += " throw new ValidationError([" + __err + "]); ";
      } else {
        out += " validate.errors = [" + __err + "]; return false; ";
      }
    } else {
      out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
    }
    out += " } ";
    if ($breakOnError) {
      out += " else { ";
    }
    return out;
  };
  return format;
}
var _if;
var hasRequired_if;
function require_if() {
  if (hasRequired_if) return _if;
  hasRequired_if = 1;
  _if = function generate_if(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $valid = "valid" + $lvl;
    var $errs = "errs__" + $lvl;
    var $it = it.util.copy(it);
    $it.level++;
    var $nextValid = "valid" + $it.level;
    var $thenSch = it.schema["then"], $elseSch = it.schema["else"], $thenPresent = $thenSch !== void 0 && (it.opts.strictKeywords ? typeof $thenSch == "object" && Object.keys($thenSch).length > 0 || $thenSch === false : it.util.schemaHasRules($thenSch, it.RULES.all)), $elsePresent = $elseSch !== void 0 && (it.opts.strictKeywords ? typeof $elseSch == "object" && Object.keys($elseSch).length > 0 || $elseSch === false : it.util.schemaHasRules($elseSch, it.RULES.all)), $currentBaseId = $it.baseId;
    if ($thenPresent || $elsePresent) {
      var $ifClause;
      $it.createErrors = false;
      $it.schema = $schema2;
      $it.schemaPath = $schemaPath;
      $it.errSchemaPath = $errSchemaPath;
      out += " var " + $errs + " = errors; var " + $valid + " = true;  ";
      var $wasComposite = it.compositeRule;
      it.compositeRule = $it.compositeRule = true;
      out += "  " + it.validate($it) + " ";
      $it.baseId = $currentBaseId;
      $it.createErrors = true;
      out += "  errors = " + $errs + "; if (vErrors !== null) { if (" + $errs + ") vErrors.length = " + $errs + "; else vErrors = null; }  ";
      it.compositeRule = $it.compositeRule = $wasComposite;
      if ($thenPresent) {
        out += " if (" + $nextValid + ") {  ";
        $it.schema = it.schema["then"];
        $it.schemaPath = it.schemaPath + ".then";
        $it.errSchemaPath = it.errSchemaPath + "/then";
        out += "  " + it.validate($it) + " ";
        $it.baseId = $currentBaseId;
        out += " " + $valid + " = " + $nextValid + "; ";
        if ($thenPresent && $elsePresent) {
          $ifClause = "ifClause" + $lvl;
          out += " var " + $ifClause + " = 'then'; ";
        } else {
          $ifClause = "'then'";
        }
        out += " } ";
        if ($elsePresent) {
          out += " else { ";
        }
      } else {
        out += " if (!" + $nextValid + ") { ";
      }
      if ($elsePresent) {
        $it.schema = it.schema["else"];
        $it.schemaPath = it.schemaPath + ".else";
        $it.errSchemaPath = it.errSchemaPath + "/else";
        out += "  " + it.validate($it) + " ";
        $it.baseId = $currentBaseId;
        out += " " + $valid + " = " + $nextValid + "; ";
        if ($thenPresent && $elsePresent) {
          $ifClause = "ifClause" + $lvl;
          out += " var " + $ifClause + " = 'else'; ";
        } else {
          $ifClause = "'else'";
        }
        out += " } ";
      }
      out += " if (!" + $valid + ") {   var err =   ";
      if (it.createErrors !== false) {
        out += " { keyword: 'if' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { failingKeyword: " + $ifClause + " } ";
        if (it.opts.messages !== false) {
          out += ` , message: 'should match "' + ` + $ifClause + ` + '" schema' `;
        }
        if (it.opts.verbose) {
          out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError(vErrors); ";
        } else {
          out += " validate.errors = vErrors; return false; ";
        }
      }
      out += " }   ";
      if ($breakOnError) {
        out += " else { ";
      }
    } else {
      if ($breakOnError) {
        out += " if (true) { ";
      }
    }
    return out;
  };
  return _if;
}
var items;
var hasRequiredItems;
function requireItems() {
  if (hasRequiredItems) return items;
  hasRequiredItems = 1;
  items = function generate_items(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $valid = "valid" + $lvl;
    var $errs = "errs__" + $lvl;
    var $it = it.util.copy(it);
    var $closingBraces = "";
    $it.level++;
    var $nextValid = "valid" + $it.level;
    var $idx = "i" + $lvl, $dataNxt = $it.dataLevel = it.dataLevel + 1, $nextData = "data" + $dataNxt, $currentBaseId = it.baseId;
    out += "var " + $errs + " = errors;var " + $valid + ";";
    if (Array.isArray($schema2)) {
      var $additionalItems = it.schema.additionalItems;
      if ($additionalItems === false) {
        out += " " + $valid + " = " + $data + ".length <= " + $schema2.length + "; ";
        var $currErrSchemaPath = $errSchemaPath;
        $errSchemaPath = it.errSchemaPath + "/additionalItems";
        out += "  if (!" + $valid + ") {   ";
        var $$outStack = $$outStack || [];
        $$outStack.push(out);
        out = "";
        if (it.createErrors !== false) {
          out += " { keyword: 'additionalItems' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { limit: " + $schema2.length + " } ";
          if (it.opts.messages !== false) {
            out += " , message: 'should NOT have more than " + $schema2.length + " items' ";
          }
          if (it.opts.verbose) {
            out += " , schema: false , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
          }
          out += " } ";
        } else {
          out += " {} ";
        }
        var __err = out;
        out = $$outStack.pop();
        if (!it.compositeRule && $breakOnError) {
          if (it.async) {
            out += " throw new ValidationError([" + __err + "]); ";
          } else {
            out += " validate.errors = [" + __err + "]; return false; ";
          }
        } else {
          out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        }
        out += " } ";
        $errSchemaPath = $currErrSchemaPath;
        if ($breakOnError) {
          $closingBraces += "}";
          out += " else { ";
        }
      }
      var arr1 = $schema2;
      if (arr1) {
        var $sch, $i = -1, l1 = arr1.length - 1;
        while ($i < l1) {
          $sch = arr1[$i += 1];
          if (it.opts.strictKeywords ? typeof $sch == "object" && Object.keys($sch).length > 0 || $sch === false : it.util.schemaHasRules($sch, it.RULES.all)) {
            out += " " + $nextValid + " = true; if (" + $data + ".length > " + $i + ") { ";
            var $passData = $data + "[" + $i + "]";
            $it.schema = $sch;
            $it.schemaPath = $schemaPath + "[" + $i + "]";
            $it.errSchemaPath = $errSchemaPath + "/" + $i;
            $it.errorPath = it.util.getPathExpr(it.errorPath, $i, it.opts.jsonPointers, true);
            $it.dataPathArr[$dataNxt] = $i;
            var $code = it.validate($it);
            $it.baseId = $currentBaseId;
            if (it.util.varOccurences($code, $nextData) < 2) {
              out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
            } else {
              out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
            }
            out += " }  ";
            if ($breakOnError) {
              out += " if (" + $nextValid + ") { ";
              $closingBraces += "}";
            }
          }
        }
      }
      if (typeof $additionalItems == "object" && (it.opts.strictKeywords ? typeof $additionalItems == "object" && Object.keys($additionalItems).length > 0 || $additionalItems === false : it.util.schemaHasRules($additionalItems, it.RULES.all))) {
        $it.schema = $additionalItems;
        $it.schemaPath = it.schemaPath + ".additionalItems";
        $it.errSchemaPath = it.errSchemaPath + "/additionalItems";
        out += " " + $nextValid + " = true; if (" + $data + ".length > " + $schema2.length + ") {  for (var " + $idx + " = " + $schema2.length + "; " + $idx + " < " + $data + ".length; " + $idx + "++) { ";
        $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
        var $passData = $data + "[" + $idx + "]";
        $it.dataPathArr[$dataNxt] = $idx;
        var $code = it.validate($it);
        $it.baseId = $currentBaseId;
        if (it.util.varOccurences($code, $nextData) < 2) {
          out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
        } else {
          out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
        }
        if ($breakOnError) {
          out += " if (!" + $nextValid + ") break; ";
        }
        out += " } }  ";
        if ($breakOnError) {
          out += " if (" + $nextValid + ") { ";
          $closingBraces += "}";
        }
      }
    } else if (it.opts.strictKeywords ? typeof $schema2 == "object" && Object.keys($schema2).length > 0 || $schema2 === false : it.util.schemaHasRules($schema2, it.RULES.all)) {
      $it.schema = $schema2;
      $it.schemaPath = $schemaPath;
      $it.errSchemaPath = $errSchemaPath;
      out += "  for (var " + $idx + " = 0; " + $idx + " < " + $data + ".length; " + $idx + "++) { ";
      $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
      var $passData = $data + "[" + $idx + "]";
      $it.dataPathArr[$dataNxt] = $idx;
      var $code = it.validate($it);
      $it.baseId = $currentBaseId;
      if (it.util.varOccurences($code, $nextData) < 2) {
        out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
      } else {
        out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
      }
      if ($breakOnError) {
        out += " if (!" + $nextValid + ") break; ";
      }
      out += " }";
    }
    if ($breakOnError) {
      out += " " + $closingBraces + " if (" + $errs + " == errors) {";
    }
    return out;
  };
  return items;
}
var _limit;
var hasRequired_limit;
function require_limit() {
  if (hasRequired_limit) return _limit;
  hasRequired_limit = 1;
  _limit = function generate__limit(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $errorKeyword;
    var $data = "data" + ($dataLvl || "");
    var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
    if ($isData) {
      out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
      $schemaValue = "schema" + $lvl;
    } else {
      $schemaValue = $schema2;
    }
    var $isMax = $keyword == "maximum", $exclusiveKeyword = $isMax ? "exclusiveMaximum" : "exclusiveMinimum", $schemaExcl = it.schema[$exclusiveKeyword], $isDataExcl = it.opts.$data && $schemaExcl && $schemaExcl.$data, $op = $isMax ? "<" : ">", $notOp = $isMax ? ">" : "<", $errorKeyword = void 0;
    if (!($isData || typeof $schema2 == "number" || $schema2 === void 0)) {
      throw new Error($keyword + " must be number");
    }
    if (!($isDataExcl || $schemaExcl === void 0 || typeof $schemaExcl == "number" || typeof $schemaExcl == "boolean")) {
      throw new Error($exclusiveKeyword + " must be number or boolean");
    }
    if ($isDataExcl) {
      var $schemaValueExcl = it.util.getData($schemaExcl.$data, $dataLvl, it.dataPathArr), $exclusive = "exclusive" + $lvl, $exclType = "exclType" + $lvl, $exclIsNumber = "exclIsNumber" + $lvl, $opExpr = "op" + $lvl, $opStr = "' + " + $opExpr + " + '";
      out += " var schemaExcl" + $lvl + " = " + $schemaValueExcl + "; ";
      $schemaValueExcl = "schemaExcl" + $lvl;
      out += " var " + $exclusive + "; var " + $exclType + " = typeof " + $schemaValueExcl + "; if (" + $exclType + " != 'boolean' && " + $exclType + " != 'undefined' && " + $exclType + " != 'number') { ";
      var $errorKeyword = $exclusiveKeyword;
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: '" + ($errorKeyword || "_exclusiveLimit") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: {} ";
        if (it.opts.messages !== false) {
          out += " , message: '" + $exclusiveKeyword + " should be boolean' ";
        }
        if (it.opts.verbose) {
          out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      out += " } else if ( ";
      if ($isData) {
        out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'number') || ";
      }
      out += " " + $exclType + " == 'number' ? ( (" + $exclusive + " = " + $schemaValue + " === undefined || " + $schemaValueExcl + " " + $op + "= " + $schemaValue + ") ? " + $data + " " + $notOp + "= " + $schemaValueExcl + " : " + $data + " " + $notOp + " " + $schemaValue + " ) : ( (" + $exclusive + " = " + $schemaValueExcl + " === true) ? " + $data + " " + $notOp + "= " + $schemaValue + " : " + $data + " " + $notOp + " " + $schemaValue + " ) || " + $data + " !== " + $data + ") { var op" + $lvl + " = " + $exclusive + " ? '" + $op + "' : '" + $op + "='; ";
      if ($schema2 === void 0) {
        $errorKeyword = $exclusiveKeyword;
        $errSchemaPath = it.errSchemaPath + "/" + $exclusiveKeyword;
        $schemaValue = $schemaValueExcl;
        $isData = $isDataExcl;
      }
    } else {
      var $exclIsNumber = typeof $schemaExcl == "number", $opStr = $op;
      if ($exclIsNumber && $isData) {
        var $opExpr = "'" + $opStr + "'";
        out += " if ( ";
        if ($isData) {
          out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'number') || ";
        }
        out += " ( " + $schemaValue + " === undefined || " + $schemaExcl + " " + $op + "= " + $schemaValue + " ? " + $data + " " + $notOp + "= " + $schemaExcl + " : " + $data + " " + $notOp + " " + $schemaValue + " ) || " + $data + " !== " + $data + ") { ";
      } else {
        if ($exclIsNumber && $schema2 === void 0) {
          $exclusive = true;
          $errorKeyword = $exclusiveKeyword;
          $errSchemaPath = it.errSchemaPath + "/" + $exclusiveKeyword;
          $schemaValue = $schemaExcl;
          $notOp += "=";
        } else {
          if ($exclIsNumber) $schemaValue = Math[$isMax ? "min" : "max"]($schemaExcl, $schema2);
          if ($schemaExcl === ($exclIsNumber ? $schemaValue : true)) {
            $exclusive = true;
            $errorKeyword = $exclusiveKeyword;
            $errSchemaPath = it.errSchemaPath + "/" + $exclusiveKeyword;
            $notOp += "=";
          } else {
            $exclusive = false;
            $opStr += "=";
          }
        }
        var $opExpr = "'" + $opStr + "'";
        out += " if ( ";
        if ($isData) {
          out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'number') || ";
        }
        out += " " + $data + " " + $notOp + " " + $schemaValue + " || " + $data + " !== " + $data + ") { ";
      }
    }
    $errorKeyword = $errorKeyword || $keyword;
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = "";
    if (it.createErrors !== false) {
      out += " { keyword: '" + ($errorKeyword || "_limit") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { comparison: " + $opExpr + ", limit: " + $schemaValue + ", exclusive: " + $exclusive + " } ";
      if (it.opts.messages !== false) {
        out += " , message: 'should be " + $opStr + " ";
        if ($isData) {
          out += "' + " + $schemaValue;
        } else {
          out += "" + $schemaValue + "'";
        }
      }
      if (it.opts.verbose) {
        out += " , schema:  ";
        if ($isData) {
          out += "validate.schema" + $schemaPath;
        } else {
          out += "" + $schema2;
        }
        out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
      }
      out += " } ";
    } else {
      out += " {} ";
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      if (it.async) {
        out += " throw new ValidationError([" + __err + "]); ";
      } else {
        out += " validate.errors = [" + __err + "]; return false; ";
      }
    } else {
      out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
    }
    out += " } ";
    if ($breakOnError) {
      out += " else { ";
    }
    return out;
  };
  return _limit;
}
var _limitItems;
var hasRequired_limitItems;
function require_limitItems() {
  if (hasRequired_limitItems) return _limitItems;
  hasRequired_limitItems = 1;
  _limitItems = function generate__limitItems(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $errorKeyword;
    var $data = "data" + ($dataLvl || "");
    var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
    if ($isData) {
      out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
      $schemaValue = "schema" + $lvl;
    } else {
      $schemaValue = $schema2;
    }
    if (!($isData || typeof $schema2 == "number")) {
      throw new Error($keyword + " must be number");
    }
    var $op = $keyword == "maxItems" ? ">" : "<";
    out += "if ( ";
    if ($isData) {
      out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'number') || ";
    }
    out += " " + $data + ".length " + $op + " " + $schemaValue + ") { ";
    var $errorKeyword = $keyword;
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = "";
    if (it.createErrors !== false) {
      out += " { keyword: '" + ($errorKeyword || "_limitItems") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { limit: " + $schemaValue + " } ";
      if (it.opts.messages !== false) {
        out += " , message: 'should NOT have ";
        if ($keyword == "maxItems") {
          out += "more";
        } else {
          out += "fewer";
        }
        out += " than ";
        if ($isData) {
          out += "' + " + $schemaValue + " + '";
        } else {
          out += "" + $schema2;
        }
        out += " items' ";
      }
      if (it.opts.verbose) {
        out += " , schema:  ";
        if ($isData) {
          out += "validate.schema" + $schemaPath;
        } else {
          out += "" + $schema2;
        }
        out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
      }
      out += " } ";
    } else {
      out += " {} ";
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      if (it.async) {
        out += " throw new ValidationError([" + __err + "]); ";
      } else {
        out += " validate.errors = [" + __err + "]; return false; ";
      }
    } else {
      out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
    }
    out += "} ";
    if ($breakOnError) {
      out += " else { ";
    }
    return out;
  };
  return _limitItems;
}
var _limitLength;
var hasRequired_limitLength;
function require_limitLength() {
  if (hasRequired_limitLength) return _limitLength;
  hasRequired_limitLength = 1;
  _limitLength = function generate__limitLength(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $errorKeyword;
    var $data = "data" + ($dataLvl || "");
    var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
    if ($isData) {
      out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
      $schemaValue = "schema" + $lvl;
    } else {
      $schemaValue = $schema2;
    }
    if (!($isData || typeof $schema2 == "number")) {
      throw new Error($keyword + " must be number");
    }
    var $op = $keyword == "maxLength" ? ">" : "<";
    out += "if ( ";
    if ($isData) {
      out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'number') || ";
    }
    if (it.opts.unicode === false) {
      out += " " + $data + ".length ";
    } else {
      out += " ucs2length(" + $data + ") ";
    }
    out += " " + $op + " " + $schemaValue + ") { ";
    var $errorKeyword = $keyword;
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = "";
    if (it.createErrors !== false) {
      out += " { keyword: '" + ($errorKeyword || "_limitLength") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { limit: " + $schemaValue + " } ";
      if (it.opts.messages !== false) {
        out += " , message: 'should NOT be ";
        if ($keyword == "maxLength") {
          out += "longer";
        } else {
          out += "shorter";
        }
        out += " than ";
        if ($isData) {
          out += "' + " + $schemaValue + " + '";
        } else {
          out += "" + $schema2;
        }
        out += " characters' ";
      }
      if (it.opts.verbose) {
        out += " , schema:  ";
        if ($isData) {
          out += "validate.schema" + $schemaPath;
        } else {
          out += "" + $schema2;
        }
        out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
      }
      out += " } ";
    } else {
      out += " {} ";
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      if (it.async) {
        out += " throw new ValidationError([" + __err + "]); ";
      } else {
        out += " validate.errors = [" + __err + "]; return false; ";
      }
    } else {
      out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
    }
    out += "} ";
    if ($breakOnError) {
      out += " else { ";
    }
    return out;
  };
  return _limitLength;
}
var _limitProperties;
var hasRequired_limitProperties;
function require_limitProperties() {
  if (hasRequired_limitProperties) return _limitProperties;
  hasRequired_limitProperties = 1;
  _limitProperties = function generate__limitProperties(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $errorKeyword;
    var $data = "data" + ($dataLvl || "");
    var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
    if ($isData) {
      out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
      $schemaValue = "schema" + $lvl;
    } else {
      $schemaValue = $schema2;
    }
    if (!($isData || typeof $schema2 == "number")) {
      throw new Error($keyword + " must be number");
    }
    var $op = $keyword == "maxProperties" ? ">" : "<";
    out += "if ( ";
    if ($isData) {
      out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'number') || ";
    }
    out += " Object.keys(" + $data + ").length " + $op + " " + $schemaValue + ") { ";
    var $errorKeyword = $keyword;
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = "";
    if (it.createErrors !== false) {
      out += " { keyword: '" + ($errorKeyword || "_limitProperties") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { limit: " + $schemaValue + " } ";
      if (it.opts.messages !== false) {
        out += " , message: 'should NOT have ";
        if ($keyword == "maxProperties") {
          out += "more";
        } else {
          out += "fewer";
        }
        out += " than ";
        if ($isData) {
          out += "' + " + $schemaValue + " + '";
        } else {
          out += "" + $schema2;
        }
        out += " properties' ";
      }
      if (it.opts.verbose) {
        out += " , schema:  ";
        if ($isData) {
          out += "validate.schema" + $schemaPath;
        } else {
          out += "" + $schema2;
        }
        out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
      }
      out += " } ";
    } else {
      out += " {} ";
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      if (it.async) {
        out += " throw new ValidationError([" + __err + "]); ";
      } else {
        out += " validate.errors = [" + __err + "]; return false; ";
      }
    } else {
      out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
    }
    out += "} ";
    if ($breakOnError) {
      out += " else { ";
    }
    return out;
  };
  return _limitProperties;
}
var multipleOf;
var hasRequiredMultipleOf;
function requireMultipleOf() {
  if (hasRequiredMultipleOf) return multipleOf;
  hasRequiredMultipleOf = 1;
  multipleOf = function generate_multipleOf(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
    if ($isData) {
      out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
      $schemaValue = "schema" + $lvl;
    } else {
      $schemaValue = $schema2;
    }
    if (!($isData || typeof $schema2 == "number")) {
      throw new Error($keyword + " must be number");
    }
    out += "var division" + $lvl + ";if (";
    if ($isData) {
      out += " " + $schemaValue + " !== undefined && ( typeof " + $schemaValue + " != 'number' || ";
    }
    out += " (division" + $lvl + " = " + $data + " / " + $schemaValue + ", ";
    if (it.opts.multipleOfPrecision) {
      out += " Math.abs(Math.round(division" + $lvl + ") - division" + $lvl + ") > 1e-" + it.opts.multipleOfPrecision + " ";
    } else {
      out += " division" + $lvl + " !== parseInt(division" + $lvl + ") ";
    }
    out += " ) ";
    if ($isData) {
      out += "  )  ";
    }
    out += " ) {   ";
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = "";
    if (it.createErrors !== false) {
      out += " { keyword: 'multipleOf' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { multipleOf: " + $schemaValue + " } ";
      if (it.opts.messages !== false) {
        out += " , message: 'should be multiple of ";
        if ($isData) {
          out += "' + " + $schemaValue;
        } else {
          out += "" + $schemaValue + "'";
        }
      }
      if (it.opts.verbose) {
        out += " , schema:  ";
        if ($isData) {
          out += "validate.schema" + $schemaPath;
        } else {
          out += "" + $schema2;
        }
        out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
      }
      out += " } ";
    } else {
      out += " {} ";
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      if (it.async) {
        out += " throw new ValidationError([" + __err + "]); ";
      } else {
        out += " validate.errors = [" + __err + "]; return false; ";
      }
    } else {
      out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
    }
    out += "} ";
    if ($breakOnError) {
      out += " else { ";
    }
    return out;
  };
  return multipleOf;
}
var not;
var hasRequiredNot;
function requireNot() {
  if (hasRequiredNot) return not;
  hasRequiredNot = 1;
  not = function generate_not(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $errs = "errs__" + $lvl;
    var $it = it.util.copy(it);
    $it.level++;
    var $nextValid = "valid" + $it.level;
    if (it.opts.strictKeywords ? typeof $schema2 == "object" && Object.keys($schema2).length > 0 || $schema2 === false : it.util.schemaHasRules($schema2, it.RULES.all)) {
      $it.schema = $schema2;
      $it.schemaPath = $schemaPath;
      $it.errSchemaPath = $errSchemaPath;
      out += " var " + $errs + " = errors;  ";
      var $wasComposite = it.compositeRule;
      it.compositeRule = $it.compositeRule = true;
      $it.createErrors = false;
      var $allErrorsOption;
      if ($it.opts.allErrors) {
        $allErrorsOption = $it.opts.allErrors;
        $it.opts.allErrors = false;
      }
      out += " " + it.validate($it) + " ";
      $it.createErrors = true;
      if ($allErrorsOption) $it.opts.allErrors = $allErrorsOption;
      it.compositeRule = $it.compositeRule = $wasComposite;
      out += " if (" + $nextValid + ") {   ";
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: 'not' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: {} ";
        if (it.opts.messages !== false) {
          out += " , message: 'should NOT be valid' ";
        }
        if (it.opts.verbose) {
          out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      out += " } else {  errors = " + $errs + "; if (vErrors !== null) { if (" + $errs + ") vErrors.length = " + $errs + "; else vErrors = null; } ";
      if (it.opts.allErrors) {
        out += " } ";
      }
    } else {
      out += "  var err =   ";
      if (it.createErrors !== false) {
        out += " { keyword: 'not' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: {} ";
        if (it.opts.messages !== false) {
          out += " , message: 'should NOT be valid' ";
        }
        if (it.opts.verbose) {
          out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      if ($breakOnError) {
        out += " if (false) { ";
      }
    }
    return out;
  };
  return not;
}
var oneOf;
var hasRequiredOneOf;
function requireOneOf() {
  if (hasRequiredOneOf) return oneOf;
  hasRequiredOneOf = 1;
  oneOf = function generate_oneOf(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $valid = "valid" + $lvl;
    var $errs = "errs__" + $lvl;
    var $it = it.util.copy(it);
    var $closingBraces = "";
    $it.level++;
    var $nextValid = "valid" + $it.level;
    var $currentBaseId = $it.baseId, $prevValid = "prevValid" + $lvl, $passingSchemas = "passingSchemas" + $lvl;
    out += "var " + $errs + " = errors , " + $prevValid + " = false , " + $valid + " = false , " + $passingSchemas + " = null; ";
    var $wasComposite = it.compositeRule;
    it.compositeRule = $it.compositeRule = true;
    var arr1 = $schema2;
    if (arr1) {
      var $sch, $i = -1, l1 = arr1.length - 1;
      while ($i < l1) {
        $sch = arr1[$i += 1];
        if (it.opts.strictKeywords ? typeof $sch == "object" && Object.keys($sch).length > 0 || $sch === false : it.util.schemaHasRules($sch, it.RULES.all)) {
          $it.schema = $sch;
          $it.schemaPath = $schemaPath + "[" + $i + "]";
          $it.errSchemaPath = $errSchemaPath + "/" + $i;
          out += "  " + it.validate($it) + " ";
          $it.baseId = $currentBaseId;
        } else {
          out += " var " + $nextValid + " = true; ";
        }
        if ($i) {
          out += " if (" + $nextValid + " && " + $prevValid + ") { " + $valid + " = false; " + $passingSchemas + " = [" + $passingSchemas + ", " + $i + "]; } else { ";
          $closingBraces += "}";
        }
        out += " if (" + $nextValid + ") { " + $valid + " = " + $prevValid + " = true; " + $passingSchemas + " = " + $i + "; }";
      }
    }
    it.compositeRule = $it.compositeRule = $wasComposite;
    out += "" + $closingBraces + "if (!" + $valid + ") {   var err =   ";
    if (it.createErrors !== false) {
      out += " { keyword: 'oneOf' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { passingSchemas: " + $passingSchemas + " } ";
      if (it.opts.messages !== false) {
        out += " , message: 'should match exactly one schema in oneOf' ";
      }
      if (it.opts.verbose) {
        out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
      }
      out += " } ";
    } else {
      out += " {} ";
    }
    out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
    if (!it.compositeRule && $breakOnError) {
      if (it.async) {
        out += " throw new ValidationError(vErrors); ";
      } else {
        out += " validate.errors = vErrors; return false; ";
      }
    }
    out += "} else {  errors = " + $errs + "; if (vErrors !== null) { if (" + $errs + ") vErrors.length = " + $errs + "; else vErrors = null; }";
    if (it.opts.allErrors) {
      out += " } ";
    }
    return out;
  };
  return oneOf;
}
var pattern;
var hasRequiredPattern;
function requirePattern() {
  if (hasRequiredPattern) return pattern;
  hasRequiredPattern = 1;
  pattern = function generate_pattern(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
    if ($isData) {
      out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
      $schemaValue = "schema" + $lvl;
    } else {
      $schemaValue = $schema2;
    }
    var $regexp = $isData ? "(new RegExp(" + $schemaValue + "))" : it.usePattern($schema2);
    out += "if ( ";
    if ($isData) {
      out += " (" + $schemaValue + " !== undefined && typeof " + $schemaValue + " != 'string') || ";
    }
    out += " !" + $regexp + ".test(" + $data + ") ) {   ";
    var $$outStack = $$outStack || [];
    $$outStack.push(out);
    out = "";
    if (it.createErrors !== false) {
      out += " { keyword: 'pattern' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { pattern:  ";
      if ($isData) {
        out += "" + $schemaValue;
      } else {
        out += "" + it.util.toQuotedString($schema2);
      }
      out += "  } ";
      if (it.opts.messages !== false) {
        out += ` , message: 'should match pattern "`;
        if ($isData) {
          out += "' + " + $schemaValue + " + '";
        } else {
          out += "" + it.util.escapeQuotes($schema2);
        }
        out += `"' `;
      }
      if (it.opts.verbose) {
        out += " , schema:  ";
        if ($isData) {
          out += "validate.schema" + $schemaPath;
        } else {
          out += "" + it.util.toQuotedString($schema2);
        }
        out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
      }
      out += " } ";
    } else {
      out += " {} ";
    }
    var __err = out;
    out = $$outStack.pop();
    if (!it.compositeRule && $breakOnError) {
      if (it.async) {
        out += " throw new ValidationError([" + __err + "]); ";
      } else {
        out += " validate.errors = [" + __err + "]; return false; ";
      }
    } else {
      out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
    }
    out += "} ";
    if ($breakOnError) {
      out += " else { ";
    }
    return out;
  };
  return pattern;
}
var properties$2;
var hasRequiredProperties;
function requireProperties() {
  if (hasRequiredProperties) return properties$2;
  hasRequiredProperties = 1;
  properties$2 = function generate_properties(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $errs = "errs__" + $lvl;
    var $it = it.util.copy(it);
    var $closingBraces = "";
    $it.level++;
    var $nextValid = "valid" + $it.level;
    var $key = "key" + $lvl, $idx = "idx" + $lvl, $dataNxt = $it.dataLevel = it.dataLevel + 1, $nextData = "data" + $dataNxt, $dataProperties = "dataProperties" + $lvl;
    var $schemaKeys = Object.keys($schema2 || {}).filter(notProto), $pProperties = it.schema.patternProperties || {}, $pPropertyKeys = Object.keys($pProperties).filter(notProto), $aProperties = it.schema.additionalProperties, $someProperties = $schemaKeys.length || $pPropertyKeys.length, $noAdditional = $aProperties === false, $additionalIsSchema = typeof $aProperties == "object" && Object.keys($aProperties).length, $removeAdditional = it.opts.removeAdditional, $checkAdditional = $noAdditional || $additionalIsSchema || $removeAdditional, $ownProperties = it.opts.ownProperties, $currentBaseId = it.baseId;
    var $required = it.schema.required;
    if ($required && !(it.opts.$data && $required.$data) && $required.length < it.opts.loopRequired) {
      var $requiredHash = it.util.toHash($required);
    }
    function notProto(p) {
      return p !== "__proto__";
    }
    out += "var " + $errs + " = errors;var " + $nextValid + " = true;";
    if ($ownProperties) {
      out += " var " + $dataProperties + " = undefined;";
    }
    if ($checkAdditional) {
      if ($ownProperties) {
        out += " " + $dataProperties + " = " + $dataProperties + " || Object.keys(" + $data + "); for (var " + $idx + "=0; " + $idx + "<" + $dataProperties + ".length; " + $idx + "++) { var " + $key + " = " + $dataProperties + "[" + $idx + "]; ";
      } else {
        out += " for (var " + $key + " in " + $data + ") { ";
      }
      if ($someProperties) {
        out += " var isAdditional" + $lvl + " = !(false ";
        if ($schemaKeys.length) {
          if ($schemaKeys.length > 8) {
            out += " || validate.schema" + $schemaPath + ".hasOwnProperty(" + $key + ") ";
          } else {
            var arr1 = $schemaKeys;
            if (arr1) {
              var $propertyKey, i1 = -1, l1 = arr1.length - 1;
              while (i1 < l1) {
                $propertyKey = arr1[i1 += 1];
                out += " || " + $key + " == " + it.util.toQuotedString($propertyKey) + " ";
              }
            }
          }
        }
        if ($pPropertyKeys.length) {
          var arr2 = $pPropertyKeys;
          if (arr2) {
            var $pProperty, $i = -1, l2 = arr2.length - 1;
            while ($i < l2) {
              $pProperty = arr2[$i += 1];
              out += " || " + it.usePattern($pProperty) + ".test(" + $key + ") ";
            }
          }
        }
        out += " ); if (isAdditional" + $lvl + ") { ";
      }
      if ($removeAdditional == "all") {
        out += " delete " + $data + "[" + $key + "]; ";
      } else {
        var $currentErrorPath = it.errorPath;
        var $additionalProperty = "' + " + $key + " + '";
        if (it.opts._errorDataPathProperty) {
          it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
        }
        if ($noAdditional) {
          if ($removeAdditional) {
            out += " delete " + $data + "[" + $key + "]; ";
          } else {
            out += " " + $nextValid + " = false; ";
            var $currErrSchemaPath = $errSchemaPath;
            $errSchemaPath = it.errSchemaPath + "/additionalProperties";
            var $$outStack = $$outStack || [];
            $$outStack.push(out);
            out = "";
            if (it.createErrors !== false) {
              out += " { keyword: 'additionalProperties' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { additionalProperty: '" + $additionalProperty + "' } ";
              if (it.opts.messages !== false) {
                out += " , message: '";
                if (it.opts._errorDataPathProperty) {
                  out += "is an invalid additional property";
                } else {
                  out += "should NOT have additional properties";
                }
                out += "' ";
              }
              if (it.opts.verbose) {
                out += " , schema: false , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
              }
              out += " } ";
            } else {
              out += " {} ";
            }
            var __err = out;
            out = $$outStack.pop();
            if (!it.compositeRule && $breakOnError) {
              if (it.async) {
                out += " throw new ValidationError([" + __err + "]); ";
              } else {
                out += " validate.errors = [" + __err + "]; return false; ";
              }
            } else {
              out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
            }
            $errSchemaPath = $currErrSchemaPath;
            if ($breakOnError) {
              out += " break; ";
            }
          }
        } else if ($additionalIsSchema) {
          if ($removeAdditional == "failing") {
            out += " var " + $errs + " = errors;  ";
            var $wasComposite = it.compositeRule;
            it.compositeRule = $it.compositeRule = true;
            $it.schema = $aProperties;
            $it.schemaPath = it.schemaPath + ".additionalProperties";
            $it.errSchemaPath = it.errSchemaPath + "/additionalProperties";
            $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
            var $passData = $data + "[" + $key + "]";
            $it.dataPathArr[$dataNxt] = $key;
            var $code = it.validate($it);
            $it.baseId = $currentBaseId;
            if (it.util.varOccurences($code, $nextData) < 2) {
              out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
            } else {
              out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
            }
            out += " if (!" + $nextValid + ") { errors = " + $errs + "; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete " + $data + "[" + $key + "]; }  ";
            it.compositeRule = $it.compositeRule = $wasComposite;
          } else {
            $it.schema = $aProperties;
            $it.schemaPath = it.schemaPath + ".additionalProperties";
            $it.errSchemaPath = it.errSchemaPath + "/additionalProperties";
            $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
            var $passData = $data + "[" + $key + "]";
            $it.dataPathArr[$dataNxt] = $key;
            var $code = it.validate($it);
            $it.baseId = $currentBaseId;
            if (it.util.varOccurences($code, $nextData) < 2) {
              out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
            } else {
              out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
            }
            if ($breakOnError) {
              out += " if (!" + $nextValid + ") break; ";
            }
          }
        }
        it.errorPath = $currentErrorPath;
      }
      if ($someProperties) {
        out += " } ";
      }
      out += " }  ";
      if ($breakOnError) {
        out += " if (" + $nextValid + ") { ";
        $closingBraces += "}";
      }
    }
    var $useDefaults = it.opts.useDefaults && !it.compositeRule;
    if ($schemaKeys.length) {
      var arr3 = $schemaKeys;
      if (arr3) {
        var $propertyKey, i3 = -1, l3 = arr3.length - 1;
        while (i3 < l3) {
          $propertyKey = arr3[i3 += 1];
          var $sch = $schema2[$propertyKey];
          if (it.opts.strictKeywords ? typeof $sch == "object" && Object.keys($sch).length > 0 || $sch === false : it.util.schemaHasRules($sch, it.RULES.all)) {
            var $prop = it.util.getProperty($propertyKey), $passData = $data + $prop, $hasDefault = $useDefaults && $sch.default !== void 0;
            $it.schema = $sch;
            $it.schemaPath = $schemaPath + $prop;
            $it.errSchemaPath = $errSchemaPath + "/" + it.util.escapeFragment($propertyKey);
            $it.errorPath = it.util.getPath(it.errorPath, $propertyKey, it.opts.jsonPointers);
            $it.dataPathArr[$dataNxt] = it.util.toQuotedString($propertyKey);
            var $code = it.validate($it);
            $it.baseId = $currentBaseId;
            if (it.util.varOccurences($code, $nextData) < 2) {
              $code = it.util.varReplace($code, $nextData, $passData);
              var $useData = $passData;
            } else {
              var $useData = $nextData;
              out += " var " + $nextData + " = " + $passData + "; ";
            }
            if ($hasDefault) {
              out += " " + $code + " ";
            } else {
              if ($requiredHash && $requiredHash[$propertyKey]) {
                out += " if ( " + $useData + " === undefined ";
                if ($ownProperties) {
                  out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
                }
                out += ") { " + $nextValid + " = false; ";
                var $currentErrorPath = it.errorPath, $currErrSchemaPath = $errSchemaPath, $missingProperty = it.util.escapeQuotes($propertyKey);
                if (it.opts._errorDataPathProperty) {
                  it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
                }
                $errSchemaPath = it.errSchemaPath + "/required";
                var $$outStack = $$outStack || [];
                $$outStack.push(out);
                out = "";
                if (it.createErrors !== false) {
                  out += " { keyword: 'required' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { missingProperty: '" + $missingProperty + "' } ";
                  if (it.opts.messages !== false) {
                    out += " , message: '";
                    if (it.opts._errorDataPathProperty) {
                      out += "is a required property";
                    } else {
                      out += "should have required property \\'" + $missingProperty + "\\'";
                    }
                    out += "' ";
                  }
                  if (it.opts.verbose) {
                    out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
                  }
                  out += " } ";
                } else {
                  out += " {} ";
                }
                var __err = out;
                out = $$outStack.pop();
                if (!it.compositeRule && $breakOnError) {
                  if (it.async) {
                    out += " throw new ValidationError([" + __err + "]); ";
                  } else {
                    out += " validate.errors = [" + __err + "]; return false; ";
                  }
                } else {
                  out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                }
                $errSchemaPath = $currErrSchemaPath;
                it.errorPath = $currentErrorPath;
                out += " } else { ";
              } else {
                if ($breakOnError) {
                  out += " if ( " + $useData + " === undefined ";
                  if ($ownProperties) {
                    out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
                  }
                  out += ") { " + $nextValid + " = true; } else { ";
                } else {
                  out += " if (" + $useData + " !== undefined ";
                  if ($ownProperties) {
                    out += " &&   Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
                  }
                  out += " ) { ";
                }
              }
              out += " " + $code + " } ";
            }
          }
          if ($breakOnError) {
            out += " if (" + $nextValid + ") { ";
            $closingBraces += "}";
          }
        }
      }
    }
    if ($pPropertyKeys.length) {
      var arr4 = $pPropertyKeys;
      if (arr4) {
        var $pProperty, i4 = -1, l4 = arr4.length - 1;
        while (i4 < l4) {
          $pProperty = arr4[i4 += 1];
          var $sch = $pProperties[$pProperty];
          if (it.opts.strictKeywords ? typeof $sch == "object" && Object.keys($sch).length > 0 || $sch === false : it.util.schemaHasRules($sch, it.RULES.all)) {
            $it.schema = $sch;
            $it.schemaPath = it.schemaPath + ".patternProperties" + it.util.getProperty($pProperty);
            $it.errSchemaPath = it.errSchemaPath + "/patternProperties/" + it.util.escapeFragment($pProperty);
            if ($ownProperties) {
              out += " " + $dataProperties + " = " + $dataProperties + " || Object.keys(" + $data + "); for (var " + $idx + "=0; " + $idx + "<" + $dataProperties + ".length; " + $idx + "++) { var " + $key + " = " + $dataProperties + "[" + $idx + "]; ";
            } else {
              out += " for (var " + $key + " in " + $data + ") { ";
            }
            out += " if (" + it.usePattern($pProperty) + ".test(" + $key + ")) { ";
            $it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
            var $passData = $data + "[" + $key + "]";
            $it.dataPathArr[$dataNxt] = $key;
            var $code = it.validate($it);
            $it.baseId = $currentBaseId;
            if (it.util.varOccurences($code, $nextData) < 2) {
              out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
            } else {
              out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
            }
            if ($breakOnError) {
              out += " if (!" + $nextValid + ") break; ";
            }
            out += " } ";
            if ($breakOnError) {
              out += " else " + $nextValid + " = true; ";
            }
            out += " }  ";
            if ($breakOnError) {
              out += " if (" + $nextValid + ") { ";
              $closingBraces += "}";
            }
          }
        }
      }
    }
    if ($breakOnError) {
      out += " " + $closingBraces + " if (" + $errs + " == errors) {";
    }
    return out;
  };
  return properties$2;
}
var propertyNames;
var hasRequiredPropertyNames;
function requirePropertyNames() {
  if (hasRequiredPropertyNames) return propertyNames;
  hasRequiredPropertyNames = 1;
  propertyNames = function generate_propertyNames(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $errs = "errs__" + $lvl;
    var $it = it.util.copy(it);
    var $closingBraces = "";
    $it.level++;
    var $nextValid = "valid" + $it.level;
    out += "var " + $errs + " = errors;";
    if (it.opts.strictKeywords ? typeof $schema2 == "object" && Object.keys($schema2).length > 0 || $schema2 === false : it.util.schemaHasRules($schema2, it.RULES.all)) {
      $it.schema = $schema2;
      $it.schemaPath = $schemaPath;
      $it.errSchemaPath = $errSchemaPath;
      var $key = "key" + $lvl, $idx = "idx" + $lvl, $i = "i" + $lvl, $invalidName = "' + " + $key + " + '", $dataNxt = $it.dataLevel = it.dataLevel + 1, $nextData = "data" + $dataNxt, $dataProperties = "dataProperties" + $lvl, $ownProperties = it.opts.ownProperties, $currentBaseId = it.baseId;
      if ($ownProperties) {
        out += " var " + $dataProperties + " = undefined; ";
      }
      if ($ownProperties) {
        out += " " + $dataProperties + " = " + $dataProperties + " || Object.keys(" + $data + "); for (var " + $idx + "=0; " + $idx + "<" + $dataProperties + ".length; " + $idx + "++) { var " + $key + " = " + $dataProperties + "[" + $idx + "]; ";
      } else {
        out += " for (var " + $key + " in " + $data + ") { ";
      }
      out += " var startErrs" + $lvl + " = errors; ";
      var $passData = $key;
      var $wasComposite = it.compositeRule;
      it.compositeRule = $it.compositeRule = true;
      var $code = it.validate($it);
      $it.baseId = $currentBaseId;
      if (it.util.varOccurences($code, $nextData) < 2) {
        out += " " + it.util.varReplace($code, $nextData, $passData) + " ";
      } else {
        out += " var " + $nextData + " = " + $passData + "; " + $code + " ";
      }
      it.compositeRule = $it.compositeRule = $wasComposite;
      out += " if (!" + $nextValid + ") { for (var " + $i + "=startErrs" + $lvl + "; " + $i + "<errors; " + $i + "++) { vErrors[" + $i + "].propertyName = " + $key + "; }   var err =   ";
      if (it.createErrors !== false) {
        out += " { keyword: 'propertyNames' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { propertyName: '" + $invalidName + "' } ";
        if (it.opts.messages !== false) {
          out += " , message: 'property name \\'" + $invalidName + "\\' is invalid' ";
        }
        if (it.opts.verbose) {
          out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError(vErrors); ";
        } else {
          out += " validate.errors = vErrors; return false; ";
        }
      }
      if ($breakOnError) {
        out += " break; ";
      }
      out += " } }";
    }
    if ($breakOnError) {
      out += " " + $closingBraces + " if (" + $errs + " == errors) {";
    }
    return out;
  };
  return propertyNames;
}
var required$1;
var hasRequiredRequired;
function requireRequired() {
  if (hasRequiredRequired) return required$1;
  hasRequiredRequired = 1;
  required$1 = function generate_required(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $valid = "valid" + $lvl;
    var $isData = it.opts.$data && $schema2 && $schema2.$data;
    if ($isData) {
      out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
    }
    var $vSchema = "schema" + $lvl;
    if (!$isData) {
      if ($schema2.length < it.opts.loopRequired && it.schema.properties && Object.keys(it.schema.properties).length) {
        var $required = [];
        var arr1 = $schema2;
        if (arr1) {
          var $property, i1 = -1, l1 = arr1.length - 1;
          while (i1 < l1) {
            $property = arr1[i1 += 1];
            var $propertySch = it.schema.properties[$property];
            if (!($propertySch && (it.opts.strictKeywords ? typeof $propertySch == "object" && Object.keys($propertySch).length > 0 || $propertySch === false : it.util.schemaHasRules($propertySch, it.RULES.all)))) {
              $required[$required.length] = $property;
            }
          }
        }
      } else {
        var $required = $schema2;
      }
    }
    if ($isData || $required.length) {
      var $currentErrorPath = it.errorPath, $loopRequired = $isData || $required.length >= it.opts.loopRequired, $ownProperties = it.opts.ownProperties;
      if ($breakOnError) {
        out += " var missing" + $lvl + "; ";
        if ($loopRequired) {
          if (!$isData) {
            out += " var " + $vSchema + " = validate.schema" + $schemaPath + "; ";
          }
          var $i = "i" + $lvl, $propertyPath = "schema" + $lvl + "[" + $i + "]", $missingProperty = "' + " + $propertyPath + " + '";
          if (it.opts._errorDataPathProperty) {
            it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
          }
          out += " var " + $valid + " = true; ";
          if ($isData) {
            out += " if (schema" + $lvl + " === undefined) " + $valid + " = true; else if (!Array.isArray(schema" + $lvl + ")) " + $valid + " = false; else {";
          }
          out += " for (var " + $i + " = 0; " + $i + " < " + $vSchema + ".length; " + $i + "++) { " + $valid + " = " + $data + "[" + $vSchema + "[" + $i + "]] !== undefined ";
          if ($ownProperties) {
            out += " &&   Object.prototype.hasOwnProperty.call(" + $data + ", " + $vSchema + "[" + $i + "]) ";
          }
          out += "; if (!" + $valid + ") break; } ";
          if ($isData) {
            out += "  }  ";
          }
          out += "  if (!" + $valid + ") {   ";
          var $$outStack = $$outStack || [];
          $$outStack.push(out);
          out = "";
          if (it.createErrors !== false) {
            out += " { keyword: 'required' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { missingProperty: '" + $missingProperty + "' } ";
            if (it.opts.messages !== false) {
              out += " , message: '";
              if (it.opts._errorDataPathProperty) {
                out += "is a required property";
              } else {
                out += "should have required property \\'" + $missingProperty + "\\'";
              }
              out += "' ";
            }
            if (it.opts.verbose) {
              out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
            }
            out += " } ";
          } else {
            out += " {} ";
          }
          var __err = out;
          out = $$outStack.pop();
          if (!it.compositeRule && $breakOnError) {
            if (it.async) {
              out += " throw new ValidationError([" + __err + "]); ";
            } else {
              out += " validate.errors = [" + __err + "]; return false; ";
            }
          } else {
            out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
          }
          out += " } else { ";
        } else {
          out += " if ( ";
          var arr2 = $required;
          if (arr2) {
            var $propertyKey, $i = -1, l2 = arr2.length - 1;
            while ($i < l2) {
              $propertyKey = arr2[$i += 1];
              if ($i) {
                out += " || ";
              }
              var $prop = it.util.getProperty($propertyKey), $useData = $data + $prop;
              out += " ( ( " + $useData + " === undefined ";
              if ($ownProperties) {
                out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
              }
              out += ") && (missing" + $lvl + " = " + it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop) + ") ) ";
            }
          }
          out += ") {  ";
          var $propertyPath = "missing" + $lvl, $missingProperty = "' + " + $propertyPath + " + '";
          if (it.opts._errorDataPathProperty) {
            it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + " + " + $propertyPath;
          }
          var $$outStack = $$outStack || [];
          $$outStack.push(out);
          out = "";
          if (it.createErrors !== false) {
            out += " { keyword: 'required' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { missingProperty: '" + $missingProperty + "' } ";
            if (it.opts.messages !== false) {
              out += " , message: '";
              if (it.opts._errorDataPathProperty) {
                out += "is a required property";
              } else {
                out += "should have required property \\'" + $missingProperty + "\\'";
              }
              out += "' ";
            }
            if (it.opts.verbose) {
              out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
            }
            out += " } ";
          } else {
            out += " {} ";
          }
          var __err = out;
          out = $$outStack.pop();
          if (!it.compositeRule && $breakOnError) {
            if (it.async) {
              out += " throw new ValidationError([" + __err + "]); ";
            } else {
              out += " validate.errors = [" + __err + "]; return false; ";
            }
          } else {
            out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
          }
          out += " } else { ";
        }
      } else {
        if ($loopRequired) {
          if (!$isData) {
            out += " var " + $vSchema + " = validate.schema" + $schemaPath + "; ";
          }
          var $i = "i" + $lvl, $propertyPath = "schema" + $lvl + "[" + $i + "]", $missingProperty = "' + " + $propertyPath + " + '";
          if (it.opts._errorDataPathProperty) {
            it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
          }
          if ($isData) {
            out += " if (" + $vSchema + " && !Array.isArray(" + $vSchema + ")) {  var err =   ";
            if (it.createErrors !== false) {
              out += " { keyword: 'required' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { missingProperty: '" + $missingProperty + "' } ";
              if (it.opts.messages !== false) {
                out += " , message: '";
                if (it.opts._errorDataPathProperty) {
                  out += "is a required property";
                } else {
                  out += "should have required property \\'" + $missingProperty + "\\'";
                }
                out += "' ";
              }
              if (it.opts.verbose) {
                out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
              }
              out += " } ";
            } else {
              out += " {} ";
            }
            out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if (" + $vSchema + " !== undefined) { ";
          }
          out += " for (var " + $i + " = 0; " + $i + " < " + $vSchema + ".length; " + $i + "++) { if (" + $data + "[" + $vSchema + "[" + $i + "]] === undefined ";
          if ($ownProperties) {
            out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", " + $vSchema + "[" + $i + "]) ";
          }
          out += ") {  var err =   ";
          if (it.createErrors !== false) {
            out += " { keyword: 'required' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { missingProperty: '" + $missingProperty + "' } ";
            if (it.opts.messages !== false) {
              out += " , message: '";
              if (it.opts._errorDataPathProperty) {
                out += "is a required property";
              } else {
                out += "should have required property \\'" + $missingProperty + "\\'";
              }
              out += "' ";
            }
            if (it.opts.verbose) {
              out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
            }
            out += " } ";
          } else {
            out += " {} ";
          }
          out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ";
          if ($isData) {
            out += "  }  ";
          }
        } else {
          var arr3 = $required;
          if (arr3) {
            var $propertyKey, i3 = -1, l3 = arr3.length - 1;
            while (i3 < l3) {
              $propertyKey = arr3[i3 += 1];
              var $prop = it.util.getProperty($propertyKey), $missingProperty = it.util.escapeQuotes($propertyKey), $useData = $data + $prop;
              if (it.opts._errorDataPathProperty) {
                it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
              }
              out += " if ( " + $useData + " === undefined ";
              if ($ownProperties) {
                out += " || ! Object.prototype.hasOwnProperty.call(" + $data + ", '" + it.util.escapeQuotes($propertyKey) + "') ";
              }
              out += ") {  var err =   ";
              if (it.createErrors !== false) {
                out += " { keyword: 'required' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { missingProperty: '" + $missingProperty + "' } ";
                if (it.opts.messages !== false) {
                  out += " , message: '";
                  if (it.opts._errorDataPathProperty) {
                    out += "is a required property";
                  } else {
                    out += "should have required property \\'" + $missingProperty + "\\'";
                  }
                  out += "' ";
                }
                if (it.opts.verbose) {
                  out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
                }
                out += " } ";
              } else {
                out += " {} ";
              }
              out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ";
            }
          }
        }
      }
      it.errorPath = $currentErrorPath;
    } else if ($breakOnError) {
      out += " if (true) {";
    }
    return out;
  };
  return required$1;
}
var uniqueItems;
var hasRequiredUniqueItems;
function requireUniqueItems() {
  if (hasRequiredUniqueItems) return uniqueItems;
  hasRequiredUniqueItems = 1;
  uniqueItems = function generate_uniqueItems(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $data = "data" + ($dataLvl || "");
    var $valid = "valid" + $lvl;
    var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
    if ($isData) {
      out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
      $schemaValue = "schema" + $lvl;
    } else {
      $schemaValue = $schema2;
    }
    if (($schema2 || $isData) && it.opts.uniqueItems !== false) {
      if ($isData) {
        out += " var " + $valid + "; if (" + $schemaValue + " === false || " + $schemaValue + " === undefined) " + $valid + " = true; else if (typeof " + $schemaValue + " != 'boolean') " + $valid + " = false; else { ";
      }
      out += " var i = " + $data + ".length , " + $valid + " = true , j; if (i > 1) { ";
      var $itemType = it.schema.items && it.schema.items.type, $typeIsArray = Array.isArray($itemType);
      if (!$itemType || $itemType == "object" || $itemType == "array" || $typeIsArray && ($itemType.indexOf("object") >= 0 || $itemType.indexOf("array") >= 0)) {
        out += " outer: for (;i--;) { for (j = i; j--;) { if (equal(" + $data + "[i], " + $data + "[j])) { " + $valid + " = false; break outer; } } } ";
      } else {
        out += " var itemIndices = {}, item; for (;i--;) { var item = " + $data + "[i]; ";
        var $method = "checkDataType" + ($typeIsArray ? "s" : "");
        out += " if (" + it.util[$method]($itemType, "item", it.opts.strictNumbers, true) + ") continue; ";
        if ($typeIsArray) {
          out += ` if (typeof item == 'string') item = '"' + item; `;
        }
        out += " if (typeof itemIndices[item] == 'number') { " + $valid + " = false; j = itemIndices[item]; break; } itemIndices[item] = i; } ";
      }
      out += " } ";
      if ($isData) {
        out += "  }  ";
      }
      out += " if (!" + $valid + ") {   ";
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: 'uniqueItems' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { i: i, j: j } ";
        if (it.opts.messages !== false) {
          out += " , message: 'should NOT have duplicate items (items ## ' + j + ' and ' + i + ' are identical)' ";
        }
        if (it.opts.verbose) {
          out += " , schema:  ";
          if ($isData) {
            out += "validate.schema" + $schemaPath;
          } else {
            out += "" + $schema2;
          }
          out += "         , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      out += " } ";
      if ($breakOnError) {
        out += " else { ";
      }
    } else {
      if ($breakOnError) {
        out += " if (true) { ";
      }
    }
    return out;
  };
  return uniqueItems;
}
var dotjs;
var hasRequiredDotjs;
function requireDotjs() {
  if (hasRequiredDotjs) return dotjs;
  hasRequiredDotjs = 1;
  dotjs = {
    "$ref": requireRef(),
    allOf: requireAllOf(),
    anyOf: requireAnyOf(),
    "$comment": requireComment(),
    const: require_const(),
    contains: requireContains(),
    dependencies: requireDependencies(),
    "enum": require_enum(),
    format: requireFormat(),
    "if": require_if(),
    items: requireItems(),
    maximum: require_limit(),
    minimum: require_limit(),
    maxItems: require_limitItems(),
    minItems: require_limitItems(),
    maxLength: require_limitLength(),
    minLength: require_limitLength(),
    maxProperties: require_limitProperties(),
    minProperties: require_limitProperties(),
    multipleOf: requireMultipleOf(),
    not: requireNot(),
    oneOf: requireOneOf(),
    pattern: requirePattern(),
    properties: requireProperties(),
    propertyNames: requirePropertyNames(),
    required: requireRequired(),
    uniqueItems: requireUniqueItems(),
    validate: requireValidate()
  };
  return dotjs;
}
var rules;
var hasRequiredRules;
function requireRules() {
  if (hasRequiredRules) return rules;
  hasRequiredRules = 1;
  var ruleModules = requireDotjs(), toHash = requireUtil().toHash;
  rules = function rules2() {
    var RULES = [
      {
        type: "number",
        rules: [
          { "maximum": ["exclusiveMaximum"] },
          { "minimum": ["exclusiveMinimum"] },
          "multipleOf",
          "format"
        ]
      },
      {
        type: "string",
        rules: ["maxLength", "minLength", "pattern", "format"]
      },
      {
        type: "array",
        rules: ["maxItems", "minItems", "items", "contains", "uniqueItems"]
      },
      {
        type: "object",
        rules: [
          "maxProperties",
          "minProperties",
          "required",
          "dependencies",
          "propertyNames",
          { "properties": ["additionalProperties", "patternProperties"] }
        ]
      },
      { rules: ["$ref", "const", "enum", "not", "anyOf", "oneOf", "allOf", "if"] }
    ];
    var ALL = ["type", "$comment"];
    var KEYWORDS = [
      "$schema",
      "$id",
      "id",
      "$data",
      "$async",
      "title",
      "description",
      "default",
      "definitions",
      "examples",
      "readOnly",
      "writeOnly",
      "contentMediaType",
      "contentEncoding",
      "additionalItems",
      "then",
      "else"
    ];
    var TYPES = ["number", "integer", "string", "array", "object", "boolean", "null"];
    RULES.all = toHash(ALL);
    RULES.types = toHash(TYPES);
    RULES.forEach(function(group) {
      group.rules = group.rules.map(function(keyword2) {
        var implKeywords;
        if (typeof keyword2 == "object") {
          var key = Object.keys(keyword2)[0];
          implKeywords = keyword2[key];
          keyword2 = key;
          implKeywords.forEach(function(k) {
            ALL.push(k);
            RULES.all[k] = true;
          });
        }
        ALL.push(keyword2);
        var rule = RULES.all[keyword2] = {
          keyword: keyword2,
          code: ruleModules[keyword2],
          implements: implKeywords
        };
        return rule;
      });
      RULES.all.$comment = {
        keyword: "$comment",
        code: ruleModules.$comment
      };
      if (group.type) RULES.types[group.type] = group;
    });
    RULES.keywords = toHash(ALL.concat(KEYWORDS));
    RULES.custom = {};
    return RULES;
  };
  return rules;
}
var data;
var hasRequiredData;
function requireData() {
  if (hasRequiredData) return data;
  hasRequiredData = 1;
  var KEYWORDS = [
    "multipleOf",
    "maximum",
    "exclusiveMaximum",
    "minimum",
    "exclusiveMinimum",
    "maxLength",
    "minLength",
    "pattern",
    "additionalItems",
    "maxItems",
    "minItems",
    "uniqueItems",
    "maxProperties",
    "minProperties",
    "required",
    "additionalProperties",
    "enum",
    "format",
    "const"
  ];
  data = function(metaSchema, keywordsJsonPointers) {
    for (var i = 0; i < keywordsJsonPointers.length; i++) {
      metaSchema = JSON.parse(JSON.stringify(metaSchema));
      var segments = keywordsJsonPointers[i].split("/");
      var keywords = metaSchema;
      var j;
      for (j = 1; j < segments.length; j++)
        keywords = keywords[segments[j]];
      for (j = 0; j < KEYWORDS.length; j++) {
        var key = KEYWORDS[j];
        var schema = keywords[key];
        if (schema) {
          keywords[key] = {
            anyOf: [
              schema,
              { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" }
            ]
          };
        }
      }
    }
    return metaSchema;
  };
  return data;
}
var async;
var hasRequiredAsync;
function requireAsync() {
  if (hasRequiredAsync) return async;
  hasRequiredAsync = 1;
  var MissingRefError = requireError_classes().MissingRef;
  async = compileAsync;
  function compileAsync(schema, meta, callback) {
    var self2 = this;
    if (typeof this._opts.loadSchema != "function")
      throw new Error("options.loadSchema should be a function");
    if (typeof meta == "function") {
      callback = meta;
      meta = void 0;
    }
    var p = loadMetaSchemaOf(schema).then(function() {
      var schemaObj = self2._addSchema(schema, void 0, meta);
      return schemaObj.validate || _compileAsync(schemaObj);
    });
    if (callback) {
      p.then(
        function(v) {
          callback(null, v);
        },
        callback
      );
    }
    return p;
    function loadMetaSchemaOf(sch) {
      var $schema2 = sch.$schema;
      return $schema2 && !self2.getSchema($schema2) ? compileAsync.call(self2, { $ref: $schema2 }, true) : Promise.resolve();
    }
    function _compileAsync(schemaObj) {
      try {
        return self2._compile(schemaObj);
      } catch (e) {
        if (e instanceof MissingRefError) return loadMissingSchema(e);
        throw e;
      }
      function loadMissingSchema(e) {
        var ref2 = e.missingSchema;
        if (added(ref2)) throw new Error("Schema " + ref2 + " is loaded but " + e.missingRef + " cannot be resolved");
        var schemaPromise = self2._loadingSchemas[ref2];
        if (!schemaPromise) {
          schemaPromise = self2._loadingSchemas[ref2] = self2._opts.loadSchema(ref2);
          schemaPromise.then(removePromise, removePromise);
        }
        return schemaPromise.then(function(sch) {
          if (!added(ref2)) {
            return loadMetaSchemaOf(sch).then(function() {
              if (!added(ref2)) self2.addSchema(sch, ref2, void 0, meta);
            });
          }
        }).then(function() {
          return _compileAsync(schemaObj);
        });
        function removePromise() {
          delete self2._loadingSchemas[ref2];
        }
        function added(ref3) {
          return self2._refs[ref3] || self2._schemas[ref3];
        }
      }
    }
  }
  return async;
}
var custom;
var hasRequiredCustom;
function requireCustom() {
  if (hasRequiredCustom) return custom;
  hasRequiredCustom = 1;
  custom = function generate_custom(it, $keyword, $ruleType) {
    var out = " ";
    var $lvl = it.level;
    var $dataLvl = it.dataLevel;
    var $schema2 = it.schema[$keyword];
    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
    var $errSchemaPath = it.errSchemaPath + "/" + $keyword;
    var $breakOnError = !it.opts.allErrors;
    var $errorKeyword;
    var $data = "data" + ($dataLvl || "");
    var $valid = "valid" + $lvl;
    var $errs = "errs__" + $lvl;
    var $isData = it.opts.$data && $schema2 && $schema2.$data, $schemaValue;
    if ($isData) {
      out += " var schema" + $lvl + " = " + it.util.getData($schema2.$data, $dataLvl, it.dataPathArr) + "; ";
      $schemaValue = "schema" + $lvl;
    } else {
      $schemaValue = $schema2;
    }
    var $rule = this, $definition = "definition" + $lvl, $rDef = $rule.definition, $closingBraces = "";
    var $compile, $inline, $macro, $ruleValidate, $validateCode;
    if ($isData && $rDef.$data) {
      $validateCode = "keywordValidate" + $lvl;
      var $validateSchema = $rDef.validateSchema;
      out += " var " + $definition + " = RULES.custom['" + $keyword + "'].definition; var " + $validateCode + " = " + $definition + ".validate;";
    } else {
      $ruleValidate = it.useCustomRule($rule, $schema2, it.schema, it);
      if (!$ruleValidate) return;
      $schemaValue = "validate.schema" + $schemaPath;
      $validateCode = $ruleValidate.code;
      $compile = $rDef.compile;
      $inline = $rDef.inline;
      $macro = $rDef.macro;
    }
    var $ruleErrs = $validateCode + ".errors", $i = "i" + $lvl, $ruleErr = "ruleErr" + $lvl, $asyncKeyword = $rDef.async;
    if ($asyncKeyword && !it.async) throw new Error("async keyword in sync schema");
    if (!($inline || $macro)) {
      out += "" + $ruleErrs + " = null;";
    }
    out += "var " + $errs + " = errors;var " + $valid + ";";
    if ($isData && $rDef.$data) {
      $closingBraces += "}";
      out += " if (" + $schemaValue + " === undefined) { " + $valid + " = true; } else { ";
      if ($validateSchema) {
        $closingBraces += "}";
        out += " " + $valid + " = " + $definition + ".validateSchema(" + $schemaValue + "); if (" + $valid + ") { ";
      }
    }
    if ($inline) {
      if ($rDef.statements) {
        out += " " + $ruleValidate.validate + " ";
      } else {
        out += " " + $valid + " = " + $ruleValidate.validate + "; ";
      }
    } else if ($macro) {
      var $it = it.util.copy(it);
      var $closingBraces = "";
      $it.level++;
      var $nextValid = "valid" + $it.level;
      $it.schema = $ruleValidate.validate;
      $it.schemaPath = "";
      var $wasComposite = it.compositeRule;
      it.compositeRule = $it.compositeRule = true;
      var $code = it.validate($it).replace(/validate\.schema/g, $validateCode);
      it.compositeRule = $it.compositeRule = $wasComposite;
      out += " " + $code;
    } else {
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      out += "  " + $validateCode + ".call( ";
      if (it.opts.passContext) {
        out += "this";
      } else {
        out += "self";
      }
      if ($compile || $rDef.schema === false) {
        out += " , " + $data + " ";
      } else {
        out += " , " + $schemaValue + " , " + $data + " , validate.schema" + it.schemaPath + " ";
      }
      out += " , (dataPath || '')";
      if (it.errorPath != '""') {
        out += " + " + it.errorPath;
      }
      var $parentData = $dataLvl ? "data" + ($dataLvl - 1 || "") : "parentData", $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : "parentDataProperty";
      out += " , " + $parentData + " , " + $parentDataProperty + " , rootData )  ";
      var def_callRuleValidate = out;
      out = $$outStack.pop();
      if ($rDef.errors === false) {
        out += " " + $valid + " = ";
        if ($asyncKeyword) {
          out += "await ";
        }
        out += "" + def_callRuleValidate + "; ";
      } else {
        if ($asyncKeyword) {
          $ruleErrs = "customErrors" + $lvl;
          out += " var " + $ruleErrs + " = null; try { " + $valid + " = await " + def_callRuleValidate + "; } catch (e) { " + $valid + " = false; if (e instanceof ValidationError) " + $ruleErrs + " = e.errors; else throw e; } ";
        } else {
          out += " " + $ruleErrs + " = null; " + $valid + " = " + def_callRuleValidate + "; ";
        }
      }
    }
    if ($rDef.modifying) {
      out += " if (" + $parentData + ") " + $data + " = " + $parentData + "[" + $parentDataProperty + "];";
    }
    out += "" + $closingBraces;
    if ($rDef.valid) {
      if ($breakOnError) {
        out += " if (true) { ";
      }
    } else {
      out += " if ( ";
      if ($rDef.valid === void 0) {
        out += " !";
        if ($macro) {
          out += "" + $nextValid;
        } else {
          out += "" + $valid;
        }
      } else {
        out += " " + !$rDef.valid + " ";
      }
      out += ") { ";
      $errorKeyword = $rule.keyword;
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      var $$outStack = $$outStack || [];
      $$outStack.push(out);
      out = "";
      if (it.createErrors !== false) {
        out += " { keyword: '" + ($errorKeyword || "custom") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { keyword: '" + $rule.keyword + "' } ";
        if (it.opts.messages !== false) {
          out += ` , message: 'should pass "` + $rule.keyword + `" keyword validation' `;
        }
        if (it.opts.verbose) {
          out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
        }
        out += " } ";
      } else {
        out += " {} ";
      }
      var __err = out;
      out = $$outStack.pop();
      if (!it.compositeRule && $breakOnError) {
        if (it.async) {
          out += " throw new ValidationError([" + __err + "]); ";
        } else {
          out += " validate.errors = [" + __err + "]; return false; ";
        }
      } else {
        out += " var err = " + __err + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
      }
      var def_customError = out;
      out = $$outStack.pop();
      if ($inline) {
        if ($rDef.errors) {
          if ($rDef.errors != "full") {
            out += "  for (var " + $i + "=" + $errs + "; " + $i + "<errors; " + $i + "++) { var " + $ruleErr + " = vErrors[" + $i + "]; if (" + $ruleErr + ".dataPath === undefined) " + $ruleErr + ".dataPath = (dataPath || '') + " + it.errorPath + "; if (" + $ruleErr + ".schemaPath === undefined) { " + $ruleErr + '.schemaPath = "' + $errSchemaPath + '"; } ';
            if (it.opts.verbose) {
              out += " " + $ruleErr + ".schema = " + $schemaValue + "; " + $ruleErr + ".data = " + $data + "; ";
            }
            out += " } ";
          }
        } else {
          if ($rDef.errors === false) {
            out += " " + def_customError + " ";
          } else {
            out += " if (" + $errs + " == errors) { " + def_customError + " } else {  for (var " + $i + "=" + $errs + "; " + $i + "<errors; " + $i + "++) { var " + $ruleErr + " = vErrors[" + $i + "]; if (" + $ruleErr + ".dataPath === undefined) " + $ruleErr + ".dataPath = (dataPath || '') + " + it.errorPath + "; if (" + $ruleErr + ".schemaPath === undefined) { " + $ruleErr + '.schemaPath = "' + $errSchemaPath + '"; } ';
            if (it.opts.verbose) {
              out += " " + $ruleErr + ".schema = " + $schemaValue + "; " + $ruleErr + ".data = " + $data + "; ";
            }
            out += " } } ";
          }
        }
      } else if ($macro) {
        out += "   var err =   ";
        if (it.createErrors !== false) {
          out += " { keyword: '" + ($errorKeyword || "custom") + "' , dataPath: (dataPath || '') + " + it.errorPath + " , schemaPath: " + it.util.toQuotedString($errSchemaPath) + " , params: { keyword: '" + $rule.keyword + "' } ";
          if (it.opts.messages !== false) {
            out += ` , message: 'should pass "` + $rule.keyword + `" keyword validation' `;
          }
          if (it.opts.verbose) {
            out += " , schema: validate.schema" + $schemaPath + " , parentSchema: validate.schema" + it.schemaPath + " , data: " + $data + " ";
          }
          out += " } ";
        } else {
          out += " {} ";
        }
        out += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (!it.compositeRule && $breakOnError) {
          if (it.async) {
            out += " throw new ValidationError(vErrors); ";
          } else {
            out += " validate.errors = vErrors; return false; ";
          }
        }
      } else {
        if ($rDef.errors === false) {
          out += " " + def_customError + " ";
        } else {
          out += " if (Array.isArray(" + $ruleErrs + ")) { if (vErrors === null) vErrors = " + $ruleErrs + "; else vErrors = vErrors.concat(" + $ruleErrs + "); errors = vErrors.length;  for (var " + $i + "=" + $errs + "; " + $i + "<errors; " + $i + "++) { var " + $ruleErr + " = vErrors[" + $i + "]; if (" + $ruleErr + ".dataPath === undefined) " + $ruleErr + ".dataPath = (dataPath || '') + " + it.errorPath + ";  " + $ruleErr + '.schemaPath = "' + $errSchemaPath + '";  ';
          if (it.opts.verbose) {
            out += " " + $ruleErr + ".schema = " + $schemaValue + "; " + $ruleErr + ".data = " + $data + "; ";
          }
          out += " } } else { " + def_customError + " } ";
        }
      }
      out += " } ";
      if ($breakOnError) {
        out += " else { ";
      }
    }
    return out;
  };
  return custom;
}
const $schema$1 = "http://json-schema.org/draft-07/schema#";
const $id$1 = "http://json-schema.org/draft-07/schema#";
const title = "Core schema meta-schema";
const definitions = { "schemaArray": { "type": "array", "minItems": 1, "items": { "$ref": "#" } }, "nonNegativeInteger": { "type": "integer", "minimum": 0 }, "nonNegativeIntegerDefault0": { "allOf": [{ "$ref": "#/definitions/nonNegativeInteger" }, { "default": 0 }] }, "simpleTypes": { "enum": ["array", "boolean", "integer", "null", "number", "object", "string"] }, "stringArray": { "type": "array", "items": { "type": "string" }, "uniqueItems": true, "default": [] } };
const type$1 = ["object", "boolean"];
const properties$1 = { "$id": { "type": "string", "format": "uri-reference" }, "$schema": { "type": "string", "format": "uri" }, "$ref": { "type": "string", "format": "uri-reference" }, "$comment": { "type": "string" }, "title": { "type": "string" }, "description": { "type": "string" }, "default": true, "readOnly": { "type": "boolean", "default": false }, "examples": { "type": "array", "items": true }, "multipleOf": { "type": "number", "exclusiveMinimum": 0 }, "maximum": { "type": "number" }, "exclusiveMaximum": { "type": "number" }, "minimum": { "type": "number" }, "exclusiveMinimum": { "type": "number" }, "maxLength": { "$ref": "#/definitions/nonNegativeInteger" }, "minLength": { "$ref": "#/definitions/nonNegativeIntegerDefault0" }, "pattern": { "type": "string", "format": "regex" }, "additionalItems": { "$ref": "#" }, "items": { "anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/schemaArray" }], "default": true }, "maxItems": { "$ref": "#/definitions/nonNegativeInteger" }, "minItems": { "$ref": "#/definitions/nonNegativeIntegerDefault0" }, "uniqueItems": { "type": "boolean", "default": false }, "contains": { "$ref": "#" }, "maxProperties": { "$ref": "#/definitions/nonNegativeInteger" }, "minProperties": { "$ref": "#/definitions/nonNegativeIntegerDefault0" }, "required": { "$ref": "#/definitions/stringArray" }, "additionalProperties": { "$ref": "#" }, "definitions": { "type": "object", "additionalProperties": { "$ref": "#" }, "default": {} }, "properties": { "type": "object", "additionalProperties": { "$ref": "#" }, "default": {} }, "patternProperties": { "type": "object", "additionalProperties": { "$ref": "#" }, "propertyNames": { "format": "regex" }, "default": {} }, "dependencies": { "type": "object", "additionalProperties": { "anyOf": [{ "$ref": "#" }, { "$ref": "#/definitions/stringArray" }] } }, "propertyNames": { "$ref": "#" }, "const": true, "enum": { "type": "array", "items": true, "minItems": 1, "uniqueItems": true }, "type": { "anyOf": [{ "$ref": "#/definitions/simpleTypes" }, { "type": "array", "items": { "$ref": "#/definitions/simpleTypes" }, "minItems": 1, "uniqueItems": true }] }, "format": { "type": "string" }, "contentMediaType": { "type": "string" }, "contentEncoding": { "type": "string" }, "if": { "$ref": "#" }, "then": { "$ref": "#" }, "else": { "$ref": "#" }, "allOf": { "$ref": "#/definitions/schemaArray" }, "anyOf": { "$ref": "#/definitions/schemaArray" }, "oneOf": { "$ref": "#/definitions/schemaArray" }, "not": { "$ref": "#" } };
const require$$13 = {
  $schema: $schema$1,
  $id: $id$1,
  title,
  definitions,
  type: type$1,
  properties: properties$1,
  "default": true
};
var definition_schema;
var hasRequiredDefinition_schema;
function requireDefinition_schema() {
  if (hasRequiredDefinition_schema) return definition_schema;
  hasRequiredDefinition_schema = 1;
  var metaSchema = require$$13;
  definition_schema = {
    $id: "https://github.com/ajv-validator/ajv/blob/master/lib/definition_schema.js",
    definitions: {
      simpleTypes: metaSchema.definitions.simpleTypes
    },
    type: "object",
    dependencies: {
      schema: ["validate"],
      $data: ["validate"],
      statements: ["inline"],
      valid: { not: { required: ["macro"] } }
    },
    properties: {
      type: metaSchema.properties.type,
      schema: { type: "boolean" },
      statements: { type: "boolean" },
      dependencies: {
        type: "array",
        items: { type: "string" }
      },
      metaSchema: { type: "object" },
      modifying: { type: "boolean" },
      valid: { type: "boolean" },
      $data: { type: "boolean" },
      async: { type: "boolean" },
      errors: {
        anyOf: [
          { type: "boolean" },
          { const: "full" }
        ]
      }
    }
  };
  return definition_schema;
}
var keyword;
var hasRequiredKeyword;
function requireKeyword() {
  if (hasRequiredKeyword) return keyword;
  hasRequiredKeyword = 1;
  var IDENTIFIER = /^[a-z_$][a-z0-9_$-]*$/i;
  var customRuleCode = requireCustom();
  var definitionSchema = requireDefinition_schema();
  keyword = {
    add: addKeyword,
    get: getKeyword,
    remove: removeKeyword,
    validate: validateKeyword
  };
  function addKeyword(keyword2, definition) {
    var RULES = this.RULES;
    if (RULES.keywords[keyword2])
      throw new Error("Keyword " + keyword2 + " is already defined");
    if (!IDENTIFIER.test(keyword2))
      throw new Error("Keyword " + keyword2 + " is not a valid identifier");
    if (definition) {
      this.validateKeyword(definition, true);
      var dataType = definition.type;
      if (Array.isArray(dataType)) {
        for (var i = 0; i < dataType.length; i++)
          _addRule(keyword2, dataType[i], definition);
      } else {
        _addRule(keyword2, dataType, definition);
      }
      var metaSchema = definition.metaSchema;
      if (metaSchema) {
        if (definition.$data && this._opts.$data) {
          metaSchema = {
            anyOf: [
              metaSchema,
              { "$ref": "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" }
            ]
          };
        }
        definition.validateSchema = this.compile(metaSchema, true);
      }
    }
    RULES.keywords[keyword2] = RULES.all[keyword2] = true;
    function _addRule(keyword3, dataType2, definition2) {
      var ruleGroup;
      for (var i2 = 0; i2 < RULES.length; i2++) {
        var rg = RULES[i2];
        if (rg.type == dataType2) {
          ruleGroup = rg;
          break;
        }
      }
      if (!ruleGroup) {
        ruleGroup = { type: dataType2, rules: [] };
        RULES.push(ruleGroup);
      }
      var rule = {
        keyword: keyword3,
        definition: definition2,
        custom: true,
        code: customRuleCode,
        implements: definition2.implements
      };
      ruleGroup.rules.push(rule);
      RULES.custom[keyword3] = rule;
    }
    return this;
  }
  function getKeyword(keyword2) {
    var rule = this.RULES.custom[keyword2];
    return rule ? rule.definition : this.RULES.keywords[keyword2] || false;
  }
  function removeKeyword(keyword2) {
    var RULES = this.RULES;
    delete RULES.keywords[keyword2];
    delete RULES.all[keyword2];
    delete RULES.custom[keyword2];
    for (var i = 0; i < RULES.length; i++) {
      var rules2 = RULES[i].rules;
      for (var j = 0; j < rules2.length; j++) {
        if (rules2[j].keyword == keyword2) {
          rules2.splice(j, 1);
          break;
        }
      }
    }
    return this;
  }
  function validateKeyword(definition, throwError) {
    validateKeyword.errors = null;
    var v = this._validateKeyword = this._validateKeyword || this.compile(definitionSchema, true);
    if (v(definition)) return true;
    validateKeyword.errors = v.errors;
    if (throwError)
      throw new Error("custom keyword definition is invalid: " + this.errorsText(v.errors));
    else
      return false;
  }
  return keyword;
}
const $schema = "http://json-schema.org/draft-07/schema#";
const $id = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#";
const description = "Meta-schema for $data reference (JSON Schema extension proposal)";
const type = "object";
const required = ["$data"];
const properties = { "$data": { "type": "string", "anyOf": [{ "format": "relative-json-pointer" }, { "format": "json-pointer" }] } };
const additionalProperties = false;
const require$$12 = {
  $schema,
  $id,
  description,
  type,
  required,
  properties,
  additionalProperties
};
var ajv;
var hasRequiredAjv;
function requireAjv() {
  if (hasRequiredAjv) return ajv;
  hasRequiredAjv = 1;
  var compileSchema = requireCompile(), resolve = requireResolve(), Cache = requireCache(), SchemaObject = requireSchema_obj(), stableStringify = requireFastJsonStableStringify(), formats = requireFormats(), rules2 = requireRules(), $dataMetaSchema = requireData(), util2 = requireUtil();
  ajv = Ajv2;
  Ajv2.prototype.validate = validate2;
  Ajv2.prototype.compile = compile;
  Ajv2.prototype.addSchema = addSchema;
  Ajv2.prototype.addMetaSchema = addMetaSchema;
  Ajv2.prototype.validateSchema = validateSchema;
  Ajv2.prototype.getSchema = getSchema;
  Ajv2.prototype.removeSchema = removeSchema;
  Ajv2.prototype.addFormat = addFormat;
  Ajv2.prototype.errorsText = errorsText;
  Ajv2.prototype._addSchema = _addSchema;
  Ajv2.prototype._compile = _compile;
  Ajv2.prototype.compileAsync = requireAsync();
  var customKeyword = requireKeyword();
  Ajv2.prototype.addKeyword = customKeyword.add;
  Ajv2.prototype.getKeyword = customKeyword.get;
  Ajv2.prototype.removeKeyword = customKeyword.remove;
  Ajv2.prototype.validateKeyword = customKeyword.validate;
  var errorClasses = requireError_classes();
  Ajv2.ValidationError = errorClasses.Validation;
  Ajv2.MissingRefError = errorClasses.MissingRef;
  Ajv2.$dataMetaSchema = $dataMetaSchema;
  var META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
  var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes", "strictDefaults"];
  var META_SUPPORT_DATA = ["/properties"];
  function Ajv2(opts) {
    if (!(this instanceof Ajv2)) return new Ajv2(opts);
    opts = this._opts = util2.copy(opts) || {};
    setLogger(this);
    this._schemas = {};
    this._refs = {};
    this._fragments = {};
    this._formats = formats(opts.format);
    this._cache = opts.cache || new Cache();
    this._loadingSchemas = {};
    this._compilations = [];
    this.RULES = rules2();
    this._getId = chooseGetId(opts);
    opts.loopRequired = opts.loopRequired || Infinity;
    if (opts.errorDataPath == "property") opts._errorDataPathProperty = true;
    if (opts.serialize === void 0) opts.serialize = stableStringify;
    this._metaOpts = getMetaSchemaOptions(this);
    if (opts.formats) addInitialFormats(this);
    if (opts.keywords) addInitialKeywords(this);
    addDefaultMetaSchema(this);
    if (typeof opts.meta == "object") this.addMetaSchema(opts.meta);
    if (opts.nullable) this.addKeyword("nullable", { metaSchema: { type: "boolean" } });
    addInitialSchemas(this);
  }
  function validate2(schemaKeyRef, data2) {
    var v;
    if (typeof schemaKeyRef == "string") {
      v = this.getSchema(schemaKeyRef);
      if (!v) throw new Error('no schema with key or ref "' + schemaKeyRef + '"');
    } else {
      var schemaObj = this._addSchema(schemaKeyRef);
      v = schemaObj.validate || this._compile(schemaObj);
    }
    var valid = v(data2);
    if (v.$async !== true) this.errors = v.errors;
    return valid;
  }
  function compile(schema, _meta) {
    var schemaObj = this._addSchema(schema, void 0, _meta);
    return schemaObj.validate || this._compile(schemaObj);
  }
  function addSchema(schema, key, _skipValidation, _meta) {
    if (Array.isArray(schema)) {
      for (var i = 0; i < schema.length; i++) this.addSchema(schema[i], void 0, _skipValidation, _meta);
      return this;
    }
    var id = this._getId(schema);
    if (id !== void 0 && typeof id != "string")
      throw new Error("schema id must be string");
    key = resolve.normalizeId(key || id);
    checkUnique(this, key);
    this._schemas[key] = this._addSchema(schema, _skipValidation, _meta, true);
    return this;
  }
  function addMetaSchema(schema, key, skipValidation) {
    this.addSchema(schema, key, skipValidation, true);
    return this;
  }
  function validateSchema(schema, throwOrLogError) {
    var $schema2 = schema.$schema;
    if ($schema2 !== void 0 && typeof $schema2 != "string")
      throw new Error("$schema must be a string");
    $schema2 = $schema2 || this._opts.defaultMeta || defaultMeta(this);
    if (!$schema2) {
      this.logger.warn("meta-schema not available");
      this.errors = null;
      return true;
    }
    var valid = this.validate($schema2, schema);
    if (!valid && throwOrLogError) {
      var message = "schema is invalid: " + this.errorsText();
      if (this._opts.validateSchema == "log") this.logger.error(message);
      else throw new Error(message);
    }
    return valid;
  }
  function defaultMeta(self2) {
    var meta = self2._opts.meta;
    self2._opts.defaultMeta = typeof meta == "object" ? self2._getId(meta) || meta : self2.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0;
    return self2._opts.defaultMeta;
  }
  function getSchema(keyRef) {
    var schemaObj = _getSchemaObj(this, keyRef);
    switch (typeof schemaObj) {
      case "object":
        return schemaObj.validate || this._compile(schemaObj);
      case "string":
        return this.getSchema(schemaObj);
      case "undefined":
        return _getSchemaFragment(this, keyRef);
    }
  }
  function _getSchemaFragment(self2, ref2) {
    var res = resolve.schema.call(self2, { schema: {} }, ref2);
    if (res) {
      var schema = res.schema, root = res.root, baseId = res.baseId;
      var v = compileSchema.call(self2, schema, root, void 0, baseId);
      self2._fragments[ref2] = new SchemaObject({
        ref: ref2,
        fragment: true,
        schema,
        root,
        baseId,
        validate: v
      });
      return v;
    }
  }
  function _getSchemaObj(self2, keyRef) {
    keyRef = resolve.normalizeId(keyRef);
    return self2._schemas[keyRef] || self2._refs[keyRef] || self2._fragments[keyRef];
  }
  function removeSchema(schemaKeyRef) {
    if (schemaKeyRef instanceof RegExp) {
      _removeAllSchemas(this, this._schemas, schemaKeyRef);
      _removeAllSchemas(this, this._refs, schemaKeyRef);
      return this;
    }
    switch (typeof schemaKeyRef) {
      case "undefined":
        _removeAllSchemas(this, this._schemas);
        _removeAllSchemas(this, this._refs);
        this._cache.clear();
        return this;
      case "string":
        var schemaObj = _getSchemaObj(this, schemaKeyRef);
        if (schemaObj) this._cache.del(schemaObj.cacheKey);
        delete this._schemas[schemaKeyRef];
        delete this._refs[schemaKeyRef];
        return this;
      case "object":
        var serialize = this._opts.serialize;
        var cacheKey = serialize ? serialize(schemaKeyRef) : schemaKeyRef;
        this._cache.del(cacheKey);
        var id = this._getId(schemaKeyRef);
        if (id) {
          id = resolve.normalizeId(id);
          delete this._schemas[id];
          delete this._refs[id];
        }
    }
    return this;
  }
  function _removeAllSchemas(self2, schemas, regex) {
    for (var keyRef in schemas) {
      var schemaObj = schemas[keyRef];
      if (!schemaObj.meta && (!regex || regex.test(keyRef))) {
        self2._cache.del(schemaObj.cacheKey);
        delete schemas[keyRef];
      }
    }
  }
  function _addSchema(schema, skipValidation, meta, shouldAddSchema) {
    if (typeof schema != "object" && typeof schema != "boolean")
      throw new Error("schema should be object or boolean");
    var serialize = this._opts.serialize;
    var cacheKey = serialize ? serialize(schema) : schema;
    var cached = this._cache.get(cacheKey);
    if (cached) return cached;
    shouldAddSchema = shouldAddSchema || this._opts.addUsedSchema !== false;
    var id = resolve.normalizeId(this._getId(schema));
    if (id && shouldAddSchema) checkUnique(this, id);
    var willValidate = this._opts.validateSchema !== false && !skipValidation;
    var recursiveMeta;
    if (willValidate && !(recursiveMeta = id && id == resolve.normalizeId(schema.$schema)))
      this.validateSchema(schema, true);
    var localRefs = resolve.ids.call(this, schema);
    var schemaObj = new SchemaObject({
      id,
      schema,
      localRefs,
      cacheKey,
      meta
    });
    if (id[0] != "#" && shouldAddSchema) this._refs[id] = schemaObj;
    this._cache.put(cacheKey, schemaObj);
    if (willValidate && recursiveMeta) this.validateSchema(schema, true);
    return schemaObj;
  }
  function _compile(schemaObj, root) {
    if (schemaObj.compiling) {
      schemaObj.validate = callValidate;
      callValidate.schema = schemaObj.schema;
      callValidate.errors = null;
      callValidate.root = root ? root : callValidate;
      if (schemaObj.schema.$async === true)
        callValidate.$async = true;
      return callValidate;
    }
    schemaObj.compiling = true;
    var currentOpts;
    if (schemaObj.meta) {
      currentOpts = this._opts;
      this._opts = this._metaOpts;
    }
    var v;
    try {
      v = compileSchema.call(this, schemaObj.schema, root, schemaObj.localRefs);
    } catch (e) {
      delete schemaObj.validate;
      throw e;
    } finally {
      schemaObj.compiling = false;
      if (schemaObj.meta) this._opts = currentOpts;
    }
    schemaObj.validate = v;
    schemaObj.refs = v.refs;
    schemaObj.refVal = v.refVal;
    schemaObj.root = v.root;
    return v;
    function callValidate() {
      var _validate = schemaObj.validate;
      var result = _validate.apply(this, arguments);
      callValidate.errors = _validate.errors;
      return result;
    }
  }
  function chooseGetId(opts) {
    switch (opts.schemaId) {
      case "auto":
        return _get$IdOrId;
      case "id":
        return _getId;
      default:
        return _get$Id;
    }
  }
  function _getId(schema) {
    if (schema.$id) this.logger.warn("schema $id ignored", schema.$id);
    return schema.id;
  }
  function _get$Id(schema) {
    if (schema.id) this.logger.warn("schema id ignored", schema.id);
    return schema.$id;
  }
  function _get$IdOrId(schema) {
    if (schema.$id && schema.id && schema.$id != schema.id)
      throw new Error("schema $id is different from id");
    return schema.$id || schema.id;
  }
  function errorsText(errors, options) {
    errors = errors || this.errors;
    if (!errors) return "No errors";
    options = options || {};
    var separator = options.separator === void 0 ? ", " : options.separator;
    var dataVar = options.dataVar === void 0 ? "data" : options.dataVar;
    var text = "";
    for (var i = 0; i < errors.length; i++) {
      var e = errors[i];
      if (e) text += dataVar + e.dataPath + " " + e.message + separator;
    }
    return text.slice(0, -separator.length);
  }
  function addFormat(name, format2) {
    if (typeof format2 == "string") format2 = new RegExp(format2);
    this._formats[name] = format2;
    return this;
  }
  function addDefaultMetaSchema(self2) {
    var $dataSchema;
    if (self2._opts.$data) {
      $dataSchema = require$$12;
      self2.addMetaSchema($dataSchema, $dataSchema.$id, true);
    }
    if (self2._opts.meta === false) return;
    var metaSchema = require$$13;
    if (self2._opts.$data) metaSchema = $dataMetaSchema(metaSchema, META_SUPPORT_DATA);
    self2.addMetaSchema(metaSchema, META_SCHEMA_ID, true);
    self2._refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
  }
  function addInitialSchemas(self2) {
    var optsSchemas = self2._opts.schemas;
    if (!optsSchemas) return;
    if (Array.isArray(optsSchemas)) self2.addSchema(optsSchemas);
    else for (var key in optsSchemas) self2.addSchema(optsSchemas[key], key);
  }
  function addInitialFormats(self2) {
    for (var name in self2._opts.formats) {
      var format2 = self2._opts.formats[name];
      self2.addFormat(name, format2);
    }
  }
  function addInitialKeywords(self2) {
    for (var name in self2._opts.keywords) {
      var keyword2 = self2._opts.keywords[name];
      self2.addKeyword(name, keyword2);
    }
  }
  function checkUnique(self2, id) {
    if (self2._schemas[id] || self2._refs[id])
      throw new Error('schema with key or id "' + id + '" already exists');
  }
  function getMetaSchemaOptions(self2) {
    var metaOpts = util2.copy(self2._opts);
    for (var i = 0; i < META_IGNORE_OPTIONS.length; i++)
      delete metaOpts[META_IGNORE_OPTIONS[i]];
    return metaOpts;
  }
  function setLogger(self2) {
    var logger = self2._opts.logger;
    if (logger === false) {
      self2.logger = { log: noop2, warn: noop2, error: noop2 };
    } else {
      if (logger === void 0) logger = console;
      if (!(typeof logger == "object" && logger.log && logger.warn && logger.error))
        throw new Error("logger must implement log, warn and error methods");
      self2.logger = logger;
    }
  }
  function noop2() {
  }
  return ajv;
}
var ajvExports = requireAjv();
const Ajv = /* @__PURE__ */ getDefaultExportFromCjs(ajvExports);
class Client extends Protocol {
  /**
   * Initializes this client with the given name and version information.
   */
  constructor(_clientInfo, options) {
    var _a2;
    super(options);
    this._clientInfo = _clientInfo;
    this._cachedToolOutputValidators = /* @__PURE__ */ new Map();
    this._capabilities = (_a2 = options === null || options === void 0 ? void 0 : options.capabilities) !== null && _a2 !== void 0 ? _a2 : {};
    this._ajv = new Ajv();
  }
  /**
   * Registers new capabilities. This can only be called before connecting to a transport.
   *
   * The new capabilities will be merged with any existing capabilities previously given (e.g., at initialization).
   */
  registerCapabilities(capabilities) {
    if (this.transport) {
      throw new Error("Cannot register capabilities after connecting to transport");
    }
    this._capabilities = mergeCapabilities(this._capabilities, capabilities);
  }
  assertCapability(capability, method) {
    var _a2;
    if (!((_a2 = this._serverCapabilities) === null || _a2 === void 0 ? void 0 : _a2[capability])) {
      throw new Error(`Server does not support ${capability} (required for ${method})`);
    }
  }
  async connect(transport, options) {
    await super.connect(transport);
    if (transport.sessionId !== void 0) {
      return;
    }
    try {
      const result = await this.request({
        method: "initialize",
        params: {
          protocolVersion: LATEST_PROTOCOL_VERSION,
          capabilities: this._capabilities,
          clientInfo: this._clientInfo
        }
      }, InitializeResultSchema, options);
      if (result === void 0) {
        throw new Error(`Server sent invalid initialize result: ${result}`);
      }
      if (!SUPPORTED_PROTOCOL_VERSIONS.includes(result.protocolVersion)) {
        throw new Error(`Server's protocol version is not supported: ${result.protocolVersion}`);
      }
      this._serverCapabilities = result.capabilities;
      this._serverVersion = result.serverInfo;
      if (transport.setProtocolVersion) {
        transport.setProtocolVersion(result.protocolVersion);
      }
      this._instructions = result.instructions;
      await this.notification({
        method: "notifications/initialized"
      });
    } catch (error) {
      void this.close();
      throw error;
    }
  }
  /**
   * After initialization has completed, this will be populated with the server's reported capabilities.
   */
  getServerCapabilities() {
    return this._serverCapabilities;
  }
  /**
   * After initialization has completed, this will be populated with information about the server's name and version.
   */
  getServerVersion() {
    return this._serverVersion;
  }
  /**
   * After initialization has completed, this may be populated with information about the server's instructions.
   */
  getInstructions() {
    return this._instructions;
  }
  assertCapabilityForMethod(method) {
    var _a2, _b, _c, _d, _e;
    switch (method) {
      case "logging/setLevel":
        if (!((_a2 = this._serverCapabilities) === null || _a2 === void 0 ? void 0 : _a2.logging)) {
          throw new Error(`Server does not support logging (required for ${method})`);
        }
        break;
      case "prompts/get":
      case "prompts/list":
        if (!((_b = this._serverCapabilities) === null || _b === void 0 ? void 0 : _b.prompts)) {
          throw new Error(`Server does not support prompts (required for ${method})`);
        }
        break;
      case "resources/list":
      case "resources/templates/list":
      case "resources/read":
      case "resources/subscribe":
      case "resources/unsubscribe":
        if (!((_c = this._serverCapabilities) === null || _c === void 0 ? void 0 : _c.resources)) {
          throw new Error(`Server does not support resources (required for ${method})`);
        }
        if (method === "resources/subscribe" && !this._serverCapabilities.resources.subscribe) {
          throw new Error(`Server does not support resource subscriptions (required for ${method})`);
        }
        break;
      case "tools/call":
      case "tools/list":
        if (!((_d = this._serverCapabilities) === null || _d === void 0 ? void 0 : _d.tools)) {
          throw new Error(`Server does not support tools (required for ${method})`);
        }
        break;
      case "completion/complete":
        if (!((_e = this._serverCapabilities) === null || _e === void 0 ? void 0 : _e.completions)) {
          throw new Error(`Server does not support completions (required for ${method})`);
        }
        break;
    }
  }
  assertNotificationCapability(method) {
    var _a2;
    switch (method) {
      case "notifications/roots/list_changed":
        if (!((_a2 = this._capabilities.roots) === null || _a2 === void 0 ? void 0 : _a2.listChanged)) {
          throw new Error(`Client does not support roots list changed notifications (required for ${method})`);
        }
        break;
    }
  }
  assertRequestHandlerCapability(method) {
    switch (method) {
      case "sampling/createMessage":
        if (!this._capabilities.sampling) {
          throw new Error(`Client does not support sampling capability (required for ${method})`);
        }
        break;
      case "elicitation/create":
        if (!this._capabilities.elicitation) {
          throw new Error(`Client does not support elicitation capability (required for ${method})`);
        }
        break;
      case "roots/list":
        if (!this._capabilities.roots) {
          throw new Error(`Client does not support roots capability (required for ${method})`);
        }
        break;
    }
  }
  async ping(options) {
    return this.request({ method: "ping" }, EmptyResultSchema, options);
  }
  async complete(params, options) {
    return this.request({ method: "completion/complete", params }, CompleteResultSchema, options);
  }
  async setLoggingLevel(level, options) {
    return this.request({ method: "logging/setLevel", params: { level } }, EmptyResultSchema, options);
  }
  async getPrompt(params, options) {
    return this.request({ method: "prompts/get", params }, GetPromptResultSchema, options);
  }
  async listPrompts(params, options) {
    return this.request({ method: "prompts/list", params }, ListPromptsResultSchema, options);
  }
  async listResources(params, options) {
    return this.request({ method: "resources/list", params }, ListResourcesResultSchema, options);
  }
  async listResourceTemplates(params, options) {
    return this.request({ method: "resources/templates/list", params }, ListResourceTemplatesResultSchema, options);
  }
  async readResource(params, options) {
    return this.request({ method: "resources/read", params }, ReadResourceResultSchema, options);
  }
  async subscribeResource(params, options) {
    return this.request({ method: "resources/subscribe", params }, EmptyResultSchema, options);
  }
  async unsubscribeResource(params, options) {
    return this.request({ method: "resources/unsubscribe", params }, EmptyResultSchema, options);
  }
  async callTool(params, resultSchema = CallToolResultSchema, options) {
    const result = await this.request({ method: "tools/call", params }, resultSchema, options);
    const validator = this.getToolOutputValidator(params.name);
    if (validator) {
      if (!result.structuredContent && !result.isError) {
        throw new McpError(ErrorCode.InvalidRequest, `Tool ${params.name} has an output schema but did not return structured content`);
      }
      if (result.structuredContent) {
        try {
          const isValid2 = validator(result.structuredContent);
          if (!isValid2) {
            throw new McpError(ErrorCode.InvalidParams, `Structured content does not match the tool's output schema: ${this._ajv.errorsText(validator.errors)}`);
          }
        } catch (error) {
          if (error instanceof McpError) {
            throw error;
          }
          throw new McpError(ErrorCode.InvalidParams, `Failed to validate structured content: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    }
    return result;
  }
  cacheToolOutputSchemas(tools) {
    this._cachedToolOutputValidators.clear();
    for (const tool of tools) {
      if (tool.outputSchema) {
        try {
          const validator = this._ajv.compile(tool.outputSchema);
          this._cachedToolOutputValidators.set(tool.name, validator);
        } catch (_a2) {
        }
      }
    }
  }
  getToolOutputValidator(toolName) {
    return this._cachedToolOutputValidators.get(toolName);
  }
  async listTools(params, options) {
    const result = await this.request({ method: "tools/list", params }, ListToolsResultSchema, options);
    this.cacheToolOutputSchemas(result.tools);
    return result;
  }
  async sendRootsListChanged() {
    return this.notification({ method: "notifications/roots/list_changed" });
  }
}
class ParseError extends Error {
  constructor(message, options) {
    super(message), this.name = "ParseError", this.type = options.type, this.field = options.field, this.value = options.value, this.line = options.line;
  }
}
function noop(_arg) {
}
function createParser(callbacks) {
  if (typeof callbacks == "function")
    throw new TypeError(
      "`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?"
    );
  const { onEvent = noop, onError = noop, onRetry = noop, onComment } = callbacks;
  let incompleteLine = "", isFirstChunk = true, id, data2 = "", eventType = "";
  function feed(newChunk) {
    const chunk = isFirstChunk ? newChunk.replace(/^\xEF\xBB\xBF/, "") : newChunk, [complete, incomplete] = splitLines(`${incompleteLine}${chunk}`);
    for (const line of complete)
      parseLine(line);
    incompleteLine = incomplete, isFirstChunk = false;
  }
  function parseLine(line) {
    if (line === "") {
      dispatchEvent();
      return;
    }
    if (line.startsWith(":")) {
      onComment && onComment(line.slice(line.startsWith(": ") ? 2 : 1));
      return;
    }
    const fieldSeparatorIndex = line.indexOf(":");
    if (fieldSeparatorIndex !== -1) {
      const field = line.slice(0, fieldSeparatorIndex), offset = line[fieldSeparatorIndex + 1] === " " ? 2 : 1, value = line.slice(fieldSeparatorIndex + offset);
      processField(field, value, line);
      return;
    }
    processField(line, "", line);
  }
  function processField(field, value, line) {
    switch (field) {
      case "event":
        eventType = value;
        break;
      case "data":
        data2 = `${data2}${value}
`;
        break;
      case "id":
        id = value.includes("\0") ? void 0 : value;
        break;
      case "retry":
        /^\d+$/.test(value) ? onRetry(parseInt(value, 10)) : onError(
          new ParseError(`Invalid \`retry\` value: "${value}"`, {
            type: "invalid-retry",
            value,
            line
          })
        );
        break;
      default:
        onError(
          new ParseError(
            `Unknown field "${field.length > 20 ? `${field.slice(0, 20)}…` : field}"`,
            { type: "unknown-field", field, value, line }
          )
        );
        break;
    }
  }
  function dispatchEvent() {
    data2.length > 0 && onEvent({
      id,
      event: eventType || void 0,
      // If the data buffer's last character is a U+000A LINE FEED (LF) character,
      // then remove the last character from the data buffer.
      data: data2.endsWith(`
`) ? data2.slice(0, -1) : data2
    }), id = void 0, data2 = "", eventType = "";
  }
  function reset(options = {}) {
    incompleteLine && options.consume && parseLine(incompleteLine), isFirstChunk = true, id = void 0, data2 = "", eventType = "", incompleteLine = "";
  }
  return { feed, reset };
}
function splitLines(chunk) {
  const lines = [];
  let incompleteLine = "", searchIndex = 0;
  for (; searchIndex < chunk.length; ) {
    const crIndex = chunk.indexOf("\r", searchIndex), lfIndex = chunk.indexOf(`
`, searchIndex);
    let lineEnd = -1;
    if (crIndex !== -1 && lfIndex !== -1 ? lineEnd = Math.min(crIndex, lfIndex) : crIndex !== -1 ? crIndex === chunk.length - 1 ? lineEnd = -1 : lineEnd = crIndex : lfIndex !== -1 && (lineEnd = lfIndex), lineEnd === -1) {
      incompleteLine = chunk.slice(searchIndex);
      break;
    } else {
      const line = chunk.slice(searchIndex, lineEnd);
      lines.push(line), searchIndex = lineEnd + 1, chunk[searchIndex - 1] === "\r" && chunk[searchIndex] === `
` && searchIndex++;
    }
  }
  return [lines, incompleteLine];
}
class ErrorEvent extends Event {
  /**
   * Constructs a new `ErrorEvent` instance. This is typically not called directly,
   * but rather emitted by the `EventSource` object when an error occurs.
   *
   * @param type - The type of the event (should be "error")
   * @param errorEventInitDict - Optional properties to include in the error event
   */
  constructor(type2, errorEventInitDict) {
    var _a2, _b;
    super(type2), this.code = (_a2 = errorEventInitDict == null ? void 0 : errorEventInitDict.code) != null ? _a2 : void 0, this.message = (_b = errorEventInitDict == null ? void 0 : errorEventInitDict.message) != null ? _b : void 0;
  }
  /**
   * Node.js "hides" the `message` and `code` properties of the `ErrorEvent` instance,
   * when it is `console.log`'ed. This makes it harder to debug errors. To ease debugging,
   * we explicitly include the properties in the `inspect` method.
   *
   * This is automatically called by Node.js when you `console.log` an instance of this class.
   *
   * @param _depth - The current depth
   * @param options - The options passed to `util.inspect`
   * @param inspect - The inspect function to use (prevents having to import it from `util`)
   * @returns A string representation of the error
   */
  [Symbol.for("nodejs.util.inspect.custom")](_depth, options, inspect) {
    return inspect(inspectableError(this), options);
  }
  /**
   * Deno "hides" the `message` and `code` properties of the `ErrorEvent` instance,
   * when it is `console.log`'ed. This makes it harder to debug errors. To ease debugging,
   * we explicitly include the properties in the `inspect` method.
   *
   * This is automatically called by Deno when you `console.log` an instance of this class.
   *
   * @param inspect - The inspect function to use (prevents having to import it from `util`)
   * @param options - The options passed to `Deno.inspect`
   * @returns A string representation of the error
   */
  [Symbol.for("Deno.customInspect")](inspect, options) {
    return inspect(inspectableError(this), options);
  }
}
function syntaxError(message) {
  const DomException = globalThis.DOMException;
  return typeof DomException == "function" ? new DomException(message, "SyntaxError") : new SyntaxError(message);
}
function flattenError(err) {
  return err instanceof Error ? "errors" in err && Array.isArray(err.errors) ? err.errors.map(flattenError).join(", ") : "cause" in err && err.cause instanceof Error ? `${err}: ${flattenError(err.cause)}` : err.message : `${err}`;
}
function inspectableError(err) {
  return {
    type: err.type,
    message: err.message,
    code: err.code,
    defaultPrevented: err.defaultPrevented,
    cancelable: err.cancelable,
    timeStamp: err.timeStamp
  };
}
var __typeError = (msg) => {
  throw TypeError(msg);
}, __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg), __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj)), __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value), __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value), __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method), _readyState, _url, _redirectUrl, _withCredentials, _fetch, _reconnectInterval, _reconnectTimer, _lastEventId, _controller, _parser, _onError, _onMessage, _onOpen, _EventSource_instances, connect_fn, _onFetchResponse, _onFetchError, getRequestOptions_fn, _onEvent, _onRetryChange, failConnection_fn, scheduleReconnect_fn, _reconnect;
class EventSource extends EventTarget {
  constructor(url, eventSourceInitDict) {
    var _a2, _b;
    super(), __privateAdd(this, _EventSource_instances), this.CONNECTING = 0, this.OPEN = 1, this.CLOSED = 2, __privateAdd(this, _readyState), __privateAdd(this, _url), __privateAdd(this, _redirectUrl), __privateAdd(this, _withCredentials), __privateAdd(this, _fetch), __privateAdd(this, _reconnectInterval), __privateAdd(this, _reconnectTimer), __privateAdd(this, _lastEventId, null), __privateAdd(this, _controller), __privateAdd(this, _parser), __privateAdd(this, _onError, null), __privateAdd(this, _onMessage, null), __privateAdd(this, _onOpen, null), __privateAdd(this, _onFetchResponse, async (response) => {
      var _a22;
      __privateGet(this, _parser).reset();
      const { body, redirected, status, headers } = response;
      if (status === 204) {
        __privateMethod(this, _EventSource_instances, failConnection_fn).call(this, "Server sent HTTP 204, not reconnecting", 204), this.close();
        return;
      }
      if (redirected ? __privateSet(this, _redirectUrl, new URL(response.url)) : __privateSet(this, _redirectUrl, void 0), status !== 200) {
        __privateMethod(this, _EventSource_instances, failConnection_fn).call(this, `Non-200 status code (${status})`, status);
        return;
      }
      if (!(headers.get("content-type") || "").startsWith("text/event-stream")) {
        __privateMethod(this, _EventSource_instances, failConnection_fn).call(this, 'Invalid content type, expected "text/event-stream"', status);
        return;
      }
      if (__privateGet(this, _readyState) === this.CLOSED)
        return;
      __privateSet(this, _readyState, this.OPEN);
      const openEvent = new Event("open");
      if ((_a22 = __privateGet(this, _onOpen)) == null || _a22.call(this, openEvent), this.dispatchEvent(openEvent), typeof body != "object" || !body || !("getReader" in body)) {
        __privateMethod(this, _EventSource_instances, failConnection_fn).call(this, "Invalid response body, expected a web ReadableStream", status), this.close();
        return;
      }
      const decoder = new TextDecoder(), reader = body.getReader();
      let open = true;
      do {
        const { done, value } = await reader.read();
        value && __privateGet(this, _parser).feed(decoder.decode(value, { stream: !done })), done && (open = false, __privateGet(this, _parser).reset(), __privateMethod(this, _EventSource_instances, scheduleReconnect_fn).call(this));
      } while (open);
    }), __privateAdd(this, _onFetchError, (err) => {
      __privateSet(this, _controller, void 0), !(err.name === "AbortError" || err.type === "aborted") && __privateMethod(this, _EventSource_instances, scheduleReconnect_fn).call(this, flattenError(err));
    }), __privateAdd(this, _onEvent, (event) => {
      typeof event.id == "string" && __privateSet(this, _lastEventId, event.id);
      const messageEvent = new MessageEvent(event.event || "message", {
        data: event.data,
        origin: __privateGet(this, _redirectUrl) ? __privateGet(this, _redirectUrl).origin : __privateGet(this, _url).origin,
        lastEventId: event.id || ""
      });
      __privateGet(this, _onMessage) && (!event.event || event.event === "message") && __privateGet(this, _onMessage).call(this, messageEvent), this.dispatchEvent(messageEvent);
    }), __privateAdd(this, _onRetryChange, (value) => {
      __privateSet(this, _reconnectInterval, value);
    }), __privateAdd(this, _reconnect, () => {
      __privateSet(this, _reconnectTimer, void 0), __privateGet(this, _readyState) === this.CONNECTING && __privateMethod(this, _EventSource_instances, connect_fn).call(this);
    });
    try {
      if (url instanceof URL)
        __privateSet(this, _url, url);
      else if (typeof url == "string")
        __privateSet(this, _url, new URL(url, getBaseURL()));
      else
        throw new Error("Invalid URL");
    } catch {
      throw syntaxError("An invalid or illegal string was specified");
    }
    __privateSet(this, _parser, createParser({
      onEvent: __privateGet(this, _onEvent),
      onRetry: __privateGet(this, _onRetryChange)
    })), __privateSet(this, _readyState, this.CONNECTING), __privateSet(this, _reconnectInterval, 3e3), __privateSet(this, _fetch, (_a2 = eventSourceInitDict == null ? void 0 : eventSourceInitDict.fetch) != null ? _a2 : globalThis.fetch), __privateSet(this, _withCredentials, (_b = eventSourceInitDict == null ? void 0 : eventSourceInitDict.withCredentials) != null ? _b : false), __privateMethod(this, _EventSource_instances, connect_fn).call(this);
  }
  /**
   * Returns the state of this EventSource object's connection. It can have the values described below.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/readyState)
   *
   * Note: typed as `number` instead of `0 | 1 | 2` for compatibility with the `EventSource` interface,
   * defined in the TypeScript `dom` library.
   *
   * @public
   */
  get readyState() {
    return __privateGet(this, _readyState);
  }
  /**
   * Returns the URL providing the event stream.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/url)
   *
   * @public
   */
  get url() {
    return __privateGet(this, _url).href;
  }
  /**
   * Returns true if the credentials mode for connection requests to the URL providing the event stream is set to "include", and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/withCredentials)
   */
  get withCredentials() {
    return __privateGet(this, _withCredentials);
  }
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/error_event) */
  get onerror() {
    return __privateGet(this, _onError);
  }
  set onerror(value) {
    __privateSet(this, _onError, value);
  }
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/message_event) */
  get onmessage() {
    return __privateGet(this, _onMessage);
  }
  set onmessage(value) {
    __privateSet(this, _onMessage, value);
  }
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/open_event) */
  get onopen() {
    return __privateGet(this, _onOpen);
  }
  set onopen(value) {
    __privateSet(this, _onOpen, value);
  }
  addEventListener(type2, listener, options) {
    const listen = listener;
    super.addEventListener(type2, listen, options);
  }
  removeEventListener(type2, listener, options) {
    const listen = listener;
    super.removeEventListener(type2, listen, options);
  }
  /**
   * Aborts any instances of the fetch algorithm started for this EventSource object, and sets the readyState attribute to CLOSED.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/close)
   *
   * @public
   */
  close() {
    __privateGet(this, _reconnectTimer) && clearTimeout(__privateGet(this, _reconnectTimer)), __privateGet(this, _readyState) !== this.CLOSED && (__privateGet(this, _controller) && __privateGet(this, _controller).abort(), __privateSet(this, _readyState, this.CLOSED), __privateSet(this, _controller, void 0));
  }
}
_readyState = /* @__PURE__ */ new WeakMap(), _url = /* @__PURE__ */ new WeakMap(), _redirectUrl = /* @__PURE__ */ new WeakMap(), _withCredentials = /* @__PURE__ */ new WeakMap(), _fetch = /* @__PURE__ */ new WeakMap(), _reconnectInterval = /* @__PURE__ */ new WeakMap(), _reconnectTimer = /* @__PURE__ */ new WeakMap(), _lastEventId = /* @__PURE__ */ new WeakMap(), _controller = /* @__PURE__ */ new WeakMap(), _parser = /* @__PURE__ */ new WeakMap(), _onError = /* @__PURE__ */ new WeakMap(), _onMessage = /* @__PURE__ */ new WeakMap(), _onOpen = /* @__PURE__ */ new WeakMap(), _EventSource_instances = /* @__PURE__ */ new WeakSet(), /**
* Connect to the given URL and start receiving events
*
* @internal
*/
connect_fn = function() {
  __privateSet(this, _readyState, this.CONNECTING), __privateSet(this, _controller, new AbortController()), __privateGet(this, _fetch)(__privateGet(this, _url), __privateMethod(this, _EventSource_instances, getRequestOptions_fn).call(this)).then(__privateGet(this, _onFetchResponse)).catch(__privateGet(this, _onFetchError));
}, _onFetchResponse = /* @__PURE__ */ new WeakMap(), _onFetchError = /* @__PURE__ */ new WeakMap(), /**
* Get request options for the `fetch()` request
*
* @returns The request options
* @internal
*/
getRequestOptions_fn = function() {
  var _a2;
  const init = {
    // [spec] Let `corsAttributeState` be `Anonymous`…
    // [spec] …will have their mode set to "cors"…
    mode: "cors",
    redirect: "follow",
    headers: { Accept: "text/event-stream", ...__privateGet(this, _lastEventId) ? { "Last-Event-ID": __privateGet(this, _lastEventId) } : void 0 },
    cache: "no-store",
    signal: (_a2 = __privateGet(this, _controller)) == null ? void 0 : _a2.signal
  };
  return "window" in globalThis && (init.credentials = this.withCredentials ? "include" : "same-origin"), init;
}, _onEvent = /* @__PURE__ */ new WeakMap(), _onRetryChange = /* @__PURE__ */ new WeakMap(), /**
* Handles the process referred to in the EventSource specification as "failing a connection".
*
* @param error - The error causing the connection to fail
* @param code - The HTTP status code, if available
* @internal
*/
failConnection_fn = function(message, code) {
  var _a2;
  __privateGet(this, _readyState) !== this.CLOSED && __privateSet(this, _readyState, this.CLOSED);
  const errorEvent = new ErrorEvent("error", { code, message });
  (_a2 = __privateGet(this, _onError)) == null || _a2.call(this, errorEvent), this.dispatchEvent(errorEvent);
}, /**
* Schedules a reconnection attempt against the EventSource endpoint.
*
* @param message - The error causing the connection to fail
* @param code - The HTTP status code, if available
* @internal
*/
scheduleReconnect_fn = function(message, code) {
  var _a2;
  if (__privateGet(this, _readyState) === this.CLOSED)
    return;
  __privateSet(this, _readyState, this.CONNECTING);
  const errorEvent = new ErrorEvent("error", { code, message });
  (_a2 = __privateGet(this, _onError)) == null || _a2.call(this, errorEvent), this.dispatchEvent(errorEvent), __privateSet(this, _reconnectTimer, setTimeout(__privateGet(this, _reconnect), __privateGet(this, _reconnectInterval)));
}, _reconnect = /* @__PURE__ */ new WeakMap(), /**
* ReadyState representing an EventSource currently trying to connect
*
* @public
*/
EventSource.CONNECTING = 0, /**
* ReadyState representing an EventSource connection that is open (eg connected)
*
* @public
*/
EventSource.OPEN = 1, /**
* ReadyState representing an EventSource connection that is closed (eg disconnected)
*
* @public
*/
EventSource.CLOSED = 2;
function getBaseURL() {
  const doc = "document" in globalThis ? globalThis.document : void 0;
  return doc && typeof doc == "object" && "baseURI" in doc && typeof doc.baseURI == "string" ? doc.baseURI : void 0;
}
let crypto$1;
crypto$1 = globalThis.crypto;
async function getRandomValues(size) {
  return (await crypto$1).getRandomValues(new Uint8Array(size));
}
async function random(size) {
  const mask = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";
  let result = "";
  const randomUints = await getRandomValues(size);
  for (let i = 0; i < size; i++) {
    const randomIndex = randomUints[i] % mask.length;
    result += mask[randomIndex];
  }
  return result;
}
async function generateVerifier(length) {
  return await random(length);
}
async function generateChallenge(code_verifier) {
  const buffer = await (await crypto$1).subtle.digest("SHA-256", new TextEncoder().encode(code_verifier));
  return btoa(String.fromCharCode(...new Uint8Array(buffer))).replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "");
}
async function pkceChallenge(length) {
  if (!length)
    length = 43;
  if (length < 43 || length > 128) {
    throw `Expected a length between 43 and 128. Received ${length}.`;
  }
  const verifier = await generateVerifier(length);
  const challenge = await generateChallenge(verifier);
  return {
    code_verifier: verifier,
    code_challenge: challenge
  };
}
const SafeUrlSchema = stringType().url().superRefine((val, ctx) => {
  if (!URL.canParse(val)) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: "URL must be parseable",
      fatal: true
    });
    return NEVER;
  }
}).refine((url) => {
  const u = new URL(url);
  return u.protocol !== "javascript:" && u.protocol !== "data:" && u.protocol !== "vbscript:";
}, { message: "URL cannot use javascript:, data:, or vbscript: scheme" });
const OAuthProtectedResourceMetadataSchema = objectType({
  resource: stringType().url(),
  authorization_servers: arrayType(SafeUrlSchema).optional(),
  jwks_uri: stringType().url().optional(),
  scopes_supported: arrayType(stringType()).optional(),
  bearer_methods_supported: arrayType(stringType()).optional(),
  resource_signing_alg_values_supported: arrayType(stringType()).optional(),
  resource_name: stringType().optional(),
  resource_documentation: stringType().optional(),
  resource_policy_uri: stringType().url().optional(),
  resource_tos_uri: stringType().url().optional(),
  tls_client_certificate_bound_access_tokens: booleanType().optional(),
  authorization_details_types_supported: arrayType(stringType()).optional(),
  dpop_signing_alg_values_supported: arrayType(stringType()).optional(),
  dpop_bound_access_tokens_required: booleanType().optional()
}).passthrough();
const OAuthMetadataSchema = objectType({
  issuer: stringType(),
  authorization_endpoint: SafeUrlSchema,
  token_endpoint: SafeUrlSchema,
  registration_endpoint: SafeUrlSchema.optional(),
  scopes_supported: arrayType(stringType()).optional(),
  response_types_supported: arrayType(stringType()),
  response_modes_supported: arrayType(stringType()).optional(),
  grant_types_supported: arrayType(stringType()).optional(),
  token_endpoint_auth_methods_supported: arrayType(stringType()).optional(),
  token_endpoint_auth_signing_alg_values_supported: arrayType(stringType()).optional(),
  service_documentation: SafeUrlSchema.optional(),
  revocation_endpoint: SafeUrlSchema.optional(),
  revocation_endpoint_auth_methods_supported: arrayType(stringType()).optional(),
  revocation_endpoint_auth_signing_alg_values_supported: arrayType(stringType()).optional(),
  introspection_endpoint: stringType().optional(),
  introspection_endpoint_auth_methods_supported: arrayType(stringType()).optional(),
  introspection_endpoint_auth_signing_alg_values_supported: arrayType(stringType()).optional(),
  code_challenge_methods_supported: arrayType(stringType()).optional()
}).passthrough();
const OpenIdProviderMetadataSchema = objectType({
  issuer: stringType(),
  authorization_endpoint: SafeUrlSchema,
  token_endpoint: SafeUrlSchema,
  userinfo_endpoint: SafeUrlSchema.optional(),
  jwks_uri: SafeUrlSchema,
  registration_endpoint: SafeUrlSchema.optional(),
  scopes_supported: arrayType(stringType()).optional(),
  response_types_supported: arrayType(stringType()),
  response_modes_supported: arrayType(stringType()).optional(),
  grant_types_supported: arrayType(stringType()).optional(),
  acr_values_supported: arrayType(stringType()).optional(),
  subject_types_supported: arrayType(stringType()),
  id_token_signing_alg_values_supported: arrayType(stringType()),
  id_token_encryption_alg_values_supported: arrayType(stringType()).optional(),
  id_token_encryption_enc_values_supported: arrayType(stringType()).optional(),
  userinfo_signing_alg_values_supported: arrayType(stringType()).optional(),
  userinfo_encryption_alg_values_supported: arrayType(stringType()).optional(),
  userinfo_encryption_enc_values_supported: arrayType(stringType()).optional(),
  request_object_signing_alg_values_supported: arrayType(stringType()).optional(),
  request_object_encryption_alg_values_supported: arrayType(stringType()).optional(),
  request_object_encryption_enc_values_supported: arrayType(stringType()).optional(),
  token_endpoint_auth_methods_supported: arrayType(stringType()).optional(),
  token_endpoint_auth_signing_alg_values_supported: arrayType(stringType()).optional(),
  display_values_supported: arrayType(stringType()).optional(),
  claim_types_supported: arrayType(stringType()).optional(),
  claims_supported: arrayType(stringType()).optional(),
  service_documentation: stringType().optional(),
  claims_locales_supported: arrayType(stringType()).optional(),
  ui_locales_supported: arrayType(stringType()).optional(),
  claims_parameter_supported: booleanType().optional(),
  request_parameter_supported: booleanType().optional(),
  request_uri_parameter_supported: booleanType().optional(),
  require_request_uri_registration: booleanType().optional(),
  op_policy_uri: SafeUrlSchema.optional(),
  op_tos_uri: SafeUrlSchema.optional()
}).passthrough();
const OpenIdProviderDiscoveryMetadataSchema = OpenIdProviderMetadataSchema.merge(OAuthMetadataSchema.pick({
  code_challenge_methods_supported: true
}));
const OAuthTokensSchema = objectType({
  access_token: stringType(),
  id_token: stringType().optional(),
  // Optional for OAuth 2.1, but necessary in OpenID Connect
  token_type: stringType(),
  expires_in: numberType().optional(),
  scope: stringType().optional(),
  refresh_token: stringType().optional()
}).strip();
const OAuthErrorResponseSchema = objectType({
  error: stringType(),
  error_description: stringType().optional(),
  error_uri: stringType().optional()
});
const OptionalSafeUrlSchema = SafeUrlSchema.optional().or(literalType("").transform(() => void 0));
const OAuthClientMetadataSchema = objectType({
  redirect_uris: arrayType(SafeUrlSchema),
  token_endpoint_auth_method: stringType().optional(),
  grant_types: arrayType(stringType()).optional(),
  response_types: arrayType(stringType()).optional(),
  client_name: stringType().optional(),
  client_uri: SafeUrlSchema.optional(),
  logo_uri: OptionalSafeUrlSchema,
  scope: stringType().optional(),
  contacts: arrayType(stringType()).optional(),
  tos_uri: OptionalSafeUrlSchema,
  policy_uri: stringType().optional(),
  jwks_uri: SafeUrlSchema.optional(),
  jwks: anyType().optional(),
  software_id: stringType().optional(),
  software_version: stringType().optional(),
  software_statement: stringType().optional()
}).strip();
const OAuthClientInformationSchema = objectType({
  client_id: stringType(),
  client_secret: stringType().optional(),
  client_id_issued_at: numberType().optional(),
  client_secret_expires_at: numberType().optional()
}).strip();
const OAuthClientInformationFullSchema = OAuthClientMetadataSchema.merge(OAuthClientInformationSchema);
objectType({
  error: stringType(),
  error_description: stringType().optional()
}).strip();
objectType({
  token: stringType(),
  token_type_hint: stringType().optional()
}).strip();
function resourceUrlFromServerUrl(url) {
  const resourceURL = typeof url === "string" ? new URL(url) : new URL(url.href);
  resourceURL.hash = "";
  return resourceURL;
}
function checkResourceAllowed({ requestedResource, configuredResource }) {
  const requested = typeof requestedResource === "string" ? new URL(requestedResource) : new URL(requestedResource.href);
  const configured = typeof configuredResource === "string" ? new URL(configuredResource) : new URL(configuredResource.href);
  if (requested.origin !== configured.origin) {
    return false;
  }
  if (requested.pathname.length < configured.pathname.length) {
    return false;
  }
  const requestedPath = requested.pathname.endsWith("/") ? requested.pathname : requested.pathname + "/";
  const configuredPath = configured.pathname.endsWith("/") ? configured.pathname : configured.pathname + "/";
  return requestedPath.startsWith(configuredPath);
}
class OAuthError extends Error {
  constructor(message, errorUri) {
    super(message);
    this.errorUri = errorUri;
    this.name = this.constructor.name;
  }
  /**
   * Converts the error to a standard OAuth error response object
   */
  toResponseObject() {
    const response = {
      error: this.errorCode,
      error_description: this.message
    };
    if (this.errorUri) {
      response.error_uri = this.errorUri;
    }
    return response;
  }
  get errorCode() {
    return this.constructor.errorCode;
  }
}
class InvalidRequestError extends OAuthError {
}
InvalidRequestError.errorCode = "invalid_request";
class InvalidClientError extends OAuthError {
}
InvalidClientError.errorCode = "invalid_client";
class InvalidGrantError extends OAuthError {
}
InvalidGrantError.errorCode = "invalid_grant";
class UnauthorizedClientError extends OAuthError {
}
UnauthorizedClientError.errorCode = "unauthorized_client";
class UnsupportedGrantTypeError extends OAuthError {
}
UnsupportedGrantTypeError.errorCode = "unsupported_grant_type";
class InvalidScopeError extends OAuthError {
}
InvalidScopeError.errorCode = "invalid_scope";
class AccessDeniedError extends OAuthError {
}
AccessDeniedError.errorCode = "access_denied";
class ServerError extends OAuthError {
}
ServerError.errorCode = "server_error";
class TemporarilyUnavailableError extends OAuthError {
}
TemporarilyUnavailableError.errorCode = "temporarily_unavailable";
class UnsupportedResponseTypeError extends OAuthError {
}
UnsupportedResponseTypeError.errorCode = "unsupported_response_type";
class UnsupportedTokenTypeError extends OAuthError {
}
UnsupportedTokenTypeError.errorCode = "unsupported_token_type";
class InvalidTokenError extends OAuthError {
}
InvalidTokenError.errorCode = "invalid_token";
class MethodNotAllowedError extends OAuthError {
}
MethodNotAllowedError.errorCode = "method_not_allowed";
class TooManyRequestsError extends OAuthError {
}
TooManyRequestsError.errorCode = "too_many_requests";
class InvalidClientMetadataError extends OAuthError {
}
InvalidClientMetadataError.errorCode = "invalid_client_metadata";
class InsufficientScopeError extends OAuthError {
}
InsufficientScopeError.errorCode = "insufficient_scope";
const OAUTH_ERRORS = {
  [InvalidRequestError.errorCode]: InvalidRequestError,
  [InvalidClientError.errorCode]: InvalidClientError,
  [InvalidGrantError.errorCode]: InvalidGrantError,
  [UnauthorizedClientError.errorCode]: UnauthorizedClientError,
  [UnsupportedGrantTypeError.errorCode]: UnsupportedGrantTypeError,
  [InvalidScopeError.errorCode]: InvalidScopeError,
  [AccessDeniedError.errorCode]: AccessDeniedError,
  [ServerError.errorCode]: ServerError,
  [TemporarilyUnavailableError.errorCode]: TemporarilyUnavailableError,
  [UnsupportedResponseTypeError.errorCode]: UnsupportedResponseTypeError,
  [UnsupportedTokenTypeError.errorCode]: UnsupportedTokenTypeError,
  [InvalidTokenError.errorCode]: InvalidTokenError,
  [MethodNotAllowedError.errorCode]: MethodNotAllowedError,
  [TooManyRequestsError.errorCode]: TooManyRequestsError,
  [InvalidClientMetadataError.errorCode]: InvalidClientMetadataError,
  [InsufficientScopeError.errorCode]: InsufficientScopeError
};
class UnauthorizedError extends Error {
  constructor(message) {
    super(message !== null && message !== void 0 ? message : "Unauthorized");
  }
}
const AUTHORIZATION_CODE_RESPONSE_TYPE = "code";
const AUTHORIZATION_CODE_CHALLENGE_METHOD = "S256";
function selectClientAuthMethod(clientInformation, supportedMethods) {
  const hasClientSecret = clientInformation.client_secret !== void 0;
  if (supportedMethods.length === 0) {
    return hasClientSecret ? "client_secret_post" : "none";
  }
  if (hasClientSecret && supportedMethods.includes("client_secret_basic")) {
    return "client_secret_basic";
  }
  if (hasClientSecret && supportedMethods.includes("client_secret_post")) {
    return "client_secret_post";
  }
  if (supportedMethods.includes("none")) {
    return "none";
  }
  return hasClientSecret ? "client_secret_post" : "none";
}
function applyClientAuthentication(method, clientInformation, headers, params) {
  const { client_id, client_secret } = clientInformation;
  switch (method) {
    case "client_secret_basic":
      applyBasicAuth(client_id, client_secret, headers);
      return;
    case "client_secret_post":
      applyPostAuth(client_id, client_secret, params);
      return;
    case "none":
      applyPublicAuth(client_id, params);
      return;
    default:
      throw new Error(`Unsupported client authentication method: ${method}`);
  }
}
function applyBasicAuth(clientId, clientSecret, headers) {
  if (!clientSecret) {
    throw new Error("client_secret_basic authentication requires a client_secret");
  }
  const credentials = btoa(`${clientId}:${clientSecret}`);
  headers.set("Authorization", `Basic ${credentials}`);
}
function applyPostAuth(clientId, clientSecret, params) {
  params.set("client_id", clientId);
  if (clientSecret) {
    params.set("client_secret", clientSecret);
  }
}
function applyPublicAuth(clientId, params) {
  params.set("client_id", clientId);
}
async function parseErrorResponse(input) {
  const statusCode = input instanceof Response ? input.status : void 0;
  const body = input instanceof Response ? await input.text() : input;
  try {
    const result = OAuthErrorResponseSchema.parse(JSON.parse(body));
    const { error, error_description, error_uri } = result;
    const errorClass = OAUTH_ERRORS[error] || ServerError;
    return new errorClass(error_description || "", error_uri);
  } catch (error) {
    const errorMessage = `${statusCode ? `HTTP ${statusCode}: ` : ""}Invalid OAuth error response: ${error}. Raw body: ${body}`;
    return new ServerError(errorMessage);
  }
}
async function auth(provider, options) {
  var _a2, _b;
  try {
    return await authInternal(provider, options);
  } catch (error) {
    if (error instanceof InvalidClientError || error instanceof UnauthorizedClientError) {
      await ((_a2 = provider.invalidateCredentials) === null || _a2 === void 0 ? void 0 : _a2.call(provider, "all"));
      return await authInternal(provider, options);
    } else if (error instanceof InvalidGrantError) {
      await ((_b = provider.invalidateCredentials) === null || _b === void 0 ? void 0 : _b.call(provider, "tokens"));
      return await authInternal(provider, options);
    }
    throw error;
  }
}
async function authInternal(provider, { serverUrl, authorizationCode, scope, resourceMetadataUrl, fetchFn }) {
  let resourceMetadata;
  let authorizationServerUrl;
  try {
    resourceMetadata = await discoverOAuthProtectedResourceMetadata(serverUrl, { resourceMetadataUrl }, fetchFn);
    if (resourceMetadata.authorization_servers && resourceMetadata.authorization_servers.length > 0) {
      authorizationServerUrl = resourceMetadata.authorization_servers[0];
    }
  } catch (_a2) {
  }
  if (!authorizationServerUrl) {
    authorizationServerUrl = serverUrl;
  }
  const resource = await selectResourceURL(serverUrl, provider, resourceMetadata);
  const metadata = await discoverAuthorizationServerMetadata(authorizationServerUrl, {
    fetchFn
  });
  let clientInformation = await Promise.resolve(provider.clientInformation());
  if (!clientInformation) {
    if (authorizationCode !== void 0) {
      throw new Error("Existing OAuth client information is required when exchanging an authorization code");
    }
    if (!provider.saveClientInformation) {
      throw new Error("OAuth client information must be saveable for dynamic registration");
    }
    const fullInformation = await registerClient(authorizationServerUrl, {
      metadata,
      clientMetadata: provider.clientMetadata,
      fetchFn
    });
    await provider.saveClientInformation(fullInformation);
    clientInformation = fullInformation;
  }
  if (authorizationCode !== void 0) {
    const codeVerifier2 = await provider.codeVerifier();
    const tokens2 = await exchangeAuthorization(authorizationServerUrl, {
      metadata,
      clientInformation,
      authorizationCode,
      codeVerifier: codeVerifier2,
      redirectUri: provider.redirectUrl,
      resource,
      addClientAuthentication: provider.addClientAuthentication,
      fetchFn
    });
    await provider.saveTokens(tokens2);
    return "AUTHORIZED";
  }
  const tokens = await provider.tokens();
  if (tokens === null || tokens === void 0 ? void 0 : tokens.refresh_token) {
    try {
      const newTokens = await refreshAuthorization(authorizationServerUrl, {
        metadata,
        clientInformation,
        refreshToken: tokens.refresh_token,
        resource,
        addClientAuthentication: provider.addClientAuthentication,
        fetchFn
      });
      await provider.saveTokens(newTokens);
      return "AUTHORIZED";
    } catch (error) {
      if (!(error instanceof OAuthError) || error instanceof ServerError) ;
      else {
        throw error;
      }
    }
  }
  const state = provider.state ? await provider.state() : void 0;
  const { authorizationUrl, codeVerifier } = await startAuthorization(authorizationServerUrl, {
    metadata,
    clientInformation,
    state,
    redirectUrl: provider.redirectUrl,
    scope: scope || provider.clientMetadata.scope,
    resource
  });
  await provider.saveCodeVerifier(codeVerifier);
  await provider.redirectToAuthorization(authorizationUrl);
  return "REDIRECT";
}
async function selectResourceURL(serverUrl, provider, resourceMetadata) {
  const defaultResource = resourceUrlFromServerUrl(serverUrl);
  if (provider.validateResourceURL) {
    return await provider.validateResourceURL(defaultResource, resourceMetadata === null || resourceMetadata === void 0 ? void 0 : resourceMetadata.resource);
  }
  if (!resourceMetadata) {
    return void 0;
  }
  if (!checkResourceAllowed({ requestedResource: defaultResource, configuredResource: resourceMetadata.resource })) {
    throw new Error(`Protected resource ${resourceMetadata.resource} does not match expected ${defaultResource} (or origin)`);
  }
  return new URL(resourceMetadata.resource);
}
function extractResourceMetadataUrl(res) {
  const authenticateHeader = res.headers.get("WWW-Authenticate");
  if (!authenticateHeader) {
    return void 0;
  }
  const [type2, scheme] = authenticateHeader.split(" ");
  if (type2.toLowerCase() !== "bearer" || !scheme) {
    return void 0;
  }
  const regex = /resource_metadata="([^"]*)"/;
  const match = regex.exec(authenticateHeader);
  if (!match) {
    return void 0;
  }
  try {
    return new URL(match[1]);
  } catch (_a2) {
    return void 0;
  }
}
async function discoverOAuthProtectedResourceMetadata(serverUrl, opts, fetchFn = fetch) {
  const response = await discoverMetadataWithFallback(serverUrl, "oauth-protected-resource", fetchFn, {
    protocolVersion: opts === null || opts === void 0 ? void 0 : opts.protocolVersion,
    metadataUrl: opts === null || opts === void 0 ? void 0 : opts.resourceMetadataUrl
  });
  if (!response || response.status === 404) {
    throw new Error(`Resource server does not implement OAuth 2.0 Protected Resource Metadata.`);
  }
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} trying to load well-known OAuth protected resource metadata.`);
  }
  return OAuthProtectedResourceMetadataSchema.parse(await response.json());
}
async function fetchWithCorsRetry(url, headers, fetchFn = fetch) {
  try {
    return await fetchFn(url, { headers });
  } catch (error) {
    if (error instanceof TypeError) {
      if (headers) {
        return fetchWithCorsRetry(url, void 0, fetchFn);
      } else {
        return void 0;
      }
    }
    throw error;
  }
}
function buildWellKnownPath(wellKnownPrefix, pathname = "", options = {}) {
  if (pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  return options.prependPathname ? `${pathname}/.well-known/${wellKnownPrefix}` : `/.well-known/${wellKnownPrefix}${pathname}`;
}
async function tryMetadataDiscovery(url, protocolVersion, fetchFn = fetch) {
  const headers = {
    "MCP-Protocol-Version": protocolVersion
  };
  return await fetchWithCorsRetry(url, headers, fetchFn);
}
function shouldAttemptFallback(response, pathname) {
  return !response || response.status >= 400 && response.status < 500 && pathname !== "/";
}
async function discoverMetadataWithFallback(serverUrl, wellKnownType, fetchFn, opts) {
  var _a2, _b;
  const issuer = new URL(serverUrl);
  const protocolVersion = (_a2 = opts === null || opts === void 0 ? void 0 : opts.protocolVersion) !== null && _a2 !== void 0 ? _a2 : LATEST_PROTOCOL_VERSION;
  let url;
  if (opts === null || opts === void 0 ? void 0 : opts.metadataUrl) {
    url = new URL(opts.metadataUrl);
  } else {
    const wellKnownPath = buildWellKnownPath(wellKnownType, issuer.pathname);
    url = new URL(wellKnownPath, (_b = opts === null || opts === void 0 ? void 0 : opts.metadataServerUrl) !== null && _b !== void 0 ? _b : issuer);
    url.search = issuer.search;
  }
  let response = await tryMetadataDiscovery(url, protocolVersion, fetchFn);
  if (!(opts === null || opts === void 0 ? void 0 : opts.metadataUrl) && shouldAttemptFallback(response, issuer.pathname)) {
    const rootUrl = new URL(`/.well-known/${wellKnownType}`, issuer);
    response = await tryMetadataDiscovery(rootUrl, protocolVersion, fetchFn);
  }
  return response;
}
function buildDiscoveryUrls(authorizationServerUrl) {
  const url = typeof authorizationServerUrl === "string" ? new URL(authorizationServerUrl) : authorizationServerUrl;
  const hasPath = url.pathname !== "/";
  const urlsToTry = [];
  if (!hasPath) {
    urlsToTry.push({
      url: new URL("/.well-known/oauth-authorization-server", url.origin),
      type: "oauth"
    });
    urlsToTry.push({
      url: new URL(`/.well-known/openid-configuration`, url.origin),
      type: "oidc"
    });
    return urlsToTry;
  }
  let pathname = url.pathname;
  if (pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  urlsToTry.push({
    url: new URL(`/.well-known/oauth-authorization-server${pathname}`, url.origin),
    type: "oauth"
  });
  urlsToTry.push({
    url: new URL("/.well-known/oauth-authorization-server", url.origin),
    type: "oauth"
  });
  urlsToTry.push({
    url: new URL(`/.well-known/openid-configuration${pathname}`, url.origin),
    type: "oidc"
  });
  urlsToTry.push({
    url: new URL(`${pathname}/.well-known/openid-configuration`, url.origin),
    type: "oidc"
  });
  return urlsToTry;
}
async function discoverAuthorizationServerMetadata(authorizationServerUrl, { fetchFn = fetch, protocolVersion = LATEST_PROTOCOL_VERSION } = {}) {
  const headers = {
    "MCP-Protocol-Version": protocolVersion,
    Accept: "application/json"
  };
  const urlsToTry = buildDiscoveryUrls(authorizationServerUrl);
  for (const { url: endpointUrl, type: type2 } of urlsToTry) {
    const response = await fetchWithCorsRetry(endpointUrl, headers, fetchFn);
    if (!response) {
      continue;
    }
    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        continue;
      }
      throw new Error(`HTTP ${response.status} trying to load ${type2 === "oauth" ? "OAuth" : "OpenID provider"} metadata from ${endpointUrl}`);
    }
    if (type2 === "oauth") {
      return OAuthMetadataSchema.parse(await response.json());
    } else {
      return OpenIdProviderDiscoveryMetadataSchema.parse(await response.json());
    }
  }
  return void 0;
}
async function startAuthorization(authorizationServerUrl, { metadata, clientInformation, redirectUrl, scope, state, resource }) {
  let authorizationUrl;
  if (metadata) {
    authorizationUrl = new URL(metadata.authorization_endpoint);
    if (!metadata.response_types_supported.includes(AUTHORIZATION_CODE_RESPONSE_TYPE)) {
      throw new Error(`Incompatible auth server: does not support response type ${AUTHORIZATION_CODE_RESPONSE_TYPE}`);
    }
    if (metadata.code_challenge_methods_supported && !metadata.code_challenge_methods_supported.includes(AUTHORIZATION_CODE_CHALLENGE_METHOD)) {
      throw new Error(`Incompatible auth server: does not support code challenge method ${AUTHORIZATION_CODE_CHALLENGE_METHOD}`);
    }
  } else {
    authorizationUrl = new URL("/authorize", authorizationServerUrl);
  }
  const challenge = await pkceChallenge();
  const codeVerifier = challenge.code_verifier;
  const codeChallenge = challenge.code_challenge;
  authorizationUrl.searchParams.set("response_type", AUTHORIZATION_CODE_RESPONSE_TYPE);
  authorizationUrl.searchParams.set("client_id", clientInformation.client_id);
  authorizationUrl.searchParams.set("code_challenge", codeChallenge);
  authorizationUrl.searchParams.set("code_challenge_method", AUTHORIZATION_CODE_CHALLENGE_METHOD);
  authorizationUrl.searchParams.set("redirect_uri", String(redirectUrl));
  if (state) {
    authorizationUrl.searchParams.set("state", state);
  }
  if (scope) {
    authorizationUrl.searchParams.set("scope", scope);
  }
  if (scope === null || scope === void 0 ? void 0 : scope.includes("offline_access")) {
    authorizationUrl.searchParams.append("prompt", "consent");
  }
  if (resource) {
    authorizationUrl.searchParams.set("resource", resource.href);
  }
  return { authorizationUrl, codeVerifier };
}
async function exchangeAuthorization(authorizationServerUrl, { metadata, clientInformation, authorizationCode, codeVerifier, redirectUri, resource, addClientAuthentication, fetchFn }) {
  var _a2;
  const grantType = "authorization_code";
  const tokenUrl = (metadata === null || metadata === void 0 ? void 0 : metadata.token_endpoint) ? new URL(metadata.token_endpoint) : new URL("/token", authorizationServerUrl);
  if ((metadata === null || metadata === void 0 ? void 0 : metadata.grant_types_supported) && !metadata.grant_types_supported.includes(grantType)) {
    throw new Error(`Incompatible auth server: does not support grant type ${grantType}`);
  }
  const headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json"
  });
  const params = new URLSearchParams({
    grant_type: grantType,
    code: authorizationCode,
    code_verifier: codeVerifier,
    redirect_uri: String(redirectUri)
  });
  if (addClientAuthentication) {
    addClientAuthentication(headers, params, authorizationServerUrl, metadata);
  } else {
    const supportedMethods = (_a2 = metadata === null || metadata === void 0 ? void 0 : metadata.token_endpoint_auth_methods_supported) !== null && _a2 !== void 0 ? _a2 : [];
    const authMethod = selectClientAuthMethod(clientInformation, supportedMethods);
    applyClientAuthentication(authMethod, clientInformation, headers, params);
  }
  if (resource) {
    params.set("resource", resource.href);
  }
  const response = await (fetchFn !== null && fetchFn !== void 0 ? fetchFn : fetch)(tokenUrl, {
    method: "POST",
    headers,
    body: params
  });
  if (!response.ok) {
    throw await parseErrorResponse(response);
  }
  return OAuthTokensSchema.parse(await response.json());
}
async function refreshAuthorization(authorizationServerUrl, { metadata, clientInformation, refreshToken, resource, addClientAuthentication, fetchFn }) {
  var _a2;
  const grantType = "refresh_token";
  let tokenUrl;
  if (metadata) {
    tokenUrl = new URL(metadata.token_endpoint);
    if (metadata.grant_types_supported && !metadata.grant_types_supported.includes(grantType)) {
      throw new Error(`Incompatible auth server: does not support grant type ${grantType}`);
    }
  } else {
    tokenUrl = new URL("/token", authorizationServerUrl);
  }
  const headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });
  const params = new URLSearchParams({
    grant_type: grantType,
    refresh_token: refreshToken
  });
  if (addClientAuthentication) {
    addClientAuthentication(headers, params, authorizationServerUrl, metadata);
  } else {
    const supportedMethods = (_a2 = metadata === null || metadata === void 0 ? void 0 : metadata.token_endpoint_auth_methods_supported) !== null && _a2 !== void 0 ? _a2 : [];
    const authMethod = selectClientAuthMethod(clientInformation, supportedMethods);
    applyClientAuthentication(authMethod, clientInformation, headers, params);
  }
  if (resource) {
    params.set("resource", resource.href);
  }
  const response = await (fetchFn !== null && fetchFn !== void 0 ? fetchFn : fetch)(tokenUrl, {
    method: "POST",
    headers,
    body: params
  });
  if (!response.ok) {
    throw await parseErrorResponse(response);
  }
  return OAuthTokensSchema.parse({ refresh_token: refreshToken, ...await response.json() });
}
async function registerClient(authorizationServerUrl, { metadata, clientMetadata, fetchFn }) {
  let registrationUrl;
  if (metadata) {
    if (!metadata.registration_endpoint) {
      throw new Error("Incompatible auth server: does not support dynamic client registration");
    }
    registrationUrl = new URL(metadata.registration_endpoint);
  } else {
    registrationUrl = new URL("/register", authorizationServerUrl);
  }
  const response = await (fetchFn !== null && fetchFn !== void 0 ? fetchFn : fetch)(registrationUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(clientMetadata)
  });
  if (!response.ok) {
    throw await parseErrorResponse(response);
  }
  return OAuthClientInformationFullSchema.parse(await response.json());
}
class SseError extends Error {
  constructor(code, message, event) {
    super(`SSE error: ${message}`);
    this.code = code;
    this.event = event;
  }
}
class SSEClientTransport {
  constructor(url, opts) {
    this._url = url;
    this._resourceMetadataUrl = void 0;
    this._eventSourceInit = opts === null || opts === void 0 ? void 0 : opts.eventSourceInit;
    this._requestInit = opts === null || opts === void 0 ? void 0 : opts.requestInit;
    this._authProvider = opts === null || opts === void 0 ? void 0 : opts.authProvider;
    this._fetch = opts === null || opts === void 0 ? void 0 : opts.fetch;
  }
  async _authThenStart() {
    var _a2;
    if (!this._authProvider) {
      throw new UnauthorizedError("No auth provider");
    }
    let result;
    try {
      result = await auth(this._authProvider, {
        serverUrl: this._url,
        resourceMetadataUrl: this._resourceMetadataUrl,
        fetchFn: this._fetch
      });
    } catch (error) {
      (_a2 = this.onerror) === null || _a2 === void 0 ? void 0 : _a2.call(this, error);
      throw error;
    }
    if (result !== "AUTHORIZED") {
      throw new UnauthorizedError();
    }
    return await this._startOrAuth();
  }
  async _commonHeaders() {
    var _a2;
    const headers = {};
    if (this._authProvider) {
      const tokens = await this._authProvider.tokens();
      if (tokens) {
        headers["Authorization"] = `Bearer ${tokens.access_token}`;
      }
    }
    if (this._protocolVersion) {
      headers["mcp-protocol-version"] = this._protocolVersion;
    }
    return new Headers({ ...headers, ...(_a2 = this._requestInit) === null || _a2 === void 0 ? void 0 : _a2.headers });
  }
  _startOrAuth() {
    var _a2, _b, _c;
    const fetchImpl = (_c = (_b = (_a2 = this === null || this === void 0 ? void 0 : this._eventSourceInit) === null || _a2 === void 0 ? void 0 : _a2.fetch) !== null && _b !== void 0 ? _b : this._fetch) !== null && _c !== void 0 ? _c : fetch;
    return new Promise((resolve, reject) => {
      this._eventSource = new EventSource(this._url.href, {
        ...this._eventSourceInit,
        fetch: async (url, init) => {
          const headers = await this._commonHeaders();
          headers.set("Accept", "text/event-stream");
          const response = await fetchImpl(url, {
            ...init,
            headers
          });
          if (response.status === 401 && response.headers.has("www-authenticate")) {
            this._resourceMetadataUrl = extractResourceMetadataUrl(response);
          }
          return response;
        }
      });
      this._abortController = new AbortController();
      this._eventSource.onerror = (event) => {
        var _a3;
        if (event.code === 401 && this._authProvider) {
          this._authThenStart().then(resolve, reject);
          return;
        }
        const error = new SseError(event.code, event.message, event);
        reject(error);
        (_a3 = this.onerror) === null || _a3 === void 0 ? void 0 : _a3.call(this, error);
      };
      this._eventSource.onopen = () => {
      };
      this._eventSource.addEventListener("endpoint", (event) => {
        var _a3;
        const messageEvent = event;
        try {
          this._endpoint = new URL(messageEvent.data, this._url);
          if (this._endpoint.origin !== this._url.origin) {
            throw new Error(`Endpoint origin does not match connection origin: ${this._endpoint.origin}`);
          }
        } catch (error) {
          reject(error);
          (_a3 = this.onerror) === null || _a3 === void 0 ? void 0 : _a3.call(this, error);
          void this.close();
          return;
        }
        resolve();
      });
      this._eventSource.onmessage = (event) => {
        var _a3, _b2;
        const messageEvent = event;
        let message;
        try {
          message = JSONRPCMessageSchema.parse(JSON.parse(messageEvent.data));
        } catch (error) {
          (_a3 = this.onerror) === null || _a3 === void 0 ? void 0 : _a3.call(this, error);
          return;
        }
        (_b2 = this.onmessage) === null || _b2 === void 0 ? void 0 : _b2.call(this, message);
      };
    });
  }
  async start() {
    if (this._eventSource) {
      throw new Error("SSEClientTransport already started! If using Client class, note that connect() calls start() automatically.");
    }
    return await this._startOrAuth();
  }
  /**
   * Call this method after the user has finished authorizing via their user agent and is redirected back to the MCP client application. This will exchange the authorization code for an access token, enabling the next connection attempt to successfully auth.
   */
  async finishAuth(authorizationCode) {
    if (!this._authProvider) {
      throw new UnauthorizedError("No auth provider");
    }
    const result = await auth(this._authProvider, {
      serverUrl: this._url,
      authorizationCode,
      resourceMetadataUrl: this._resourceMetadataUrl,
      fetchFn: this._fetch
    });
    if (result !== "AUTHORIZED") {
      throw new UnauthorizedError("Failed to authorize");
    }
  }
  async close() {
    var _a2, _b, _c;
    (_a2 = this._abortController) === null || _a2 === void 0 ? void 0 : _a2.abort();
    (_b = this._eventSource) === null || _b === void 0 ? void 0 : _b.close();
    (_c = this.onclose) === null || _c === void 0 ? void 0 : _c.call(this);
  }
  async send(message) {
    var _a2, _b, _c;
    if (!this._endpoint) {
      throw new Error("Not connected");
    }
    try {
      const headers = await this._commonHeaders();
      headers.set("content-type", "application/json");
      const init = {
        ...this._requestInit,
        method: "POST",
        headers,
        body: JSON.stringify(message),
        signal: (_a2 = this._abortController) === null || _a2 === void 0 ? void 0 : _a2.signal
      };
      const response = await ((_b = this._fetch) !== null && _b !== void 0 ? _b : fetch)(this._endpoint, init);
      if (!response.ok) {
        if (response.status === 401 && this._authProvider) {
          this._resourceMetadataUrl = extractResourceMetadataUrl(response);
          const result = await auth(this._authProvider, {
            serverUrl: this._url,
            resourceMetadataUrl: this._resourceMetadataUrl,
            fetchFn: this._fetch
          });
          if (result !== "AUTHORIZED") {
            throw new UnauthorizedError();
          }
          return this.send(message);
        }
        const text = await response.text().catch(() => null);
        throw new Error(`Error POSTing to endpoint (HTTP ${response.status}): ${text}`);
      }
    } catch (error) {
      (_c = this.onerror) === null || _c === void 0 ? void 0 : _c.call(this, error);
      throw error;
    }
  }
  setProtocolVersion(version2) {
    this._protocolVersion = version2;
  }
}
class EventSourceParserStream extends TransformStream {
  constructor({ onError, onRetry, onComment } = {}) {
    let parser;
    super({
      start(controller) {
        parser = createParser({
          onEvent: (event) => {
            controller.enqueue(event);
          },
          onError(error) {
            onError === "terminate" ? controller.error(error) : typeof onError == "function" && onError(error);
          },
          onRetry,
          onComment
        });
      },
      transform(chunk) {
        parser.feed(chunk);
      }
    });
  }
}
const DEFAULT_STREAMABLE_HTTP_RECONNECTION_OPTIONS = {
  initialReconnectionDelay: 1e3,
  maxReconnectionDelay: 3e4,
  reconnectionDelayGrowFactor: 1.5,
  maxRetries: 2
};
class StreamableHTTPError extends Error {
  constructor(code, message) {
    super(`Streamable HTTP error: ${message}`);
    this.code = code;
  }
}
class StreamableHTTPClientTransport {
  constructor(url, opts) {
    var _a2;
    this._hasCompletedAuthFlow = false;
    this._url = url;
    this._resourceMetadataUrl = void 0;
    this._requestInit = opts === null || opts === void 0 ? void 0 : opts.requestInit;
    this._authProvider = opts === null || opts === void 0 ? void 0 : opts.authProvider;
    this._fetch = opts === null || opts === void 0 ? void 0 : opts.fetch;
    this._sessionId = opts === null || opts === void 0 ? void 0 : opts.sessionId;
    this._reconnectionOptions = (_a2 = opts === null || opts === void 0 ? void 0 : opts.reconnectionOptions) !== null && _a2 !== void 0 ? _a2 : DEFAULT_STREAMABLE_HTTP_RECONNECTION_OPTIONS;
  }
  async _authThenStart() {
    var _a2;
    if (!this._authProvider) {
      throw new UnauthorizedError("No auth provider");
    }
    let result;
    try {
      result = await auth(this._authProvider, {
        serverUrl: this._url,
        resourceMetadataUrl: this._resourceMetadataUrl,
        fetchFn: this._fetch
      });
    } catch (error) {
      (_a2 = this.onerror) === null || _a2 === void 0 ? void 0 : _a2.call(this, error);
      throw error;
    }
    if (result !== "AUTHORIZED") {
      throw new UnauthorizedError();
    }
    return await this._startOrAuthSse({ resumptionToken: void 0 });
  }
  async _commonHeaders() {
    var _a2;
    const headers = {};
    if (this._authProvider) {
      const tokens = await this._authProvider.tokens();
      if (tokens) {
        headers["Authorization"] = `Bearer ${tokens.access_token}`;
      }
    }
    if (this._sessionId) {
      headers["mcp-session-id"] = this._sessionId;
    }
    if (this._protocolVersion) {
      headers["mcp-protocol-version"] = this._protocolVersion;
    }
    const extraHeaders = this._normalizeHeaders((_a2 = this._requestInit) === null || _a2 === void 0 ? void 0 : _a2.headers);
    return new Headers({
      ...headers,
      ...extraHeaders
    });
  }
  async _startOrAuthSse(options) {
    var _a2, _b, _c;
    const { resumptionToken } = options;
    try {
      const headers = await this._commonHeaders();
      headers.set("Accept", "text/event-stream");
      if (resumptionToken) {
        headers.set("last-event-id", resumptionToken);
      }
      const response = await ((_a2 = this._fetch) !== null && _a2 !== void 0 ? _a2 : fetch)(this._url, {
        method: "GET",
        headers,
        signal: (_b = this._abortController) === null || _b === void 0 ? void 0 : _b.signal
      });
      if (!response.ok) {
        if (response.status === 401 && this._authProvider) {
          return await this._authThenStart();
        }
        if (response.status === 405) {
          return;
        }
        throw new StreamableHTTPError(response.status, `Failed to open SSE stream: ${response.statusText}`);
      }
      this._handleSseStream(response.body, options, true);
    } catch (error) {
      (_c = this.onerror) === null || _c === void 0 ? void 0 : _c.call(this, error);
      throw error;
    }
  }
  /**
   * Calculates the next reconnection delay using  backoff algorithm
   *
   * @param attempt Current reconnection attempt count for the specific stream
   * @returns Time to wait in milliseconds before next reconnection attempt
   */
  _getNextReconnectionDelay(attempt) {
    const initialDelay = this._reconnectionOptions.initialReconnectionDelay;
    const growFactor = this._reconnectionOptions.reconnectionDelayGrowFactor;
    const maxDelay = this._reconnectionOptions.maxReconnectionDelay;
    return Math.min(initialDelay * Math.pow(growFactor, attempt), maxDelay);
  }
  _normalizeHeaders(headers) {
    if (!headers)
      return {};
    if (headers instanceof Headers) {
      return Object.fromEntries(headers.entries());
    }
    if (Array.isArray(headers)) {
      return Object.fromEntries(headers);
    }
    return { ...headers };
  }
  /**
   * Schedule a reconnection attempt with exponential backoff
   *
   * @param lastEventId The ID of the last received event for resumability
   * @param attemptCount Current reconnection attempt count for this specific stream
   */
  _scheduleReconnection(options, attemptCount = 0) {
    var _a2;
    const maxRetries = this._reconnectionOptions.maxRetries;
    if (maxRetries > 0 && attemptCount >= maxRetries) {
      (_a2 = this.onerror) === null || _a2 === void 0 ? void 0 : _a2.call(this, new Error(`Maximum reconnection attempts (${maxRetries}) exceeded.`));
      return;
    }
    const delay = this._getNextReconnectionDelay(attemptCount);
    setTimeout(() => {
      this._startOrAuthSse(options).catch((error) => {
        var _a3;
        (_a3 = this.onerror) === null || _a3 === void 0 ? void 0 : _a3.call(this, new Error(`Failed to reconnect SSE stream: ${error instanceof Error ? error.message : String(error)}`));
        this._scheduleReconnection(options, attemptCount + 1);
      });
    }, delay);
  }
  _handleSseStream(stream, options, isReconnectable) {
    if (!stream) {
      return;
    }
    const { onresumptiontoken, replayMessageId } = options;
    let lastEventId;
    const processStream = async () => {
      var _a2, _b, _c, _d;
      try {
        const reader = stream.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream()).getReader();
        while (true) {
          const { value: event, done } = await reader.read();
          if (done) {
            break;
          }
          if (event.id) {
            lastEventId = event.id;
            onresumptiontoken === null || onresumptiontoken === void 0 ? void 0 : onresumptiontoken(event.id);
          }
          if (!event.event || event.event === "message") {
            try {
              const message = JSONRPCMessageSchema.parse(JSON.parse(event.data));
              if (replayMessageId !== void 0 && isJSONRPCResponse(message)) {
                message.id = replayMessageId;
              }
              (_a2 = this.onmessage) === null || _a2 === void 0 ? void 0 : _a2.call(this, message);
            } catch (error) {
              (_b = this.onerror) === null || _b === void 0 ? void 0 : _b.call(this, error);
            }
          }
        }
      } catch (error) {
        (_c = this.onerror) === null || _c === void 0 ? void 0 : _c.call(this, new Error(`SSE stream disconnected: ${error}`));
        if (isReconnectable && this._abortController && !this._abortController.signal.aborted) {
          try {
            this._scheduleReconnection({
              resumptionToken: lastEventId,
              onresumptiontoken,
              replayMessageId
            }, 0);
          } catch (error2) {
            (_d = this.onerror) === null || _d === void 0 ? void 0 : _d.call(this, new Error(`Failed to reconnect: ${error2 instanceof Error ? error2.message : String(error2)}`));
          }
        }
      }
    };
    processStream();
  }
  async start() {
    if (this._abortController) {
      throw new Error("StreamableHTTPClientTransport already started! If using Client class, note that connect() calls start() automatically.");
    }
    this._abortController = new AbortController();
  }
  /**
   * Call this method after the user has finished authorizing via their user agent and is redirected back to the MCP client application. This will exchange the authorization code for an access token, enabling the next connection attempt to successfully auth.
   */
  async finishAuth(authorizationCode) {
    if (!this._authProvider) {
      throw new UnauthorizedError("No auth provider");
    }
    const result = await auth(this._authProvider, {
      serverUrl: this._url,
      authorizationCode,
      resourceMetadataUrl: this._resourceMetadataUrl,
      fetchFn: this._fetch
    });
    if (result !== "AUTHORIZED") {
      throw new UnauthorizedError("Failed to authorize");
    }
  }
  async close() {
    var _a2, _b;
    (_a2 = this._abortController) === null || _a2 === void 0 ? void 0 : _a2.abort();
    (_b = this.onclose) === null || _b === void 0 ? void 0 : _b.call(this);
  }
  async send(message, options) {
    var _a2, _b, _c, _d;
    try {
      const { resumptionToken, onresumptiontoken } = options || {};
      if (resumptionToken) {
        this._startOrAuthSse({ resumptionToken, replayMessageId: isJSONRPCRequest(message) ? message.id : void 0 }).catch((err) => {
          var _a3;
          return (_a3 = this.onerror) === null || _a3 === void 0 ? void 0 : _a3.call(this, err);
        });
        return;
      }
      const headers = await this._commonHeaders();
      headers.set("content-type", "application/json");
      headers.set("accept", "application/json, text/event-stream");
      const init = {
        ...this._requestInit,
        method: "POST",
        headers,
        body: JSON.stringify(message),
        signal: (_a2 = this._abortController) === null || _a2 === void 0 ? void 0 : _a2.signal
      };
      const response = await ((_b = this._fetch) !== null && _b !== void 0 ? _b : fetch)(this._url, init);
      const sessionId = response.headers.get("mcp-session-id");
      if (sessionId) {
        this._sessionId = sessionId;
      }
      if (!response.ok) {
        if (response.status === 401 && this._authProvider) {
          if (this._hasCompletedAuthFlow) {
            throw new StreamableHTTPError(401, "Server returned 401 after successful authentication");
          }
          this._resourceMetadataUrl = extractResourceMetadataUrl(response);
          const result = await auth(this._authProvider, {
            serverUrl: this._url,
            resourceMetadataUrl: this._resourceMetadataUrl,
            fetchFn: this._fetch
          });
          if (result !== "AUTHORIZED") {
            throw new UnauthorizedError();
          }
          this._hasCompletedAuthFlow = true;
          return this.send(message);
        }
        const text = await response.text().catch(() => null);
        throw new Error(`Error POSTing to endpoint (HTTP ${response.status}): ${text}`);
      }
      this._hasCompletedAuthFlow = false;
      if (response.status === 202) {
        if (isInitializedNotification(message)) {
          this._startOrAuthSse({ resumptionToken: void 0 }).catch((err) => {
            var _a3;
            return (_a3 = this.onerror) === null || _a3 === void 0 ? void 0 : _a3.call(this, err);
          });
        }
        return;
      }
      const messages = Array.isArray(message) ? message : [message];
      const hasRequests = messages.filter((msg) => "method" in msg && "id" in msg && msg.id !== void 0).length > 0;
      const contentType = response.headers.get("content-type");
      if (hasRequests) {
        if (contentType === null || contentType === void 0 ? void 0 : contentType.includes("text/event-stream")) {
          this._handleSseStream(response.body, { onresumptiontoken }, false);
        } else if (contentType === null || contentType === void 0 ? void 0 : contentType.includes("application/json")) {
          const data2 = await response.json();
          const responseMessages = Array.isArray(data2) ? data2.map((msg) => JSONRPCMessageSchema.parse(msg)) : [JSONRPCMessageSchema.parse(data2)];
          for (const msg of responseMessages) {
            (_c = this.onmessage) === null || _c === void 0 ? void 0 : _c.call(this, msg);
          }
        } else {
          throw new StreamableHTTPError(-1, `Unexpected content type: ${contentType}`);
        }
      }
    } catch (error) {
      (_d = this.onerror) === null || _d === void 0 ? void 0 : _d.call(this, error);
      throw error;
    }
  }
  get sessionId() {
    return this._sessionId;
  }
  /**
   * Terminates the current session by sending a DELETE request to the server.
   *
   * Clients that no longer need a particular session
   * (e.g., because the user is leaving the client application) SHOULD send an
   * HTTP DELETE to the MCP endpoint with the Mcp-Session-Id header to explicitly
   * terminate the session.
   *
   * The server MAY respond with HTTP 405 Method Not Allowed, indicating that
   * the server does not allow clients to terminate sessions.
   */
  async terminateSession() {
    var _a2, _b, _c;
    if (!this._sessionId) {
      return;
    }
    try {
      const headers = await this._commonHeaders();
      const init = {
        ...this._requestInit,
        method: "DELETE",
        headers,
        signal: (_a2 = this._abortController) === null || _a2 === void 0 ? void 0 : _a2.signal
      };
      const response = await ((_b = this._fetch) !== null && _b !== void 0 ? _b : fetch)(this._url, init);
      if (!response.ok && response.status !== 405) {
        throw new StreamableHTTPError(response.status, `Failed to terminate session: ${response.statusText}`);
      }
      this._sessionId = void 0;
    } catch (error) {
      (_c = this.onerror) === null || _c === void 0 ? void 0 : _c.call(this, error);
      throw error;
    }
  }
  setProtocolVersion(version2) {
    this._protocolVersion = version2;
  }
  get protocolVersion() {
    return this._protocolVersion;
  }
}
function toDisposable(fn) {
  return { dispose: fn };
}
var DisposableStore = class {
  constructor() {
    this._items = [];
  }
  add(d) {
    this._items.push(d);
    return d;
  }
  dispose() {
    while (this._items.length) try {
      this._items.pop().dispose();
    } catch {
    }
  }
};
var Emitter = class {
  constructor() {
    this._listeners = /* @__PURE__ */ new Set();
    this.event = (listener) => {
      this._listeners.add(listener);
      return toDisposable(() => this._listeners.delete(listener));
    };
  }
  fire(data2) {
    for (const listener of [...this._listeners]) try {
      listener(data2);
    } catch (err) {
      console.error("Emitter listener error:", err);
    }
  }
  dispose() {
    this._listeners.clear();
  }
};
function toErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}
function isUnauthorized(error) {
  const msg = toErrorMessage(error);
  return msg.includes("Unauthorized") || msg.includes("401");
}
function isTransportNotImplemented(error) {
  const msg = toErrorMessage(error);
  return msg.includes("404") || msg.includes("405") || msg.includes("Not Implemented") || msg.includes("not implemented");
}
var SSEEdgeClientTransport = class extends SSEClientTransport {
  /**
  * Creates a new EdgeSSEClientTransport, which overrides fetch to be compatible with the CF workers environment
  */
  constructor(url, options) {
    const fetchOverride = async (fetchUrl, fetchInit = {}) => {
      const headers = await this.authHeaders();
      const workerOptions = {
        ...fetchInit,
        headers: {
          ...options.requestInit?.headers,
          ...fetchInit?.headers,
          ...headers
        }
      };
      delete workerOptions.mode;
      return options.eventSourceInit?.fetch?.(fetchUrl, workerOptions) || fetch(fetchUrl, workerOptions);
    };
    super(url, {
      ...options,
      eventSourceInit: {
        ...options.eventSourceInit,
        fetch: fetchOverride
      }
    });
    this.authProvider = options.authProvider;
  }
  async authHeaders() {
    if (this.authProvider) {
      const tokens = await this.authProvider.tokens();
      if (tokens) return { Authorization: `Bearer ${tokens.access_token}` };
    }
  }
};
var StreamableHTTPEdgeClientTransport = class extends StreamableHTTPClientTransport {
  /**
  * Creates a new StreamableHTTPEdgeClientTransport, which overrides fetch to be compatible with the CF workers environment
  */
  constructor(url, options) {
    const fetchOverride = async (fetchUrl, fetchInit = {}) => {
      const headers = await this.authHeaders();
      const workerOptions = {
        ...fetchInit,
        headers: {
          ...options.requestInit?.headers,
          ...fetchInit?.headers,
          ...headers
        }
      };
      delete workerOptions.mode;
      return options.requestInit?.fetch?.(fetchUrl, workerOptions) || fetch(fetchUrl, workerOptions);
    };
    super(url, {
      ...options,
      requestInit: {
        ...options.requestInit,
        fetch: fetchOverride
      }
    });
    this.authProvider = options.authProvider;
  }
  async authHeaders() {
    if (this.authProvider) {
      const tokens = await this.authProvider.tokens();
      if (tokens) return { Authorization: `Bearer ${tokens.access_token}` };
    }
  }
};
var MCPClientConnection = class {
  constructor(url, info, options = {
    client: {},
    transport: {}
  }) {
    this.url = url;
    this.options = options;
    this.connectionState = "connecting";
    this.tools = [];
    this.prompts = [];
    this.resources = [];
    this.resourceTemplates = [];
    this._onObservabilityEvent = new Emitter();
    this.onObservabilityEvent = this._onObservabilityEvent.event;
    this.client = new Client(info, {
      ...options.client,
      capabilities: {
        ...options.client?.capabilities,
        elicitation: {}
      }
    });
  }
  /**
  * Initialize a client connection
  *
  * @returns
  */
  async init() {
    const transportType = this.options.transport.type;
    if (!transportType) throw new Error("Transport type must be specified");
    try {
      await this.tryConnect(transportType);
    } catch (e) {
      if (isUnauthorized(e)) {
        this.connectionState = "authenticating";
        return;
      }
      this._onObservabilityEvent.fire({
        type: "mcp:client:connect",
        displayMessage: `Connection initialization failed for ${this.url.toString()}`,
        payload: {
          url: this.url.toString(),
          transport: transportType,
          state: this.connectionState,
          error: toErrorMessage(e)
        },
        timestamp: Date.now(),
        id: nanoid()
      });
      this.connectionState = "failed";
      return;
    }
    await this.discoverAndRegister();
  }
  /**
  * Finish OAuth by probing transports based on configured type.
  * - Explicit: finish on that transport
  * - Auto: try streamable-http, then sse on 404/405/Not Implemented
  */
  async finishAuthProbe(code) {
    if (!this.options.transport.authProvider) throw new Error("No auth provider configured");
    const configuredType = this.options.transport.type;
    if (!configuredType) throw new Error("Transport type must be specified");
    const finishAuth = async (base) => {
      await this.getTransport(base).finishAuth(code);
    };
    if (configuredType === "sse" || configuredType === "streamable-http") {
      await finishAuth(configuredType);
      return;
    }
    try {
      await finishAuth("streamable-http");
    } catch (e) {
      if (isTransportNotImplemented(e)) {
        await finishAuth("sse");
        return;
      }
      throw e;
    }
  }
  /**
  * Complete OAuth authorization
  */
  async completeAuthorization(code) {
    if (this.connectionState !== "authenticating") throw new Error("Connection must be in authenticating state to complete authorization");
    try {
      await this.finishAuthProbe(code);
      this.connectionState = "connecting";
    } catch (error) {
      this.connectionState = "failed";
      throw error;
    }
  }
  /**
  * Establish connection after successful authorization
  */
  async establishConnection() {
    if (this.connectionState !== "connecting") throw new Error("Connection must be in connecting state to establish connection");
    try {
      const transportType = this.options.transport.type;
      if (!transportType) throw new Error("Transport type must be specified");
      await this.tryConnect(transportType);
      await this.discoverAndRegister();
    } catch (error) {
      this.connectionState = "failed";
      throw error;
    }
  }
  /**
  * Discover server capabilities and register tools, resources, prompts, and templates
  */
  async discoverAndRegister() {
    this.connectionState = "discovering";
    this.serverCapabilities = this.client.getServerCapabilities();
    if (!this.serverCapabilities) throw new Error("The MCP Server failed to return server capabilities");
    const [instructionsResult, toolsResult, resourcesResult, promptsResult, resourceTemplatesResult] = await Promise.allSettled([
      this.client.getInstructions(),
      this.registerTools(),
      this.registerResources(),
      this.registerPrompts(),
      this.registerResourceTemplates()
    ]);
    const operations = [
      {
        name: "instructions",
        result: instructionsResult
      },
      {
        name: "tools",
        result: toolsResult
      },
      {
        name: "resources",
        result: resourcesResult
      },
      {
        name: "prompts",
        result: promptsResult
      },
      {
        name: "resource templates",
        result: resourceTemplatesResult
      }
    ];
    for (const { name, result } of operations) if (result.status === "rejected") {
      const url = this.url.toString();
      this._onObservabilityEvent.fire({
        type: "mcp:client:discover",
        displayMessage: `Failed to discover ${name} for ${url}`,
        payload: {
          url,
          capability: name,
          error: result.reason
        },
        timestamp: Date.now(),
        id: nanoid()
      });
    }
    this.instructions = instructionsResult.status === "fulfilled" ? instructionsResult.value : void 0;
    this.tools = toolsResult.status === "fulfilled" ? toolsResult.value : [];
    this.resources = resourcesResult.status === "fulfilled" ? resourcesResult.value : [];
    this.prompts = promptsResult.status === "fulfilled" ? promptsResult.value : [];
    this.resourceTemplates = resourceTemplatesResult.status === "fulfilled" ? resourceTemplatesResult.value : [];
    this.connectionState = "ready";
  }
  /**
  * Notification handler registration
  */
  async registerTools() {
    if (!this.serverCapabilities || !this.serverCapabilities.tools) return [];
    if (this.serverCapabilities.tools.listChanged) this.client.setNotificationHandler(ToolListChangedNotificationSchema, async (_notification) => {
      this.tools = await this.fetchTools();
    });
    return this.fetchTools();
  }
  async registerResources() {
    if (!this.serverCapabilities || !this.serverCapabilities.resources) return [];
    if (this.serverCapabilities.resources.listChanged) this.client.setNotificationHandler(ResourceListChangedNotificationSchema, async (_notification) => {
      this.resources = await this.fetchResources();
    });
    return this.fetchResources();
  }
  async registerPrompts() {
    if (!this.serverCapabilities || !this.serverCapabilities.prompts) return [];
    if (this.serverCapabilities.prompts.listChanged) this.client.setNotificationHandler(PromptListChangedNotificationSchema, async (_notification) => {
      this.prompts = await this.fetchPrompts();
    });
    return this.fetchPrompts();
  }
  async registerResourceTemplates() {
    if (!this.serverCapabilities || !this.serverCapabilities.resources) return [];
    return this.fetchResourceTemplates();
  }
  async fetchTools() {
    let toolsAgg = [];
    let toolsResult = { tools: [] };
    do {
      toolsResult = await this.client.listTools({ cursor: toolsResult.nextCursor }).catch(this._capabilityErrorHandler({ tools: [] }, "tools/list"));
      toolsAgg = toolsAgg.concat(toolsResult.tools);
    } while (toolsResult.nextCursor);
    return toolsAgg;
  }
  async fetchResources() {
    let resourcesAgg = [];
    let resourcesResult = { resources: [] };
    do {
      resourcesResult = await this.client.listResources({ cursor: resourcesResult.nextCursor }).catch(this._capabilityErrorHandler({ resources: [] }, "resources/list"));
      resourcesAgg = resourcesAgg.concat(resourcesResult.resources);
    } while (resourcesResult.nextCursor);
    return resourcesAgg;
  }
  async fetchPrompts() {
    let promptsAgg = [];
    let promptsResult = { prompts: [] };
    do {
      promptsResult = await this.client.listPrompts({ cursor: promptsResult.nextCursor }).catch(this._capabilityErrorHandler({ prompts: [] }, "prompts/list"));
      promptsAgg = promptsAgg.concat(promptsResult.prompts);
    } while (promptsResult.nextCursor);
    return promptsAgg;
  }
  async fetchResourceTemplates() {
    let templatesAgg = [];
    let templatesResult = { resourceTemplates: [] };
    do {
      templatesResult = await this.client.listResourceTemplates({ cursor: templatesResult.nextCursor }).catch(this._capabilityErrorHandler({ resourceTemplates: [] }, "resources/templates/list"));
      templatesAgg = templatesAgg.concat(templatesResult.resourceTemplates);
    } while (templatesResult.nextCursor);
    return templatesAgg;
  }
  /**
  * Handle elicitation request from server
  * Automatically uses the Agent's built-in elicitation handling if available
  */
  async handleElicitationRequest(_request) {
    throw new Error("Elicitation handler must be implemented for your platform. Override handleElicitationRequest method.");
  }
  /**
  * Get the transport for the client
  * @param transportType - The transport type to get
  * @returns The transport for the client
  */
  getTransport(transportType) {
    switch (transportType) {
      case "streamable-http":
        return new StreamableHTTPEdgeClientTransport(this.url, this.options.transport);
      case "sse":
        return new SSEEdgeClientTransport(this.url, this.options.transport);
      default:
        throw new Error(`Unsupported transport type: ${transportType}`);
    }
  }
  async tryConnect(transportType) {
    const transports = transportType === "auto" ? ["streamable-http", "sse"] : [transportType];
    for (const currentTransportType of transports) {
      const isLastTransport = currentTransportType === transports[transports.length - 1];
      const hasFallback = transportType === "auto" && currentTransportType === "streamable-http" && !isLastTransport;
      const transport = this.getTransport(currentTransportType);
      try {
        await this.client.connect(transport);
        this.lastConnectedTransport = currentTransportType;
        const url = this.url.toString();
        this._onObservabilityEvent.fire({
          type: "mcp:client:connect",
          displayMessage: `Connected successfully using ${currentTransportType} transport for ${url}`,
          payload: {
            url,
            transport: currentTransportType,
            state: this.connectionState
          },
          timestamp: Date.now(),
          id: nanoid()
        });
        break;
      } catch (e) {
        const error = e instanceof Error ? e : new Error(String(e));
        if (isUnauthorized(error)) throw e;
        if (hasFallback && isTransportNotImplemented(error)) {
          const url = this.url.toString();
          this._onObservabilityEvent.fire({
            type: "mcp:client:connect",
            displayMessage: `${currentTransportType} transport not available, trying ${transports[transports.indexOf(currentTransportType) + 1]} for ${url}`,
            payload: {
              url,
              transport: currentTransportType,
              state: this.connectionState
            },
            timestamp: Date.now(),
            id: nanoid()
          });
          continue;
        }
        throw e;
      }
    }
    this.client.setRequestHandler(ElicitRequestSchema, async (request) => {
      return await this.handleElicitationRequest(request);
    });
  }
  _capabilityErrorHandler(empty, method) {
    return (e) => {
      if (e.code === -32601) {
        const url = this.url.toString();
        this._onObservabilityEvent.fire({
          type: "mcp:client:discover",
          displayMessage: `The server advertised support for the capability ${method.split("/")[0]}, but returned "Method not found" for '${method}' for ${url}`,
          payload: {
            url,
            capability: method.split("/")[0],
            error: toErrorMessage(e)
          },
          timestamp: Date.now(),
          id: nanoid()
        });
        return empty;
      }
      throw e;
    };
  }
};
var MCPClientManager = class {
  /**
  * @param _name Name of the MCP client
  * @param _version Version of the MCP Client
  * @param auth Auth paramters if being used to create a DurableObjectOAuthClientProvider
  */
  constructor(_name, _version) {
    this._name = _name;
    this._version = _version;
    this.mcpConnections = {};
    this._callbackUrls = [];
    this._didWarnAboutUnstableGetAITools = false;
    this._connectionDisposables = /* @__PURE__ */ new Map();
    this._onObservabilityEvent = new Emitter();
    this.onObservabilityEvent = this._onObservabilityEvent.event;
    this._onConnected = new Emitter();
    this.onConnected = this._onConnected.event;
  }
  /**
  * Connect to and register an MCP server
  *
  * @param transportConfig Transport config
  * @param clientConfig Client config
  * @param capabilities Client capabilities (i.e. if the client supports roots/sampling)
  */
  async connect(url, options = {}) {
    if (!this.jsonSchema) {
      const { jsonSchema } = await import("./index-DBoY5ByM.js");
      this.jsonSchema = jsonSchema;
    }
    const id = options.reconnect?.id ?? nanoid(8);
    if (options.transport?.authProvider) {
      options.transport.authProvider.serverId = id;
      if (options.reconnect?.oauthClientId) options.transport.authProvider.clientId = options.reconnect?.oauthClientId;
    }
    if (!options.reconnect?.oauthCode || !this.mcpConnections[id]) {
      const normalizedTransport = {
        ...options.transport,
        type: options.transport?.type ?? "auto"
      };
      this.mcpConnections[id] = new MCPClientConnection(new URL(url), {
        name: this._name,
        version: this._version
      }, {
        client: options.client ?? {},
        transport: normalizedTransport
      });
      const store = new DisposableStore();
      const existing = this._connectionDisposables.get(id);
      if (existing) existing.dispose();
      this._connectionDisposables.set(id, store);
      store.add(this.mcpConnections[id].onObservabilityEvent((event) => {
        this._onObservabilityEvent.fire(event);
      }));
    }
    await this.mcpConnections[id].init();
    if (options.reconnect?.oauthCode) try {
      await this.mcpConnections[id].completeAuthorization(options.reconnect.oauthCode);
      await this.mcpConnections[id].establishConnection();
    } catch (error) {
      this._onObservabilityEvent.fire({
        type: "mcp:client:connect",
        displayMessage: `Failed to complete OAuth reconnection for ${id} for ${url}`,
        payload: {
          url,
          transport: options.transport?.type ?? "auto",
          state: this.mcpConnections[id].connectionState,
          error: toErrorMessage(error)
        },
        timestamp: Date.now(),
        id
      });
      throw error;
    }
    const authUrl = options.transport?.authProvider?.authUrl;
    if (this.mcpConnections[id].connectionState === "authenticating" && authUrl && options.transport?.authProvider?.redirectUrl) {
      this._callbackUrls.push(options.transport.authProvider.redirectUrl.toString());
      return {
        authUrl,
        clientId: options.transport?.authProvider?.clientId,
        id
      };
    }
    return { id };
  }
  isCallbackRequest(req) {
    return req.method === "GET" && !!this._callbackUrls.find((url) => {
      return req.url.startsWith(url);
    });
  }
  async handleCallbackRequest(req) {
    const url = new URL(req.url);
    const urlMatch = this._callbackUrls.find((url$1) => {
      return req.url.startsWith(url$1);
    });
    if (!urlMatch) throw new Error(`No callback URI match found for the request url: ${req.url}. Was the request matched with \`isCallbackRequest()\`?`);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const urlParams = urlMatch.split("/");
    const serverId = urlParams[urlParams.length - 1];
    if (!code) throw new Error("Unauthorized: no code provided");
    if (!state) throw new Error("Unauthorized: no state provided");
    if (this.mcpConnections[serverId] === void 0) throw new Error(`Could not find serverId: ${serverId}`);
    if (this.mcpConnections[serverId].connectionState !== "authenticating") throw new Error("Failed to authenticate: the client isn't in the `authenticating` state");
    const conn = this.mcpConnections[serverId];
    if (!conn.options.transport.authProvider) throw new Error("Trying to finalize authentication for a server connection without an authProvider");
    const clientId = conn.options.transport.authProvider.clientId || state;
    conn.options.transport.authProvider.clientId = clientId;
    conn.options.transport.authProvider.serverId = serverId;
    try {
      await conn.completeAuthorization(code);
      return {
        serverId,
        authSuccess: true
      };
    } catch (error) {
      return {
        serverId,
        authSuccess: false,
        authError: error instanceof Error ? error.message : String(error)
      };
    }
  }
  /**
  * Establish connection in the background after OAuth completion
  * This method is called asynchronously and doesn't block the OAuth callback response
  * @param serverId The server ID to establish connection for
  */
  async establishConnection(serverId) {
    const conn = this.mcpConnections[serverId];
    if (!conn) {
      this._onObservabilityEvent.fire({
        type: "mcp:client:preconnect",
        displayMessage: `Connection not found for serverId: ${serverId}`,
        payload: { serverId },
        timestamp: Date.now(),
        id: nanoid()
      });
      return;
    }
    try {
      await conn.establishConnection();
      this._onConnected.fire(serverId);
    } catch (error) {
      const url = conn.url.toString();
      this._onObservabilityEvent.fire({
        type: "mcp:client:connect",
        displayMessage: `Failed to establish connection to server ${serverId} with url ${url}`,
        payload: {
          url,
          transport: conn.options.transport.type ?? "auto",
          state: conn.connectionState,
          error: toErrorMessage(error)
        },
        timestamp: Date.now(),
        id: nanoid()
      });
    }
  }
  /**
  * Register a callback URL for OAuth handling
  * @param url The callback URL to register
  */
  registerCallbackUrl(url) {
    if (!this._callbackUrls.includes(url)) this._callbackUrls.push(url);
  }
  /**
  * Unregister a callback URL
  * @param serverId The server ID whose callback URL should be removed
  */
  unregisterCallbackUrl(serverId) {
    this._callbackUrls = this._callbackUrls.filter((url) => !url.endsWith(`/${serverId}`));
  }
  /**
  * Configure OAuth callback handling
  * @param config OAuth callback configuration
  */
  configureOAuthCallback(config2) {
    this._oauthCallbackConfig = config2;
  }
  /**
  * Get the current OAuth callback configuration
  * @returns The current OAuth callback configuration
  */
  getOAuthCallbackConfig() {
    return this._oauthCallbackConfig;
  }
  /**
  * @returns namespaced list of tools
  */
  listTools() {
    return getNamespacedData(this.mcpConnections, "tools");
  }
  /**
  * @returns a set of tools that you can use with the AI SDK
  */
  getAITools() {
    return Object.fromEntries(getNamespacedData(this.mcpConnections, "tools").map((tool) => {
      return [`tool_${tool.serverId.replace(/-/g, "")}_${tool.name}`, {
        description: tool.description,
        execute: async (args) => {
          const result = await this.callTool({
            arguments: args,
            name: tool.name,
            serverId: tool.serverId
          });
          if (result.isError) throw new Error(result.content[0].text);
          return result;
        },
        inputSchema: this.jsonSchema(tool.inputSchema),
        outputSchema: tool.outputSchema ? this.jsonSchema(tool.outputSchema) : void 0
      }];
    }));
  }
  /**
  * @deprecated this has been renamed to getAITools(), and unstable_getAITools will be removed in the next major version
  * @returns a set of tools that you can use with the AI SDK
  */
  unstable_getAITools() {
    if (!this._didWarnAboutUnstableGetAITools) {
      this._didWarnAboutUnstableGetAITools = true;
      console.warn("unstable_getAITools is deprecated, use getAITools instead. unstable_getAITools will be removed in the next major version.");
    }
    return this.getAITools();
  }
  /**
  * Closes all connections to MCP servers
  */
  async closeAllConnections() {
    const ids = Object.keys(this.mcpConnections);
    await Promise.all(ids.map(async (id) => {
      await this.mcpConnections[id].client.close();
    }));
    for (const id of ids) {
      const store = this._connectionDisposables.get(id);
      if (store) store.dispose();
      this._connectionDisposables.delete(id);
      delete this.mcpConnections[id];
    }
  }
  /**
  * Closes a connection to an MCP server
  * @param id The id of the connection to close
  */
  async closeConnection(id) {
    if (!this.mcpConnections[id]) throw new Error(`Connection with id "${id}" does not exist.`);
    await this.mcpConnections[id].client.close();
    delete this.mcpConnections[id];
    const store = this._connectionDisposables.get(id);
    if (store) store.dispose();
    this._connectionDisposables.delete(id);
  }
  /**
  * Dispose the manager and all resources.
  */
  async dispose() {
    try {
      await this.closeAllConnections();
    } finally {
      this._onConnected.dispose();
      this._onObservabilityEvent.dispose();
    }
  }
  /**
  * @returns namespaced list of prompts
  */
  listPrompts() {
    return getNamespacedData(this.mcpConnections, "prompts");
  }
  /**
  * @returns namespaced list of tools
  */
  listResources() {
    return getNamespacedData(this.mcpConnections, "resources");
  }
  /**
  * @returns namespaced list of resource templates
  */
  listResourceTemplates() {
    return getNamespacedData(this.mcpConnections, "resourceTemplates");
  }
  /**
  * Namespaced version of callTool
  */
  async callTool(params, resultSchema, options) {
    const unqualifiedName = params.name.replace(`${params.serverId}.`, "");
    return this.mcpConnections[params.serverId].client.callTool({
      ...params,
      name: unqualifiedName
    }, resultSchema, options);
  }
  /**
  * Namespaced version of readResource
  */
  readResource(params, options) {
    return this.mcpConnections[params.serverId].client.readResource(params, options);
  }
  /**
  * Namespaced version of getPrompt
  */
  getPrompt(params, options) {
    return this.mcpConnections[params.serverId].client.getPrompt(params, options);
  }
};
function getNamespacedData(mcpClients, type2) {
  return Object.entries(mcpClients).map(([name, conn]) => {
    return {
      data: conn[type2],
      name
    };
  }).flatMap(({ name: serverId, data: data2 }) => {
    return data2.map((item) => {
      return {
        ...item,
        serverId
      };
    });
  });
}
var DurableObjectOAuthClientProvider = class {
  constructor(storage, clientName, baseRedirectUrl) {
    this.storage = storage;
    this.clientName = clientName;
    this.baseRedirectUrl = baseRedirectUrl;
  }
  get clientMetadata() {
    return {
      client_name: this.clientName,
      client_uri: this.clientUri,
      grant_types: ["authorization_code", "refresh_token"],
      redirect_uris: [this.redirectUrl],
      response_types: ["code"],
      token_endpoint_auth_method: "none"
    };
  }
  get clientUri() {
    return new URL(this.redirectUrl).origin;
  }
  get redirectUrl() {
    return `${this.baseRedirectUrl}/${this.serverId}`;
  }
  get clientId() {
    if (!this._clientId_) throw new Error("Trying to access clientId before it was set");
    return this._clientId_;
  }
  set clientId(clientId_) {
    this._clientId_ = clientId_;
  }
  get serverId() {
    if (!this._serverId_) throw new Error("Trying to access serverId before it was set");
    return this._serverId_;
  }
  set serverId(serverId_) {
    this._serverId_ = serverId_;
  }
  keyPrefix(clientId) {
    return `/${this.clientName}/${this.serverId}/${clientId}`;
  }
  clientInfoKey(clientId) {
    return `${this.keyPrefix(clientId)}/client_info/`;
  }
  async clientInformation() {
    if (!this._clientId_) return;
    return await this.storage.get(this.clientInfoKey(this.clientId)) ?? void 0;
  }
  async saveClientInformation(clientInformation) {
    await this.storage.put(this.clientInfoKey(clientInformation.client_id), clientInformation);
    this.clientId = clientInformation.client_id;
  }
  tokenKey(clientId) {
    return `${this.keyPrefix(clientId)}/token`;
  }
  async tokens() {
    if (!this._clientId_) return;
    return await this.storage.get(this.tokenKey(this.clientId)) ?? void 0;
  }
  async saveTokens(tokens) {
    await this.storage.put(this.tokenKey(this.clientId), tokens);
  }
  get authUrl() {
    return this._authUrl_;
  }
  /**
  * Because this operates on the server side (but we need browser auth), we send this url back to the user
  * and require user interact to initiate the redirect flow
  */
  async redirectToAuthorization(authUrl) {
    const stateToken = nanoid();
    authUrl.searchParams.set("state", stateToken);
    this._authUrl_ = authUrl.toString();
  }
  codeVerifierKey(clientId) {
    return `${this.keyPrefix(clientId)}/code_verifier`;
  }
  async saveCodeVerifier(verifier) {
    const key = this.codeVerifierKey(this.clientId);
    if (await this.storage.get(key)) return;
    await this.storage.put(key, verifier);
  }
  async codeVerifier() {
    const codeVerifier = await this.storage.get(this.codeVerifierKey(this.clientId));
    if (!codeVerifier) throw new Error("No code verifier found");
    return codeVerifier;
  }
};
function extractDateElements(date) {
  return {
    second: date.getSeconds(),
    minute: date.getMinutes(),
    hour: date.getHours(),
    day: date.getDate(),
    month: date.getMonth(),
    weekday: date.getDay(),
    year: date.getFullYear()
  };
}
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getDaysBetweenWeekdays(weekday1, weekday2) {
  if (weekday1 <= weekday2) {
    return weekday2 - weekday1;
  }
  return 6 - weekday1 + weekday2 + 1;
}
class Cron {
  constructor({ seconds, minutes, hours, days, months, weekdays }) {
    if (!seconds || seconds.size === 0)
      throw new Error("There must be at least one allowed second.");
    if (!minutes || minutes.size === 0)
      throw new Error("There must be at least one allowed minute.");
    if (!hours || hours.size === 0)
      throw new Error("There must be at least one allowed hour.");
    if (!months || months.size === 0)
      throw new Error("There must be at least one allowed month.");
    if ((!weekdays || weekdays.size === 0) && (!days || days.size === 0))
      throw new Error("There must be at least one allowed day or weekday.");
    this.seconds = Array.from(seconds).sort((a, b) => a - b);
    this.minutes = Array.from(minutes).sort((a, b) => a - b);
    this.hours = Array.from(hours).sort((a, b) => a - b);
    this.days = Array.from(days).sort((a, b) => a - b);
    this.months = Array.from(months).sort((a, b) => a - b);
    this.weekdays = Array.from(weekdays).sort((a, b) => a - b);
    const validateData = (name, data2, constraint) => {
      if (data2.some((x) => typeof x !== "number" || x % 1 !== 0 || x < constraint.min || x > constraint.max)) {
        throw new Error(`${name} must only consist of integers which are within the range of ${constraint.min} and ${constraint.max}`);
      }
    };
    validateData("seconds", this.seconds, { min: 0, max: 59 });
    validateData("minutes", this.minutes, { min: 0, max: 59 });
    validateData("hours", this.hours, { min: 0, max: 23 });
    validateData("days", this.days, { min: 1, max: 31 });
    validateData("months", this.months, { min: 0, max: 11 });
    validateData("weekdays", this.weekdays, { min: 0, max: 6 });
    this.reversed = {
      seconds: this.seconds.map((x) => x).reverse(),
      minutes: this.minutes.map((x) => x).reverse(),
      hours: this.hours.map((x) => x).reverse(),
      days: this.days.map((x) => x).reverse(),
      months: this.months.map((x) => x).reverse(),
      weekdays: this.weekdays.map((x) => x).reverse()
    };
  }
  /**
   * Find the next or previous hour, starting from the given start hour that matches the hour constraint.
   * startHour itself might also be allowed.
   */
  findAllowedHour(dir, startHour) {
    return dir === "next" ? this.hours.find((x) => x >= startHour) : this.reversed.hours.find((x) => x <= startHour);
  }
  /**
   * Find the next or previous minute, starting from the given start minute that matches the minute constraint.
   * startMinute itself might also be allowed.
   */
  findAllowedMinute(dir, startMinute) {
    return dir === "next" ? this.minutes.find((x) => x >= startMinute) : this.reversed.minutes.find((x) => x <= startMinute);
  }
  /**
   * Find the next or previous second, starting from the given start second that matches the second constraint.
   * startSecond itself IS NOT allowed.
   */
  findAllowedSecond(dir, startSecond) {
    return dir === "next" ? this.seconds.find((x) => x > startSecond) : this.reversed.seconds.find((x) => x < startSecond);
  }
  /**
   * Find the next or previous time, starting from the given start time that matches the hour, minute
   * and second constraints. startTime itself might also be allowed.
   */
  findAllowedTime(dir, startTime) {
    let hour = this.findAllowedHour(dir, startTime.hour);
    if (hour !== void 0) {
      if (hour === startTime.hour) {
        let minute = this.findAllowedMinute(dir, startTime.minute);
        if (minute !== void 0) {
          if (minute === startTime.minute) {
            const second = this.findAllowedSecond(dir, startTime.second);
            if (second !== void 0) {
              return { hour, minute, second };
            }
            minute = this.findAllowedMinute(dir, dir === "next" ? startTime.minute + 1 : startTime.minute - 1);
            if (minute !== void 0) {
              return {
                hour,
                minute,
                second: dir === "next" ? this.seconds[0] : this.reversed.seconds[0]
              };
            }
          } else {
            return {
              hour,
              minute,
              second: dir === "next" ? this.seconds[0] : this.reversed.seconds[0]
            };
          }
        }
        hour = this.findAllowedHour(dir, dir === "next" ? startTime.hour + 1 : startTime.hour - 1);
        if (hour !== void 0) {
          return {
            hour,
            minute: dir === "next" ? this.minutes[0] : this.reversed.minutes[0],
            second: dir === "next" ? this.seconds[0] : this.reversed.seconds[0]
          };
        }
      } else {
        return {
          hour,
          minute: dir === "next" ? this.minutes[0] : this.reversed.minutes[0],
          second: dir === "next" ? this.seconds[0] : this.reversed.seconds[0]
        };
      }
    }
    return void 0;
  }
  /**
   * Find the next or previous day in the given month, starting from the given startDay
   * that matches either the day or the weekday constraint. startDay itself might also be allowed.
   */
  findAllowedDayInMonth(dir, year, month, startDay) {
    var _a2, _b;
    if (startDay < 1)
      throw new Error("startDay must not be smaller than 1.");
    const daysInMonth = getDaysInMonth(year, month);
    const daysRestricted = this.days.length !== 31;
    const weekdaysRestricted = this.weekdays.length !== 7;
    if (!daysRestricted && !weekdaysRestricted) {
      if (startDay > daysInMonth) {
        return dir === "next" ? void 0 : daysInMonth;
      }
      return startDay;
    }
    let allowedDayByDays;
    if (daysRestricted) {
      allowedDayByDays = dir === "next" ? this.days.find((x) => x >= startDay) : this.reversed.days.find((x) => x <= startDay);
      if (allowedDayByDays !== void 0 && allowedDayByDays > daysInMonth) {
        allowedDayByDays = void 0;
      }
    }
    let allowedDayByWeekdays;
    if (weekdaysRestricted) {
      const startWeekday = new Date(year, month, startDay).getDay();
      const nearestAllowedWeekday = dir === "next" ? (_a2 = this.weekdays.find((x) => x >= startWeekday)) !== null && _a2 !== void 0 ? _a2 : this.weekdays[0] : (_b = this.reversed.weekdays.find((x) => x <= startWeekday)) !== null && _b !== void 0 ? _b : this.reversed.weekdays[0];
      if (nearestAllowedWeekday !== void 0) {
        const daysBetweenWeekdays = dir === "next" ? getDaysBetweenWeekdays(startWeekday, nearestAllowedWeekday) : getDaysBetweenWeekdays(nearestAllowedWeekday, startWeekday);
        allowedDayByWeekdays = dir === "next" ? startDay + daysBetweenWeekdays : startDay - daysBetweenWeekdays;
        if (allowedDayByWeekdays > daysInMonth || allowedDayByWeekdays < 1) {
          allowedDayByWeekdays = void 0;
        }
      }
    }
    if (allowedDayByDays !== void 0 && allowedDayByWeekdays !== void 0) {
      return dir === "next" ? Math.min(allowedDayByDays, allowedDayByWeekdays) : Math.max(allowedDayByDays, allowedDayByWeekdays);
    }
    if (allowedDayByDays !== void 0) {
      return allowedDayByDays;
    }
    if (allowedDayByWeekdays !== void 0) {
      return allowedDayByWeekdays;
    }
    return void 0;
  }
  /** Gets the next date starting from the given start date or now. */
  getNextDate(startDate = /* @__PURE__ */ new Date()) {
    const startDateElements = extractDateElements(startDate);
    let minYear = startDateElements.year;
    let startIndexMonth = this.months.findIndex((x) => x >= startDateElements.month);
    if (startIndexMonth === -1) {
      startIndexMonth = 0;
      minYear++;
    }
    const maxIterations = this.months.length * 5;
    for (let i = 0; i < maxIterations; i++) {
      const year = minYear + Math.floor((startIndexMonth + i) / this.months.length);
      const month = this.months[(startIndexMonth + i) % this.months.length];
      const isStartMonth = year === startDateElements.year && month === startDateElements.month;
      let day = this.findAllowedDayInMonth("next", year, month, isStartMonth ? startDateElements.day : 1);
      let isStartDay = isStartMonth && day === startDateElements.day;
      if (day !== void 0 && isStartDay) {
        const nextTime = this.findAllowedTime("next", startDateElements);
        if (nextTime !== void 0) {
          return new Date(year, month, day, nextTime.hour, nextTime.minute, nextTime.second);
        }
        day = this.findAllowedDayInMonth("next", year, month, day + 1);
        isStartDay = false;
      }
      if (day !== void 0 && !isStartDay) {
        return new Date(year, month, day, this.hours[0], this.minutes[0], this.seconds[0]);
      }
    }
    throw new Error("No valid next date was found.");
  }
  /** Gets the specified amount of future dates starting from the given start date or now. */
  getNextDates(amount, startDate) {
    const dates = [];
    let nextDate;
    for (let i = 0; i < amount; i++) {
      nextDate = this.getNextDate(nextDate !== null && nextDate !== void 0 ? nextDate : startDate);
      dates.push(nextDate);
    }
    return dates;
  }
  /**
   * Get an ES6 compatible iterator which iterates over the next dates starting from startDate or now.
   * The iterator runs until the optional endDate is reached or forever.
   */
  *getNextDatesIterator(startDate, endDate) {
    let nextDate;
    while (true) {
      nextDate = this.getNextDate(nextDate !== null && nextDate !== void 0 ? nextDate : startDate);
      if (endDate && endDate.getTime() < nextDate.getTime()) {
        return;
      }
      yield nextDate;
    }
  }
  /** Gets the previous date starting from the given start date or now. */
  getPrevDate(startDate = /* @__PURE__ */ new Date()) {
    const startDateElements = extractDateElements(startDate);
    let maxYear = startDateElements.year;
    let startIndexMonth = this.reversed.months.findIndex((x) => x <= startDateElements.month);
    if (startIndexMonth === -1) {
      startIndexMonth = 0;
      maxYear--;
    }
    const maxIterations = this.reversed.months.length * 5;
    for (let i = 0; i < maxIterations; i++) {
      const year = maxYear - Math.floor((startIndexMonth + i) / this.reversed.months.length);
      const month = this.reversed.months[(startIndexMonth + i) % this.reversed.months.length];
      const isStartMonth = year === startDateElements.year && month === startDateElements.month;
      let day = this.findAllowedDayInMonth("prev", year, month, isStartMonth ? startDateElements.day : (
        // Start searching from the last day of the month.
        getDaysInMonth(year, month)
      ));
      let isStartDay = isStartMonth && day === startDateElements.day;
      if (day !== void 0 && isStartDay) {
        const prevTime = this.findAllowedTime("prev", startDateElements);
        if (prevTime !== void 0) {
          return new Date(year, month, day, prevTime.hour, prevTime.minute, prevTime.second);
        }
        if (day > 1) {
          day = this.findAllowedDayInMonth("prev", year, month, day - 1);
          isStartDay = false;
        }
      }
      if (day !== void 0 && !isStartDay) {
        return new Date(year, month, day, this.reversed.hours[0], this.reversed.minutes[0], this.reversed.seconds[0]);
      }
    }
    throw new Error("No valid previous date was found.");
  }
  /** Gets the specified amount of previous dates starting from the given start date or now. */
  getPrevDates(amount, startDate) {
    const dates = [];
    let prevDate;
    for (let i = 0; i < amount; i++) {
      prevDate = this.getPrevDate(prevDate !== null && prevDate !== void 0 ? prevDate : startDate);
      dates.push(prevDate);
    }
    return dates;
  }
  /**
   * Get an ES6 compatible iterator which iterates over the previous dates starting from startDate or now.
   * The iterator runs until the optional endDate is reached or forever.
   */
  *getPrevDatesIterator(startDate, endDate) {
    let prevDate;
    while (true) {
      prevDate = this.getPrevDate(prevDate !== null && prevDate !== void 0 ? prevDate : startDate);
      if (endDate && endDate.getTime() > prevDate.getTime()) {
        return;
      }
      yield prevDate;
    }
  }
  /** Returns true when there is a cron date at the given date. */
  matchDate(date) {
    const { second, minute, hour, day, month, weekday } = extractDateElements(date);
    if (this.seconds.indexOf(second) === -1 || this.minutes.indexOf(minute) === -1 || this.hours.indexOf(hour) === -1 || this.months.indexOf(month) === -1) {
      return false;
    }
    if (this.days.length !== 31 && this.weekdays.length !== 7) {
      return this.days.indexOf(day) !== -1 || this.weekdays.indexOf(weekday) !== -1;
    }
    return this.days.indexOf(day) !== -1 && this.weekdays.indexOf(weekday) !== -1;
  }
}
const secondConstraint = {
  min: 0,
  max: 59
};
const minuteConstraint = {
  min: 0,
  max: 59
};
const hourConstraint = {
  min: 0,
  max: 23
};
const dayConstraint = {
  min: 1,
  max: 31
};
const monthConstraint = {
  min: 1,
  max: 12,
  aliases: {
    jan: "1",
    feb: "2",
    mar: "3",
    apr: "4",
    may: "5",
    jun: "6",
    jul: "7",
    aug: "8",
    sep: "9",
    oct: "10",
    nov: "11",
    dec: "12"
  }
};
const weekdayConstraint = {
  min: 0,
  max: 7,
  aliases: {
    mon: "1",
    tue: "2",
    wed: "3",
    thu: "4",
    fri: "5",
    sat: "6",
    sun: "7"
  }
};
const timeNicknames = {
  "@yearly": "0 0 1 1 *",
  "@annually": "0 0 1 1 *",
  "@monthly": "0 0 1 * *",
  "@weekly": "0 0 * * 0",
  "@daily": "0 0 * * *",
  "@hourly": "0 * * * *",
  "@minutely": "* * * * *"
};
function parseElement(element, constraint) {
  const result = /* @__PURE__ */ new Set();
  if (element === "*") {
    for (let i = constraint.min; i <= constraint.max; i = i + 1) {
      result.add(i);
    }
    return result;
  }
  const listElements = element.split(",");
  if (listElements.length > 1) {
    for (const listElement of listElements) {
      const parsedListElement = parseElement(listElement, constraint);
      for (const x of parsedListElement) {
        result.add(x);
      }
    }
    return result;
  }
  const parseSingleElement = (singleElement) => {
    var _a2, _b;
    singleElement = (_b = (_a2 = constraint.aliases) === null || _a2 === void 0 ? void 0 : _a2[singleElement.toLowerCase()]) !== null && _b !== void 0 ? _b : singleElement;
    const parsedElement = Number.parseInt(singleElement, 10);
    if (Number.isNaN(parsedElement)) {
      throw new Error(`Failed to parse ${element}: ${singleElement} is NaN.`);
    }
    if (parsedElement < constraint.min || parsedElement > constraint.max) {
      throw new Error(`Failed to parse ${element}: ${singleElement} is outside of constraint range of ${constraint.min} - ${constraint.max}.`);
    }
    return parsedElement;
  };
  const rangeSegments = /^(([0-9a-zA-Z]+)-([0-9a-zA-Z]+)|\*)(\/([0-9]+))?$/.exec(element);
  if (rangeSegments === null) {
    result.add(parseSingleElement(element));
    return result;
  }
  let parsedStart = rangeSegments[1] === "*" ? constraint.min : parseSingleElement(rangeSegments[2]);
  const parsedEnd = rangeSegments[1] === "*" ? constraint.max : parseSingleElement(rangeSegments[3]);
  if (constraint === weekdayConstraint && parsedStart === 7 && // this check ensures that sun-sun is not incorrectly parsed as [0,1,2,3,4,5,6]
  parsedEnd !== 7) {
    parsedStart = 0;
  }
  if (parsedStart > parsedEnd) {
    throw new Error(`Failed to parse ${element}: Invalid range (start: ${parsedStart}, end: ${parsedEnd}).`);
  }
  const step = rangeSegments[5];
  let parsedStep = 1;
  if (step !== void 0) {
    parsedStep = Number.parseInt(step, 10);
    if (Number.isNaN(parsedStep)) {
      throw new Error(`Failed to parse step: ${step} is NaN.`);
    }
    if (parsedStep < 1) {
      throw new Error(`Failed to parse step: Expected ${step} to be greater than 0.`);
    }
  }
  for (let i = parsedStart; i <= parsedEnd; i = i + parsedStep) {
    result.add(i);
  }
  return result;
}
function parseCronExpression(cronExpression) {
  var _a2;
  if (typeof cronExpression !== "string") {
    throw new TypeError("Invalid cron expression: must be of type string.");
  }
  cronExpression = (_a2 = timeNicknames[cronExpression.toLowerCase()]) !== null && _a2 !== void 0 ? _a2 : cronExpression;
  const elements = cronExpression.split(" ").filter((elem) => elem.length > 0);
  if (elements.length < 5 || elements.length > 6) {
    throw new Error("Invalid cron expression: expected 5 or 6 elements.");
  }
  const rawSeconds = elements.length === 6 ? elements[0] : "0";
  const rawMinutes = elements.length === 6 ? elements[1] : elements[0];
  const rawHours = elements.length === 6 ? elements[2] : elements[1];
  const rawDays = elements.length === 6 ? elements[3] : elements[2];
  const rawMonths = elements.length === 6 ? elements[4] : elements[3];
  const rawWeekdays = elements.length === 6 ? elements[5] : elements[4];
  return new Cron({
    seconds: parseElement(rawSeconds, secondConstraint),
    minutes: parseElement(rawMinutes, minuteConstraint),
    hours: parseElement(rawHours, hourConstraint),
    days: parseElement(rawDays, dayConstraint),
    // months in cron are indexed by 1, but Cron expects indexes by 0, so we need to reduce all set values by one.
    months: new Set(Array.from(parseElement(rawMonths, monthConstraint)).map((x) => x - 1)),
    weekdays: new Set(Array.from(parseElement(rawWeekdays, weekdayConstraint)).map((x) => x % 7))
  });
}
if (!("OPEN" in WebSocket)) {
  const WebSocketStatus = {
    // @ts-expect-error
    CONNECTING: WebSocket.READY_STATE_CONNECTING,
    // @ts-expect-error
    OPEN: WebSocket.READY_STATE_OPEN,
    // @ts-expect-error
    CLOSING: WebSocket.READY_STATE_CLOSING,
    // @ts-expect-error
    CLOSED: WebSocket.READY_STATE_CLOSED
  };
  Object.assign(WebSocket, WebSocketStatus);
  Object.assign(WebSocket.prototype, WebSocketStatus);
}
var AttachmentCache = class {
  #cache = /* @__PURE__ */ new WeakMap();
  get(ws) {
    let attachment = this.#cache.get(ws);
    if (!attachment) {
      attachment = WebSocket.prototype.deserializeAttachment.call(
        ws
      );
      if (attachment !== void 0) {
        this.#cache.set(ws, attachment);
      } else {
        throw new Error(
          "Missing websocket attachment. This is most likely an issue in PartyServer, please open an issue at https://github.com/threepointone/partyserver/issues"
        );
      }
    }
    return attachment;
  }
  set(ws, attachment) {
    this.#cache.set(ws, attachment);
    WebSocket.prototype.serializeAttachment.call(ws, attachment);
  }
};
var attachments = new AttachmentCache();
var connections = /* @__PURE__ */ new WeakSet();
var isWrapped = (ws) => {
  return connections.has(ws);
};
var createLazyConnection = (ws) => {
  if (isWrapped(ws)) {
    return ws;
  }
  let initialState;
  if ("state" in ws) {
    initialState = ws.state;
    delete ws.state;
  }
  const connection = Object.defineProperties(ws, {
    id: {
      get() {
        return attachments.get(ws).__pk.id;
      }
    },
    server: {
      get() {
        return attachments.get(ws).__pk.server;
      }
    },
    socket: {
      get() {
        return ws;
      }
    },
    state: {
      get() {
        return ws.deserializeAttachment();
      }
    },
    setState: {
      value: function setState(setState) {
        let state;
        if (setState instanceof Function) {
          state = setState(this.state);
        } else {
          state = setState;
        }
        ws.serializeAttachment(state);
        return state;
      }
    },
    deserializeAttachment: {
      value: function deserializeAttachment() {
        const attachment = attachments.get(ws);
        return attachment.__user ?? null;
      }
    },
    serializeAttachment: {
      value: function serializeAttachment(attachment) {
        const setting = {
          ...attachments.get(ws),
          __user: attachment ?? null
        };
        attachments.set(ws, setting);
      }
    }
  });
  if (initialState) {
    connection.setState(initialState);
  }
  connections.add(connection);
  return connection;
};
var HibernatingConnectionIterator = class {
  constructor(state, tag) {
    this.state = state;
    this.tag = tag;
  }
  index = 0;
  sockets;
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const sockets = (
      // biome-ignore lint/suspicious/noAssignInExpressions: it's fine
      this.sockets ?? (this.sockets = this.state.getWebSockets(this.tag))
    );
    let socket;
    while (socket = sockets[this.index++]) {
      if (socket.readyState === WebSocket.READY_STATE_OPEN) {
        const value = createLazyConnection(socket);
        return { done: false, value };
      }
    }
    return { done: true, value: void 0 };
  }
};
var InMemoryConnectionManager = class {
  #connections = /* @__PURE__ */ new Map();
  tags = /* @__PURE__ */ new WeakMap();
  getCount() {
    return this.#connections.size;
  }
  getConnection(id) {
    return this.#connections.get(id);
  }
  *getConnections(tag) {
    if (!tag) {
      yield* this.#connections.values().filter(
        (c) => c.readyState === WebSocket.READY_STATE_OPEN
      );
      return;
    }
    for (const connection of this.#connections.values()) {
      const connectionTags = this.tags.get(connection) ?? [];
      if (connectionTags.includes(tag)) {
        yield connection;
      }
    }
  }
  accept(connection, options) {
    connection.accept();
    this.#connections.set(connection.id, connection);
    this.tags.set(connection, [
      // make sure we have id tag
      connection.id,
      ...options.tags.filter((t) => t !== connection.id)
    ]);
    const removeConnection = () => {
      this.#connections.delete(connection.id);
      connection.removeEventListener("close", removeConnection);
      connection.removeEventListener("error", removeConnection);
    };
    connection.addEventListener("close", removeConnection);
    connection.addEventListener("error", removeConnection);
    return connection;
  }
};
var HibernatingConnectionManager = class {
  constructor(controller) {
    this.controller = controller;
  }
  getCount() {
    return Number(this.controller.getWebSockets().length);
  }
  getConnection(id) {
    const sockets = this.controller.getWebSockets(id);
    if (sockets.length === 0) return void 0;
    if (sockets.length === 1)
      return createLazyConnection(sockets[0]);
    throw new Error(
      `More than one connection found for id ${id}. Did you mean to use getConnections(tag) instead?`
    );
  }
  getConnections(tag) {
    return new HibernatingConnectionIterator(this.controller, tag);
  }
  accept(connection, options) {
    const tags = [
      connection.id,
      ...options.tags.filter((t) => t !== connection.id)
    ];
    if (tags.length > 10) {
      throw new Error(
        "A connection can only have 10 tags, including the default id tag."
      );
    }
    for (const tag of tags) {
      if (typeof tag !== "string") {
        throw new Error(`A connection tag must be a string. Received: ${tag}`);
      }
      if (tag === "") {
        throw new Error("A connection tag must not be an empty string.");
      }
      if (tag.length > 256) {
        throw new Error("A connection tag must not exceed 256 characters");
      }
    }
    this.controller.acceptWebSocket(connection, tags);
    connection.serializeAttachment({
      __pk: {
        id: connection.id,
        server: options.server
      },
      __user: null
    });
    return createLazyConnection(connection);
  }
};
var serverMapCache = /* @__PURE__ */ new WeakMap();
function camelCaseToKebabCase(str) {
  if (str === str.toUpperCase() && str !== str.toLowerCase()) {
    return str.toLowerCase().replace(/_/g, "-");
  }
  let kebabified = str.replace(
    /[A-Z]/g,
    (letter) => `-${letter.toLowerCase()}`
  );
  kebabified = kebabified.startsWith("-") ? kebabified.slice(1) : kebabified;
  return kebabified.replace(/_/g, "-").replace(/-$/, "");
}
async function routePartykitRequest(req, env2, options) {
  if (!serverMapCache.has(env2)) {
    serverMapCache.set(
      env2,
      Object.entries(env2).reduce((acc, [k, v]) => {
        if (v && typeof v === "object" && "idFromName" in v && typeof v.idFromName === "function") {
          Object.assign(acc, { [camelCaseToKebabCase(k)]: v });
          return acc;
        }
        return acc;
      }, {})
    );
  }
  const map = serverMapCache.get(env2);
  const prefix = options?.prefix || "parties";
  const prefixParts = prefix.split("/");
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const prefixMatches = prefixParts.every(
    (part, index) => parts[index] === part
  );
  if (!prefixMatches || parts.length < prefixParts.length + 2) {
    return null;
  }
  const namespace = parts[prefixParts.length];
  const name = parts[prefixParts.length + 1];
  if (name && namespace) {
    if (!map[namespace]) {
      if (namespace === "main") {
        console.warn(
          "You appear to be migrating a PartyKit project to PartyServer."
        );
        console.warn(`PartyServer doesn't have a "main" party by default. Try adding this to your PartySocket client:
 
party: "${camelCaseToKebabCase(Object.keys(map)[0])}"`);
      } else {
        console.error(`The url ${req.url} does not match any server namespace. 
Did you forget to add a durable object binding to the class in your wrangler.toml?`);
      }
    }
    let doNamespace = map[namespace];
    if (options?.jurisdiction) {
      doNamespace = doNamespace.jurisdiction(options.jurisdiction);
    }
    const id = doNamespace.idFromName(name);
    const stub = doNamespace.get(id, options);
    req = new Request(req);
    req.headers.set("x-partykit-room", name);
    req.headers.set("x-partykit-namespace", namespace);
    if (options?.jurisdiction) {
      req.headers.set("x-partykit-jurisdiction", options.jurisdiction);
    }
    if (options?.props) {
      req.headers.set("x-partykit-props", JSON.stringify(options?.props));
    }
    if (req.headers.get("Upgrade")?.toLowerCase() === "websocket") {
      if (options?.onBeforeConnect) {
        const reqOrRes = await options.onBeforeConnect(req, {
          party: namespace,
          name
        });
        if (reqOrRes instanceof Request) {
          req = reqOrRes;
        } else if (reqOrRes instanceof Response) {
          return reqOrRes;
        }
      }
    } else {
      if (options?.onBeforeRequest) {
        const reqOrRes = await options.onBeforeRequest(req, {
          party: namespace,
          name
        });
        if (reqOrRes instanceof Request) {
          req = reqOrRes;
        } else if (reqOrRes instanceof Response) {
          return reqOrRes;
        }
      }
    }
    return stub.fetch(req);
  } else {
    return null;
  }
}
var Server = class extends DurableObject {
  static options = {
    hibernate: false
  };
  #status = "zero";
  #ParentClass = Object.getPrototypeOf(this).constructor;
  #connectionManager = this.#ParentClass.options.hibernate ? new HibernatingConnectionManager(this.ctx) : new InMemoryConnectionManager();
  /**
   * Execute SQL queries against the Server's database
   * @template T Type of the returned rows
   * @param strings SQL query template strings
   * @param values Values to be inserted into the query
   * @returns Array of query results
   */
  sql(strings, ...values) {
    let query = "";
    try {
      query = strings.reduce(
        (acc, str, i) => acc + str + (i < values.length ? "?" : ""),
        ""
      );
      return [...this.ctx.storage.sql.exec(query, ...values)];
    } catch (e) {
      console.error(`failed to execute sql query: ${query}`, e);
      throw this.onException(e);
    }
  }
  // biome-ignore lint/complexity/noUselessConstructor: it's fine
  constructor(ctx, env2) {
    super(ctx, env2);
  }
  /**
   * Handle incoming requests to the server.
   */
  async fetch(request) {
    const props = request.headers.get("x-partykit-props");
    if (props) {
      try {
        this.#_props = JSON.parse(props);
      } catch {
        console.error("Internal error parsing context props.");
      }
    }
    if (!this.#_name) {
      const room = request.headers.get("x-partykit-room");
      if (
        // !namespace ||
        !room
      ) {
        throw new Error(`Missing namespace or room headers when connecting to ${this.#ParentClass.name}.
Did you try connecting directly to this Durable Object? Try using getServerByName(namespace, id) instead.`);
      }
      await this.setName(room);
    }
    try {
      const url = new URL(request.url);
      if (url.pathname === "/cdn-cgi/partyserver/set-name/") {
        return Response.json({ ok: true });
      }
      if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
        return await this.onRequest(request);
      } else {
        const { 0: clientWebSocket, 1: serverWebSocket } = new WebSocketPair();
        let connectionId = url.searchParams.get("_pk");
        if (!connectionId) {
          connectionId = nanoid();
        }
        let connection = Object.assign(serverWebSocket, {
          id: connectionId,
          server: this.name,
          state: null,
          setState(setState) {
            let state;
            if (setState instanceof Function) {
              state = setState(this.state);
            } else {
              state = setState;
            }
            this.state = state;
            return this.state;
          }
        });
        const ctx = { request };
        const tags = await this.getConnectionTags(connection, ctx);
        connection = this.#connectionManager.accept(connection, {
          tags,
          server: this.name
        });
        if (!this.#ParentClass.options.hibernate) {
          this.#attachSocketEventHandlers(connection);
        }
        await this.onConnect(connection, ctx);
        return new Response(null, { status: 101, webSocket: clientWebSocket });
      }
    } catch (err) {
      console.error(
        `Error in ${this.#ParentClass.name}:${this.name} fetch:`,
        err
      );
      if (!(err instanceof Error)) throw err;
      if (request.headers.get("Upgrade") === "websocket") {
        const pair = new WebSocketPair();
        pair[1].accept();
        pair[1].send(JSON.stringify({ error: err.stack }));
        pair[1].close(1011, "Uncaught exception during session setup");
        return new Response(null, { status: 101, webSocket: pair[0] });
      } else {
        return new Response(err.stack, { status: 500 });
      }
    }
  }
  async webSocketMessage(ws, message) {
    const connection = createLazyConnection(ws);
    await this.setName(connection.server);
    if (this.#status !== "started") {
      await this.#initialize();
    }
    return this.onMessage(connection, message);
  }
  async webSocketClose(ws, code, reason, wasClean) {
    const connection = createLazyConnection(ws);
    await this.setName(connection.server);
    if (this.#status !== "started") {
      await this.#initialize();
    }
    return this.onClose(connection, code, reason, wasClean);
  }
  async webSocketError(ws, error) {
    const connection = createLazyConnection(ws);
    await this.setName(connection.server);
    if (this.#status !== "started") {
      await this.#initialize();
    }
    return this.onError(connection, error);
  }
  async #initialize() {
    await this.ctx.blockConcurrencyWhile(async () => {
      this.#status = "starting";
      await this.onStart(this.#_props);
      this.#status = "started";
    });
  }
  #attachSocketEventHandlers(connection) {
    const handleMessageFromClient = (event) => {
      this.onMessage(connection, event.data)?.catch((e) => {
        console.error("onMessage error:", e);
      });
    };
    const handleCloseFromClient = (event) => {
      connection.removeEventListener("message", handleMessageFromClient);
      connection.removeEventListener("close", handleCloseFromClient);
      this.onClose(connection, event.code, event.reason, event.wasClean)?.catch(
        (e) => {
          console.error("onClose error:", e);
        }
      );
    };
    const handleErrorFromClient = (e) => {
      connection.removeEventListener("message", handleMessageFromClient);
      connection.removeEventListener("error", handleErrorFromClient);
      this.onError(connection, e.error)?.catch((e2) => {
        console.error("onError error:", e2);
      });
    };
    connection.addEventListener("close", handleCloseFromClient);
    connection.addEventListener("error", handleErrorFromClient);
    connection.addEventListener("message", handleMessageFromClient);
  }
  // Public API
  #_name;
  #_longErrorAboutNameThrown = false;
  /**
   * The name for this server. Write-once-only.
   */
  get name() {
    if (!this.#_name) {
      if (!this.#_longErrorAboutNameThrown) {
        this.#_longErrorAboutNameThrown = true;
        throw new Error(
          `Attempting to read .name on ${this.#ParentClass.name} before it was set. The name can be set by explicitly calling .setName(name) on the stub, or by using routePartyKitRequest(). This is a known issue and will be fixed soon. Follow https://github.com/cloudflare/workerd/issues/2240 for more updates.`
        );
      } else {
        throw new Error(
          `Attempting to read .name on ${this.#ParentClass.name} before it was set.`
        );
      }
    }
    return this.#_name;
  }
  // We won't have an await inside this function
  // but it will be called remotely,
  // so we need to mark it as async
  async setName(name) {
    if (!name) {
      throw new Error("A name is required.");
    }
    if (this.#_name && this.#_name !== name) {
      throw new Error("This server already has a name.");
    }
    this.#_name = name;
    if (this.#status !== "started") {
      await this.ctx.blockConcurrencyWhile(async () => {
        await this.#initialize();
      });
    }
  }
  #sendMessageToConnection(connection, message) {
    try {
      connection.send(message);
    } catch (_e) {
      connection.close(1011, "Unexpected error");
    }
  }
  /** Send a message to all connected clients, except connection ids listed in `without` */
  broadcast(msg, without) {
    for (const connection of this.#connectionManager.getConnections()) {
      if (!without || !without.includes(connection.id)) {
        this.#sendMessageToConnection(connection, msg);
      }
    }
  }
  /** Get a connection by connection id */
  getConnection(id) {
    return this.#connectionManager.getConnection(id);
  }
  /**
   * Get all connections. Optionally, you can provide a tag to filter returned connections.
   * Use `Server#getConnectionTags` to tag the connection on connect.
   */
  getConnections(tag) {
    return this.#connectionManager.getConnections(tag);
  }
  /**
   * You can tag a connection to filter them in Server#getConnections.
   * Each connection supports up to 9 tags, each tag max length is 256 characters.
   */
  getConnectionTags(connection, context) {
    return [];
  }
  #_props;
  // Implemented by the user
  /**
   * Called when the server is started for the first time.
   */
  // biome-ignore lint/correctness/noUnusedFunctionParameters: for autocomplete
  onStart(props) {
  }
  /**
   * Called when a new connection is made to the server.
   */
  onConnect(connection, ctx) {
    console.log(
      `Connection ${connection.id} connected to ${this.#ParentClass.name}:${this.name}`
    );
  }
  /**
   * Called when a message is received from a connection.
   */
  // biome-ignore lint/correctness/noUnusedFunctionParameters: for autocomplete
  onMessage(connection, message) {
    console.log(
      `Received message on connection ${this.#ParentClass.name}:${connection.id}`
    );
    console.info(
      `Implement onMessage on ${this.#ParentClass.name} to handle this message.`
    );
  }
  /**
   * Called when a connection is closed.
   */
  onClose(connection, code, reason, wasClean) {
  }
  /**
   * Called when an error occurs on a connection.
   */
  onError(connection, error) {
    console.error(
      `Error on connection ${connection.id} in ${this.#ParentClass.name}:${this.name}:`,
      error
    );
    console.info(
      `Implement onError on ${this.#ParentClass.name} to handle this error.`
    );
  }
  /**
   * Called when a request is made to the server.
   */
  onRequest(request) {
    console.warn(
      `onRequest hasn't been implemented on ${this.#ParentClass.name}:${this.name} responding to ${request.url}`
    );
    return new Response("Not implemented", { status: 404 });
  }
  /**
   * Called when an exception occurs.
   * @param error - The error that occurred.
   */
  onException(error) {
    console.error(
      `Exception in ${this.#ParentClass.name}:${this.name}:`,
      error
    );
    console.info(
      `Implement onException on ${this.#ParentClass.name} to handle this error.`
    );
  }
  onAlarm() {
    console.log(
      `Implement onAlarm on ${this.#ParentClass.name} to handle alarms.`
    );
  }
  async alarm() {
    if (this.#status !== "started") {
      await this.#initialize();
    }
    await this.onAlarm();
  }
};
const genericObservability = { emit(event) {
  if (isLocalMode()) {
    console.log(event.displayMessage);
    return;
  }
  console.log(event);
} };
let localMode = false;
function isLocalMode() {
  if (localMode) return true;
  const { request } = getCurrentAgent();
  if (!request) return false;
  localMode = new URL(request.url).hostname === "localhost";
  return localMode;
}
function isRPCRequest(msg) {
  return typeof msg === "object" && msg !== null && "type" in msg && msg.type === MessageType.RPC && "id" in msg && typeof msg.id === "string" && "method" in msg && typeof msg.method === "string" && "args" in msg && Array.isArray(msg.args);
}
function isStateUpdateMessage(msg) {
  return typeof msg === "object" && msg !== null && "type" in msg && msg.type === MessageType.CF_AGENT_STATE && "state" in msg;
}
const callableMetadata = /* @__PURE__ */ new Map();
function getNextCronTime(cron) {
  return parseCronExpression(cron).getNextDate();
}
const STATE_ROW_ID = "cf_state_row_id";
const STATE_WAS_CHANGED = "cf_state_was_changed";
const DEFAULT_STATE = {};
const agentContext = new AsyncLocalStorage();
function getCurrentAgent() {
  const store = agentContext.getStore();
  if (!store) return {
    agent: void 0,
    connection: void 0,
    request: void 0,
    email: void 0
  };
  return store;
}
function withAgentContext(method) {
  return function(...args) {
    const { connection, request, email, agent } = getCurrentAgent();
    if (agent === this) return method.apply(this, args);
    return agentContext.run({
      agent: this,
      connection,
      request,
      email
    }, () => {
      return method.apply(this, args);
    });
  };
}
var Agent = class Agent2 extends Server {
  /**
  * Current state of the Agent
  */
  get state() {
    if (this._state !== DEFAULT_STATE) return this._state;
    const wasChanged = this.sql`
        SELECT state FROM cf_agents_state WHERE id = ${STATE_WAS_CHANGED}
      `;
    const result = this.sql`
      SELECT state FROM cf_agents_state WHERE id = ${STATE_ROW_ID}
    `;
    if (wasChanged[0]?.state === "true" || result[0]?.state) {
      const state = result[0]?.state;
      this._state = JSON.parse(state);
      return this._state;
    }
    if (this.initialState === DEFAULT_STATE) return;
    this.setState(this.initialState);
    return this.initialState;
  }
  static {
    this.options = { hibernate: true };
  }
  /**
  * Execute SQL queries against the Agent's database
  * @template T Type of the returned rows
  * @param strings SQL query template strings
  * @param values Values to be inserted into the query
  * @returns Array of query results
  */
  sql(strings, ...values) {
    let query = "";
    try {
      query = strings.reduce((acc, str, i) => acc + str + (i < values.length ? "?" : ""), "");
      return [...this.ctx.storage.sql.exec(query, ...values)];
    } catch (e) {
      console.error(`failed to execute sql query: ${query}`, e);
      throw this.onError(e);
    }
  }
  constructor(ctx, env2) {
    super(ctx, env2);
    this._state = DEFAULT_STATE;
    this._disposables = new DisposableStore();
    this._mcpStateRestored = false;
    this._ParentClass = Object.getPrototypeOf(this).constructor;
    this.mcp = new MCPClientManager(this._ParentClass.name, "0.0.1");
    this.initialState = DEFAULT_STATE;
    this.observability = genericObservability;
    this._flushingQueue = false;
    this.alarm = async () => {
      const now = Math.floor(Date.now() / 1e3);
      const result = this.sql`
      SELECT * FROM cf_agents_schedules WHERE time <= ${now}
    `;
      if (result && Array.isArray(result)) for (const row of result) {
        const callback = this[row.callback];
        if (!callback) {
          console.error(`callback ${row.callback} not found`);
          continue;
        }
        await agentContext.run({
          agent: this,
          connection: void 0,
          request: void 0,
          email: void 0
        }, async () => {
          try {
            this.observability?.emit({
              displayMessage: `Schedule ${row.id} executed`,
              id: nanoid(),
              payload: {
                callback: row.callback,
                id: row.id
              },
              timestamp: Date.now(),
              type: "schedule:execute"
            }, this.ctx);
            await callback.bind(this)(JSON.parse(row.payload), row);
          } catch (e) {
            console.error(`error executing callback "${row.callback}"`, e);
          }
        });
        if (row.type === "cron") {
          const nextExecutionTime = getNextCronTime(row.cron);
          const nextTimestamp = Math.floor(nextExecutionTime.getTime() / 1e3);
          this.sql`
          UPDATE cf_agents_schedules SET time = ${nextTimestamp} WHERE id = ${row.id}
        `;
        } else this.sql`
          DELETE FROM cf_agents_schedules WHERE id = ${row.id}
        `;
      }
      await this._scheduleNextAlarm();
    };
    if (!wrappedClasses.has(this.constructor)) {
      this._autoWrapCustomMethods();
      wrappedClasses.add(this.constructor);
    }
    this._disposables.add(this.mcp.onConnected(async () => {
      this.broadcastMcpServers();
    }));
    this._disposables.add(this.mcp.onObservabilityEvent((event) => {
      this.observability?.emit(event);
    }));
    this.sql`
      CREATE TABLE IF NOT EXISTS cf_agents_state (
        id TEXT PRIMARY KEY NOT NULL,
        state TEXT
      )
    `;
    this.sql`
      CREATE TABLE IF NOT EXISTS cf_agents_queues (
        id TEXT PRIMARY KEY NOT NULL,
        payload TEXT,
        callback TEXT,
        created_at INTEGER DEFAULT (unixepoch())
      )
    `;
    this.ctx.blockConcurrencyWhile(async () => {
      return this._tryCatch(async () => {
        this.sql`
        CREATE TABLE IF NOT EXISTS cf_agents_schedules (
          id TEXT PRIMARY KEY NOT NULL DEFAULT (randomblob(9)),
          callback TEXT,
          payload TEXT,
          type TEXT NOT NULL CHECK(type IN ('scheduled', 'delayed', 'cron')),
          time INTEGER,
          delayInSeconds INTEGER,
          cron TEXT,
          created_at INTEGER DEFAULT (unixepoch())
        )
      `;
        await this.alarm();
      });
    });
    this.sql`
      CREATE TABLE IF NOT EXISTS cf_agents_mcp_servers (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        server_url TEXT NOT NULL,
        callback_url TEXT NOT NULL,
        client_id TEXT,
        auth_url TEXT,
        server_options TEXT
      )
    `;
    const _onRequest = this.onRequest.bind(this);
    this.onRequest = (request) => {
      return agentContext.run({
        agent: this,
        connection: void 0,
        request,
        email: void 0
      }, async () => {
        await this._ensureMcpStateRestored();
        if (this.mcp.isCallbackRequest(request)) {
          const result = await this.mcp.handleCallbackRequest(request);
          this.broadcastMcpServers();
          if (result.authSuccess) this.mcp.establishConnection(result.serverId).catch((error) => {
            console.error("Background connection failed:", error);
          }).finally(() => {
            this.broadcastMcpServers();
          });
          return this.handleOAuthCallbackResponse(result, request);
        }
        return this._tryCatch(() => _onRequest(request));
      });
    };
    const _onMessage2 = this.onMessage.bind(this);
    this.onMessage = async (connection, message) => {
      return agentContext.run({
        agent: this,
        connection,
        request: void 0,
        email: void 0
      }, async () => {
        if (typeof message !== "string") return this._tryCatch(() => _onMessage2(connection, message));
        let parsed;
        try {
          parsed = JSON.parse(message);
        } catch (_e) {
          return this._tryCatch(() => _onMessage2(connection, message));
        }
        if (isStateUpdateMessage(parsed)) {
          this._setStateInternal(parsed.state, connection);
          return;
        }
        if (isRPCRequest(parsed)) {
          try {
            const { id, method, args } = parsed;
            const methodFn = this[method];
            if (typeof methodFn !== "function") throw new Error(`Method ${method} does not exist`);
            if (!this._isCallable(method)) throw new Error(`Method ${method} is not callable`);
            const metadata = callableMetadata.get(methodFn);
            if (metadata?.streaming) {
              const stream = new StreamingResponse(connection, id);
              await methodFn.apply(this, [stream, ...args]);
              return;
            }
            const result = await methodFn.apply(this, args);
            this.observability?.emit({
              displayMessage: `RPC call to ${method}`,
              id: nanoid(),
              payload: {
                method,
                streaming: metadata?.streaming
              },
              timestamp: Date.now(),
              type: "rpc"
            }, this.ctx);
            const response = {
              done: true,
              id,
              result,
              success: true,
              type: MessageType.RPC
            };
            connection.send(JSON.stringify(response));
          } catch (e) {
            const response = {
              error: e instanceof Error ? e.message : "Unknown error occurred",
              id: parsed.id,
              success: false,
              type: MessageType.RPC
            };
            connection.send(JSON.stringify(response));
            console.error("RPC error:", e);
          }
          return;
        }
        return this._tryCatch(() => _onMessage2(connection, message));
      });
    };
    const _onConnect = this.onConnect.bind(this);
    this.onConnect = (connection, ctx$1) => {
      return agentContext.run({
        agent: this,
        connection,
        request: ctx$1.request,
        email: void 0
      }, () => {
        if (this.state) connection.send(JSON.stringify({
          state: this.state,
          type: MessageType.CF_AGENT_STATE
        }));
        connection.send(JSON.stringify({
          mcp: this.getMcpServers(),
          type: MessageType.CF_AGENT_MCP_SERVERS
        }));
        this.observability?.emit({
          displayMessage: "Connection established",
          id: nanoid(),
          payload: { connectionId: connection.id },
          timestamp: Date.now(),
          type: "connect"
        }, this.ctx);
        return this._tryCatch(() => _onConnect(connection, ctx$1));
      });
    };
    const _onStart = this.onStart.bind(this);
    this.onStart = async (props) => {
      return agentContext.run({
        agent: this,
        connection: void 0,
        request: void 0,
        email: void 0
      }, async () => {
        await this._tryCatch(async () => {
          await this._ensureMcpStateRestored();
          this.broadcastMcpServers();
          return _onStart(props);
        });
      });
    };
  }
  _setStateInternal(state, source = "server") {
    this._state = state;
    this.sql`
    INSERT OR REPLACE INTO cf_agents_state (id, state)
    VALUES (${STATE_ROW_ID}, ${JSON.stringify(state)})
  `;
    this.sql`
    INSERT OR REPLACE INTO cf_agents_state (id, state)
    VALUES (${STATE_WAS_CHANGED}, ${JSON.stringify(true)})
  `;
    this.broadcast(JSON.stringify({
      state,
      type: MessageType.CF_AGENT_STATE
    }), source !== "server" ? [source.id] : []);
    return this._tryCatch(() => {
      const { connection, request, email } = agentContext.getStore() || {};
      return agentContext.run({
        agent: this,
        connection,
        request,
        email
      }, async () => {
        this.observability?.emit({
          displayMessage: "State updated",
          id: nanoid(),
          payload: {},
          timestamp: Date.now(),
          type: "state:update"
        }, this.ctx);
        return this.onStateUpdate(state, source);
      });
    });
  }
  /**
  * Update the Agent's state
  * @param state New state to set
  */
  setState(state) {
    this._setStateInternal(state, "server");
  }
  /**
  * Called when the Agent's state is updated
  * @param state Updated state
  * @param source Source of the state update ("server" or a client connection)
  */
  onStateUpdate(state, source) {
  }
  /**
  * Called when the Agent receives an email via routeAgentEmail()
  * Override this method to handle incoming emails
  * @param email Email message to process
  */
  async _onEmail(email) {
    return agentContext.run({
      agent: this,
      connection: void 0,
      request: void 0,
      email
    }, async () => {
      if ("onEmail" in this && typeof this.onEmail === "function") return this._tryCatch(() => this.onEmail(email));
      else {
        console.log("Received email from:", email.from, "to:", email.to);
        console.log("Subject:", email.headers.get("subject"));
        console.log("Implement onEmail(email: AgentEmail): Promise<void> in your agent to process emails");
      }
    });
  }
  /**
  * Reply to an email
  * @param email The email to reply to
  * @param options Options for the reply
  * @returns void
  */
  async replyToEmail(email, options) {
    return this._tryCatch(async () => {
      const agentName = camelCaseToKebabCase$1(this._ParentClass.name);
      const agentId = this.name;
      const { createMimeMessage } = await import("./mimetext.node.es-Dfry_wcv.js");
      const msg = createMimeMessage();
      msg.setSender({
        addr: email.to,
        name: options.fromName
      });
      msg.setRecipient(email.from);
      msg.setSubject(options.subject || `Re: ${email.headers.get("subject")}` || "No subject");
      msg.addMessage({
        contentType: options.contentType || "text/plain",
        data: options.body
      });
      const messageId = `<${agentId}@${email.from.split("@")[1]}>`;
      msg.setHeader("In-Reply-To", email.headers.get("Message-ID"));
      msg.setHeader("Message-ID", messageId);
      msg.setHeader("X-Agent-Name", agentName);
      msg.setHeader("X-Agent-ID", agentId);
      if (options.headers) for (const [key, value] of Object.entries(options.headers)) msg.setHeader(key, value);
      await email.reply({
        from: email.to,
        raw: msg.asRaw(),
        to: email.from
      });
    });
  }
  async _tryCatch(fn) {
    try {
      return await fn();
    } catch (e) {
      throw this.onError(e);
    }
  }
  /**
  * Automatically wrap custom methods with agent context
  * This ensures getCurrentAgent() works in all custom methods without decorators
  */
  _autoWrapCustomMethods() {
    const basePrototypes = [Agent2.prototype, Server.prototype];
    const baseMethods = /* @__PURE__ */ new Set();
    for (const baseProto of basePrototypes) {
      let proto$1 = baseProto;
      while (proto$1 && proto$1 !== Object.prototype) {
        const methodNames = Object.getOwnPropertyNames(proto$1);
        for (const methodName of methodNames) baseMethods.add(methodName);
        proto$1 = Object.getPrototypeOf(proto$1);
      }
    }
    let proto = Object.getPrototypeOf(this);
    let depth = 0;
    while (proto && proto !== Object.prototype && depth < 10) {
      const methodNames = Object.getOwnPropertyNames(proto);
      for (const methodName of methodNames) {
        const descriptor = Object.getOwnPropertyDescriptor(proto, methodName);
        if (baseMethods.has(methodName) || methodName.startsWith("_") || !descriptor || !!descriptor.get || typeof descriptor.value !== "function") continue;
        const wrappedFunction = withAgentContext(this[methodName]);
        if (this._isCallable(methodName)) callableMetadata.set(wrappedFunction, callableMetadata.get(this[methodName]));
        this.constructor.prototype[methodName] = wrappedFunction;
      }
      proto = Object.getPrototypeOf(proto);
      depth++;
    }
  }
  onError(connectionOrError, error) {
    let theError;
    if (connectionOrError && error) {
      theError = error;
      console.error("Error on websocket connection:", connectionOrError.id, theError);
      console.error("Override onError(connection, error) to handle websocket connection errors");
    } else {
      theError = connectionOrError;
      console.error("Error on server:", theError);
      console.error("Override onError(error) to handle server errors");
    }
    throw theError;
  }
  /**
  * Render content (not implemented in base class)
  */
  render() {
    throw new Error("Not implemented");
  }
  /**
  * Queue a task to be executed in the future
  * @param payload Payload to pass to the callback
  * @param callback Name of the method to call
  * @returns The ID of the queued task
  */
  async queue(callback, payload) {
    const id = nanoid(9);
    if (typeof callback !== "string") throw new Error("Callback must be a string");
    if (typeof this[callback] !== "function") throw new Error(`this.${callback} is not a function`);
    this.sql`
      INSERT OR REPLACE INTO cf_agents_queues (id, payload, callback)
      VALUES (${id}, ${JSON.stringify(payload)}, ${callback})
    `;
    this._flushQueue().catch((e) => {
      console.error("Error flushing queue:", e);
    });
    return id;
  }
  async _flushQueue() {
    if (this._flushingQueue) return;
    this._flushingQueue = true;
    while (true) {
      const result = this.sql`
      SELECT * FROM cf_agents_queues
      ORDER BY created_at ASC
    `;
      if (!result || result.length === 0) break;
      for (const row of result || []) {
        const callback = this[row.callback];
        if (!callback) {
          console.error(`callback ${row.callback} not found`);
          continue;
        }
        const { connection, request, email } = agentContext.getStore() || {};
        await agentContext.run({
          agent: this,
          connection,
          request,
          email
        }, async () => {
          await callback.bind(this)(JSON.parse(row.payload), row);
          await this.dequeue(row.id);
        });
      }
    }
    this._flushingQueue = false;
  }
  /**
  * Dequeue a task by ID
  * @param id ID of the task to dequeue
  */
  async dequeue(id) {
    this.sql`DELETE FROM cf_agents_queues WHERE id = ${id}`;
  }
  /**
  * Dequeue all tasks
  */
  async dequeueAll() {
    this.sql`DELETE FROM cf_agents_queues`;
  }
  /**
  * Dequeue all tasks by callback
  * @param callback Name of the callback to dequeue
  */
  async dequeueAllByCallback(callback) {
    this.sql`DELETE FROM cf_agents_queues WHERE callback = ${callback}`;
  }
  /**
  * Get a queued task by ID
  * @param id ID of the task to get
  * @returns The task or undefined if not found
  */
  async getQueue(id) {
    const result = this.sql`
      SELECT * FROM cf_agents_queues WHERE id = ${id}
    `;
    return result ? {
      ...result[0],
      payload: JSON.parse(result[0].payload)
    } : void 0;
  }
  /**
  * Get all queues by key and value
  * @param key Key to filter by
  * @param value Value to filter by
  * @returns Array of matching QueueItem objects
  */
  async getQueues(key, value) {
    return this.sql`
      SELECT * FROM cf_agents_queues
    `.filter((row) => JSON.parse(row.payload)[key] === value);
  }
  /**
  * Schedule a task to be executed in the future
  * @template T Type of the payload data
  * @param when When to execute the task (Date, seconds delay, or cron expression)
  * @param callback Name of the method to call
  * @param payload Data to pass to the callback
  * @returns Schedule object representing the scheduled task
  */
  async schedule(when, callback, payload) {
    const id = nanoid(9);
    const emitScheduleCreate = (schedule) => this.observability?.emit({
      displayMessage: `Schedule ${schedule.id} created`,
      id: nanoid(),
      payload: {
        callback,
        id
      },
      timestamp: Date.now(),
      type: "schedule:create"
    }, this.ctx);
    if (typeof callback !== "string") throw new Error("Callback must be a string");
    if (typeof this[callback] !== "function") throw new Error(`this.${callback} is not a function`);
    if (when instanceof Date) {
      const timestamp = Math.floor(when.getTime() / 1e3);
      this.sql`
        INSERT OR REPLACE INTO cf_agents_schedules (id, callback, payload, type, time)
        VALUES (${id}, ${callback}, ${JSON.stringify(payload)}, 'scheduled', ${timestamp})
      `;
      await this._scheduleNextAlarm();
      const schedule = {
        callback,
        id,
        payload,
        time: timestamp,
        type: "scheduled"
      };
      emitScheduleCreate(schedule);
      return schedule;
    }
    if (typeof when === "number") {
      const time = new Date(Date.now() + when * 1e3);
      const timestamp = Math.floor(time.getTime() / 1e3);
      this.sql`
        INSERT OR REPLACE INTO cf_agents_schedules (id, callback, payload, type, delayInSeconds, time)
        VALUES (${id}, ${callback}, ${JSON.stringify(payload)}, 'delayed', ${when}, ${timestamp})
      `;
      await this._scheduleNextAlarm();
      const schedule = {
        callback,
        delayInSeconds: when,
        id,
        payload,
        time: timestamp,
        type: "delayed"
      };
      emitScheduleCreate(schedule);
      return schedule;
    }
    if (typeof when === "string") {
      const nextExecutionTime = getNextCronTime(when);
      const timestamp = Math.floor(nextExecutionTime.getTime() / 1e3);
      this.sql`
        INSERT OR REPLACE INTO cf_agents_schedules (id, callback, payload, type, cron, time)
        VALUES (${id}, ${callback}, ${JSON.stringify(payload)}, 'cron', ${when}, ${timestamp})
      `;
      await this._scheduleNextAlarm();
      const schedule = {
        callback,
        cron: when,
        id,
        payload,
        time: timestamp,
        type: "cron"
      };
      emitScheduleCreate(schedule);
      return schedule;
    }
    throw new Error("Invalid schedule type");
  }
  /**
  * Get a scheduled task by ID
  * @template T Type of the payload data
  * @param id ID of the scheduled task
  * @returns The Schedule object or undefined if not found
  */
  async getSchedule(id) {
    const result = this.sql`
      SELECT * FROM cf_agents_schedules WHERE id = ${id}
    `;
    if (!result) {
      console.error(`schedule ${id} not found`);
      return;
    }
    return {
      ...result[0],
      payload: JSON.parse(result[0].payload)
    };
  }
  /**
  * Get scheduled tasks matching the given criteria
  * @template T Type of the payload data
  * @param criteria Criteria to filter schedules
  * @returns Array of matching Schedule objects
  */
  getSchedules(criteria = {}) {
    let query = "SELECT * FROM cf_agents_schedules WHERE 1=1";
    const params = [];
    if (criteria.id) {
      query += " AND id = ?";
      params.push(criteria.id);
    }
    if (criteria.type) {
      query += " AND type = ?";
      params.push(criteria.type);
    }
    if (criteria.timeRange) {
      query += " AND time >= ? AND time <= ?";
      const start = criteria.timeRange.start || /* @__PURE__ */ new Date(0);
      const end = criteria.timeRange.end || /* @__PURE__ */ new Date(999999999999999);
      params.push(Math.floor(start.getTime() / 1e3), Math.floor(end.getTime() / 1e3));
    }
    return this.ctx.storage.sql.exec(query, ...params).toArray().map((row) => ({
      ...row,
      payload: JSON.parse(row.payload)
    }));
  }
  /**
  * Cancel a scheduled task
  * @param id ID of the task to cancel
  * @returns true if the task was cancelled, false otherwise
  */
  async cancelSchedule(id) {
    const schedule = await this.getSchedule(id);
    if (schedule) this.observability?.emit({
      displayMessage: `Schedule ${id} cancelled`,
      id: nanoid(),
      payload: {
        callback: schedule.callback,
        id: schedule.id
      },
      timestamp: Date.now(),
      type: "schedule:cancel"
    }, this.ctx);
    this.sql`DELETE FROM cf_agents_schedules WHERE id = ${id}`;
    await this._scheduleNextAlarm();
    return true;
  }
  async _scheduleNextAlarm() {
    const result = this.sql`
      SELECT time FROM cf_agents_schedules
      WHERE time > ${Math.floor(Date.now() / 1e3)}
      ORDER BY time ASC
      LIMIT 1
    `;
    if (!result) return;
    if (result.length > 0 && "time" in result[0]) {
      const nextTime = result[0].time * 1e3;
      await this.ctx.storage.setAlarm(nextTime);
    }
  }
  /**
  * Destroy the Agent, removing all state and scheduled tasks
  */
  async destroy() {
    this.sql`DROP TABLE IF EXISTS cf_agents_state`;
    this.sql`DROP TABLE IF EXISTS cf_agents_schedules`;
    this.sql`DROP TABLE IF EXISTS cf_agents_mcp_servers`;
    this.sql`DROP TABLE IF EXISTS cf_agents_queues`;
    await this.ctx.storage.deleteAlarm();
    await this.ctx.storage.deleteAll();
    this._disposables.dispose();
    await this.mcp.dispose?.();
    this.ctx.abort("destroyed");
    this.observability?.emit({
      displayMessage: "Agent destroyed",
      id: nanoid(),
      payload: {},
      timestamp: Date.now(),
      type: "destroy"
    }, this.ctx);
  }
  /**
  * Get all methods marked as callable on this Agent
  * @returns A map of method names to their metadata
  */
  _isCallable(method) {
    return callableMetadata.has(this[method]);
  }
  async _ensureMcpStateRestored() {
    if (this._mcpStateRestored) return;
    this._mcpStateRestored = true;
    const servers = this.sql`
        SELECT id, name, server_url, client_id, auth_url, callback_url, server_options
        FROM cf_agents_mcp_servers
      `;
    if (!servers || !Array.isArray(servers) || servers.length === 0) return;
    for (const server2 of servers) if (server2.callback_url) this.mcp.registerCallbackUrl(`${server2.callback_url}/${server2.id}`);
    for (const server2 of servers) if (!!server2.auth_url) {
      const authProvider = new DurableObjectOAuthClientProvider(this.ctx.storage, this.name, server2.callback_url);
      authProvider.serverId = server2.id;
      if (server2.client_id) authProvider.clientId = server2.client_id;
      const parsedOptions = server2.server_options ? JSON.parse(server2.server_options) : void 0;
      const conn = new MCPClientConnection(new URL(server2.server_url), {
        name: this.name,
        version: "1.0.0"
      }, {
        client: parsedOptions?.client ?? {},
        transport: {
          ...parsedOptions?.transport ?? {},
          type: parsedOptions?.transport?.type ?? "auto",
          authProvider
        }
      });
      conn.connectionState = "authenticating";
      this.mcp.mcpConnections[server2.id] = conn;
    } else {
      const parsedOptions = server2.server_options ? JSON.parse(server2.server_options) : void 0;
      this._connectToMcpServerInternal(server2.name, server2.server_url, server2.callback_url, parsedOptions, {
        id: server2.id,
        oauthClientId: server2.client_id ?? void 0
      }).catch((error) => {
        console.error(`Error restoring ${server2.id}:`, error);
      });
    }
  }
  /**
  * Connect to a new MCP Server
  *
  * @param serverName Name of the MCP server
  * @param url MCP Server SSE URL
  * @param callbackHost Base host for the agent, used for the redirect URI. If not provided, will be derived from the current request.
  * @param agentsPrefix agents routing prefix if not using `agents`
  * @param options MCP client and transport options
  * @returns authUrl
  */
  async addMcpServer(serverName, url, callbackHost, agentsPrefix = "agents", options) {
    let resolvedCallbackHost = callbackHost;
    if (!resolvedCallbackHost) {
      const { request } = getCurrentAgent();
      if (!request) throw new Error("callbackHost is required when not called within a request context");
      const requestUrl = new URL(request.url);
      resolvedCallbackHost = `${requestUrl.protocol}//${requestUrl.host}`;
    }
    const callbackUrl = `${resolvedCallbackHost}/${agentsPrefix}/${camelCaseToKebabCase$1(this._ParentClass.name)}/${this.name}/callback`;
    const result = await this._connectToMcpServerInternal(serverName, url, callbackUrl, options);
    this.sql`
        INSERT
        OR REPLACE INTO cf_agents_mcp_servers (id, name, server_url, client_id, auth_url, callback_url, server_options)
      VALUES (
        ${result.id},
        ${serverName},
        ${url},
        ${result.clientId ?? null},
        ${result.authUrl ?? null},
        ${callbackUrl},
        ${options ? JSON.stringify(options) : null}
        );
    `;
    this.broadcastMcpServers();
    return result;
  }
  async _connectToMcpServerInternal(_serverName, url, callbackUrl, options, reconnect) {
    const authProvider = new DurableObjectOAuthClientProvider(this.ctx.storage, this.name, callbackUrl);
    if (reconnect) {
      authProvider.serverId = reconnect.id;
      if (reconnect.oauthClientId) authProvider.clientId = reconnect.oauthClientId;
    }
    const transportType = options?.transport?.type ?? "auto";
    let headerTransportOpts = {};
    if (options?.transport?.headers) headerTransportOpts = {
      eventSourceInit: { fetch: (url$1, init) => fetch(url$1, {
        ...init,
        headers: options?.transport?.headers
      }) },
      requestInit: { headers: options?.transport?.headers }
    };
    const { id, authUrl, clientId } = await this.mcp.connect(url, {
      client: options?.client,
      reconnect,
      transport: {
        ...headerTransportOpts,
        authProvider,
        type: transportType
      }
    });
    return {
      authUrl,
      clientId,
      id
    };
  }
  async removeMcpServer(id) {
    this.mcp.closeConnection(id);
    this.mcp.unregisterCallbackUrl(id);
    this.sql`
      DELETE FROM cf_agents_mcp_servers WHERE id = ${id};
    `;
    this.broadcastMcpServers();
  }
  getMcpServers() {
    const mcpState = {
      prompts: this.mcp.listPrompts(),
      resources: this.mcp.listResources(),
      servers: {},
      tools: this.mcp.listTools()
    };
    const servers = this.sql`
      SELECT id, name, server_url, client_id, auth_url, callback_url, server_options FROM cf_agents_mcp_servers;
    `;
    if (servers && Array.isArray(servers) && servers.length > 0) for (const server2 of servers) {
      const serverConn = this.mcp.mcpConnections[server2.id];
      mcpState.servers[server2.id] = {
        auth_url: server2.auth_url,
        capabilities: serverConn?.serverCapabilities ?? null,
        instructions: serverConn?.instructions ?? null,
        name: server2.name,
        server_url: server2.server_url,
        state: serverConn?.connectionState ?? "authenticating"
      };
    }
    return mcpState;
  }
  broadcastMcpServers() {
    this.broadcast(JSON.stringify({
      mcp: this.getMcpServers(),
      type: MessageType.CF_AGENT_MCP_SERVERS
    }));
  }
  /**
  * Handle OAuth callback response using MCPClientManager configuration
  * @param result OAuth callback result
  * @param request The original request (needed for base URL)
  * @returns Response for the OAuth callback
  */
  handleOAuthCallbackResponse(result, request) {
    const config2 = this.mcp.getOAuthCallbackConfig();
    if (config2?.customHandler) return config2.customHandler(result);
    if (config2?.successRedirect && result.authSuccess) return Response.redirect(config2.successRedirect);
    if (config2?.errorRedirect && !result.authSuccess) return Response.redirect(`${config2.errorRedirect}?error=${encodeURIComponent(result.authError || "Unknown error")}`);
    const baseUrl = new URL(request.url).origin;
    return Response.redirect(baseUrl);
  }
};
const wrappedClasses = /* @__PURE__ */ new Set();
async function routeAgentRequest(request, env2, options) {
  const corsHeaders = options?.cors === true ? {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Max-Age": "86400"
  } : options?.cors;
  if (request.method === "OPTIONS") {
    if (corsHeaders) return new Response(null, { headers: corsHeaders });
    console.warn("Received an OPTIONS request, but cors was not enabled. Pass `cors: true` or `cors: { ...custom cors headers }` to routeAgentRequest to enable CORS.");
  }
  let response = await routePartykitRequest(request, env2, {
    prefix: "agents",
    ...options
  });
  if (response && corsHeaders && request.headers.get("upgrade")?.toLowerCase() !== "websocket" && request.headers.get("Upgrade")?.toLowerCase() !== "websocket") response = new Response(response.body, { headers: {
    ...response.headers,
    ...corsHeaders
  } });
  return response;
}
var StreamingResponse = class {
  constructor(connection, id) {
    this._closed = false;
    this._connection = connection;
    this._id = id;
  }
  /**
  * Send a chunk of data to the client
  * @param chunk The data to send
  */
  send(chunk) {
    if (this._closed) throw new Error("StreamingResponse is already closed");
    const response = {
      done: false,
      id: this._id,
      result: chunk,
      success: true,
      type: MessageType.RPC
    };
    this._connection.send(JSON.stringify(response));
  }
  /**
  * End the stream and send the final chunk (if any)
  * @param finalChunk Optional final chunk of data to send
  */
  end(finalChunk) {
    if (this._closed) throw new Error("StreamingResponse is already closed");
    this._closed = true;
    const response = {
      done: true,
      id: this._id,
      result: finalChunk,
      success: true,
      type: MessageType.RPC
    };
    this._connection.send(JSON.stringify(response));
  }
};
class MyAgent extends Agent {
  constructor() {
    super(...arguments);
    this.mcp = new MCPClientManager("my-agent", "1.0.0");
  }
  async onRequest(request) {
    const reqUrl = new URL(request.url);
    console.log(this.getMcpServers());
    if (reqUrl.pathname.endsWith("add-mcp") && request.method === "POST") {
      const mcpServer = await request.json();
      await this.addMcpServer(mcpServer.name, mcpServer.url, this.env.HOST);
      return new Response("Ok", { status: 200 });
    }
    return new Response("Not found", { status: 404 });
  }
}
const server = {
  async fetch(request, env2) {
    return await routeAgentRequest(request, env2, { cors: true }) || new Response("Not found", { status: 404 });
  }
};
const workerEntry = server ?? {};
export {
  MyAgent as M,
  ZodFirstPartyTypeKind as Z,
  commonjsGlobal as c,
  getDefaultExportFromCjs as g,
  workerEntry as w
};
