using System;
using System.Linq;
using Stripe;

namespace BAv02.Models.DataAccessLayers
{
    public class StripeDAL
  {
    public string getCustomerId(long userId)
    {
      using (var DbContext = new BAV02Context())
      {
        long idcompany = (long)DbContext.CompanyUsersRoles.Where(x => x.IdUser == userId).FirstOrDefault().IdCompany;
        string customerId = DbContext.Company.Where(x => x.Id == idcompany).FirstOrDefault().CustomerId;
        return customerId;
      }
    }

    public string PayTest(long userId, long amount, string paymentMethod, string TypeTest)
    {
      PaymentIntent confirm = new PaymentIntent();
      var service = new PaymentIntentService();

      try
      {
        var options = new PaymentIntentCreateOptions
        {
          Amount = amount,
          Currency = "usd",
          Description = "Drug and Alcohol Test",
          Customer = getCustomerId(userId),
          PaymentMethod = paymentMethod
        };

        var intent = service.Create(options);

        var confirmOptions = new PaymentIntentConfirmOptions
        {
          PaymentMethod = paymentMethod
        };

        confirm = service.Confirm(intent.Id, confirmOptions);
      }
      catch (Exception ex)
      {
        return ex.Message;
      }


      return confirm.Status;
    }
  }
}
