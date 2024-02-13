import React from "react";
import DefaultLayout from "./containers/DefaultLayout";
import SafetyComplianceReport from "./views/SuperAdmin/SafetyComplianceReport";

const Dashboard = React.lazy(() => import("./views/Dashboard"));
const AccountSettings = React.lazy(() => import("./views/AccountSettings"));
const Users = React.lazy(() => import("./views/Users/Users"));
const Maintenance = React.lazy(() => import("./views/Maintenance/Maintenance"));
const Trucks = React.lazy(() => import("./views/Trucks/Trucks"));
const Trailers = React.lazy(() => import("./views/Trailers/Trailers"));
const Drivers = React.lazy(() => import("./views/Drivers/Drivers"));
const DriverHazmat = React.lazy(() =>
  import("./views/DriversHazmat/DriverHazmat")
);

const Notifications = React.lazy(() =>
  import("./views/Notifications/Notifications")
);
const QualificationFile = React.lazy(() =>
  import("./views/QualificationFile/QualificationFile")
);
const DashboardTest = React.lazy(() => import("./views/Testing/DashboardTest"));
const WorkOrder = React.lazy(() => import("./views/Maintenance/WorkOrder"));
const LetterIn = React.lazy(() => import("./views/Drivers/LetterIn"));
const LetterInAndEmployHis = React.lazy(() => import("./views/Drivers/LetterInAndEmployHis"));
const EmployHis = React.lazy(() => import("./views/Drivers/EmployHis"));
const Hazmat = React.lazy(() => import("./views/Hazmat"));
//const HazmatDriverDashboard = React.lazy(() => import('./views/HazmatDriverDashboard'));

const DashboardDrugTestCollector = React.lazy(() =>
  import("./views/DrugTestCollector/Dashboard")
);
const DrugTestDetails = React.lazy(() =>
  import("./views/DrugTestCollector/DrugTestDetails")
);

const DashboardCompliance = React.lazy(() =>
  import("./views/SafetyCompliance/Dashboard")
);
const pdfGenerator = React.lazy(() => import("./components/pdf/pdf-base"));
// Super Admin Routes
const SuperAdmin = React.lazy(() => import("./views/SuperAdmin"));
const SiteProviders = React.lazy(() =>
  import("./views/SuperAdmin/SiteProviders")
);
const Reports = React.lazy(() => import("./views/SuperAdmin/DashboardReport"));

const GeneralReports = React.lazy(() => import("./views/SuperAdmin/Reports"));

const DOTReport = React.lazy(() => import("./views/SuperAdmin/DOTReport"));

const CollectionSites = React.lazy(() =>
  import("./views/SuperAdmin/CollectionSite")
);
const Collectors = React.lazy(() => import("./views/SuperAdmin/Collectors"));

const SuperAdminUsers = React.lazy(() =>
  import("./views/SuperAdmin/SuperAdminUsers")
);
const ComplianceReport = React.lazy(() =>
  import("./views/SuperAdmin/ComplianceReport")
);
const ComplianceDriver = React.lazy(() =>
  import("./views/SuperAdmin/ComplianceReport/ComplianceDriver")
);
const ComplianceTrailers = React.lazy(() =>
  import("./views/SuperAdmin/ComplianceReport/ComplianceTrailer")
);
const ComplianceCompany = React.lazy(() =>
  import("./views/SuperAdmin/ComplianceReport/ComplianceCompany")
);
const ComplianceTruck = React.lazy(() =>
  import("./views/SuperAdmin/ComplianceReport/ComplianceTruck")
);
const CompanyProfiles = React.lazy(() =>
  import("./views/SuperAdmin/CompanyProfiles")
);

const ProfileSiteProviders = React.lazy(() =>
  import("./views/SuperAdmin/SiteProviders/profile")
);
const ProfileCollectionSite = React.lazy(() =>
  import("./views/SuperAdmin/CollectionSite/profile")
);

const ProfileCompanies = React.lazy(() =>
  import("./views/SuperAdmin/CompanyProfiles/profile")
);

const AlcoholCollector = React.lazy(() =>
  import("./views/DrugTestCollector/AlcoholDashboard")
);

const D_ADashboard=React.lazy(()=>
  import("./views/DrugTestCollector/D_ADashboard"))

const AlcoholTestDashboard = React.lazy(() =>
  import("./views/AlcoholTestCollector/dashboard")
);

const AlcoholTestDetail = React.lazy(() =>
  import("./views/DrugTestCollector/AlcoholTestDetail")
);

const Devices = React.lazy(() =>
  import("./views/Devices/Devices")
);

const pdfEmp = React.lazy(() => import("./containers/Drivers/Pdf/pdfEmp"));

const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  {
    path: "/accountSettings",
    name: "Account Settings",
    component: AccountSettings,
  },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/Users/:id", name: "Users", component: Users },
  { path: "/Maintenance", name: "Maintenance", component: Maintenance },
  { path: "/Trailers/:id", name: "Trailers", component: Trailers },
  { path: "/Trucks/:id", name: "Trucks", component: Trucks },
  { path: "/Drivers/:id", name: "Drivers", component: Drivers },
  { path: "/DriverHazmat/:id", name: "Driver Hazmat", component: DriverHazmat },
  { path: "/Notifications", name: "Notifications", component: Notifications },
  { path: "/base-pdf", name: "BasePdf", component: pdfGenerator },
  {
    path: "/QualificationFile",
    name: "Driver Files",
    component: QualificationFile,
  },
  {
    path: "/DashboardTest",
    name: "Drug Testing Program",
    component: DashboardTest,
  },
  { path: "/WorkOrder/:id", name: "WorkOrder", component: WorkOrder },
  {
    path: "/EmployHis/:id/:idE/:name",
    name: "EmployHis",
    component: EmployHis,
  },
  {
    path: "/LetterIn/:id/:idL/:idU",
    name: "Drug&AlcoholHistory",
    component: LetterIn,
  },
  {
    path: "/LetterInAndEmployHis/:id/:idE/:idEmployerRecord/:name",
    name: "LetterInAndEmployHis",
    component: LetterInAndEmployHis,
  },
  {
    path: "/DashboardCompliance",
    name: "DashboardCompliance",
    component: DashboardCompliance,
  },
  {
    path: "/DashboardCollector",
    name: "Dashboard Collector",
    component: DashboardDrugTestCollector,
  },
  {
    path: "/AlcoholCollector",
    name: "Alcohol Dashboard Collector",
    component: AlcoholCollector,
  },
  {
    path: "/D_ADashboard",
    name: "D&A Dashboard Collector",
    component: D_ADashboard,
  },
  {
    path: "/DrugTestDetails/:id",
    name: "DrugTestDetails",
    component: DrugTestDetails,
  },
  {
    path: "/AlcoholTestDetails/:id",
    name: "AlcoholTestDetails",
    component: AlcoholTestDetail,
  },
  {
    path: "/AlcoholTestDashboard",
    name: "AlcoholTestDashboard",
    component: AlcoholTestDashboard,
  },
  {
    path: "/super-admin",
    name: "Super Admin",
    component: SuperAdmin,
  },
  {
    path: "/providers",
    name: "Providers",
    component: SiteProviders,
  },
  {
    path: "/collection-site",
    name: "Collection Site",
    component: CollectionSites,
  },
  {
    path: "/collectors",
    name: "Collectors",
    component: Collectors,
  },
  {
    path: "/super-admin-users",
    name: "Super Admin Users",
    component: SuperAdminUsers,
  },
  {
    path: "/company-profile/:id",
    name: "Company Profile",
    component: ProfileCompanies,
  },
  {
    path: "/company-profiles",
    name: "Company Profiles",
    component: CompanyProfiles,
  },
  {
    path: "/providers-profile/:id",
    name: "Provider Profile",
    component: ProfileSiteProviders,
  },
  {
    path: "/collector-site-profile/:id",
    name: "Collector Site Profile",
    component: ProfileCollectionSite,
  },
  {
    path: "/pdf-emp",
    name: "Employment Application",
    component: pdfEmp,
  },
  {
    path: "/scr",
    name: "Safety Compliance OnBoarding",
    component: SafetyComplianceReport,
  },
  {
    path: "/reports/compliance-report/driver",
    name: "Driver",
    component: ComplianceDriver,
  },
  {
    path: "/reports/compliance-report/trailer",
    name: "Trailer",
    component: ComplianceTrailers,
  },
  {
    path: "/reports/compliance-report/company",
    name: "Company",
    component: ComplianceCompany,
  },
  {
    path: "/reports/compliance-report/truck",
    name: "Truck",
    component: ComplianceTruck,
  },
  {
    path: "/reports/compliance-report",
    name: "Compliance Report",
    component: ComplianceReport,
  },
  {
    path: "/reports/general-report",
    name: "General Report",
    component: GeneralReports,
  },
  {
    path: "/reports/dot-report",
    name: "DOT Report",
    component: DOTReport,
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
  },
  {
    path: "/Hazmat",
    name: "Hazmat",
    component: Hazmat,
  },
  {
    path: "/Devices",
    name: "Devices",
    component: Devices,
  }
];

export default routes;

/*    {
    path: '/HazmatDriverDashboard',
    name: 'Hazmat Driver Dashboard',
    component: HazmatDriverDashboard,
    },*/
