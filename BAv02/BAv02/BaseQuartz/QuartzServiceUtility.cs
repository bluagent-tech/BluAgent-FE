using System;
using Quartz;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAv02.BaseQuartz
{
    public class QuartzServiceUtility
    {
        public static void StartJob<TJob>(IScheduler scheduler, String timeSpan) where TJob : IJob
        {
            var jobName = typeof(TJob).FullName;

            var job = JobBuilder.Create<TJob>().WithIdentity(jobName).Build();

            var trigger = TriggerBuilder.Create().WithIdentity($"{jobName}.trigger").StartNow()
                .WithCronSchedule(timeSpan)
                .Build();

            scheduler.ScheduleJob(job, trigger);
        }
    }
}
