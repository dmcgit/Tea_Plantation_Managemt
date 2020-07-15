import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";
import Tasks from "../../components/Tasks/Tasks.jsx";
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import { bugs, website, server } from "../../variables/general.jsx";
import firebase from "../../config/firebase.js";
import carfix from "./s.jpg";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.jsx";
import Calendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css' // Default Style
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { container, card } from "../../assets/jss/material-dashboard-react.jsx";
import axios from "axios";
import "./summary.css";
//const useStyles = makeStyles(styles);
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date()
    this.state = {
      chartVal:[0,0],
      tableData:[],
      getYear:0,
      getMonth: 0,
      yearMonth: 0,
    }
    
  }
  generatesum = async(e) => {

    console.log(this.state.getMonth);
    console.log(this.state.getYear);
   
    var monthofYear = (parseInt(this.state.getYear*100)+parseInt(this.state.getMonth));
    //this.setState({this.state.yearMonth: (this.state.getYear*100)+this.state.getMonth+1000000});
    console.log(monthofYear);

    axios.get('http://localhost:8000/api/expenseSum/get-all/'+monthofYear).then(response =>{
      var data = [];
      
      console.log(response.data);
      var i=0;
      while(response.data[i]){
        data[i]=[response.data[i]['description'],response.data[i]['amount'],response.data[i]['date']]
        i+=1;
        console.log("DATA"+data[i]);
      }
      console.log("DATA"+data[i]);
      this.setState({tableData:data});
    }).catch(function(error){
   console.log(error);
    })
  }

  componentWillMount = async() =>{
    
    var curdate = new Date();
    await this.setState({getMonth: curdate.getMonth()+1});
    await this.setState({getYear: curdate.getFullYear()});
    
    // console.log(this.state.getMonth);
    // console.log(this.state.getYear);
    this.generatesum();
    

    //this.todayDate();
   // this.addDataTo7Day();
    
  }
  
  handleBack = () => {
    window.location.replace("/manager/ExpensesHandling");
  
  }
  render() {

    
    
    
    return (
      <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>
        <div className="wr">
      <div>
       
      <div className="field">
        <label className="form-inline label"></label>
        
          <div className="control">
          <select className="form-control" placeholder = "Year " value = {this.state.getYear} onChange={(event) => {this.setState({ getYear: event.target.value }, function () {this.generatesum();});}}>
                    <option value="None"> </option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                  </select>
              
         
        </div>
      </div>

      <div className="field">
        <label className="form-inline label"></label>
        <div className="field">
          <div className="control">
          <select className="form-control" placeholder = "Month " value = {this.state.getMonth} onChange={(event) => {this.setState({ getMonth: event.target.value }, function () {this.generatesum();})}}>
                    <option value="None"> </option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
             
          </div>
        </div>
      </div>
{/* 
      <div className='submit'>
              <button onClick={(e) => this.handleLoad(e)}>Generate Summary</button>
            </div> */}
  
          <GridContainer justify="center">
          <GridItem xs={12} sm={21} md={24}>
            <CustomTabs
              title="    Summary   "
              headerColor="warning"
              tabs={[
                {
                  // tabName: localStorage.getItem('currentUserDivision'),
                  // tabIcon: BugReport,
                  tabContent: (
                    <Table
                  tableHeaderColor="secondary"
                  tableHead={[ "Expense","Total","date"]}
                  tableData={this.state.tableData}
                  
                />
                  )
                }
              ]}
            />
          </GridItem>
         
        </GridContainer>

        
           </div>
           <button type="submit" className="back" onClick={this.handleBack}>Back</button>
           </div> 
           </div>     
     
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);