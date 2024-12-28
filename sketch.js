let scaleList = [];
let vScales = [];

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

  createContextMenu();
}

function drawHSBGradient(x, y, w, h) {
  for (let i = 0; i < w; i++) {
    let hue = map(i, 0, w, 0, 360);
    stroke(hue, 100, 100);
    line(x + i, y, x + i, y + h);
  }
}

function createContextMenu() {
  const menu = document.createElement('div');
  menu.id = 'context-menu';
  menu.style.position = 'absolute';
  menu.style.display = 'none';
  menu.style.backgroundColor = '#fff';
  menu.style.border = '1px solid #ccc';
  menu.style.zIndex = '1000';

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
        let startX = mouseX;
        let startY = mouseY;
        let isOverScale = vScales.some(vScale => mouseX > vScale.startX && mouseX < vScale.startX + 12 * 40 && mouseY > vScale.startY - 20 && mouseY < vScale.startY + 20);
        if (isOverScale) {
          let vScale = vScales.find(vScale => mouseX > vScale.startX && mouseX < vScale.startX + 12 * 40 && mouseY > vScale.startY - 20 && mouseY < vScale.startY + 20);
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
        menu.style.display = 'none';
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

  window.oncontextmenu = (e) => {
    e.preventDefault();
    menu.innerHTML = ''; // Clear previous menu items

    let isOverScale = vScales.some(vScale => e.pageX > vScale.startX && e.pageX < vScale.startX + 12 * 40 && e.pageY > vScale.startY - 20 && e.pageY < vScale.startY + 20);
    const actionItem = document.createElement('div');
    actionItem.textContent = isOverScale ? 'Modifier' : 'Nouveau';
    actionItem.style.padding = '5px';
    actionItem.style.cursor = 'pointer';
    menu.appendChild(actionItem);

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
          let startX = e.pageX;
          let startY = e.pageY;
          if (isOverScale) {
            let vScale = vScales.find(vScale => e.pageX > vScale.startX && e.pageX < vScale.startX + 12 * 40 && e.pageY > vScale.startY - 20 && e.pageY < vScale.startY + 20);
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
          menu.style.display = 'none';
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

    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
    menu.style.display = 'block';
  };

  window.onclick = () => {
    menu.style.display = 'none';
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