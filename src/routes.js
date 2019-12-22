import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import ConsultationHome from "views/Consultation/HomeConsultation.js";
import UserList from "views/UserList/userList";
import Welcome from "views/welcome"
import PatientProfile from "views/UserList/userProfile";
import UserForm from "views/UserMultiStepForm/UserForm";
import PatientRegistration from "views/PatientRegistration/registerPatient";
import PatientDashboard from "views/PatientDashboard";
import PatientStatistics from "views/PatientStatistics";

const dashboardRoutes = [
  {
    path: "/patient/dashboard",
    name: "Patient Dashboard",
    icon: "pe-7s-users",
    component: PatientDashboard,
    layout: "/admin"
  },
  {
    path: "/statistics/patient",
    name: "Patient Statistics",
    icon: "pe-7s-id",
    component: PatientStatistics,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/consultation",
    name: "consultation",
    icon: "pe-7s-graph",
    component: ConsultationHome,
    layout: "/admin"
  },
  {
    path: "/testing",
    name: "User List",
    icon: "pe-7s-user",
    component: UserList,
    layout: "/admin"
  },

  {
    path: "/register/patient",
    name: "Register Patient",
    icon: "pe-7s-user",
    component: PatientRegistration,
    layout: "/admin"
  },

  {
    path: "/create",
    name: "create",
    icon: "pe-7s-user",
    component: UserForm,
    layout: "/admin"
  },
  {
    path: "/user/profile",
    name: "userprof",
    icon: "pe-7s-user",
    component: Welcome,
    layout: "/admin"
  },
  {
    path: "/list",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  // {
  //     path: "/mgt-user",
  //     name: "User Management",
  //     icon: "pe-7s-note2",
  //     component: UserList,
  //     layout: "/admin"
  //   },
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
  
  {
    path: "/wel",
    name: "Welcome",
    icon: "pe-7s-news-paper",
    component: Welcome,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  },
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: Upgrade,
    layout: "/admin"
  }
];

export default dashboardRoutes;
