using System.Collections.Generic;

namespace BAv02.Models.Tools
{
    public class DataCompany
    {

        public Company Company { get; set; }
        public List<Country> Countries { get; set; }
        public List<State> States { get; set; }
        public List<City> Cities { get; set; }
        public List<State> MailingStates { get; set; }
        public List<City> MailingCities { get; set; }
        public object Signature { get; set; }

    }
}
