interface ISet {
  id: number;
  repetitions: number;
  weight: number;
  unit: WeightTypeEnum;
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
    public weight: number,
    public unit: WeightTypeEnum =  WeightTypeEnum.KG
  ) {

  }
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

enum WeightTypeEnum {
  KG = 0,
  LB = 1,
  BW = 2,
 }

export { Set, Exercise, Workout, WeightTypeEnum };
export type { ISet, IExercise, IWorkout };
