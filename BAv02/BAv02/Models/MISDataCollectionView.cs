using System;

namespace BAv02.Models
{
    public class MISDataCollectionView
    {
        public string SpecimenNumber { get; set; }
        public string Specimen { get; set; }
        public long? Id { get; set; }
        public string Result { get; set; }
        public string PositiveFor { get; set; }
        public string TypeTestCompliance { get; set; }
        public string ReasonCompliance { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? DateApplication { get; set; }
        public long? IdDriver { get; set; }
        public string Form { get; set; }
        public string DrugTestStatus { get; set; }
        public long? Company { get; set; }
        public string ResultAlcoholTest { get; set; }
        public decimal AlcoholResult { get; set; }
        public decimal? ConfirmationTest { get; set; }
        public string SDTStatus { get; set; }
        public long? SDTidDriver { get; set; }
        public string SATStatus { get; set; }
        public long? SATidDriver { get; set; }
    }
}
