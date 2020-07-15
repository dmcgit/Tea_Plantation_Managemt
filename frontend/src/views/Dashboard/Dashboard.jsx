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
      div1:10,
      div2:0,
      div3:0,
      tableDiv1Data:[],
      tableDiv2Data:[],
      tableDiv3Data:[],
      counter: 0,
      today:'' ,
      yesterday:""
    };
    //this.handleClick = this.handleClick.bind(this);
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
    
    
    var ref = firebase.database().ref("Daily Work Data").child("19-20-2019").child("div1"); 
    var sum=0;
    var fieldSum=0;
    var count=0;
    var i=0;
    var data=[];
    await ref.once('value',function (snapshot) {                
     // let feildData=snapshot.val();
      snapshot.forEach(field=>{
        field.forEach(laborer=>{
          if(laborer.val().category=="plucking"){
          count=count+1;
          fieldSum = fieldSum +laborer.val().amount;
          }
        })
        
        data[i]=[field.key,fieldSum,count];
        sum=sum+fieldSum;
        fieldSum=0;
       // console.log(count);
        count=0;
        i=i+1;
      })
    });    
    //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field1:sum});  
    this.setState({div1: sum});  
    this.setState({tableDiv1Data:data});
    var ref = firebase.database().ref("Daily Work Data").child("19-20-2019").child("div2"); 
    sum=0;
    data=[];
    i=0;
    await ref.once('value',function (snapshot) {                
      // let feildData=snapshot.val();
       snapshot.forEach(field=>{
         field.forEach(laborer=>{
          if(laborer.val().category=="plucking"){
           count=count+1;
          fieldSum = fieldSum +laborer.val().amount;
          }
         })
         data[i]=[field.key,fieldSum,count];
         sum=sum+fieldSum;
        fieldSum=0;
        //console.log(count);
        count=0;
        i=i+1;
       })

     });   
    //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field2:sum});  
    this.setState({div2: sum}); 
    //console.log(data);
    this.setState({tableDiv2Data:data});
    var ref = firebase.database().ref("Daily Work Data").child("19-20-2019").child("div3"); 
    sum=0;
    data=[];
    i=0;
    await ref.once('value',function (snapshot) {                
      // let feildData=snapshot.val();
       snapshot.forEach(field=>{
         field.forEach(laborer=>{
          if(laborer.val().category=="plucking"){
           count=count+1;
          fieldSum = fieldSum +laborer.val().amount;
          }
         })
         data[i]=[field.key,fieldSum,count];
         sum=sum+fieldSum;
        fieldSum=0;
        //console.log(count);
        count=0;
        i=i+1;
       })

     });   
    //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field2:sum});  
    this.setState({div3: sum}); 
    //console.log(data);
    this.setState({tableDiv3Data:data});


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
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                <i class="material-icons">assignment_ind</i>
                </CardIcon>
                <p className={classes.cardCategory}>Work Assignmt</p>
                <h3 className={classes.cardTitle}></h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                <LocalOffer />
                <Link to ={"/work_assignmt"}>
                  Details
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Work Done</p>
                <h3 className={classes.cardTitle}></h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                <LocalOffer />
                <Link to ={"/work_done"}>
                  Details
                </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                <i class="material-icons">&#xe3dd;</i>
                </CardIcon>
                <p className={classes.cardCategory}>Weather</p>
                <h3 className={classes.cardTitle}></h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  <Link to ="/weather">
                  Details
                </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
         
        </GridContainer>
        <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: [
                      "Division 1",
                      "Division 2",
                      "Division 3"
                    ],
                    series: [[this.state.div1,this.state.div2, this.state.div3]]
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
            </Card>
          </GridItem>
         
        </GridContainer>
       
        
      </div>
      </div>
      <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title="Division Summary:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Division 1",
                  tabIcon: BugReport,
                  tabContent: (
                    <Table
                  tableHeaderColor="primary"
                  tableHead={[ "Field#", "Yeild(kg)","# of Laborers at work"]}
                  tableData={this.state.tableDiv1Data}
                />
                  )
                },
                {
                  tabName: "Division 2",
                  tabIcon: Code,
                  tabContent: (
                    <Table
                  tableHeaderColor="primary"
                  tableHead={["Field#", "Yeild(kg)","# of Laborers at work"]}
                  tableData={this.state.tableDiv2Data}
                />
                  )
                },
                {
                  tabName: "Division 3",
                  tabIcon: Cloud,
                  tabContent: (
                    <Table
                  tableHeaderColor="primary"
                  tableHead={[ "Field#", "Yeild(kg)","# of Laborers at work"]}
                  tableData={this.state.tableDiv3Data}
                />
                  )
                }
              ]}
            />
          </GridItem>
          
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
