const cnvs = document.getElementById("cnvs");
const ctx = cnvs.getContext("2d");
cnvs.width = window.innerWidth;
cnvs.height = window.innerHeight;
class Star {
  constructor(x, y, z, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = color;
  }
  update(speed) {
    this.x -= speed;
    if (this.x < 0) {
      this.x = cnvs.width;
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.z, this.z);
  }
}
class Starfield {
  constructor(numStars, speed, color) {
    this.stars = [];
    this.speed = speed;
    for (let i = 0; i < numStars; i++) {
      this.stars.push(new Star(Math.random() * cnvs.width, Math.random() * cnvs.height, Math.random() * 2, color));
    }
  }
  update() {
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].update(this.speed);
    }
  }
  draw() {
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].draw();
    }
  }
}
const starfields = [];
for (let i = 0; i < 3; i++) {
  let numStars = Math.floor(Math.random() * 100) + 50;
  let speed = Math.random() * 3 + 1;
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let color = `rgb(${r},${g},${b})`;
  starfields.push(new Starfield(numStars, speed, color));
}
function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(0, 0, cnvs.width, cnvs.height);
  for (let i = 0; i < starfields.length; i++) {
    starfields[i].update();
    starfields[i].draw();
  }
  requestAnimationFrame(draw);
}
draw();
