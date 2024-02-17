export type Habit = {
  name: string;
  current: boolean;
};

export type CueType =
  | "environmental"
  | "time_based"
  | "emotional"
  | "preceding_action";

export type Cue = {
  description: string;
  cueType: CueType;
};
