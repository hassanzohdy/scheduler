import dayjs, { Dayjs } from "dayjs";
import { Day, JobIntervals, TimeType } from "./types";

export class Job {
  /**
   * Intervals
   */
  protected intervals: JobIntervals = {};

  /**
   * Next time to run
   */
  public nextRun: Dayjs | null = null;

  /**
   * Last time run
   */
  protected lastRun: Dayjs | null = null;

  /**
   * Constructor
   */
  public constructor(
    public readonly name: string,
    protected callback: (job: Job) => Promise<any> | any,
  ) {}

  /**
   * Run job every based on time
   */
  public every(value: number, timeType: TimeType) {
    this.intervals.every = { type: timeType, value };

    return this;
  }

  /**
   * Terminate the job
   */
  public terminate() {
    this.intervals = {};
    this.nextRun = null;
    this.lastRun = null;
    return this;
  }

  /**
   * Run job always, runs every minute
   */
  public always() {
    return this.every(1, "minute");
  }

  /**
   * Run job every minute
   */
  public everyMinute() {
    return this.every(1, "minute");
  }

  /**
   * Run job every hour
   */
  public everyHour() {
    return this.every(1, "hour");
  }

  /**
   * Run job every day
   */
  public everyDay() {
    return this.every(1, "day");
  }

  /**
   * Run the job everyday
   */
  public daily() {
    return this.every(1, "day");
  }

  /**
   * Run job twice a day
   */
  public twiceDaily() {
    return this.every(12, "hour");
  }

  /**
   * Run job every week
   */
  public everyWeek() {
    return this.every(1, "week");
  }

  /**
   * Run job every month
   */
  public everyMonth() {
    return this.every(1, "month");
  }

  /**
   * Run job every year
   */
  public everyYear() {
    return this.every(1, "year");
  }

  /**
   * Run job on specific day
   * If it is a number, it will be considered as day of month
   * If it is a string, it will be considered as day of week
   */
  public on(day: Day | number) {
    if (typeof day === "number" && (day < 1 || day > 31)) {
      throw new Error("Invalid day of the month.");
    }

    this.intervals.day = day;
    return this;
  }

  /**
   * Run job at specific time
   */
  public at(time: string) {
    this.intervals.time = time;

    return this;
  }

  /**
   * Run task at the beginning of the time
   */
  public beginOf(type: TimeType) {
    const time = "00:00";
    switch (type) {
      case "day":
        break;
      case "month":
        this.on(1);
        break;
      case "year":
        this.on(1);
        this.every(1, "year");
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
    return this.at(time);
  }

  /**
   * Run task at the end of the time
   */
  public endOf(type: TimeType) {
    const now = dayjs();
    const time = "23:59";
    switch (type) {
      case "day":
        break;
      case "month":
        this.on(now.endOf("month").date());
        break;
      case "year":
        this.on(31);
        this.every(1, "year");
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
    return this.at(time);
  }

  /**
   * Determine next run time
   */
  public determineNextRun() {
    let date = this.lastRun ? this.lastRun.add(1, "second") : dayjs();

    if (this.intervals.every?.value) {
      date = date.add(this.intervals.every.value, this.intervals.every.type);
    }

    if (this.intervals.day) {
      if (typeof this.intervals.day === "number") {
        date = date.date(this.intervals.day);
      } else {
        const targetDay = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].indexOf(this.intervals.day);
        date = date.day(targetDay);
      }
    }

    if (this.intervals.time) {
      const [hour, minute] = this.intervals.time.split(":").map(Number);
      date = date.hour(hour).minute(minute).second(0).millisecond(0);
    }

    // Loop until the determined date is in the future.
    while (date.isBefore(dayjs())) {
      if (this.intervals.every?.value) {
        date = date.add(this.intervals.every.value, this.intervals.every.type);
      } else {
        // default to adding one day if there's no specific interval defined
        date = date.add(1, "day");
      }
    }

    this.nextRun = date;
  }

  /**
   * Prepare the job
   */
  public prepare() {
    // now we need to determine next run time
    this.determineNextRun();
  }

  /**
   * Determine if job should run
   */
  public shouldRun() {
    return this.nextRun && dayjs().isAfter(this.nextRun);
  }

  /**
   * Run job
   */
  public run() {
    try {
      this.callback(this);

      // now we need to set last run time
      this.lastRun = dayjs();

      // now we need to determine next run time
      this.determineNextRun();
    } catch (error) {
      console.log(error);
    }
  }
}

export function job(name: string, callback: (job: Job) => Promise<any> | any) {
  return new Job(name, callback);
}
