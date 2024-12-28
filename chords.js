class Chord {
  constructor(type) {
    this.type = type;
    this.semitones = this.getSemitones();
    this.degrees = this.getDegrees();
    this.intervals = this.getIntervals();
  }

  getSemitones() {
    const chords = {
      "major": [0, 4, 7],
      "minor": [0, 3, 7],
      "diminished": [0, 3, 6],
      "augmented": [0, 4, 8],
      "major7": [0, 4, 7, 11],
      "minor7": [0, 3, 7, 10],
      "dominant7": [0, 4, 7, 10],
      "diminished7": [0, 3, 6, 9],
      "halfDiminished7": [0, 3, 6, 10],
      "minorMajor7": [0, 3, 7, 11],
      "augmented7": [0, 4, 8, 10]
    };

    return chords[this.type] || [];
  }

  getDegrees() {
    const degrees = {
      "major": ["1", "3", "5"],
      "minor": ["1", "♭3", "5"],
      "diminished": ["1", "♭3", "♭5"],
      "augmented": ["1", "3", "♯5"],
      "major7": ["1", "3", "5", "7"],
      "minor7": ["1", "♭3", "5", "♭7"],
      "dominant7": ["1", "3", "5", "♭7"],
      "diminished7": ["1", "♭3", "♭5", "♭♭7"],
      "halfDiminished7": ["1", "♭3", "♭5", "♭7"],
      "minorMajor7": ["1", "♭3", "5", "7"],
      "augmented7": ["1", "3", "♯5", "♭7"]
    };

    return degrees[this.type] || [];
  }

  getIntervals() {
    const intervals = {
      "major": ["1P", "3M", "5P"],
      "minor": ["1P", "3m", "5P"],
      "diminished": ["1P", "3m", "5d"],
      "augmented": ["1P", "3M", "5A"],
      "major7": ["1P", "3M", "5P", "7M"],
      "minor7": ["1P", "3m", "5P", "7m"],
      "dominant7": ["1P", "3M", "5P", "7m"],
      "diminished7": ["1P", "3m", "5d", "7d"],
      "halfDiminished7": ["1P", "3m", "5d", "7m"],
      "minorMajor7": ["1P", "3m", "5P", "7M"],
      "augmented7": ["1P", "3M", "5A", "7m"]
    };

    return intervals[this.type] || [];
  }
}
