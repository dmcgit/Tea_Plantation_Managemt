// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import Login from "./pages/login.jsx"
import Division from "views/Admin/Division.jsx";
import Field from "views/Admin/Field.jsx";
import Manager from "views/Admin/Manager.jsx";
import Clerk from "views/Admin/Clerk.jsx";
import Conductor from "views/Admin/Conductor.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.jsx";

const dashboardRoutes = [
  {
    path: "/Division",
    name: "Division Management",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Division,
    layout: "/admin"
  },

  {
    path: "/Field",
    name: "Field Management",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Field,
    layout: "/admin"
  },
  
  {
    path: "/Manager",
    name: "Manager Management",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Manager,
    layout: "/admin"
  },
  
 
  {
    path: "/Clerk",
    name: "Clerk Management",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Clerk,
    layout: "/admin"
  },
  {
    path: "/Conductor",
    name: "Conductor Management",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Conductor,
    layout: "/admin"
  },

  {
    path: "/login",
    name: "Log Out",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: Login,
    layout: "/login"
  }
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // }
 
];

export default dashboardRoutes;
