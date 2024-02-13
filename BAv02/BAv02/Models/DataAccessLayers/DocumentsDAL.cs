namespace BAv02.Models.DataAccessLayers
{
    public class DocumentsDAL
    {
        //DocumentURL              /*DocumentURL*/
        /*IdCompany                  *//*IdCompany*//*
        DocumentType             *//*CompanyProfile(IdCompany), Maintenance(IdTrailer), HazmatDriver(IdDriver)*//*
        IdNumber                   *//*				(IdCompany),			(IdTrailer),			 (IdDriver)*//*
        DocumentName             *//*name.pdf*//*
        DocumentExpireDate */

/*        public List<Documents> getDocuments(long IdCompany, string DocumentType, long IdNumber, string DocumentName, DateTime DocumentExpireDate)
        {
            try
            {
*//*                using (var DbContext = new BAV02Context())
                {
                    var t = DbContext.Documents.Where(x => x.IdTrailer == id).FirstOrDefault();
                    if (t.IdCompany == idCompany)
                    {
                        return t;
                    }
                    else { return null; }
                }*//*
            }
            catch (Exception)
            {
                return null;
            }
        }*/
    }
}
