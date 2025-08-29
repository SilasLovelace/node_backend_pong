
class Field {
  width: number;
  height: number;
  constructor() {
    this.width = 2000;
    this.height = 1000;
  }
}

class Ball {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  constructor(field: Field) {
    this.x = field.width / 2;
    this.y = field.height / 2;
    this.radius = 5;
    this.speedX = 0;
    this.speedY = 0;
  }
}

class Paddle {
  cx: number;
  cy: number;
  length: number;
  width: number;
  speed: number;
  ySpeed: number;
  constructor(pos: number, field: Field) {
    // vertical paddle
    this.cx = pos === 1 ? 30 : field.width - 30; // center x
    this.cy = field.height / 2;                 // center y
    this.length = field.height / 5;             // total length
    this.width = 20;                            // thickness of paddle
    this.speed = 10;
    this.ySpeed = 0;
  }

  getCapsule() {
    const halfLen = this.length / 2 - this.width / 2;
    return {
      x1: this.cx,
      y1: this.cy - halfLen,
      x2: this.cx,
      y2: this.cy + halfLen,
      R: this.width / 2
    };
  }
}