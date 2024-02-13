using System;

namespace BAv02.Models
{
    public partial class Provider
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Fein { get; set; }
        public string AlternateBussinessIdentifier { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string FaxNumber { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsArchived { get; set; }
        public DateTime? DateArchived { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public long? ArchivedByUserId { get; set; }
    }
}
