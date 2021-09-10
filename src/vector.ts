export default class Vector {
  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    // Object.freeze(this) // this can fix some issues with the js referencing stuff
  }

  public add(vector: Vector) {
    return new Vector(this.x + vector.x, this.y + vector.y)
  }

  public subtract(vector: Vector) {
    return new Vector(this.x - vector.x, this.y - vector.y)
  }

  public multiply(scalar: number) {
    return new Vector(this.x * scalar, this.y * scalar)
  }

  public distance(vector: Vector) {
    const subtracted: Vector = this.subtract(vector)
    return Math.sqrt(Math.pow(subtracted.x, 2) + Math.pow(subtracted.y, 2)) // math.pow(a, b) is faster than a ** b but makes the code less readable
  }

  public dot(vector: Vector) {
    return this.x * vector.x + this.y * vector.y
  }

  public divideByVector(vector: Vector) {
    return new Vector(this.x / vector.x, this.y / vector.y)
  }

  public divideByNumber(scale: number) {
    return new Vector(this.x / scale, this.y / scale)
  }

  public movePointByAngle(distance: number, angle: number) {
    // useful
    const vec = new Vector(
      distance * Math.cos(angle),
      distance * Math.sin(angle)
    )

    return this.add(vec)
  }

  public get mag() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }

  public get dir() {
    return Math.atan2(this.y, this.x) // for Math.atan2 it actually takes the y param first for some reason
  }

  public get normalizedX() {
    const mag = this.mag
    const normalizedX = this.x / mag
    return normalizedX
  }

  public get normalizedY() {
    const mag = this.mag
    const normalizedY = this.y / mag
    return normalizedY
  }
}
