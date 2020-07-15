import React from "react";
import "./Dash.css";
import "./App.css";
//import firebase from "../../config/Fire";
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
import WorkAssign from "../../pages/work_assignmt.js";
import WorkDone from "../../pages/work_done.js";
import carfix from "./s.jpg";
import { bugs, website, server } from "../../variables/general.jsx";
import axios from 'axios';
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.jsx";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldSumData:[],
      nextFertilizer:'2020-01-13',
      lastFertilizer:'2020-01-13' ,
      cat1Acres:'0',
      cat2Acres:'0',
      cat3Acres:'0',
      amount:0,
      
    };
    //this.handleClick = this.handleClick.bind(this);
  }


  componentWillMount = async() =>{
  
   this.setLastFertilizer();
   this.loadFieldData();
    //this.todayDate();
   // this.addDataTo7Day();
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleBack = () => {
    window.location.replace("/manager/ExpensesHandling");
  
  }
  handleSubmit=()=>{
      console.log("INSERT");
    axios({
        method: 'post',
        url: 'http://localhost:8000/api/expenses/enterFertilizer',
        data: {
          amount:this.state.amount,
          divNo:"div1"
           }
      }).then(function (response) {
        console.log(response)
        alert(response.data);
      }).catch(function (error) {
        console.log(error)
        alert("Expense Data insertion failed" + "\n"+ error);
      });
  }

  setLastFertilizer = async() => {
    // var uid=localStorage.getItem('currentUserDivision');
    //console.log("uid");


    axios.get('http://localhost:8000/api/expenses/getLastFertilizer/div1').then(response=>{
        var lastFertilizerDate=new Date(response.data['date'])
        this.setState({lastFertilizer:lastFertilizerDate.getFullYear()+'-'+(lastFertilizerDate.getMonth()+1)%12+'-'+lastFertilizerDate.getDate()});
        if(lastFertilizerDate.getMonth()>8){
            this.setState({nextFertilizer:lastFertilizerDate.getFullYear()+1+'-'+(lastFertilizerDate.getMonth()+3)%11+'-'+'1'})
        }
        else{
            this.setState({nextFertilizer:lastFertilizerDate.getFullYear()+'-'+(lastFertilizerDate.getMonth()+3)%11+'-'+'1'})   
        }
      console.log("1212121");
      console.log("last fertilizer",response.data['date']);
      
    }).catch(function(error){
       
      console.log(error);
    });
    // axios.get('http://localhost:8000/dailySummary/get-allSum').then(response=>{
    //   this.setState({div2:response.data[1]['yeild']});
    //   console.log(response.data[0]['yeild']);
      
    // }).catch(function(error){
    //   console.log(error);
    // });

    // axios.get('http://localhost:8000/dailySummary/get-allSum').then(response=>{
    //   this.setState({div3:response.data[2]['yeild']});
    //   console.log(response.data[0]['yeild']);
      
    // }).catch(function(error){
    //   console.log(error);
    // });


    // axios.get('http://localhost:8000/dailySummary/get-all/div1').then(response=>{
    //   console.log(response.data[0]['yeild']);
       
    //  }).catch(function(error){
    //    console.log(error);
    //  });

    // axios.get('http://localhost:8000/dailySummary/get-all/div1').then(response=>{
    //   var data=[];
    //   console.log(response.data);
    //   var i=0;
    //   while(response.data[i]){
    //     data[i]=[response.data[i]['field'],response.data[i]['yeild'],response.data[i]['count']]
    //     i+=1;
    //     console.log("DATA"+data[i]);
    //   }
    //   console.log("DATA"+data);
    //   this.setState({tableDiv1Data:data});
    // }).catch(function(error){
    //   console.log(error);
    // });

    // axios.get('http://localhost:8000/conductor7Day/get-all/Div2').then(response=>{
    //   var data=[];
    //   var i=0;
    //   while(response.data[i]){
    //     data[i]=[response.data[i]['field'],response.data[i]['yeild'],response.data[i]['count']]
    //     i+=1;
    //   }
    //   console.log("DATA"+data);
    //   this.setState({tableDiv2Data:data});
    // }).catch(function(error){
    //   console.log(error);
    // });

    // axios.get('http://localhost:8000/conductor7Day/get-all/Div3').then(response=>{
    //   var data=[];
    //   var i=0;
    //   while(response.data[i]){
    //     data[i]=[response.data[i]['field'],response.data[i]['yeild'],response.data[i]['count']]
    //     i+=1;
    //   }
    //   console.log("DATA"+data);
    //   this.setState({tableDiv3Data:data});
    // }).catch(function(error){
    //   console.log(error);
    // });


  }
  loadFieldData = async() => {
    // var uid=localStorage.getItem('currentUserDivision');
    //console.log("uid");


    axios.get('http://localhost:8000/api/expenses/getFieldData/div1/2').then(response=>{
        //console.log(response.data['acres']);
        if(!response.data['acres']){
            this.setState({cat1Acres:'-'});
        }
        else{
        this.setState({cat1Acres:response.data['acres']});
        }
      
    }).catch(function(error){
       
      console.log(error);
    });
    axios.get('http://localhost:8000/api/expenses/getFieldData/div1/5').then(response=>{
        
        if(!response.data['acres']){
            this.setState({cat2Acres:'-'});
        }
        else{
        this.setState({cat2Acres:response.data['acres']});
        }
    }).catch(function(error){
       
      console.log(error);
    });
    axios.get('http://localhost:8000/api/expenses/getFieldData/div1/0').then(response=>{
        if(!response.data['acres']){
            this.setState({cat2Acres:'-'});
        }
       else{
        this.setState({cat3Acres:response.data['acres']});
       }
      
    }).catch(function(error){
       
      console.log(error);
    });
   // console.log(this.state.cat1Acres,this.state.cat2Acres,this.state.cat3Acres);
}
  render() {
    const { amount, error } = this.state;
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
      <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Field Data Summary</h4>
              <p className={classes.cardCategoryWhite}>
                Last Fertilizer Cycle: {this.state.lastFertilizer}
              </p>
              <p className={classes.cardCategoryWhite}>
                
                Next Cycle:{this.state.nextFertilizer}
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="succcess"
                tableHead={["Age", "Acres"]}
                tableData={[
                  ["Less than 2 years",this.state.cat1Acres],
                  ["2-5 years", this.state.cat2Acres],
                  ["5+ years", this.state.cat3Acres]
                  
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      
      <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Fertilizer Calculations</h4>
              
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="succcess"
                tableHead={["Age", "Fertilizer Type", "Quantity per Acre", "Interval","Price(Rs)"]}
                tableData={[
                  ["Upto 2 years", "T200", "3 X 50Kg", "2 Months","2,450.00"],
                  ["2-5 years", "T750", "3 X 50Kg", "3 Months","2,500.00"],
                  ["5+ years", "U832", "3 X 50Kg", "3-4 Months","3,000.00"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
        
      </div>
      
      </div>
      <div className="wrapper" >
  <h2 className="heading">Fertilizer Expense</h2>

      <form onSubmit={this.onSubmit} >
      <div classname="input">
          
          <input className="input"
          name="amount"
          value={amount}
          onChange={this.onChange}
          type="text"
          placeholder="Expected Fertilizer expense"
        />
        </div>
       
        <button type="submit" onClick={this.handleSubmit}>
         Make Request
        </button>
        {error && <p>{error.message}</p>}

        

      </form>
      <button type="submit" className="back" onClick={this.handleBack}>Back</button>
      
      {/* <div className="field">
        <label className="label">Email</label>
        <div className="field">
          <div className="control">
            <input value="Enter Email"
              name="labourer_id"
              className="input"
              type="text"
              onChange={(event) => this.setState({ labourer_id: event.target.value })}
              placeholder="Labourer ID" required/>
              {errors.labourer_id.length > 0 && 
                <span className='error'>{errors.labourer_id}</span>}
          </div>
        </div>
      </div> */}
      

    

      
      {/* <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.work_assignmt}
              name="work_assignmt"
              className="input"
              type="text"
              onChange={(event) => this.setState({ work_assignmt: event.target.value })}
              placeholder="Work Assignmt" required/>
              {errors.work_assignmt.length > 0 && 
                <span className='error'>{errors.work_assignmt}</span>}
          </div>
        </div>
      </div> */}

      {/* <div classname="input">
        <select className="input" value = {this.state.work_assignmnt} onChange={(event) => this.setState({ work_assignmt: event.target.value })}>
          <option value="None"> </option>
          <option value="Plucking">Plucking</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Drainage">Drainage</option>
        </select>
      
      </div>

      <DatePicker className="date" 
        selected={this.state.date}
        onChange={(date) => this.setState({ date })}
      /> */}

      {/*this.state.Ready ?
  /*    <div className="field">
        <label className="label" ></label>
        <div className="field">
          <div className="control">
            <input value={this.state.amount}
              name="amount"
              className="input"
              type="number"
              onChange={(event) => this.setState({ amount: event.target.value })}
              placeholder="amount (kg)" required/>
              {errors.amount.length > 0 && 
                <span className='error'>{errors.amount}</span>}
          </div>
        </div>
      </div>
              : null*/}
      
  
      {/* <div className='submit'>
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
  

      
      </form> */}
      
      </div>
      </div>
      
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
