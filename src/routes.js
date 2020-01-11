import ConsultationHome from "views/Consultation/HomeConsultation.js";
import UserList from "views/UserList/userList";
import UserForm from "views/UserMultiStepForm/UserForm";
import PatientRegistration from "views/PatientRegistration/registerPatient";
import AdminDashboard from "views/AdminDashboard";
import PatientStatistics from "views/PatientStatistics";
import ConsultantStats from "views/ConsultantStatistics";
import PatientList from "views/patientList.js";
import MyProfile from "views/myProfile.js";
import UserProfile from "views/UserProfile.js"

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
    path: "/patients",
    name: "Patient List",
    icon: "pe-7s-user",
    component: PatientList,
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
    path: "/profile",
    name: "My profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },

  {
    path: "/create",
    name: "create",
    icon: "pe-7s-user",
    component: UserForm,
    layout: "/admin"
  }
];

export default dashboardRoutes;
