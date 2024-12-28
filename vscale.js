class VScale {
  constructor(scale, size = 50) {
    this.scale = scale;
    this.size = size;
    this.bubbles = this.createBubbles();
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.startX = 50;
    this.startY = 300;
  }

  createBubbles() {
    let bubbles = [];
    for (let i = 0; i < 12; i++) {
      let isInScale = this.scale.semitones.includes(i);
      let bubbleColor = isInScale ? color(i * 30, 70, 100) : color(200);
      let degree = isInScale ? this.scale.degrees[this.scale.semitones.indexOf(i)] : '';
      bubbles.push({ position: i, color: bubbleColor, degree: degree, isInScale: isInScale });
    }
    return bubbles;
  }

  draw() {
    let textSizeInBubble = this.size * 0.5; // Taille du texte proportionnelle à la taille des bulles
    let labelTextSize = this.size * 0.36; // Taille du texte pour le libellé de la gamme

    push();
    textSize(labelTextSize);
    textAlign(LEFT, CENTER);
    fill(0);
    noStroke();
    text(`${this.scale.type} - ${this.scale.mode}`, this.startX + this.size * 0.1, this.startY - this.size / 2 - labelTextSize);
    pop();

    this.bubbles.forEach((bubble, index) => {
      push();
      fill(bubble.color);
      stroke(0); // Contour noir
      ellipse(this.startX + index * this.size, this.startY, this.size, this.size);
      fill(0);
      noStroke();
      textSize(textSizeInBubble); // Taille du texte dans les bulles
      textAlign(CENTER, CENTER);
      text(bubble.degree, this.startX + index * this.size, this.startY);
      pop();
    });
  }

  startDrag(x, y) {
    if (x > this.startX && x < this.startX + 12 * this.size && y > this.startY - this.size / 2 && y < this.startY + this.size / 2) {
      this.dragging = true;
      this.offsetX = x - this.startX;
      this.offsetY = y - this.startY;
    }
  }

  drag(x, y) {
    if (this.dragging) {
      this.startX = x - this.offsetX;
      this.startY = y - this.offsetY;
    }
  }

  stopDrag() {
    this.dragging = false;
  }
}

