using System.Collections.Generic;

namespace BAv02.Models.DataAccessLayers.Repositories
{
    interface IVehicleRepository
    {
        IEnumerable<Vehicle> GetAll();

        IEnumerable<Vehicle> GetAllActive();

        IEnumerable<Vehicle> GetAllInactive();
    }
}
