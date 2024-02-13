using System;

namespace BAv02.Models
{
    public partial class Collector
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Discriminator { get; set; }
        public long? CollectionSiteId { get; set; }
        //public string CollectionSiteName { get; set; }
        public bool? AlcoholTestingAllowed { get; set; }
        public bool? DrugTestingAllow { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsArchived { get; set; }
        public DateTime? DateArchived { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public long? ArchivedByUserId { get; set; }
    }
}
