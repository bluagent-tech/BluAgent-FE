using Newtonsoft.Json;

namespace BAv02.Models
{
    public partial class HazardMaterialStates
    {
        public long Id { get; set; }
        public long? IdCompany { get; set; }
        public bool? Ak { get; set; }
        public bool? Al { get; set; }
        public bool? Ar { get; set; }
        public bool? Az { get; set; }
        public bool? Ca { get; set; }
        public bool? Co { get; set; }
        public bool? Ct { get; set; }
        public bool? Dc { get; set; }
        public bool? De { get; set; }
        public bool? Fl { get; set; }
        public bool? Ga { get; set; }
        public bool? Hi { get; set; }
        public bool? Ia { get; set; }
        public bool? Idaho { get; set; }
        public bool? Il { get; set; }
        public bool? Indiana { get; set; }
        public bool? Ks { get; set; }
        public bool? Ky { get; set; }
        public bool? La { get; set; }
        public bool? Ma { get; set; }
        public bool? Md { get; set; }
        public bool? Me { get; set; }
        public bool? Mi { get; set; }
        public bool? Mn { get; set; }
        public bool? Mo { get; set; }
        public bool? Ms { get; set; }
        public bool? Mt { get; set; }
        public bool? Nc { get; set; }
        public bool? Nd { get; set; }
        public bool? Ne { get; set; }
        public bool? Nh { get; set; }
        public bool? Nj { get; set; }
        public bool? Nm { get; set; }
        public bool? Nv { get; set; }
        public bool? Ny { get; set; }
        public bool? Oh { get; set; }
        public bool? Ok { get; set; }
        public bool? Oregon { get; set; }
        public bool? Pa { get; set; }
        public bool? Pr { get; set; }
        public bool? Ri { get; set; }
        public bool? Sc { get; set; }
        public bool? Sd { get; set; }
        public bool? Tn { get; set; }
        public bool? Tx { get; set; }
        public bool? Ut { get; set; }
        public bool? Va { get; set; }
        public bool? Vt { get; set; }
        public bool? Wa { get; set; }
        public bool? Wi { get; set; }
        public bool? Wv { get; set; }
        public bool? Wy { get; set; }
        [JsonIgnore]
        public Company IdCompanyNavigation { get; set; }
    }
}
