let scaleList = [];
let vScales = [];
let chords = [];
let vChords = [];

function setup() {
  createCanvas(800, 600);
  colorMode(HSB); // Définir le mode de couleur sur HSB
  background(220);
  textSize(12);

  drawHSBGradient(0, 0, width, 50);

  let scale = new Scale('Major', 'ionian');
  let vScale = new VScale(scale);
  scaleList.push(scale);
  vScales.push(vScale);
  vScale.draw();

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showContextMenu(e.pageX, e.pageY);
  });
}

function drawHSBGradient(x, y, w, h) {
  for (let i = 0; i < w; i++) {
    let hue = map(i, 0, w, 0, 360);
    stroke(hue, 100, 100);
    line(x + i, y, x + i, y + h);
  }
}

function showContextMenu(x, y) {
  const menu = document.createElement('div');
  menu.style.position = 'absolute';
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  menu.style.backgroundColor = '#fff';
  menu.style.border = '1px solid #ccc';
  menu.style.padding = '5px';
  menu.style.zIndex = '1000';

  const chordTypes = {
    'Triades': ['major', 'minor', 'diminished', 'augmented'],
    'Tétrades': ['major7', 'minor7', 'dominant7', 'diminished7', 'halfDiminished7', 'minorMajor7', 'augmented7'],
    'Autres': ['sus2', 'sus4', '7sus4', 'add9', 'madd9']
  };

  const newChordItem = document.createElement('div');
  newChordItem.textContent = 'Nouvel accord';
  newChordItem.style.position = 'relative';
  newChordItem.style.padding = '5px';
  newChordItem.style.cursor = 'pointer';

  const chordSubMenu = document.createElement('div');
  chordSubMenu.style.display = 'none';
  chordSubMenu.style.position = 'absolute';
  chordSubMenu.style.left = '100%';
  chordSubMenu.style.top = '0';
  chordSubMenu.style.backgroundColor = '#fff';
  chordSubMenu.style.border = '1px solid #ccc';

  for (const [category, types] of Object.entries(chordTypes)) {
    const categoryItem = document.createElement('div');
    categoryItem.textContent = category;
    categoryItem.style.padding = '5px';
    categoryItem.style.cursor = 'pointer';
    categoryItem.style.position = 'relative';

    const typeSubMenu = document.createElement('div');
    typeSubMenu.style.display = 'none';
    typeSubMenu.style.position = 'absolute';
    typeSubMenu.style.left = '100%';
    typeSubMenu.style.top = '0';
    typeSubMenu.style.backgroundColor = '#fff';
    typeSubMenu.style.border = '1px solid #ccc';

    types.forEach(type => {
      const typeItem = document.createElement('div');
      typeItem.textContent = type;
      typeItem.style.padding = '5px';
      typeItem.style.cursor = 'pointer';
      typeItem.onclick = () => {
        let chord = new Chord(type);
        let vScale = new VScale(chord); // Utiliser VScale pour afficher l'accord
        vScale.startX = x;
        vScale.startY = y;
        chords.push(chord);
        vScales.push(vScale);
        redraw();
        document.body.removeChild(menu);
      };
      typeSubMenu.appendChild(typeItem);
    });

    categoryItem.onmouseover = () => {
      typeSubMenu.style.display = 'block';
    };
    categoryItem.onmouseout = () => {
      typeSubMenu.style.display = 'none';
    };

    categoryItem.appendChild(typeSubMenu);
    chordSubMenu.appendChild(categoryItem);
  }

  newChordItem.onmouseover = () => {
    chordSubMenu.style.display = 'block';
  };
  newChordItem.onmouseout = () => {
    chordSubMenu.style.display = 'none';
  };

  newChordItem.appendChild(chordSubMenu);
  menu.appendChild(newChordItem);

  const scales = {
    'Major': ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'],
    'Harmonic minor': ['ionian #5', 'dorian #4', 'phrygian dominant', 'lydian #2', 'mixolydian b9', 'lydian #6', 'locrian #13'],
    'Melodic minor': ['ionian b3', 'dorian b2', 'lydian augmented', 'lydian dominant', 'mixolydian b6', 'locrian #2', 'super locrian']
  };

  for (const [scaleType, modes] of Object.entries(scales)) {
    const scaleItem = document.createElement('div');
    scaleItem.textContent = scaleType;
    scaleItem.style.padding = '5px';
    scaleItem.style.cursor = 'pointer';

    const modeMenu = document.createElement('div');
    modeMenu.style.display = 'none';
    modeMenu.style.position = 'absolute';
    modeMenu.style.left = '100%';
    modeMenu.style.top = '0';
    modeMenu.style.backgroundColor = '#fff';
    modeMenu.style.border = '1px solid #ccc';

    modes.forEach(mode => {
      const modeItem = document.createElement('div');
      modeItem.textContent = mode;
      modeItem.style.padding = '5px';
      modeItem.style.cursor = 'pointer';
      modeItem.onclick = () => {
        let startX = x;
        let startY = y;
        let isOverScale = vScales.some(vScale => x > vScale.startX && x < vScale.startX + 12 * 40 && y > vScale.startY - 20 && y < vScale.startY + 20);
        if (isOverScale) {
          let vScale = vScales.find(vScale => x > vScale.startX && x < vScale.startX + 12 * 40 && y > vScale.startY - 20 && y < vScale.startY + 20);
          vScale.scale = new Scale(scaleType, mode);
          vScale.bubbles = vScale.createBubbles();
        } else {
          let scale = new Scale(scaleType, mode);
          let vScale = new VScale(scale);
          vScale.startX = startX;
          vScale.startY = startY;
          scaleList.push(scale);
          vScales.push(vScale);
        }
        redraw();
        document.body.removeChild(menu);
      };
      modeMenu.appendChild(modeItem);
    });

    scaleItem.onmouseover = () => {
      modeMenu.style.display = 'block';
    };
    scaleItem.onmouseout = () => {
      modeMenu.style.display = 'none';
    };

    scaleItem.appendChild(modeMenu);
    menu.appendChild(scaleItem);
  }

  document.body.appendChild(menu);

  window.onclick = () => {
    if (menu.parentNode === document.body) {
      document.body.removeChild(menu);
    }
  };
}

function draw() {
  background(220);
  drawHSBGradient(0, 0, width, 50);
  vScales.forEach(vScale => vScale.draw());
  if (vScales.some(vScale => vScale.transitioning || vScale.appearing)) {
    redraw();
  }
}

function mousePressed() {
  vScales.forEach(vScale => vScale.startDrag(mouseX, mouseY));
}

function mouseDragged() {
  vScales.forEach(vScale => vScale.drag(mouseX, mouseY));
  redraw();
}

function mouseReleased() {
  vScales.forEach(vScale => vScale.stopDrag());
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    vScales.forEach(vScale => {
      if (typeof vScale.toggleMode === 'function') {
        vScale.toggleMode();
        console.log(vScale.circularMode);
      }
    });
    redraw();
  } else if (key === 'd' || key === 'D') {
    vScales.forEach(vScale => {
      if (typeof vScale.toggleDisplayMode === 'function') {
        vScale.toggleDisplayMode();
        console.log(vScale.displayMode);
      }
    });
    redraw();
  }
}