﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAv02.Models.DataAccessLayers;
using BAv02.Controllers;

namespace BAv02.Jobs
{
    public class JobNoSignaure : IJob
    {
        

        DQFDAL db = new DQFDAL();

        private readonly ILogger _logger;

        private readonly IHostingEnvironment _env;

        private readonly DQFController dqf;


        public JobNoSignaure(ILogger<JobNoSignaure> logger, IHostingEnvironment env)
        {
            _logger = logger;
            _env = env;

            dqf = new DQFController(env);

        }
        async public Task Execute(IJobExecutionContext context)
        {
            dqf.EmailNeedToSign();
        }
    }

}