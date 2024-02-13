using System;
using System.Linq;
using BAv02.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly BAV02Context context;
        private readonly IHostingEnvironment env;

        public string AssetsDirectory { get; set; }
        private IConfiguration Configuration { get; set; }


        /// <summary>
        /// Constructor for initializes dependency injection.
        /// </summary>
        /// <param name="hostingEnvironment">hosting enviroment.</param>
        public AuthorizationController(IHostingEnvironment hostingEnvironment)
        {
            context = new BAV02Context();
            env = hostingEnvironment;

            var builder = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json");
            Configuration = builder.Build();

            //Assets Directory
            AssetsDirectory = Configuration["AssetsDirectory"];
        }

        /// <summary>
        /// Forgot password method.
        /// </summary>
        /// <param name="credentials">Credentials entity</param>
        /// <returns>Return email template inside the user email.</returns>
        [HttpPost("forgot-password")]
        public ActionResult ForgotPassword(Credentials credentials)
        {
            try
            {
                Guid tokenCode;
                if (string.IsNullOrEmpty(credentials.Email))
                {
                    return Unauthorized();
                }

                var user = context.Users.SingleOrDefault(x => x.Email == credentials.Email);

                if (user == null)
                {
                    return Unauthorized();
                }
                else
                {
                    tokenCode = Guid.NewGuid();
                    var expirationDate = DateTime.Now.AddDays(2);

                    user.ExpirationDate = expirationDate;
                    user.TokenCode = tokenCode;
                    context.SaveChanges();

                    var callbackUrl = Request.Scheme + "://" + Request.Host + "/#/resetPassword/token=" + tokenCode;

                    EmailService ForgotPasswordRequest = new EmailService(env);


                    ForgotPasswordRequest.setEmailTemplateForgotPassword();
                    ForgotPasswordRequest.emailBody = ForgotPasswordRequest.emailBody.Replace("[User]", user.Name).Replace("[CallbackURL]", callbackUrl);
                    ForgotPasswordRequest.addAttacHment($"ClientApp/{AssetsDirectory}/assets/img/logo/BluAgent-Logo.png");
                    ForgotPasswordRequest.sendMail(credentials.Email, "Forgot Password Request");

                    return Ok(new
                    {
                        user = new { user.TokenCode, user.ExpirationDate }
                    });
                }

            }
            catch (Exception)
            {
                return BadRequest();
            }
            

        }

        /// <summary>
        /// Reset Password API.
        /// </summary>
        /// <param name="credentials">credentials object</param>
        /// <param name="token">token</param>
        /// <returns></returns>
        [HttpPost("reset-password/{token}")]
        public ActionResult ResetPassword(Credentials credentials, [FromRoute] Guid token)
        {
            if (string.IsNullOrEmpty(credentials.Email) || token == Guid.Empty)
            {
                return Unauthorized();
            }

            var user = context.Users.SingleOrDefault(x => x.Email == credentials.Email && x.TokenCode == token);

            if (user == null || user.TokenCode != token)
            {
                return NotFound();
            }
            else
            {
                if (DateTime.Now > user.ExpirationDate)
                {
                    return Unauthorized();
                }

                user.Password = (byte[])context.Users.FromSql($"select PWDENCRYPT({credentials.NewPassword}) as Password").Select(x => x.Password).FirstOrDefault();
                user.TokenCode = Guid.Empty;
                var entrada = context.Attach(user);
                entrada.Property(x => x.Password).IsModified = true;
                context.SaveChanges();
                //string htmlEmail = CreateConfirmChangePasswordEmail();
                //Email.sendMail(credentials.Email, "Reset Password Confirm", htmlEmail);
                return Ok(new
                {
                    user = new { user.Id, user.Name,  user.Email }
                });
            }
        }


        [HttpPost("change")]
        public ActionResult ChangePassword(Credentials credentials)
        {
            var user = context.Users.SingleOrDefault(x => x.Email == credentials.Email);
            if (user == null)
            {
                return Unauthorized();

            }

            if (credentials.Password != credentials.NewPassword) return BadRequest("Not equals password");
            context.Entry(user).State = EntityState.Modified;

            //user.Password = credentials.NewPassword;
            context.SaveChanges();
            return Ok(new
            {
                user = new { user.Id, user.Name, user.Email }
            });
        }

    }
}