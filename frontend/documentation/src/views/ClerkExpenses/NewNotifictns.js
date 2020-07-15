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
      tableData:[]
    }
    
  }
  setTableValues = async() =>{
   // this.setNewEndDate();
   // this.setEndDate();
    
   // this.setChartVal();
  axios.get('http://localhost:8000/api/expenses/select/New').then(response =>{
    var data = [];
    console.log(response.data);
    var i=0;
    while(response.data[i]){
      data[i]=[response.data[i]['divNo'],response.data[i]['descriptions'],response.data[i]['description'],response.data[i]['generatedBy'],response.data[i]['date'],,response.data[i]['amount']]
      i+=1;
      console.log("DATA"+data[i]);
    }
    console.log("DATA"+data[i]);
    this.setState({tableData:data});
  }).catch(function(error){
 console.log(error);
  })
  
  };

  componentWillMount = async() =>{
    this.setTableValues();
  };

  
  render() {

    
    const { startDate,endDate } = this.state;
    console.log(this.state.endDate);
    return (
      <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>
        <div className="wrappe">
      <div>
      {/* <GridContainer justify="center">

          <GridItem xs={12} sm={12} md={6}>
            <Card>
            <Calendar startDate={startDate} endDate={this.state.endDate} onChange={this.onChange} />
            
            </Card>
          </GridItem>
        </GridContainer> */}
          
        {/* <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: ["M", "T", "W", "T", "F", "S", "S"],
                    series: [[10, 0, 7, 17, 23, 18, 38]]
                  }}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 >Last 7 Day Summary</h4>
                <p >
                  <span >
                    Target Completed
                  </span>{" "}
                 </p>
              </CardBody> 
               <CardFooter chart>
                <div >
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter> 
            </Card>
          </GridItem>
          </GridContainer> */}
          
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={9}>
            <CustomTabs
              title="    New Notifications   "
              headerColor="danger"
              tabs={[
                {
                  // tabName: localStorage.getItem('currentUserDivision'),
                  // tabIcon: BugReport,
                  tabContent: (
                    <Table
                  tableHeaderColor="secondary"
                  tableHead={[ "Division_No","ID", "Expense","Generated by","Date","Amount"]}
                  tableData={this.state.tableData}
                  
                />
                  )
                }
              ]}
            />
          </GridItem>
          
        </GridContainer>
           </div> 
           </div> 
           </div>     
     
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);