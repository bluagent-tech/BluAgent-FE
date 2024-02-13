using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

/// <summary>Class for States Operations.</summary>
namespace BAv02.Models.DataAccessLayers
{

    public class StatesDAL
    {

        /// <summary>Gets the states.</summary>
        /// <returns>List of states.</returns>
        public IEnumerable<State> GetStates()
        {
            var jsonString = File.ReadAllText("states.json");
            IEnumerable<State> states = JsonConvert.DeserializeObject<IEnumerable<State>>(jsonString);
            return states;
        }

        public IEnumerable<State> GetStatesById(long id)
        {
            var jsonString = File.ReadAllText("states.json");
            IEnumerable<State> states = JsonConvert.DeserializeObject<IEnumerable<State>>(jsonString);
            return states;
        }

        public IEnumerable<State> GetStates(long idCountry)
        {
            var jsonString = File.ReadAllText("states.json");
            IEnumerable<State> states = JsonConvert.DeserializeObject<IEnumerable<State>>(jsonString);
            var statesByCountry = states.Where(x => x.IdCountry == idCountry);
            return statesByCountry;
        }
    }
}
