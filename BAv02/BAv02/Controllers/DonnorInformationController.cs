using BAv02.Models;
using Microsoft.AspNetCore.Mvc;
using Models.DataAccessLayers;
using System;

namespace BAv02.Controllers
{
    [Route("api/[controller]")]
	public class DonnorInformationController : Controller
	{
		//private UpdateDonnorDAL _donnorInfo;

		UpdateDonnorDAL db = new UpdateDonnorDAL();
		
		public DonnorInformationController() 
		{
			
		}

		[HttpPost("[action]")]
		public ActionResult UpdateDonnorDataInformation(Users u, Driver d)
		{
			try
			{
				var donnor = db.updateDonnorData(u, d);
				if(donnor == 0) 
				{
					return Json(new { status = 0, message = "donnor info updated" });
				}
				else
				{
					return Json(new { status = 1, message = "error updating donnor info" });
				}
			}
			catch (Exception ex)
			{
				throw new Exception($"Error {ex}");
			}
		}
	}
}
