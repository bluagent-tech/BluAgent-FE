using BAv02.Data;
using SwaggerOptions = BAv02.Options.SwaggerOptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Stripe;
using BAv02.BaseQuartz;
using Quartz;
using System;
using BAv02.Jobs;

namespace BAv02
{
    public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
      services.Configure<StripeSettings>(Configuration.GetSection("Stripe"));

      // In production, the React files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "ClientApp/build";
      });

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Blue Agent API", Version = "v1" });
      });
            CallQuartz.UseQuartz(services, typeof(Jobv1), typeof(Jobv2), typeof(JobNoSignaure), typeof(JobComplianceReportNot));
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      // Stripe Configuration
      StripeConfiguration.ApiKey = Configuration.GetSection("Stripe")["SecretKey"];


      // Swagger Configuration
      var swaggerOptions = new SwaggerOptions();
      Configuration.GetSection(nameof(SwaggerOptions)).Bind(swaggerOptions);

      app.UseSwagger(option => { option.RouteTemplate = swaggerOptions.JsonRoute; });

      app.UseSwaggerUI(option =>
      {
        option.SwaggerEndpoint(swaggerOptions.UiEndpoint, swaggerOptions.Description);
      });

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseStaticFiles();
      app.UseSpaStaticFiles();

      app.UseMvc(routes =>
      {
        routes.MapRoute(
                  name: "default",
                  template: "{controller}/{action=Index}/{id?}");
      });

      app.UseSpa(spa =>
      {
        spa.Options.SourcePath = "ClientApp";

        if (env.IsDevelopment())
        {
          spa.UseProxyToSpaDevelopmentServer("http://localhost:3000/");
        }
      });

            var scheduler = app.ApplicationServices.GetService<IScheduler>();
            QuartzServiceUtility.StartJob<Jobv1>(scheduler, "0 0 12 1 1 ?");
            //QuartzServiceUtility.StartJob<JobNoSignaure>(scheduler, "5 * * * * ?");
            QuartzServiceUtility.StartJob<JobNoSignaure>(scheduler, "0 0 10 ? * MON");

            //QuartzServiceUtility.StartJob<JobComplianceReportNot>(scheduler, "0 0 10 ? * MON");
            QuartzServiceUtility.StartJob<JobComplianceReportNot>(scheduler, "0 15 10 15 * ?");


            //QuartzServiceUtility.StartJob<Jobv1>(scheduler, "0 0/1 * * * ?"); 
            //QuartzServiceUtility.StartJob<Jobv2>(scheduler, "0 0 12 1 1 ?"); 
        }

    }
}
