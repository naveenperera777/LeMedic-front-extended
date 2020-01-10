import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import ConsultationHome from "views/Consultation/HomeConsultation.js";
import UserList from "views/UserList/userList";
import UserForm from "views/UserMultiStepForm/UserForm";
import PatientRegistration from "views/PatientRegistration/registerPatient";
import AdminDashboard from "views/AdminDashboard";
import PatientStatistics from "views/PatientStatistics";
import ConsultantStats from "views/ConsultantStatistics";

const dashboardRoutes = [
  {
    path: "/admin/dashboard",
    name: "Admin Dashboard",
    icon: "pe-7s-users",
    component: AdminDashboard,
    layout: "/admin"
  },
  {
    path: "/patient/dashboard",
    name: "Patient Statistics",
    icon: "pe-7s-id",
    component: PatientStatistics,
    layout: "/admin"
  },
  {
    path: "/consultant/dashboard",
    name: "Consultant Stats",
    icon: "pe-7s-graph",
    component: ConsultantStats,
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
    path: "/users",
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
  }
];

export default dashboardRoutes;
