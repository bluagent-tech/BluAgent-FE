import './assets/css/_nav.css';

export default {
  items: [
    {
      //0
      name: 'SA Dashboard',
      url: '/super-admin',
      icon: 'fa fa-th',
    },
    {
      //1
      name: 'Dashboard',
      url: '/Dashboard',
      icon: 'fa fa-th',
    },
    {
      //2
      name: 'Notifications',
      url: '/Notifications',
      icon: 'fa fa-bell',
    },
    {
      //3
      name: 'Notifications',
      url: '/Notifications',
      icon: 'fa fa-bell',
      badge: {
        variant: 'danger',
        text: 'NEW',
        // class: 'navNotification'
        // class:" width border border-light rounded-circle",
      }
      // children: [
      //   {
      //     name: 'Flags',     // item options apply
      //     url: '/icons/flags',
      //     icon: 'icon-star',
      //     badge: {
      //       variant: 'success',
      //       text: 'NEW'
      //     }
      //   },
      // ]
    },
    {
      //4
      name: 'Company Profile',
      url: '/AccountSettings',
      icon: 'fa fa-building',
    },
    {
      //5
      name: 'Driver Files',
      url: '/QualificationFile',
      icon: 'fa fa-archive',
    },
    {
      //6
      name: 'Maintenance',
      url: '/Maintenance',
      icon: 'fa fa-wrench',
    },
    {
      //7
      name: 'Drug & Alcohol',
      url: '/DashboardTest',
      icon: 'fa fa-flask',
    },
    {
      //8
      name: 'Alcohol Testing ',
      url: '/AlcoholTestDashboard',
      icon: 'fa fa-beer',
    },
    {
      //9
      name: 'Hours of Service',
      url: 'https://cloud.apolloeld.com/userlogin',
      icon: 'fa fa-clock-o',
    },
    {
      //10
      name: 'GPS Tracking',
      url: 'https://gps.bluagent.com',
      icon: 'fa fa-map-marker',
    },
    {
      //11
      name: 'Hazmat',
      url: '/Hazmat',
      icon: 'fas fa-biohazard',
    },
    {
      //12
      name: 'Training',
      url: 'https://bluagent.com/courses/sample-course/',
      icon: 'fa fa-check-circle',
    },
    {
      //13
      name: 'Profile',
      url: '/Users/' + JSON.parse(localStorage.getItem('user')).Id,
      icon: 'fa fa-cogs',
    },
    {
      //14
      name: 'Drug Tests',
      url: '/DashboardCollector',
      icon: 'fa fa-medkit',
    },
    {
      //15
      name: 'Alcohol Tests',
      url: '/AlcoholCollector',
      icon: 'fa fa-medkit',
    },
    {
      //16
      name: 'Company Profiles',
      url: '/company-profiles',
      icon: 'fa fa-bank',
    },
    {
      //17
      name: 'Providers',
      url: '/providers',
      icon: 'fa fa-building',
    },
    {
      //18
      name: 'Collection Site',
      url: '/collection-site',
      icon: 'fa fa-hospital-o',
    },
    {
      //19
      name: 'Collectors',
      url: '/collectors',
      icon: 'fa fa-user-circle-o',
    },
    {
      //20
      name: 'Super Admin Users',
      url: '/super-admin-users',
      icon: 'fa fa-users',
    },
    {
      //21
      name: 'Safety Compliance',
      url: '/scr',
      icon: 'fa fa-list-ul',
    },
    {
      //22
      name: 'Reports',
      url: '/reports',
      icon: 'fas fa-chart-line',
    },
    {
      //23
      name: 'D&A Dashboard',
      url: '/D_ADashboard',
      icon: 'fa fa-university',
    },
    {
      //24
      name: 'Devices',
      url: '/Devices',
      icon: 'fa fa-usb',
    }
  ],
};