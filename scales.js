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
        "ionian #5": [0, 2, 4, 5, 8, 9, 11],
        "dorian #4": [0, 2, 3, 6, 7, 9, 10],
        "phrygian dominant": [0, 1, 4, 5, 7, 8, 10],
        "lydian #2": [0, 3, 4, 6, 7, 9, 11],
        "mixolydian b9": [0, 1, 3, 5, 7, 8, 10],
        "lydian #6": [0, 2, 3, 5, 7, 8, 11],
        "locrian #13": [0, 1, 3, 5, 6, 9, 10]
      },
      "Melodic minor": {
        "ionian b3": [0, 2, 3, 5, 7, 9, 11],
        "dorian b2": [0, 1, 3, 5, 7, 9, 10],
        "lydian augmented": [0, 2, 4, 6, 8, 9, 11],
        "lydian dominant": [0, 2, 4, 6, 7, 9, 10],
        "mixolydian b6": [0, 2, 4, 5, 7, 8, 10],
        "locrian #2": [0, 2, 3, 5, 6, 8, 10],
        "super locrian": [0, 1, 3, 4, 6, 8, 10]
      }
    };

    return scales[this.type] ? scales[this.type][this.mode] : [];
  }

  getIntervals() {
    const intervals = {
      "Major": {
        "ionian": ["1P", "2M", "3M", "4P", "5P", "6M", "7M"],
        "dorian": ["1P", "2M", "3m", "4P", "5P", "6M", "7m"],
        "phrygian": ["1P", "2m", "3m", "4P", "5P", "6m", "7m"],
        "lydian": ["1P", "2M", "3M", "4A", "5P", "6M", "7M"],
        "mixolydian": ["1P", "2M", "3M", "4P", "5P", "6M", "7m"],
        "aeolian": ["1P", "2M", "3m", "4P", "5P", "6m", "7m"],
        "locrian": ["1P", "2m", "3m", "4P", "5d", "6m", "7m"]
      },
      "Harmonic minor": {
        "ionian #5": ["1P", "2M", "3M", "4P", "5A", "6M", "7M"],
        "dorian #4": ["1P", "2M", "3m", "4A", "5P", "6M", "7m"],
        "phrygian dominant": ["1P", "2m", "3M", "4P", "5P", "6m", "7m"],
        "lydian #2": ["1P", "2A", "3M", "4A", "5P", "6M", "7M"],
        "mixolydian b9": ["1P", "2m", "3M", "4P", "5P", "6m", "7m"],
        "lydian #6": ["1P", "2M", "3M", "4P", "5P", "6A", "7M"],
        "locrian #13": ["1P", "2m", "3m", "4P", "5d", "6M", "7m"]
      },
      "Melodic minor": {
        "ionian b3": ["1P", "2M", "3m", "4P", "5P", "6M", "7M"],
        "dorian b2": ["1P", "2m", "3m", "4P", "5P", "6M", "7m"],
        "lydian augmented": ["1P", "2M", "3M", "4A", "5A", "6M", "7M"],
        "lydian dominant": ["1P", "2M", "3M", "4A", "5P", "6M", "7m"],
        "mixolydian b6": ["1P", "2M", "3M", "4P", "5P", "6m", "7m"],
        "locrian #2": ["1P", "2M", "3m", "4P", "5d", "6m", "7m"],
        "super locrian": ["1P", "2m", "3m", "4d", "5d", "6m", "7m"]
      }
    };

    return intervals[this.type] ? intervals[this.type][this.mode] : [];
  }

  getDegrees() {
    const degrees = {
      "Major": {
        "ionian": ["1", "2", "3", "4", "5", "6", "7"],
        "dorian": ["1", "2", "♭3", "4", "5", "6", "♭7"],
        "phrygian": ["1", "♭2", "♭3", "4", "5", "♭6", "♭7"],
        "lydian": ["1", "2", "3", "♯4", "5", "6", "7"],
        "mixolydian": ["1", "2", "3", "4", "5", "6", "♭7"],
        "aeolian": ["1", "2", "♭3", "4", "5", "♭6", "♭7"],
        "locrian": ["1", "♭2", "♭3", "4", "♭5", "♭6", "♭7"]
      },
      "Harmonic minor": {
        "ionian #5": ["1", "2", "3", "4", "♯5", "6", "7"],
        "dorian #4": ["1", "2", "♭3", "♯4", "5", "6", "♭7"],
        "phrygian dominant": ["1", "♭2", "3", "4", "5", "♭6", "♭7"],
        "lydian #2": ["1", "♯2", "3", "♯4", "5", "6", "7"],
        "mixolydian b9": ["1", "♭2", "3", "4", "5", "♭6", "♭7"],
        "lydian #6": ["1", "2", "3", "4", "5", "♯6", "7"],
        "locrian #13": ["1", "♭2", "♭3", "4", "♭5", "6", "♭7"]
      },
      "Melodic minor": {
        "ionian b3": ["1", "2", "♭3", "4", "5", "6", "7"],
        "dorian b2": ["1", "♭2", "♭3", "4", "5", "6", "♭7"],
        "lydian augmented": ["1", "2", "3", "♯4", "♯5", "6", "7"],
        "lydian dominant": ["1", "2", "3", "♯4", "5", "6", "♭7"],
        "mixolydian b6": ["1", "2", "3", "4", "5", "♭6", "♭7"],
        "locrian #2": ["1", "2", "♭3", "4", "♭5", "♭6", "♭7"],
        "super locrian": ["1", "♭2", "♭3", "♭4", "♭5", "♭6", "♭7"]
      }
    };

    return degrees[this.type] ? degrees[this.type][this.mode] : [];
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
        "ionian #5": ["I", "ii°", "iii+", "iv", "V", "♭VI", "vii°"],
        "dorian #4": ["i", "ii", "♭III+", "IV", "V", "vi°", "♭VII"],
        "phrygian dominant": ["i", "♭II", "III+", "iv", "V", "♭VI", "vii°"],
        "lydian #2": ["I", "II+", "iii", "iv°", "V", "vi", "vii"],
        "mixolydian b9": ["I", "ii°", "iii", "IV", "v", "♭VI", "vii°"],
        "lydian #6": ["I", "ii", "iii", "IV", "V", "vi°", "vii"],
        "locrian #13": ["i°", "II", "♭iii", "iv", "V", "♭VI", "♭vii"]
      },
      "Melodic minor": {
        "ionian b3": ["i", "ii", "♭III+", "IV", "V", "vi°", "vii°"],
        "dorian b2": ["i", "ii°", "♭III", "iv", "V", "VI", "♭vii"],
        "lydian augmented": ["I", "II", "iii+", "♯iv°", "V", "vi", "vii"],
        "lydian dominant": ["I", "II", "iii", "♯iv°", "V", "vi°", "♭VII"],
        "mixolydian b6": ["I", "ii", "iii°", "IV", "v", "♭VI", "♭vii"],
        "locrian #2": ["i°", "II", "♭iii", "iv", "♭V", "♭VI", "♭vii"],
        "super locrian": ["i°", "♭ii°", "♭III", "iv", "♭V", "♭VI", "♭vii"]
      }
    };

    return triads[this.type] ? triads[this.type][this.mode] : [];
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
