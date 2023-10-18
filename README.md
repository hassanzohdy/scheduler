# Schedular

A lightweight package for handling tasks/cron-jobs scheduling.

## Installation

`yarn add @mongez/scheduler`

or using `npm`

`npm i @mongez/scheduler`

## Usage

First you need to create a new instance of the scheduler:

```ts
import { Scheduler } from "@mongez/scheduler";

const scheduler = new Scheduler();

scheduler.start();
```

## Job

A job is a task that will be executed at a specific time, so we need to create a new instance of the `Job` class, it takes the job name, and the callback function that will be executed when the job is triggered.

```ts
import { Scheduler, Job } from "@mongez/scheduler";

const scheduler = new Scheduler();

const job = new Job("my-job", () => {
  console.log("Hello world");
});

scheduler.add(job);

scheduler.start();
```

## Scheduling Job

There are multiple ways to schedule a job, you can schedule it to run every minute, every hour, every day, every week, every month, or every year.

## Run the job every minute

Run the job every minute:

```ts
import { Scheduler, Job } from "@mongez/scheduler";

const scheduler = new Scheduler();

const job = new Job("my-job", () => {
  console.log("Hello world");
});

// Run Every Minute
job.everyMinute();
// OR
job.always();

scheduler.add(job);

scheduler.start();
```

## Run the job every hour

Run the job every hour:

```ts
import { Scheduler, Job } from "@mongez/scheduler";

const scheduler = new Scheduler();

const job = new Job("my-job", () => {
  console.log("Hello world");
});

// Run Every Hour
job.everyHour();
```

## Run the job every day

Run the job every day:

```ts
import { Scheduler, Job } from "@mongez/scheduler";

const scheduler = new Scheduler();

const job = new Job("my-job", () => {
  console.log("Hello world");
});

// Run Every Day
job.everyDay();

// OR
job.daily();
```

## Run the job twice a day

Run the job twice a day:

```ts
import { Scheduler, Job } from "@mongez/scheduler";

const scheduler = new Scheduler();

const job = new Job("my-job", () => {
  console.log("Hello world");
});

// Run Twice a Day
job.twiceDaily();
```

## Run Job every week

Run the job every week:

```ts
import { Scheduler, Job } from "@mongez/scheduler";

const scheduler = new Scheduler();

const job = new Job("my-job", () => {
  console.log("Hello world");
});

// Run Every Week
job.everyWeek();
```

## Run Job On Specific Day of the week

Run the Job Every week day:

```ts
import { Scheduler, Job } from "@mongez/scheduler";

const scheduler = new Scheduler();

const job = new Job("my-job", () => {
  console.log("Hello world");
});

// Run Every Sunday
job.on("sunday");

// Run Every Monday
job.on("monday");

// Run Every Tuesday
job.on("tuesday");

// Run Every Wednesday
job.on("wednesday");

// Run Every Thursday
job.on("thursday");

// Run Every Friday
job.on("friday");

// Run Every Saturday
job.on("saturday");
```

## Run Job On Specific Time of the day

Run the job every day at a specific time:

```ts
import { Scheduler, Job } from "@mongez/scheduler";

const scheduler = new Scheduler();

const job = new Job("my-job", () => {
  console.log("Hello world");
});

job.on("saturday").at("12:00");
```

The `at` method accept a string in `HH:mm` format, defaults to `00:00` if not provided.

## Run the job every month

Run the job every month:

```ts
import { Scheduler, Job } from "@mongez/scheduler";

const scheduler = new Scheduler();

const job = new Job("my-job", () => {
  console.log("Hello world");
});

job.everyMonth();
```

## Run the job every month on certain month day

Run the job every month on certain month day

```ts
import { Scheduler, Job } from "@mongez/scheduler";

const scheduler = new Scheduler();

const job = new Job("my-job", () => {
  console.log("Hello world");
});

job.everyMonth().on(2); // Run the job every month on the second day of the month
```

## Run the job every year

Run the job every year:

```ts
import { Scheduler, Job } from "@mongez/scheduler";

const scheduler = new Scheduler();

const job = new Job("my-job", () => {
  console.log("Hello world");
});

job.everyYear();
```

## Run the job at the beginning of time

Run the job at the beginning of time:

```ts
import { Scheduler, Job } from "@mongez/scheduler";

const scheduler = new Scheduler();

const job = new Job("my-job", async () => {
  console.log("Hello world");
});

// begin of hour
job.beginOf("hour");

// begin of day
job.beginOf("day");

// begin of week
job.beginOf("week");

// begin of month
job.beginOf("month");

// begin of year
job.beginOf("year");
```

## Run the job at the end of time

Run the job at the end of time:

```ts
import { Scheduler, Job } from "@mongez/scheduler";

const scheduler = new Scheduler();

const job = new Job("my-job", async () => {
  console.log("Hello world");
});

// end of hour
job.endOf("hour");

// end of day
job.endOf("day");

// end of week
job.endOf("week");

// end of month
job.endOf("month");

// end of year
job.endOf("year");
```

## Tests

To run tests run `npm run test` or `yarn test`

## Change Log

- 1.0.18 (18 Oct 2023)
  - Initial release

## TODO

- Create tests.
