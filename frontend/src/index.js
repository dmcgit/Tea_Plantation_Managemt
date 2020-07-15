import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

// core components
import Admin from "./layouts/Admin.jsx";
import Manager from "./layouts/Manager.jsx";
import Conductor from "./layouts/Conductor.jsx";
import Clerk from "./layouts/Clerk.jsx";
import Owner from "./layouts/Owner.jsx";
import RTL from "./layouts/RTL.jsx";
import WorkAssign from "./pages/work_assignmt";
import WorkDone from "./pages/work_done";
import AdvancePay from "./views/TableList/advancepay";
 import ContractPay from "./views/TableList/contractpay";
 import Expense from "./views/ManagerExpenses/misc";
 import Officers from "./views/ManagerExpenses/officerpay";
 import ManagerExpenses from "./views/ManagerExpenses/ManagerExpenses.jsx";
 import Fertilizer from "./views/ManagerExpenses/fertilizer.jsx";
import Loan from "./views/TableList/loan";
import Summary from "./views/ManagerExpenses/summary";
import Weather from "./pages/weather.js";
import Login from "./pages/login.jsx";
import ClerkExpenses from "./views/ClerkExpenses/ClerkExpenses.jsx";
import NewNotifications from "./views/ClerkExpenses/NewNotifictns";
import ViewNotifications from "./views/ClerkExpenses/ViewNotifictns";
import RespondedNotifications from "./views/ClerkExpenses/RespondedNotifictns";
import DailyWork from "./views/ConductorDailyWork/ConductorDailyWork.jsx";
import DailySummary from "./views/ManagerDailySummary/ManagerDailySummary.jsx";
import AddLabourer from "./views/AddLabourer/add_labourer.js";
import UpdateLabourer from "./views/AddLabourer/update_labourer.js";
import Factory from "./pages/daily_factory.js"
//import AddLabourer from "./views/AddLabourer/update_labourer.js";
import DeleteLabourer from "./views/AddLabourer/delete_labourer.js";
import TableList from "./views/TableList/TableList.jsx";
import Incomplete7Day from "./views/Manager7Day/incomplete7Day.jsx"
import Manager7Day from "./views/Manager7Day/Manager7Day.jsx";
import AdminDivision from "./views/Admin/Division.jsx";
import AddDivision from "./views/Admin/add_division";
import UpdateDivision from "./views/Admin/update_division";
import DeleteDivision from "./views/Admin/delete_division";
import AddField from "./views/Admin/add_field";
import UpdateField from "./views/Admin/update_field";
import DeleteField from "./views/Admin/delete_field";
import ReplantField from "./views/Admin/replantField";
import AddManager from "./views/Admin/add_manager";
import UpdateManager from "./views/Admin/update_manager";
import DeleteManager from "./views/Admin/delete_manager";
import AddClerk from "./views/Admin/add_clerk";
import UpdateClerk from "./views/Admin/update_clerk";
import DeleteClerk from "./views/Admin/delete_clerk";
import AddConductor from "./views/Admin/add_conductor";
import UpdateConductor from "./views/Admin/update_conductor";
import DeleteConductor from "./views/Admin/delete_conductor";
import DailySummaryOwner from "./views/ManagerDailySummary/ManagerDailySummary.jsx";
import ExpensesSummary from "./views/OwnerExpensesSummary/ExpensesSummary";

import "./assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>

      if({localStorage.getItem('user')}=='owner'){
        <Route path="/conductor" component={Conductor} />
      }
      else if({localStorage.getItem('user')}=='manager'){
         <Route path="/manager" component={Manager} />
      }
      else if({localStorage.getItem('user')}=='clerk'){
         <Route path="/clerk" component={Clerk} />
      }
      else if({localStorage.getItem('user')}=='owner'){
           <Route path="/owner" component={Owner} />
      }
      else if({localStorage.getItem('user')}=='admin'){
          <Route path="/admin" component={Admin} />
      }


     
      
      
      
   
      <Route path="/rtl" component={RTL} />

      <Route exact path="/work_assignmt" component={WorkAssign}/>
      <Route exact path ="/work_done" component={WorkDone}/>
      <Route exact path ="/weather" component={Weather}/>
      <Route exact path ="/login" component={Login}/>
      <Route exact path ="/factory" component={Factory}/>

      <Route exact path ="/admin/Division" component={AdminDivision}/>
      <Route exact path ="/addDivision" component={AddDivision}/>
      <Route exact path ="/updateDivision" component={UpdateDivision}/>
      <Route exact path ="/deleteDivision" component={DeleteDivision}/>
      <Route exact path ="/addField" component={AddField}/>
      <Route exact path ="/updateField" component={UpdateField}/>
      <Route exact path ="/deleteField" component={DeleteField}/>
      <Route exact path ="/replantField" component={ReplantField}/>
      <Route exact path ="/addManager" component={AddManager}/>
      <Route exact path ="/updateManager" component={UpdateManager}/>
      <Route exact path ="/deleteManager" component={DeleteManager}/>
      <Route exact path ="/addClerk" component={AddClerk}/>
      <Route exact path ="/updateClerk" component={UpdateClerk}/>
      <Route exact path ="/deleteClerk" component={DeleteClerk}/>
      <Route exact path ="/addConductor" component={AddConductor}/>
      <Route exact path ="/updateConductor" component={UpdateConductor}/>
      <Route exact path ="/deleteConductor" component={DeleteConductor}/>


      <Route exact path ="/conductor/ConductorDailyWork" component={DailyWork}/>
      <Route exact path ="/conductor/ExpensesHandling" component={TableList}/>
      <Route exact path ="/conductor/AddLabourer" component={AddLabourer}/>
      <Route exact path ="/manager/ExpensesHandling" component={ManagerExpenses}/>
      <Route exact path ="/manager/DailySummary" component={DailySummary}/>
      <Route exact path ="/manager/Manager7Day" component={Manager7Day}/>
      <Route exact path ="/clerk/ExpensesHandling" component={ClerkExpenses}/>
      <Route exact path = "/NewNotifictns" component={NewNotifications}/>
      <Route exact path = "/ViewNotifictns" component={ViewNotifications}/>
      <Route exact path = "/RespondedNotifictns" component={RespondedNotifications}/>
      <Route exact path ="/advancepay" component={AdvancePay}/>
      <Route exact path ="/contractpay" component={ContractPay}/>
      <Route exact path ="/misc" component={Expense}/>
      <Route exact path ="/loan" component={Loan}/>
      <Route exact path ="/summary" component={Summary}/>
      <Route exact path ="/officerpay" component={Officers}/>
      <Route exact path ="/fertilizer" component={Fertilizer}/>
      <Route exact path ="/add_labourer" component={AddLabourer}/>
      <Route exact path ="/update_labourer" component={UpdateLabourer}/>
      <Route exact path ="/delete_labourer" component={DeleteLabourer}/>
      <Route exact path ="/incomplete7Day" component={Incomplete7Day}/>

      <Route exact path ="/owner/DailySummary" component={DailySummaryOwner}/>
      <Route exact path ="/owner/ExpenesSummary" component={ExpensesSummary}/>
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")



  );