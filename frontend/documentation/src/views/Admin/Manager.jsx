import React from "react";
import firebase from "../../config/firebase.js";
import PropTypes from "prop-types";
import carfix from "./s.jpg";
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
// import "./Dash.css";

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
    //this.setFieldData();
    //this.todayDate();
   // this.addDataTo7Day();
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  // setFieldData = async() => {
    
  //   var ref = firebase.database().ref("Daily Work Data").child("02-10-2019").child("Field 1"); 
  //   var sum=0;

  //   await ref.once('value',function (snapshot) {                
  //     snapshot.forEach(element => {
  //       //if(element.val().work_assignment=="Plucking"){
  //         sum = sum + element.val().amount;
  //       //}
  //     });  
  //   });    
  //   //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field1:sum});  
  //   this.setState({field1: sum});  

  //   var ref = firebase.database().ref("Daily Work Data").child("02-10-2019").child("Field 2"); 
  //   sum=0;

  //   await ref.once('value',function (snapshot) {       
  //    // let data=snapshot.val();          
  //     snapshot.forEach(element => {
  //       sum = sum + element.val().amount;
  //     });  
  //   });  
    
  //   this.setState({field2: sum}); 

  //   var ref = firebase.database().ref("Daily Work Data").child("02-10-2019").child("Field 3"); 
  //   sum=0;

  //   await ref.once('value',function (snapshot) {       
  //    // let data=snapshot.val();          
  //     snapshot.forEach(element => {
  //       sum = sum + element.val().amount;
  //     });  
  //   });  
  //   //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field2:sum});  
  //   this.setState({field3: sum}); 
    

  // }
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
          <GridItem xs={12} sm={6} md={4}>
          <Card>
            <button>
            <Link to ={"/addManager"}>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                <i class="material-icons">supervised_user_circle</i>
                </CardIcon>
                <p className={classes.cardCategory}></p>
                <h4 className={classes.cardTitle}>Add Manager</h4>
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

          <GridItem xs={12} sm={6} md={4}>
          <Card>
            <button>
            <Link to ={"/updateManager"}>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}></p>
                <h4 className={classes.cardTitle}>Update Manager</h4>
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
          <GridItem xs={12} sm={6} md={4}>
          <Card>
            <button>
            <Link to ={"/deleteManager"}>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                <i class="material-icons">delete</i>
                </CardIcon>
                <p className={classes.cardCategory}></p>
                <h4 className={classes.cardTitle}>Delete Manager</h4>
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
        {/* <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: [
                      "Field 1",
                      "Field 2",
                      "Field 3"
                    ],
                    series: [[this.state.field1,this.state.field2, this.state.field2]]
                  }}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Yesterday Field Summary</h4>
                <p className={classes.cardCategory}>
                  Crop Yeild
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
         
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  )
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Salary", "Country"]}
                  tableData={[
                    ["1", "Dakota Rice", "$36,738", "Niger"],
                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                    ["4", "Philip Chaney", "$38,735", "Korea, South"]
                  ]}
                />
              </CardBody>
            </Card>
        //   </GridItem> */}
        {/* // </GridContainer> */}
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
