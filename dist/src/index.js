"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packets_1 = require("./packets");
const vector_1 = require("./vector");
const WebSocket = require("ws");
const url = require("url");
const HttpsProxyAgent = require("https-proxy-agent");
const EventEmitter = require("events");
class BrutalSocket extends EventEmitter {
    constructor(server, options) {
        super();
        this.server = server;
        if (options == null)
            options = {};
        if (options.proxy) {
            options.agent = new HttpsProxyAgent(url.parse(`http://${options.proxy}`));
        }
        const _options = Object.assign({ origin: "http://brutal.io", headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
            } }, options);
        this.socket = new WebSocket(server, _options);
        this._init();
    }
    _init() {
        this.socket.on("open", () => this._onopen());
        this.socket.on("close", (code) => this._onclose(code));
        this.socket.on("error", (err) => this._onerr(err));
        this.socket.on("message", (msg, isBinary) => {
            this._onmessage(msg, isBinary);
        });
    }
    _onmessage(msg, isBinary) {
        const parsed = (0, packets_1.decode)(msg);
        this.emit("message", parsed);
    }
    _onerr(err) {
        this.emit("error", err);
    }
    _onclose(code) {
        this.emit("close", code);
    }
    _onopen() {
        this.emit("open");
        this.send("ping");
        this.send("init");
    }
    send(type, data) {
        if (this.socket.readyState == WebSocket.OPEN) {
            this.socket.send((0, packets_1.encode)(type, data));
        }
    }
    spawn(name) {
        this.send("spawn", name);
    }
}
exports.default = BrutalSocket;
BrutalSocket.Vector = vector_1.default; // im not sure what this should be. when it is Vector, i get compiler errors
//# sourceMappingURL=index.js.map