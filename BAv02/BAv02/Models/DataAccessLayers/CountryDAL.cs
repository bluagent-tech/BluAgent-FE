using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace BAv02.Models.DataAccessLayers
{
    /// <summary>Class for Countries Operations.</summary>
    public class CountryDAL
    {

        /// <summary>Gets the countries.</summary>
        /// <returns>List of countries.</returns>
        public IEnumerable<Country> GetCountries()
        {
            var jsonString = File.ReadAllText("country.json");
            IEnumerable<Country> countries = JsonConvert.DeserializeObject<IEnumerable<Country>>(jsonString);
            return countries;
        }
    }
}
