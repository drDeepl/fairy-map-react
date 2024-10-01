import Dashboard from "../pages/dashboard/Dashboard";
import Home from "../pages/home/Home";

export interface IRoutes {
  path: string;
  element: any;
  name: string;
  roles: string[];
}
const routes: IRoutes[] = [
  // { path: "/", exact: true, name: "Home" },

  {
    path: "/",
    name: "Home",
    element: Home,
    roles: ["report_management"],
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    element: Dashboard,
    roles: ["report_management"],
  },

  // {
  //   path: '/ride-list',
  //   name: 'Ride',
  //   element: Ride,
  //   roles: ['ride_management'],
  // },

  // {
  //   path: '/ride-dashboard',
  //   name: 'Ride Dashboard',
  //   element: RideDashboard,
  //   roles: ['ride_management'],
  // },

  // {
  //   path: '/ride-list/ride-detail/:id',
  //   name: 'Ride Detail',
  //   element: RideDetail,
  //   roles: ['ride_management'],
  // },

  // {
  //   path: '/users',
  //   name: 'Users',
  //   element: Users,
  //   roles: ['user_management'],
  // },

  // {
  //   path: '/users/user-detail/:id',
  //   name: 'User Detail',
  //   element: UserDetail,
  //   roles: ['user_management'],
  // },

  // {
  //   path: '/user-dashboard',
  //   name: 'User Dashboard',
  //   element: UserDashboard,
  //   roles: ['user_management'],
  // },
  // {
  //   path: '/payment-dashboard',
  //   name: 'Payment Dashboard',
  //   element: PaymentDashboard,
  //   roles: ['payment_management'],
  // },
  // {
  //   path: '/payment',
  //   name: 'Payment',
  //   element: PaymentList,
  //   roles: ['payment_management'],
  // },
  // {
  //   path: '/payment/payment-detail/:id',
  //   name: 'Payment Detail',
  //   element: PaymentDetail,
  //   roles: ['payment_management'],
  // },

  // {
  //   path: '/admins',
  //   name: 'Admins',
  //   element: Admins,
  //   roles: ['admin_management'],
  // },

  // {
  //   path: '/settings',
  //   name: 'Settings',
  //   element: Settings,
  //   roles: ['setting_management'],
  // },
  // {
  //   path: '/logs',
  //   name: 'Logs',
  //   element: LogList,
  //   roles: ['setting_management'],
  // },
];

export default routes;
