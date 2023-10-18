export type TimeType =
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

export type Day =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type JobIntervals = {
  day?: Day | number;
  time?: string;
  every?: {
    type?: TimeType;
    value?: number;
  };
};
