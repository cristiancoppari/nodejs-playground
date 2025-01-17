import { CronJob } from "cron";
import { CronService } from "./cron-service";

describe("cron-service.ts", () => {
  const mockTick = jest.fn();

  test("createJob should create a cron job", (done) => {
    const cronTime = "* * * * * *";
    const job = CronService.createJob(cronTime, mockTick);

    setTimeout(() => {
      expect(mockTick).toBeCalledTimes(2);
      job.stop();
      done();
    }, 2000);
  });
});
