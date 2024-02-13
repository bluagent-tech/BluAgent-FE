using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAv02.Models.DataAccessLayers;

namespace BAv02.Jobs
{
    public class Jobv1 : IJob
    {
        AccountSetDAL db = new AccountSetDAL();

        private readonly ILogger _logger;

        private readonly IHostingEnvironment _env;


        public Jobv1(ILogger<Jobv1> logger, IHostingEnvironment env)
        {
            _logger = logger;
            _env = env;

        }
        async public Task Execute(IJobExecutionContext context)
        {
            db.RebootCompanyNotifications();
        }
    }

}