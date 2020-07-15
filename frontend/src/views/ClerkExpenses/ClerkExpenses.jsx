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
import "./Dash.css";
import Modal from 'react-bootstrap/Modal'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Button} from 'react-bootstrap'
import Dialog from 'react-bootstrap-dialog'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-notifications/lib/notifications.css';

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
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
    this.onClick = this.onClick.bind(this)
    this.state = {
      field1:0,
      field2:0,
      field3:0,
      isDialogOpen: false,
      show: false,
      setShow: false,
      newNotifications: [],
      pendingNotifications: [],
      acceptedNotifications: [],
    };
  }

  onClick () {
    this.dialog.show({
        title: 'Greetings',
        body: 'How are you?',
        actions: [
          Dialog.CancelAction(),
          Dialog.OKAction()
        ],
        bsSize: 'small',
        onHide: (dialog) => {
          dialog.hide()
          console.log('closed by clicking background.')
        }
      })
  }

  createNotification = (type) => {
    return () => {
      switch (type) {
        // case 'info':
        //   NotificationManager.info('Info message');
        //   break;
        // case 'success':
        //   NotificationManager.success('Success message', 'Title here');
        //   break;
        // case 'warning':
        //   NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        //   break;
        case 'error':
          NotificationManager.success('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
}
 
  componentWillMount = async() =>{
    this.setFieldData();
    this.fetchNotifications();
  };


  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  setFieldData = async() => {
    
    var ref = firebase.database().ref("Daily Work Data").child("02-10-2019").child("Field 1"); 
    var sum=0;

      
  
    var ref = firebase.database().ref("Daily Work Data").child("02-10-2019").child("Field 2"); 
    sum=0;

  
    
    this.setState({field2: sum}); 

    var ref = firebase.database().ref("Daily Work Data").child("02-10-2019").child("Field 3"); 
    sum=0;

    await ref.once('value',function (snapshot) {       
           
      snapshot.forEach(element => {
        sum = sum + element.val().amount;
      });  
    });  
    
    this.setState({field3: sum}); 
    

  };


  fetchNotifications = () => { 
      firebase.database().ref('Clerk_Notifications').on('value', (snapshot) => {
          var newNotifications = [];
          var pendingNotifications = [];
          var acceptedNotifications = [];

          snapshot.forEach((notification) => {
            var notificationObject = { [notification.key] : notification.val() }

            switch (notification.val()) {
                case 'new': newNotifications.push(notificationObject); break;
                case 'pending': pendingNotifications.push(notificationObject); break;
                case 'accepted': acceptedNotifications.push(notificationObject); break;
            }

            this.setState({ newNotifications, pendingNotifications, acceptedNotifications })
          })
      })
  }

  
  render() {
  const { classes } = this.props;
  const handleClose = () => this.setState({ show: false });
  const handleShow = () => this.setState({ show: true });
    return (
      <div
       className="App"
       style={{
       backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
       }}>
       <NotificationContainer/>

     <div className="wrappe">
     {/* <Button variant="primary" onClick={handleShow}>
        

      </Button> */}
     
    <div className="modal-background-color">
    <Dialog  ref={(component) => { this.dialog = component }} />
    </div>
     
      <div>

     
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
          <Card>
            <Button variant="underlined" >
            <Link to ={"/NewNotifictns"}>
              <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                      <i class="material-icons">notifications_active</i>
                  </CardIcon>
                      <p className={classes.cardCategory}></p>
                     <h4 className={classes.cardTitle}>New Notifications</h4>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <hr/>
                </div>
              </CardFooter>
              </Link>
            </Button>
          </Card>
          </GridItem>


          <GridItem xs={12} sm={6} md={4}>
          <Card>
            <Button variant="underlined">
              <Link to = {"/ViewNotifictns"}>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                   <i class="material-icons">pan_tool</i>
                </CardIcon>
                  <p className={classes.cardCategory}></p>
                  <h4 className={classes.cardTitle}>Pending Notifications</h4>
              </CardHeader>
              <CardFooter stats>
                 <div className={classes.stats}>
                    <hr/>
                 </div>
              </CardFooter>
              </Link>
             </Button>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={6} md={4}>
          <Card>
            <Button variant="underlined" 
           onClick={handleShow}>
             <Link to ={"/RespondedNotifictns"}>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                   <i class="material-icons">thumb_up</i>
                </CardIcon>
                   <p className={classes.cardCategory}></p>
                   <h4 className={classes.cardTitle}>Responded Notifications</h4>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <hr/>                 
                </div>
              </CardFooter>
              </Link>
             </Button>
          </Card>
          </GridItem>
         
        </GridContainer>
        <GridContainer>
      {/* <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>New Expenses</h4>
            <p className={classes.cardCategoryWhite}>
              
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="success"
              tableHead={["Expense", "DivNo", "Amount", "Generated by","Description", "Date"]}
              tableData={[
                ["Advance Pay(Weekly salary advance)", "div1", "3000", "Conductor","0778945612","2020-01-15"],
                ["Advance Pay(Weekly salary advance)", "div1", "5000","Conductor","0714578963","2020-01-05"],
                ["Loan Request(Loans for laborers)", "div2", "4500", "Conductor","0701254523","2020-01-09"],
                ["Electricity", "div2", "5000", "Manager","None","2019-12-31"],
                ["Fuel", "div3", "6000", "Manager","None","2020-01-02"],
                ["Phone Bill", "div2", "6000", "Manager","None","2020-01-01"]
              ]}/>            
          </CardBody>
        </Card>
      </GridItem> */}
      {/* <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park"
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten"
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem> */}
    </GridContainer>
        



      </div>

        <div>       
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
