using BAv02.Models;
using System;
using System.Linq;

namespace Models.DataAccessLayers
{
    public class UpdateDonnorDAL
    {
        public int updateDonnorData(Users u, Driver d)
        {
            var r = 0; 
            try
            {
                using (var DbContext = new BAV02Context())
                {
                    var users = DbContext.update_drive_from_collector.Where(x => x.Id == u.Id).FirstOrDefault();
                    if(users != null)
					{
                        users.Birthdate = u.Birthdate;
                        DbContext.SaveChanges();
                        users.PhoneNumber = u.PhoneNumber;
                        DbContext.SaveChanges();
                        users.License = d.License;
                        DbContext.SaveChanges();
                        users.EmployeeId = d.EmployeeId;
                        DbContext.SaveChanges();

                        return r;
					}else{
                        return 1;
					}
                }
            }
            catch (Exception ex) { throw new Exception($"Error{ex}"); }
        }
    }
}