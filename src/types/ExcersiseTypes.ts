interface ISet {
  id: number;
  repetitions: number;
  weight: number;
}

interface IExercise {
  id: number;
  name: string;
  sets: ISet[];
}

interface IWorkout {
  id: number;
  name: string;
  date: Date;
  exercises: IExercise[];
}

class Set implements ISet {
  constructor(
    public id: number,
    public repetitions: number,
    public weight: number
  ) {}
}

class Exercise implements IExercise {
  constructor(public id: number, public name: string, public sets: Set[]) {}
}

class Workout implements IWorkout {
  constructor(
    public id: number,
    public name: string,
    public date: Date,
    public exercises: Exercise[]
  ) {}
}

export { Set, Exercise, Workout };
export type { ISet, IExercise, IWorkout };
