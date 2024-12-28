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
    this.transitionProgress = 0;
    this.transitioning = false;
    this.previousMode = false; // Ajouter une variable pour suivre l'état précédent
    this.appearing = true; // Ajouter une variable pour l'animation d'apparition
    this.appearanceProgress = 0; // Ajouter une variable pour suivre la progression de l'apparition
    this.displayMode = 'degrees'; // Ajouter une variable pour suivre le mode d'affichage
  }

  createBubbles() {
    let bubbles = [];
    for (let i = 0; i < 12; i++) {
      let isInScale = this.scale.semitones.includes(i);
      let bubbleColor = isInScale ? color(i * 30, 70, 100) : color(200);
      let degree = isInScale ? this.scale.degrees[this.scale.semitones.indexOf(i)] : '';
      let interval = isInScale ? this.scale.intervals[this.scale.semitones.indexOf(i)] : '';
      let triad = isInScale ? this.scale.triads[this.scale.semitones.indexOf(i)] : '';
      bubbles.push({ position: i, color: bubbleColor, degree: degree, interval: interval, triad: triad, isInScale: isInScale });
    }
    return bubbles;
  }

  calculateBubblePosition(index) {
    if (this.circularMode || this.transitioning) {
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
    textAlign(this.circularMode ? CENTER : LEFT, CENTER);
    fill(0);
    noStroke();
    let labelX = this.circularMode ? this.startX : this.startX;
    let labelY = this.circularMode ? this.startY : this.startY - this.size / 2 - labelTextSize;
    if (this.circularMode) {
      text(this.scale.type, labelX, labelY - labelTextSize / 2);
      text(this.scale.mode, labelX, labelY + labelTextSize / 2);
    } else {
      text(`${this.scale.type} - ${this.scale.mode}`, labelX, labelY);
    }
    pop();

    this.bubblePositions = [];
    this.bubbles.forEach((bubble, index) => {
      let { x, y } = this.calculateBubblePosition(index);
      if (this.transitioning) {
        let linearX = this.startX + index * this.size;
        let linearY = this.startY;
        if (this.previousMode) {
          x = lerp(x, linearX, this.transitionProgress);
          y = lerp(y, linearY, this.transitionProgress);
        } else {
          x = lerp(linearX, x, this.transitionProgress);
          y = lerp(linearY, y, this.transitionProgress);
        }
      }
      if (this.appearing) {
        x = lerp(this.startX, x, this.appearanceProgress);
        y = lerp(this.startY, y, this.appearanceProgress);
      }
      this.bubblePositions.push({ x, y });
      push();
      fill(bubble.color);
      stroke(0); // Contour noir
      ellipse(x, y, this.size, this.size);
      fill(0);
      noStroke();
      textSize(textSizeInBubble); // Taille du texte dans les bulles
      textAlign(CENTER, CENTER);
      let textToDisplay = bubble.degree;
      if (this.displayMode === 'intervals') {
        textToDisplay = bubble.interval;
      } else if (this.displayMode === 'triads') {
        textToDisplay = bubble.triad;
      }
      text(textToDisplay, x, y);
      pop();
    });

    if (this.transitioning) {
      this.transitionProgress += 0.05; // Augmenter la vitesse de progression
      if (this.transitionProgress >= 1) {
        this.transitioning = false;
        this.transitionProgress = 0;
        this.circularMode = !this.circularMode;
      }
    }

    if (this.appearing) {
      this.appearanceProgress += 0.02;
      if (this.appearanceProgress >= 1) {
        this.appearing = false;
        this.appearanceProgress = 0;
      }
    }
  }

  startDrag(x, y) {
    let tonicPosition = this.bubblePositions[0];
    let labelX = this.circularMode ? this.startX : this.startX;
    let labelY = this.circularMode ? this.startY : this.startY - this.size / 2 - this.size * 0.36;
    if (dist(x, y, tonicPosition.x, tonicPosition.y) < this.size / 2 || dist(x, y, labelX, labelY) < this.size / 2) {
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

  toggleMode() {
    this.transitioning = true;
    this.transitionProgress = 0;
    this.previousMode = this.circularMode; // Mettre à jour l'état précédent
  }

  toggleDisplayMode() {
    if (this.displayMode === 'degrees') {
      this.displayMode = 'intervals';
    } else if (this.displayMode === 'intervals') {
      this.displayMode = 'triads';
    } else {
      this.displayMode = 'degrees';
    }
  }
}

