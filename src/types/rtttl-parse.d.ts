declare module "rtttl-parse" {
  interface Note {
    duration: number;
    frequency: number;
  }

  interface Song {
    name: string;
    defaults: {
      duration: string;
      octave: string;
      bpm: string;
    };
    melody: Note[];
  }

  function parse(rtttl: string): Song;
}
