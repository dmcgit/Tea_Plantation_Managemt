import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import {Link, withRouter} from 'react-router-dom';
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
import SnackbarContent from "../../components/Snackbar/SnackbarContent.jsx";
import Snackbar from "../../components/Snackbar/Snackbar.jsx";
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
//import firebase from "../../config/Fire";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.jsx";
import Calendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css' // Default Style
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { container, card } from "../../assets/jss/material-dashboard-react.jsx";
import axios from 'axios';
import carfix from "./s.jpg";
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
    const startDate = date.getTime();
    this.state = {
      startDate, // Today
      //endDate: new Date(startDate).setDate(date.getDate() + 5), // Today + 6 days
      chartVal:[0,0],
      tableDataDiv1:[],
      tableDataDiv2:[],
      tableDataDiv3:[],
      div1Status:"Complete",
      div2Status:"Complete",
      div3Status:"Complete",
      div1StatusColor:"success",
      div2StatusColor:"success",
      div3StatusColor:"success",
      div1StatusPath:"/manager/Manager7Day",
      div2StatusPath:"/manager/Manager7Day",
      div3StatusPath:"/manager/Manager7Day"
    }
    
  }
  componentWillMount = async() =>{
    //this.setNewEndDate();
    //this.setEndDate();
    
   // this.setChartVal();
    this.setTableValues();
  }

//   setEndDate = async() => {    
//     var ref = firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).child("end_Date"); 
//     var key="";
//     await ref.once('value',function (snapshot) {       
//       key = snapshot.val();
//       console.log(snapshot.val());      
       
//       }); 
//       var end=new Date(key).getTime();
         
//       this.setState({endDate:end}); 
//       //console.log(new Date("Tue Oct 31 2019 23:51:44 GMT+0530 (India Standard Time)").getTime());  
     
   
//     }
    
    
        setTableValues = async()=>{

          var incomplete=0;
          axios.get('http://localhost:8000/conductor7Day/get-all/div1').then(response=>{
            var data=[];
            var i=0;
            while(response.data[i]){
              data[i]=[response.data[i]['field'],response.data[i]['yeild'],response.data[i]['status']];
              if(response.data[i]['status']=='Incomplete'){
                //console.log('incomplete');
                this.setState({div1Status:'Incomplete'});
                this.setState({div1StatusColor:'danger'});
                this.setState({div1StatusPath:'/incomplete7Day'});

              }
              i+=1;
            }
            console.log("DATA"+data);
            this.setState({tableDataDiv1:data});
          }).catch(function(error){
            console.log(error);
          });
          axios.get('http://localhost:8000/conductor7Day/get-all/div2').then(response=>{
            var data=[];
            var i=0;
            while(response.data[i]){
              data[i]=[response.data[i]['field'],response.data[i]['yeild'],response.data[i]['status']];
              if(response.data[i]['status']=='Incomplete'){
                //console.log('incomplete');
                this.setState({div2Status:'Incomplete'});
                this.setState({div2StatusColor:'danger'});
                this.setState({div2StatusPath:'/incomplete7Day'});

              }
              i+=1;
            }
            console.log("DATA"+data);
            this.setState({tableDataDiv2:data});
          }).catch(function(error){
            console.log(error);
          });
          axios.get('http://localhost:8000/conductor7Day/get-all/div3').then(response=>{
            var data=[];
            var i=0;
            while(response.data[i]){
              data[i]=[response.data[i]['field'],response.data[i]['yeild'],response.data[i]['status']];
              if(response.data[i]['status']=='Incomplete'){
                //console.log('incomplete');
                this.setState({div3Status:'Incomplete'});
                this.setState({div3StatusColor:'danger'});
                this.setState({div3StatusPath:'/incomplete7Day'});

              }
              i+=1;
            }
            console.log("DATA"+data);
            this.setState({tableDataDiv3:data});
          }).catch(function(error){
            console.log(error);
          });
        //console.log(new Date("Tue Oct 31 2019 23:51:44 GMT+0530 (India Standard Time)").getTime());  
       
     
        }  
//   onChange = (startDate, endDate) => this.setState({ startDate, endDate })

  render() {
    
    return (

      <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>
        
      <div>
      {/* <GridContainer justify="center">

          <GridItem xs={12} sm={12} md={6}>
            <Card>
            <Calendar startDate={startDate} endDate={this.state.endDate} onChange={this.onChange} />
            
            </Card>
          </GridItem>
        </GridContainer> */}
          
        
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
                  tableHead={[ "Field#", "Yeild(kg)","Status"]}
                  tableData={this.state.tableDataDiv1}
                />
                  )
                },
                {
                    tabName: 'Division 2',
                    tabIcon: BugReport,
                    tabContent: (
                      <Table
                    tableHeaderColor="primary"
                    tableHead={[ "Field#", "Yeild(kg)","Status"]}
                    tableData={this.state.tableDataDiv2}
                  />
                    )
                  },
                  {
                    tabName: 'Division 3',
                    tabIcon: BugReport,
                    tabContent: (
                      <Table
                    tableHeaderColor="primary"
                    tableHead={[ "Field#", "Yeild(kg)","Status"]}
                    tableData={this.state.tableDataDiv3}
                  />
                    )
                  }
              ]}
            />
          </GridItem>
          
        </GridContainer>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
              <h5>Last Pruning Cycle</h5>
              <br />
              <Link to ={this.state.div1StatusPath}>
              <SnackbarContent
                message={
                  
                  'Division 1- '+this.state.div1Status
                }
                
                color={this.state.div1StatusColor}
              />
              </Link>
              <Link to ={this.state.div2StatusPath}>
              <SnackbarContent
                message={
                  'Division 2- '+this.state.div2Status
                }
               
                color={this.state.div2StatusColor}
              />
               </Link>
              <Link to ={this.state.div3StatusPath}>
              <SnackbarContent
                message={
                  'Division 3- '+this.state.div3Status
                }
                
                color={this.state.div3StatusColor}
              />
               </Link>
             
            </GridItem>
            </GridContainer>
                  
      </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
