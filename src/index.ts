import { encode, decode } from "./packets"
import ParsedClientboundPacket from "./interfaces/parsedClientboundPacket"
import Vector from "./vector"
import * as WebSocket from "ws"
import * as url from "url"

const HttpsProxyAgent = require("https-proxy-agent")
const EventEmitter = require("events")

class BrutalSocket extends EventEmitter {
  public static Vector: any = Vector // im not sure what the `any` should be. when it is Vector, i get compiler errors
  public entities: any;
  public socket: WebSocket
  public server: string
  public _lastUpdatePacket: number
  public lag: number;

  constructor(server: string, options?: any) {
    super()
    this.server = server
    this.entities = {};

    if (options == null) options = {}

    if (options.proxy) {
      options.agent = new HttpsProxyAgent(url.parse(`http://${options.proxy}`))
    }

    const _options: object = {
      origin: "http://brutal.io",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      },
      ...options,
    }
    this.socket = new WebSocket(server, _options)
    this._init()

    this.lag = 0;
    this._lastUpdatePacket = Date.now();
  }

  private _init() {
    this.socket.on("open", () => this._onopen())
    this.socket.on("close", (code: number) => this._onclose(code))
    this.socket.on("error", (err: Error) => this._onerr(err))
    this.socket.on("message", (msg: Buffer, isBinary: boolean) => {
      this._onmessage(msg, isBinary)
    })
  }

  private _onmessage(msg: Buffer, isBinary: boolean): void {
    const parsed: ParsedClientboundPacket = decode(msg, this)
    this.emit("message", parsed)
  }

  private _onerr(err: Error): void {
    this.emit("error", err)
  }

  private _onclose(code: number): void {
    this.emit("close", code)
  }

  private _onopen(): void {
    this.emit("open")
    this.send("ping")
    this.send("init")
  }

  public send(type: string, data?: any): void {
    if (this.socket.readyState == WebSocket.OPEN) {
      this.socket.send(encode(type, data, this))
    }
  }

  public spawn(name: string): void {
    this.send("spawn", name)
  }
}

export default BrutalSocket
