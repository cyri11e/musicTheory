class Scale {
  constructor(type, mode = "ionian") {
    this.type = type;
    this.mode = mode;
    this.semitones = this.getSemitones();
    this.intervals = this.getIntervals();
    this.degrees = this.getDegrees();
    this.triads = this.getTriads();
  }

  getSemitones() {
    const scales = {
      "Major": {
        "ionian": [0, 2, 4, 5, 7, 9, 11],
        "dorian": [0, 2, 3, 5, 7, 9, 10],
        "phrygian": [0, 1, 3, 5, 7, 8, 10],
        "lydian": [0, 2, 4, 6, 7, 9, 11],
        "mixolydian": [0, 2, 4, 5, 7, 9, 10],
        "aeolian": [0, 2, 3, 5, 7, 8, 10],
        "locrian": [0, 1, 3, 5, 6, 8, 10]
      },
      "Harmonic minor": {
        "ionian ♯5": [0, 2, 4, 5, 8, 9, 11],
        "dorian ♯4": [0, 2, 3, 6, 7, 9, 10],
        "phrygian dominant": [0, 1, 4, 5, 7, 8, 10],
        "lydian ♯2": [0, 3, 4, 6, 7, 9, 11],
        "mixolydian ♭9": [0, 1, 3, 5, 7, 8, 10],
        "lydian ♯6": [0, 2, 3, 5, 7, 8, 11],
        "locrian ♯13": [0, 1, 3, 5, 6, 9, 10]
      },
      "Melodic minor": {
        "ionian ♭3": [0, 2, 3, 5, 7, 9, 11],
        "dorian ♭2": [0, 1, 3, 5, 7, 9, 10],
        "lydian augmented": [0, 2, 4, 6, 8, 9, 11],
        "lydian dominant": [0, 2, 4, 6, 7, 9, 10],
        "mixolydian ♭6": [0, 2, 4, 5, 7, 8, 10],
        "locrian ♯2": [0, 2, 3, 5, 6, 8, 10],
        "super locrian": [0, 1, 3, 4, 6, 8, 10]
      }
    };

    return scales[this.type][this.mode];
  }

  getIntervals() {
    const intervals = {
      0: "1P",
      1: "2m",
      2: "2M",
      3: "3m",
      4: "3M",
      5: "4P",
      6: "5d",
      7: "5P",
      8: "6m",
      9: "6M",
      10: "7m",
      11: "7M"
    };

    return this.semitones.map(semitone => intervals[semitone]);
  }

  getDegrees() {
    const degrees = {
      0: "1",
      1: "♭2",
      2: "2",
      3: "♭3",
      4: "3",
      5: "4",
      6: this.mode === "lydian" ? "♯4" : "♭5",
      7: "5",
      8: "♭6",
      9: "6",
      10: "♭7",
      11: "7"
    };

    return this.semitones.map(semitone => degrees[semitone]);
  }

  getTriads() {
    const triads = {
      "Major": {
        "ionian": ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
        "dorian": ["i", "ii", "♭III", "IV", "v", "vi°", "♭VII"],
        "phrygian": ["i", "♭II", "♭III", "iv", "v°", "♭VI", "♭vii"],
        "lydian": ["I", "II", "iii", "♯iv°", "V", "vi", "vii"],
        "mixolydian": ["I", "ii", "iii°", "IV", "v", "vi", "♭VII"],
        "aeolian": ["i", "ii°", "♭III", "iv", "v", "♭VI", "♭VII"],
        "locrian": ["i°", "♭II", "♭iii", "iv", "♭V", "♭VI", "♭vii"]
      },
      "Harmonic minor": {
        "ionian ♯5": ["I", "ii°", "iii+", "iv", "V", "♭VI", "vii°"],
        "dorian ♯4": ["i", "ii", "♭III+", "IV", "V", "vi°", "♭VII"],
        "phrygian dominant": ["i", "♭II", "III+", "iv", "V", "♭VI", "vii°"],
        "lydian ♯2": ["I", "II+", "iii", "iv°", "V", "vi", "vii"],
        "mixolydian ♭9": ["I", "ii°", "iii", "IV", "v", "♭VI", "vii°"],
        "lydian ♯6": ["I", "ii", "iii", "IV", "V", "vi°", "vii"],
        "locrian ♯13": ["i°", "II", "♭iii", "iv", "V", "♭VI", "♭vii"]
      },
      "Melodic minor": {
        "ionian ♭3": ["i", "ii", "♭III+", "IV", "V", "vi°", "vii°"],
        "dorian ♭2": ["i", "ii°", "♭III", "iv", "V", "VI", "♭vii"],
        "lydian augmented": ["I", "II", "iii+", "♯iv°", "V", "vi", "vii"],
        "lydian dominant": ["I", "II", "iii", "♯iv°", "V", "vi°", "♭VII"],
        "mixolydian ♭6": ["I", "ii", "iii°", "IV", "v", "♭VI", "♭vii"],
        "locrian ♯2": ["i°", "II", "♭iii", "iv", "♭V", "♭VI", "♭vii"],
        "super locrian": ["i°", "♭ii°", "♭III", "iv", "♭V", "♭VI", "♭vii"]
      }
    };

    return triads[this.type][this.mode];
  }
}

// Exemple d'utilisation
let gammeAeolian = new Scale('Major', "aeolian");
let semiTones = gammeAeolian.getSemitones();
let intervals = gammeAeolian.getIntervals();
let degrees = gammeAeolian.getDegrees();
let triads = gammeAeolian.getTriads();
console.log(semiTones); // [0, 2, 3, 5, 7, 8, 10]
console.log(intervals); // ["1P", "2M", "3m", "4P", "5P", "6m", "7m"]
console.log(degrees); // ["1", "2", "♭3", "4", "5", "♭6", "♭7"]
console.log(triads); // ["i", "ii°", "♭III", "iv", "v", "♭VI", "♭VII"]
