using Microsoft.Extensions.Logging;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAv02.Jobs
{
    public class Jobv2 : IJob
    {
        private readonly ILogger _logger;
        public Jobv2(ILogger<Jobv2> logger)
        {
            _logger = logger;
        }
        async public Task Execute(IJobExecutionContext context)
        {
            _logger.LogInformation("Dependency Injection Added");
            await Console.Out.WriteLineAsync("Jesus Antonio Jobv2(Hello I'm First JobV2)");
        }
    }
}
