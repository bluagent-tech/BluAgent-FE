using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

/// <summary>
/// Class for States Operations.
/// </summary>
namespace BAv02.Models.DataAccessLayers
{
    public class CityDAL
    {

        /// <summary>Gets the cities.</summary>
        /// <returns></returns>
        public IEnumerable<City> GetCities()
        {
            var jsonString = File.ReadAllText("city.json");
            IEnumerable<City> cities = JsonConvert.DeserializeObject<IEnumerable<City>>(jsonString);
            return cities;
        }

        /// <summary>Gets the cities.</summary>
        /// <returns></returns>
        public IEnumerable<City> GetCities(long idState)
        {
            var jsonString = File.ReadAllText("city.json");
            IEnumerable<City> cities = JsonConvert.DeserializeObject<IEnumerable<City>>(jsonString);
            var citiesByStates = cities.Where(x => x.IdState == idState);
            return citiesByStates;
        }


    }
}
