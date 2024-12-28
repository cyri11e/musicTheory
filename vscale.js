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
    this.circularMode = false;
    this.bubblePositions = [];
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

  calculateBubblePosition(index) {
    if (this.circularMode) {
      let angle = TWO_PI * ((index + 9) % 12 / 12); // Placer la tonique en haut
      let radius = this.size * 6 / PI; // Ajuster le rayon pour que les bulles se touchent
      let x = this.startX + cos(angle) * radius;
      let y = this.startY + sin(angle) * radius;
      return { x, y };
    } else {
      let x = this.startX + index * this.size;
      let y = this.startY;
      return { x, y };
    }
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

    this.bubblePositions = [];
    this.bubbles.forEach((bubble, index) => {
      let { x, y } = this.calculateBubblePosition(index);
      this.bubblePositions.push({ x, y });
      push();
      fill(bubble.color);
      stroke(0); // Contour noir
      ellipse(x, y, this.size, this.size);
      fill(0);
      noStroke();
      textSize(textSizeInBubble); // Taille du texte dans les bulles
      textAlign(CENTER, CENTER);
      text(bubble.degree, x, y);
      pop();
    });
  }

  startDrag(x, y) {
    this.bubblePositions.forEach((pos, index) => {
      if (dist(x, y, pos.x, pos.y) < this.size / 2) {
        this.dragging = true;
        this.offsetX = x - this.startX;
        this.offsetY = y - this.startY;
      }
    });
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

  toggleMode() {
    this.circularMode = !this.circularMode;
  }
}

