using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using BAv02.Models.DataAccessLayers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
    public class StripeController : Controller
    {
        StripeDAL db = new StripeDAL();

        private IHostingEnvironment _env;

        private IConfiguration Configuration { get; set; }

        public string StripePlan { get; set; }




        public StripeController(IHostingEnvironment env)
        {
            _env = env;

            var builder = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json");
            Configuration = builder.Build();

            //Stripe Configurations
            StripePlan = Configuration.GetSection("Stripe")["StripePlan"];
        }

        [HttpPost("[action]")]
        public ActionResult setDefaultPayment(long userId, string paymentMethodId)
        {
            try
            {
                var customerId = db.getCustomerId(userId);
                var options = new CustomerUpdateOptions
                {
                    InvoiceSettings = new CustomerInvoiceSettingsOptions
                    {
                        DefaultPaymentMethod = paymentMethodId
                    }
                };

                var service = new CustomerService();
                var result = service.Update(customerId, options);

                if (result.StripeResponse.StatusCode.ToString() == "OK")
                {
                    return Ok(GetPaymentMethods(userId)); ;
                }
                else
                {
                    return BadRequest("Invalid Data");
                }
            }
            catch (Exception)
            {
                return BadRequest("Invalid Data");
            }
        }

        public ActionResult SaveCustomer(string stripeEmail, string stripeToken)
        {
            var customers = new CustomerService();

            var customer = customers.Create(new CustomerCreateOptions
            {
                Description = "BA_STRIPE",
                Email = stripeEmail,
                Source = stripeToken
            });

            if (customer.StripeResponse.StatusCode.ToString() == "200")
            {
                return this.Ok(customer);
            }
            else
            {
                return BadRequest("Invalid Data");
            }
        }

        public ActionResult Charge(string stripeEmail, string stripeToken)
        {
            var customers = new CustomerService();
            var charges = new ChargeService();

            var customer = customers.Create(new CustomerCreateOptions
            {
                Email = stripeEmail,
                Source = stripeToken
            });

            var charge = charges.Create(new ChargeCreateOptions
            {
                Amount = 40,
                Description = "BluAgent Subscription",
                Currency = "USD",
                Customer = customer.Id
            });

            if (charge.Status == "succeeded")
            {
                string BalanceTransactionId = charge.BalanceTransactionId;
                return this.Ok(BalanceTransactionId);
            }
            else
            {
                return BadRequest("Transaction invalid");
            }
        }

        [HttpPost("[action]")]
        public ActionResult DefaultCharge(long idUser, long amount, string paymentMethod)
        {
            try
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = amount,
                    Currency = "usd",
                    Description = "Drug Test",
                    Customer = db.getCustomerId(idUser),
                    PaymentMethod = paymentMethod
                };
                var service = new PaymentIntentService();
                var intent = service.Create(options);

                var confirmOptions = new PaymentIntentConfirmOptions
                {
                    PaymentMethod = paymentMethod
                };

                var confirm = service.Confirm(intent.Id, confirmOptions);


                return this.Ok();
            }
            catch (Exception ex) { return BadRequest($"Invalid Data: {ex}"); }
        }

        [HttpGet("[action]")]
        public ActionResult GetPaymentMethods(long id)
        {
            try
            {
                var customerId = db.getCustomerId(id);
                var options = new PaymentMethodListOptions
                {
                    Customer = customerId,
                    Type = "card",
                    Limit = 100
                };

                var service = new PaymentMethodService();
                var payments = service.List(options);

                return this.Ok(payments);

            }
            catch (Exception)
            {
                return BadRequest("Invalid Data");
            }


        }

        [HttpGet("[action]")]
        public ActionResult GetDefaultPayment(long id)
        {
            try
            {

                var customerId = db.getCustomerId(id);

                var service = new CustomerService();
                var result = service.Get(customerId);

                if (result.StripeResponse.StatusCode.ToString() == "OK")
                {
                    if (result.InvoiceSettings.DefaultPaymentMethodId == null)
                    {
                        return Ok(Json(result.DefaultSourceId));
                    }
                    else
                    {
                        return Ok(Json(result.InvoiceSettings.DefaultPaymentMethodId));
                    }
                }

                else
                {
                    return BadRequest("Invalid Data");
                }

            }
            catch (Exception)
            {
                return BadRequest("Invalid Data");
            }


        }

        [HttpPost("[action]")]
        public ActionResult AttachPayment(string customerId, string stripeToken, long idUser)
        {
            try
            {
                if (customerId == "null") { customerId = db.getCustomerId(idUser); }

                var service = new CustomerService();
                StripeList<Customer> customers = service.List();


                var options = new PaymentMethodCreateOptions
                {
                    Type = "card",
                    Card = new PaymentMethodCardCreateOptions
                    {
                        Token = stripeToken,
                    },
                };

                var paymentMethodService = new PaymentMethodService();
                var paymentMethod = paymentMethodService.Create(options);

                var attachPaymentOptions = new PaymentMethodAttachOptions
                {
                    Customer = customerId.Trim(),
                };

                var result = paymentMethodService.Attach(paymentMethod.Id, attachPaymentOptions);

                if (result.StripeResponse.StatusCode.ToString() == "OK")
                {
                    return Ok(GetPaymentMethods(idUser));
                }
                else
                {
                    return BadRequest("Invalid Data");
                }


            }
            catch (Exception ex)
            {
                return BadRequest($"Invalid Data: {ex}");
            }
        }

        [HttpPost("[action]")]
        public ActionResult DetachPayment(string idPayment, long idUser)
        {
            try
            {

                var service = new PaymentMethodService();
                var result = service.Detach(idPayment, null);


                if (result.StripeResponse.StatusCode.ToString() == "OK")
                {
                    return Ok(GetPaymentMethods(idUser));
                }
                else
                {
                    return BadRequest("Invalid Data");
                }


            }
            catch (Exception)
            {
                return BadRequest("Invalid Data");
            }
        }

        [HttpPost("[action]")]
        public ActionResult UpdateMaintenanceSubscription(long idUser, long numberOfVehicles)
        {
            try
            {
                var idCustomer = db.getCustomerId(idUser);

                var subscriptions = GetSubscriptions(idCustomer);

                if (subscriptions.Length == 0)
                {
                    CreateSubscription(idCustomer);

                    subscriptions = GetSubscriptions(idCustomer);

                }
                foreach (Subscription subscription in subscriptions)
                {
                    if (subscription.Plan.BillingScheme == "per_unit")
                    {
                        var idPlan = subscription.Items.Data[0].Id;
                        var response = UpdateSubscription(subscription.Id, idPlan, numberOfVehicles);

                        if (response == this.Ok().StatusCode)
                        {
                            return this.Ok(response);
                        }
                        else
                        {
                            return this.NotFound();
                        }
                    }
                    else
                    {
                        return this.NotFound();
                    }

                }
                return this.NotFound();
            }
            catch (Exception) { return this.BadRequest(); }
        }

        [HttpPost("[action]")]
        public ActionResult CreateMaintenanceSubscription(string idCustomer)
        {
            try
            {
                var response = CreateSubscription(idCustomer);

                if (response == this.Ok().StatusCode)
                {
                    return this.Ok(response);
                }
                else
                {
                    return this.NotFound();
                }
            }

            catch (Exception)
            {
                return this.BadRequest();
            }
        }

        [HttpPost("[action]")]
        public ActionResult GetMaintenanceSubscription(string idCustomer)
        {
            try
            {

                var subscriptions = GetSubscriptions(idCustomer);

                if (subscriptions != null)
                {
                    return this.Ok(subscriptions);
                }
                else
                {
                    return this.NotFound();
                }
            }

            catch (Exception)
            {
                return this.BadRequest();
            }

        }

        private Array GetSubscriptions(string idCustomer)
        {
            try
            {
                var options = new SubscriptionListOptions
                {
                    Customer = idCustomer
                };
                var service = new SubscriptionService();
                var serviceList = service.List(options);

                if (serviceList.StripeResponse.StatusCode.ToString() == "OK")
                {
                    return serviceList.ToArray();
                }
                else
                {
                    return null;
                }
            }

            catch (Exception)
            {
                return null;
            }

        }

        private int CreateSubscription(string idCustomer)
        {
            try
            {
                var options = new SubscriptionCreateOptions
                {
                    Customer = idCustomer,
                    Items = new List<SubscriptionItemOption>
                    {
                        new SubscriptionItemOption
                        {
                            Quantity = 0,
                            Plan = StripePlan,
                        },
                    },
                };
                var service = new SubscriptionService();
                var subscription = service.Create(options);

                if (subscription.StripeResponse.StatusCode.ToString() == "OK")
                {
                    return this.Ok().StatusCode;
                }
                else
                {
                    return this.BadRequest().StatusCode;
                }
            }
            catch (Exception)
            {
                return this.BadRequest().StatusCode;
            }

        }

        private int UpdateSubscription(string idSubscription, string idPlan, long numberOfVehicles)
        {
            try
            {
                var options = new SubscriptionUpdateOptions
                {
                    Prorate = false,
                    Items = new List<SubscriptionItemUpdateOption>
                    {
                        new SubscriptionItemUpdateOption
                        {
                            Quantity = numberOfVehicles,
                            Id = idPlan
                        },
                    }
                };
                var service = new SubscriptionService();
                var response = service.Update(idSubscription, options);

                if (response.StripeResponse.StatusCode.ToString() == "OK")
                {
                    return this.Ok().StatusCode;
                }
                else
                {
                    return this.BadRequest().StatusCode;
                }
            }
            catch (Exception)
            {
                return this.BadRequest().StatusCode;
            }
        }
    }
}