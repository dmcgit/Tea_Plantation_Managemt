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
      endDate: new Date(startDate).setDate(date.getDate() + 5), // Today + 6 days
      chartVal:[0,0],
      tableData:[],
      prev:'',
      prevPrev:''
    }
    
  }
  componentWillMount = async() =>{
    
    axios.get('http://localhost:8000/conductor7Day/get/'+localStorage.getItem('currentUserDivision')).then(response=>{
      const date = new Date(response.data['date']);
      var enddate=new Date(response.data['date']).setDate(date.getDate() + 6);
      this.setState({endDate:enddate});
      // this.getDate();
     console.log(response.data);
     this.setNewEndDate();
    }).catch(function(error){
      console.log(error);
    });

    axios.get('http://localhost:8000/conductor7Day/get/'+localStorage.getItem('currentUserDivision')).then(response=>{
      
      var enddate=new Date(response.data['date']).getFullYear()+'-'+new Date(response.data['date']).getMonth()+1+'-'+new Date(response.data['date']).getDate();
      this.setState({prev:enddate});
      // this.getDate();
     
    }).catch(function(error){
      console.log(error);
    });
    axios.get('http://localhost:8000/conductor7Day/getStatus1/'+localStorage.getItem('currentUserDivision')).then(response=>{
      var enddate=new Date(response.data['date']).getFullYear()+'-'+new Date(response.data['date']).getMonth()+1+'-'+new Date(response.data['date']).getDate();
      this.setState({prevPrev:enddate});
      // this.getDate();
     
    }).catch(function(error){
      console.log(error);
    });
    
   
    //this.setEndDate();
    
   // this.setChartVal();
    this.setTableValues();
  }




  getDate = () => {
    let dd = new Date(new Date().setDate(new Date().getDate()+7)).getDate();
    let mm = new Date(new Date().setDate(new Date().getDate()+7)).getMonth() + 1;
    let yyyy = new Date(new Date().setDate(new Date().getDate()+7)).getFullYear();
    let hours=new Date(new Date().setDate(new Date().getDate()+7)).getHours();
    let minutes= new Date(new Date().setDate(new Date().getDate()+7)).getMinutes();
    let seconds=new Date(new Date().setDate(new Date().getDate()+7)).getSeconds();


    if(dd < 10) {
      dd = '0' + dd;
    }

    if(mm < 10) {
      mm = '0' + mm;
    }

    let dateString = yyyy + '-' + mm + '-' + dd+' '+hours+':'+minutes+':'+seconds;
    console.log("DA"+dateString);
    return dateString;
  }





    setNewEndDate = async() => {    
     
        let date=this.state.endDate;
        console.log("endDate"+new Date(date));

        var currentEndDate=new Date(date).getDate();
        var currentEndMonth=new Date(date).getMonth();
        var currentEndYear=new Date(date).getFullYear();
        // let hours=new Date(date).getHours();
        // let minutes= new Date(date).getMinutes();
        // let seconds=new Date(date).getSeconds();
        var thisYear=new Date().getFullYear();
        var thisMonth=new Date().getMonth();
        var Today=new Date().getDate();
        console.log("currentEndDate"+currentEndDate);
        console.log("Today"+Today);
        console.log("currentEndMonth"+currentEndMonth);
        console.log("thisMonth"+thisMonth);
        console.log("currentEndYear"+currentEndYear);
        console.log("thisYear"+thisYear);
        // if(currentEndDate < 10) {
        //   currentEndDate = '0' + currentEndDate;
        // }
    
        // if(currentEndMonth < 10) {
        //   currentEndMonth = '0' + currentEndMonth;
        // }
    
        let curEnd = currentEndYear + '-' + currentEndMonth + '-' + currentEndDate+' 00:00:00';
          
        var newEnd= this.getDate();//today+6 days
        
        if(thisYear>currentEndYear){
          axios({
            method: 'post',
            url: 'http://localhost:8000/conductor7Day/insert',
            data: {
              divNo: 'div1'
            }
          }).then(function (response) {
            console.log(response)
            alert(response.data);
          }).catch(function (error) {
            console.log(error)
            alert("End Date insertion failed" + "\n"+ error);
          });
        }
        else if(thisMonth>currentEndMonth){ //have to fix
          axios({
            method: 'post',
            url: 'http://localhost:8000/conductor7Day/insert',
            data: {
              divNo: 'div1'
            }
          }).then(function (response) {
            console.log(response)
            alert(response.data);
          }).catch(function (error) {
            console.log(error)
            alert("End Date insertion failed" + "\n"+ error);
          });
        
        }
        else if(Today>currentEndDate && thisMonth==currentEndMonth){

          axios({
            method: 'post',
            url: 'http://localhost:8000/conductor7Day/insert',
            data: {
              divNo: 'div1'
            }
          }).then(function (response) {
            console.log(response)
            alert(response.data);
          }).catch(function (error) {
            console.log(error)
            alert("End Date insertion failed" + "\n"+ error);
          });
        
        }
        else{
          //firebase.database().ref("7Day").child(currentEnd).child(currentDate).update({created:true});
        }
        
        } 
      

    //     setChartVal = async() =>{
    //       var ref = firebase.database().ref("7Day").child("pendingModule"); 
    //       await ref.on('value',function (snapshot) {       
    //         let data = snapshot.val();
    //         console.log(data);
    //         var ref2=firebase.database().ref("7Day").child(data);
            
    //         var sum=[];
    //         var i=0;
    //       ref2.once('value',function (snapshot2) {                
    //         snapshot2.forEach(element => {
    //           if(i<2){
    //           console.log(element.val().field1);
    //           sum[i]= element.val().field1;   
    //           i+=1;  
    //           }         
    //       });  
    //       console.log(sum);
          
    //        });         

    // //var ref = firebase.database().ref("Dwork").child("2019-09-20").child("Field2"); 
    // //sum=0;
    //       }); 
    //     }
        setTableValues = async()=>{
          
          axios.get('http://localhost:8000/conductor7Day/get-all/'+localStorage.getItem('currentUserDivision')).then(response=>{
            var data=[];
            var i=0;
            while(response.data[i]){
              data[i]=[response.data[i]['field'],response.data[i]['yeild'],response.data[i]['status']]
              i+=1;
            }
            console.log("DATA"+data);
            this.setState({tableData:data});
          }).catch(function(error){
            console.log(error);
          });
          // console.log(localStorage.getItem('currentEnd'));
          // var ref=firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).child("23-11-2019");
          // await ref.once('value',function (snapshot) {                
          //   var i=0;
          //   snapshot.forEach(field=>{
          //     if(field.key!="status"){
          //      data[i]=[field.key,field.val().date,field.val().yeild,field.val().status];
          //      i=i+1;
          //     }
          //    })
      
          //  });
          //  console.log("DATA"+data);
          // this.setState({tableData:data});   
        }

        //console.log(new Date("Tue Oct 31 2019 23:51:44 GMT+0530 (India Standard Time)").getTime());  
       
     
      
  onChange = (startDate, endDate) => this.setState({ startDate, endDate })

  render() {
    const { startDate,endDate } = this.state;
    console.log(this.state.endDate);
    return (

      <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>
        
     
    
      <GridContainer justify="center">

          <GridItem xs={12} sm={12} md={12}>
            <Card>
            <Calendar startDate={startDate} endDate={this.state.endDate} onChange={this.onChange} />
            
            </Card>
          </GridItem>
        </GridContainer>
          
        <div className="wrappe">
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title="Division Summary:"
              headerColor="primary"
              tabs={[
                {
                  tabName: localStorage.getItem('currentUserDivision'),
                  tabIcon: BugReport,
                  tabContent: (
                    <Table
                  tableHeaderColor="primary"
                  tableHead={[ "Field#", "Yeild(kg)","Status"]}
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
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
