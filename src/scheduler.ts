import { Job } from "./job";

export class Scheduler {
  /**
   * Jobs List
   */
  protected jobs: Job[] = [];

  /**
   * Interval Id
   */
  protected intervalId: NodeJS.Timeout | null = null;

  /**
   * Wait time
   *
   * @default 1000
   */
  protected waitTime = 1000;

  /**
   * Determine if jobs should run in parallel
   */
  protected shouldRunInParallel = false;

  /**
   * Determine if scheduler is running
   */
  public get isRunning() {
    return this.intervalId !== null;
  }

  /**
   * Add job
   */
  public addJob(job: Job) {
    this.jobs.push(job);

    return this;
  }

  /**
   * Set wait time in milliseconds
   */
  public runEvery(waitTime: number) {
    this.waitTime = waitTime;

    return this;
  }

  /**
   * Determine if jobs should run in parallel
   */
  public runInParallel(shouldRunInParallel: boolean) {
    this.shouldRunInParallel = shouldRunInParallel;

    return this;
  }

  /**
   * Start scheduler
   */
  public async start() {
    if (this.isRunning) {
      throw new Error("Scheduler is already running.");
    }

    // Prepare the jobs first
    this.jobs.forEach(job => job.prepare());

    const executeJobs = () => {
      const startTime = Date.now();

      for (const job of this.jobs) {
        if (job.shouldRun()) {
          job.run();
        }
      }

      const endTime = Date.now();
      const executionDuration = endTime - startTime;
      const nextWait = Math.max(this.waitTime - executionDuration, 0); // adjust for drift

      setTimeout(executeJobs, nextWait);
    };

    executeJobs();
  }

  /**
   * Stop scheduler
   */
  public stop() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Get jobs list
   */
  public list() {
    return this.jobs;
  }
}
