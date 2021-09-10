export class Writer {
  public arraybuffer: ArrayBuffer
  public view: DataView
  public offset: number
  constructor() {
    this.arraybuffer = new ArrayBuffer(4096)
    this.view = new DataView(this.arraybuffer)
    this.offset = 0
  }
  public u8(value: number) {
    this.view.setUint8(this.offset, value)
    this.offset += 1
  }
  public u16(value: number) {
    this.view.setUint16(this.offset, value, true)
    this.offset += 2
  }
  public u32(value: number) {
    this.view.setUint32(this.offset, value, true)
    this.offset += 4
  }
  public i8(value: number) {
    this.view.setInt8(this.offset, value)
    this.offset += 1
  }
  public i16(value: number) {
    this.view.setInt16(this.offset, value, true)
    this.offset += 2
  }
  public i32(value: number) {
    this.view.setUint32(this.offset, value, true)
    this.offset += 4
  }
  public f32(value: number) {
    this.view.setFloat32(this.offset, value, true)
    this.offset += 4
  }
  public f64(value: number) {
    this.view.setFloat64(this.offset, value, true)
    this.offset += 8
  }
  public string(value: string) {
    for (let i = 0; i < value.length; i++) this.u16(value.charCodeAt(i))
    this.u16(0)
  }
  public get packet() {
    return new Uint8Array(this.arraybuffer).slice(0, this.offset).buffer
  }
}

export class Reader {
  public buffer: Buffer
  public view: DataView
  public offset: number

  constructor(array: Buffer) {
    this.buffer = array
    this.view = new DataView(this.buffer.buffer)
    this.offset = 0
  }
  public u8() {
    const val = this.view.getUint8(this.offset)
    this.offset += 1
    return val
  }
  public u16() {
    const val = this.view.getUint16(this.offset, true)
    this.offset += 2
    return val
  }
  public u32() {
    const val = this.view.getUint32(this.offset, true)
    this.offset += 4
    return val
  }
  public i8() {
    const val = this.view.getInt8(this.offset)
    this.offset += 1
    return val
  }
  public i16() {
    const val = this.view.getInt16(this.offset, true)
    this.offset += 2
    return val
  }
  public i32() {
    const val = this.view.getInt32(this.offset, true)
    this.offset += 4
    return val
  }
  public f32() {
    const val = this.view.getFloat32(this.offset, true)
    this.offset += 4
    return val
  }
  public f64() {
    const val = this.view.getFloat64(this.offset, true)
    this.offset += 8
    return val
  }
  public string() {
    const start = this.offset
    while (this.u16()); // keep going until a null char
    const end = this.offset
    const raw = new Uint8Array(this.buffer).subarray(start, end)
    return new TextDecoder().decode(raw)
  }
}
