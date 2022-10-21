export enum SEASONS {
  SUMMER_EARLY = "Early Summer",
  SUMMER = "Summer",
  SUMMER_LATE = "Late Summer",
  AUTUMN_EARLY = "Early Autumn",
  AUTUMN = "Autumn",
  AUTUMN_LATE = "Late Autumn",
  WINTER_EARLY = "Early Winter",
  WINTER = "Winter",
  WINTER_LATE = "Late Winter",
  SPRING_EARLY = "Early Spring",
  SPRING = "Spring",
  SPRING_LATE = "Late Spring",
}

export type GrowingTime = {
  min: Number;
  max: Number;
};

export type Vegetation = {
  name: String;
  sow: Array<SEASONS>;
  harvest: Array<SEASONS>;
  growing: GrowingTime;
};

export type VegetationList = {
  vegetations: string[];
};

export type PlanterVegetationList = {
  planterID: String;
  datePlanted?: Date;
  name: String;
  harvested?: Boolean;
};
