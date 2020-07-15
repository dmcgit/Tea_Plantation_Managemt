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
import DailyWorkPage from "./views/ConductorDailyWork/ConductorDailyWork.jsx";
import UserProfile from "./views/UserProfile/UserProfile.jsx";
import TableList from "./views/TableList/TableList.jsx";
import Typography from "./views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Conductor7Day from "./views/Conductor7Day/Conductor7Day.jsx";
import Maps from "./views/Maps/Maps.jsx";
import NotificationsPage from "./views/Notifications/Notifications.jsx";
import UpgradeToPro from "./views/UpgradeToPro/UpgradeToPro.jsx";
// core components/views for RTL layout
import RTLPage from "./views/RTLPage/RTLPage.jsx";
import AddLabourer from "./views/AddLabourer/AddLabourer.jsx";
import Login from "./pages/login.jsx"
const dashboardRoutes = [
  {
    path: "/ConductorDailyWork",
    name: "Conductor Daily Work",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DailyWorkPage,
    layout: "/conductor"
  },
  {
    path: "/Conductor7Day",
    name: "Conductor 7 Day",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Conductor7Day,
    layout: "/conductor"
  },
  
  {
    path: "/AddLabourer",
    name: "Add Labourer",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: AddLabourer,
    layout: "/conductor"
  },

  {
    path: "/ExpensesHandling",
    name: "Expenses Handling",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/conductor"
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // }
  {
    path: "/login",
    name: "Log Out",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: Login,
    layout: "/login"
  }
];

export default dashboardRoutes;