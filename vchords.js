class VChord {
  constructor(chord, size = 50) {
    this.chord = chord;
    this.size = size;
    this.bubbles = this.createBubbles();
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.startX = 50;
    this.startY = 300;
    this.bubblePositions = []; // Ajouter le tableau des positions
  }

  createBubbles() {
    let bubbles = [];
    this.chord.semitones.forEach((semitone, index) => {
      let degree = this.chord.degrees[index];
      let interval = this.chord.intervals[index];
      let bubbleColor = color(semitone * 30, 70, 100);
      bubbles.push({ degree: degree, interval: interval, color: bubbleColor });
    });
    return bubbles;
  }

  draw(x, y) {
    this.startX = x; // Mettre à jour les coordonnées de départ
    this.startY = y;
    this.bubblePositions = []; // Réinitialiser les positions

    let textSizeInBubble = this.size * 0.5; // Taille du texte proportionnelle à la taille des bulles
    let labelTextSize = this.size * 0.36; // Taille du texte pour le libellé de l'accord

    push();
    textSize(labelTextSize);
    textAlign(LEFT, CENTER);
    fill(0);
    noStroke();
    text(this.chord.type, x, y - this.size / 2 - labelTextSize);
    pop();

    this.bubbles.forEach((bubble, index) => {
      let degreeY = y + index * this.size;
      // Stocker la position de chaque bulle
      this.bubblePositions.push({ x, y: degreeY });

      push();
      fill(bubble.color);
      stroke(0); // Contour noir
      ellipse(x, degreeY, this.size, this.size);
      fill(0);
      noStroke();
      textSize(textSizeInBubble); // Taille du texte dans les bulles
      textAlign(CENTER, CENTER);
      text(bubble.degree, x, degreeY);
      pop();

      let intervalY = y + index * this.size;
      push();
      fill(bubble.color);
      stroke(0); // Contour noir
      ellipse(x + this.size * 2, intervalY, this.size, this.size);
      fill(0);
      noStroke();
      textSize(textSizeInBubble); // Taille du texte dans les bulles
      textAlign(CENTER, CENTER);
      text(bubble.interval, x + this.size * 2, intervalY);
      pop();
    });
  }

  startDrag(x, y) {
    if (this.bubblePositions.length === 0) return;
    
    let tonicPosition = this.bubblePositions[0];
    let labelX = this.startX;
    let labelY = this.startY - this.size / 2 - this.size * 0.36;
    if ((tonicPosition && dist(x, y, tonicPosition.x, tonicPosition.y) < this.size / 2) ||
        dist(x, y, labelX, labelY) < this.size / 2) {
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
