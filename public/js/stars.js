const canvas = document.querySelector("canvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext("2d");

let entities = [];

class Entity {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2; // Math.random() * 10;
    this.speed = Math.random() * 5;
    this.dx = (Math.random() > 0.5 ? -1 : 1) * (this.speed / this.size);
    this.dy = (Math.random() > 0.5 ? -1 : 1) * (this.speed / this.size);
    this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    this.remove = false;
    this.tail = [];
    this.maxTailSize = 2; // Kuyruğun maksimum uzunluğu
  }

  update() {
    this.x -= this.dx;
    this.y -= this.dy;

    // Eğer canvas'tan çıktıysa
    if (
      this.x < 0 ||
      this.y < 0 ||
      this.x > canvas.width ||
      this.y > canvas.height
    ) {
      this.remove = true;
    }

    // Kuyruğu güncelle
    this.tail.push({ x: this.x, y: this.y });
    if (this.tail.length > this.maxTailSize) {
      this.tail.shift();
    }
  }

  draw() {
    // Kuyruk çizimi
    for (let i = 0; i < this.tail.length; i++) {
      const tailSegment = this.tail[i];
      const tailSizeFactor = this.size - i * (this.size / this.maxTailSize);
      const tailOpacity = 1 - i / this.maxTailSize;

      ctx.beginPath();
      ctx.arc(
        tailSegment.x,
        tailSegment.y,
        tailSizeFactor,
        0,
        2 * Math.PI,
        false
      );
      ctx.fillStyle = this.color + Math.floor(tailOpacity * 255).toString(16);
      ctx.fill();
      ctx.strokeStyle = "#003300";
      ctx.stroke();
    }

    // Ana nesne çizimi
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "#003300";
    ctx.stroke();
  }
}

const update = () => {
  entities.push(new Entity());

  entities = entities.filter((e) => !e.remove);

  entities.forEach((e) => {
    e.update();
  });
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  entities.map((e) => e.draw());
};

setInterval(draw, 1000 / 60);
