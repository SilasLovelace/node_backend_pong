
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

function closestPointOnSegment(paddle: Paddle, ball: Ball) {
  const capsule = paddle.getCapsule();
  // Vector from (x1, y1) to (x2, y2)
  const abx = capsule.x2 - capsule.x1;
  const aby = capsule.y2 - capsule.y1;
  // Vector from (x1, y1) to ball
  const apx = ball.x - capsule.x1;
  const apy = ball.y - capsule.y1;
  const abLen2 = abx * abx + aby * aby;
  let t = abLen2 > 0 ? (apx * abx + apy * aby) / abLen2 : 0;
  t = Math.max(0, Math.min(1, t));
  return {
    x: capsule.x1 + abx * t,
    y: capsule.y1 + aby * t
  };
}

function collideBallCapsule(paddle: Paddle, ball: Ball) {
  const capsule = paddle.getCapsule();
  const {x1, y1, x2, y2, R} = capsule;
  const {x, y, radius} = ball;

  // Closest point on segment to ball
  const S = closestPointOnSegment(paddle, ball);

  let nx = x - S.x;
  let ny = y - S.y;
  let dist = Math.hypot(nx, ny);
  const sumR = R + radius;

  if (dist > sumR) return false;

  // Normalize normal
  if (dist === 0) {
    nx = 1; ny = 0; dist = 1; // fallback
  } else {
    nx /= dist; ny /= dist;
  }

  // Push ball outside
  const penetration = sumR - dist;
  ball.x += nx * penetration;
  ball.y += ny * penetration;

  // Reflect velocity
  const dot = ball.speedX * nx + ball.speedY * ny;
  if (dot < 0) {
    ball.speedX -= 2 * dot * nx;
    ball.speedY -= 2 * dot * ny;
  }

  return true;
}

function collideBallWithWalls(ball: Ball, field: Field) {
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > field.width) {
    ball.x = Math.max(ball.radius, Math.min(ball.x, field.width - ball.radius));
    ball.speedX *= -1;
  }
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > field.height) {
    ball.y = Math.max(ball.radius, Math.min(ball.y, field.height - ball.radius));
    ball.speedY *= -1;
  }
}