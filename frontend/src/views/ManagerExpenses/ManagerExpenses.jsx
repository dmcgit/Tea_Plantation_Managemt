import React from "react";
import "./Dash.css";
import firebase from "../../config/firebase.js";
import PropTypes from "prop-types";
// react plugin for creating charts
import {Link, withRouter} from 'react-router-dom';
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
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import WorkAssign from "pages/work_assignmt.js";
import WorkDone from "pages/work_done.js";
import carfix from "./s.jpg";
import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field1:0,
      field2:0,
      field3:0
    };
  }

  componentWillMount = async() =>{
    this.setFieldData();
    //this.todayDate();
   // this.addDataTo7Day();
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  setFieldData = async() => {
    
    var ref = firebase.database().ref("Daily Work Data").child("02-10-2019").child("Field 1"); 
    var sum=0;

    await ref.once('value',function (snapshot) {                
      snapshot.forEach(element => {
        //if(element.val().work_assignment=="Plucking"){
          sum = sum + element.val().amount;
        //}
      });  
    });    
    //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field1:sum});  
    this.setState({field1: sum});  

    var ref = firebase.database().ref("Daily Work Data").child("02-10-2019").child("Field 2"); 
    sum=0;

    await ref.once('value',function (snapshot) {       
     // let data=snapshot.val();          
      snapshot.forEach(element => {
        sum = sum + element.val().amount;
      });  
    });  
    
    this.setState({field2: sum}); 

    var ref = firebase.database().ref("Daily Work Data").child("02-10-2019").child("Field 3"); 
    sum=0;

    await ref.once('value',function (snapshot) {       
     // let data=snapshot.val();          
      snapshot.forEach(element => {
        sum = sum + element.val().amount;
      });  
    });  
    //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field2:sum});  
    this.setState({field3: sum}); 
    

  }
  render() {
    const { classes } = this.props;
    return (
      <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>
         <div className="wrappe">
      <div>
        <GridContainer>
        
          <GridItem xs={12} sm={6} md={3}>
          <Card>
            <button>
            <Link to ={"/officerpay"}>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                <i class="material-icons">assignment_ind</i>
                </CardIcon>
                <p className={classes.cardCategory}></p>
                <h4 className={classes.cardTitle}>Officers' Payments</h4>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                <hr/>
                </div>
              </CardFooter>
               </Link>
               </button>
            </Card>
          </GridItem>
       

          
          <GridItem xs={12} sm={6} md={3}>
          <Card>
            <button>
            <Link to ={"/misc"}>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}></p>
                <h4 className={classes.cardTitle}>Expenses</h4>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                <hr/>
               </div>
              </CardFooter>
              </Link>
              </button>
            </Card>
            
          </GridItem>
  
          
          <GridItem xs={12} sm={6} md={3}>
          <Card>
            <button>
            <Link to ={"/summary"}>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                <i class="material-icons">&#xe3dd;</i>
                </CardIcon>
                <p className={classes.cardCategory}></p>
                <h4 className={classes.cardTitle}>Expenses Summary</h4>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <hr/>
                </div>
              </CardFooter>
           </Link>
           </button>
           </Card>
          </GridItem>

          
          <GridItem xs={12} sm={6} md={3}>
          <Card>
            <button>
            <Link to ={"/fertilizer"}>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                <i class="material-icons">&#xe3dd;</i>
                </CardIcon>
                <p className={classes.cardCategory}></p>
                <h4 className={classes.cardTitle}>Fertilizer</h4>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <hr/>
                </div>
              </CardFooter>
           </Link>
           </button>
           </Card>
          </GridItem>


        </GridContainer>
       
        <GridContainer>
         
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
