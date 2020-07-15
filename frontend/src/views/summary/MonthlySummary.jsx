import React from "react";
import "./targets.css";
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
import carfix from "./SunrisePeekTeaEstate.jpg";
import { bugs, website, server } from "../../variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.jsx";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { thisExpression } from "@babel/types";

// import axios for http request handling
import axios from 'axios';




class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      //nameMP: 'React',

      //--------------------
      //curDate: new Date(),
      getYear:0,
      getMonth: 0,
      yearMonth: 0,

      div1target:[],
      div2target:[],
      div3target:[],
      

      //--------------------
      div1:0,
      div2:0,
      div3:0,
      // tableDiv1Data:[],
      // tableDiv2Data:[],
      // tableDiv3Data:[],
      // tableDiv1Year:[],
      // tableDiv2Year:[],
      // tableDiv3Year:[],
      // fieldn:[],
      // fArea:[],
      // div1count:0,
      // div2count:0,
      // div3count:0,

      // div1field1:0,
      // div1field2:0,
      // div1field3:0,
      // div2field1:0,
      // div2field2:0,
      // div2field3:0,
      // div3field1:0,
      // div3field2:0,
      // div3field3:0,

      // div1area1:0,
      // div1area2:0,
      // div1area3:0,
      // div2area1:0,
      // div2area2:0,
      // div2area3:0,
      // div3area1:0,
      // div3area2:0,
      // div3area3:0,

      counter: 0,
      today:'' ,
      yesterday:""
    };

    this.generateHeader = this.generateHeader.bind(this);
    //this.generateTableData = this.generateTableData.bind(this);
    //this.handleClick = this.handleClick.bind(this); 
  }


  componentWillMount = async() =>{
    
    var curdate = new Date();
    await this.setState({getMonth: curdate.getMonth()+1});
    await this.setState({getYear: curdate.getFullYear()});
    
    // console.log(this.state.getMonth);
    // console.log(this.state.getYear);
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

  //inputfield

  // setd1f1yield= (e)=> {
  //   this.setState({div1f1yield: e.target.value})
  // }
  // setd1f2yield= (e)=> {
  //   this.setState({div1f2yield: e.target.value})
  // }
  // setd1f3yield= (e)=> {
  //   this.setState({div1f3yield: e.target.value})
  // }

  // setd2f1yield= (e)=> {
  //   this.setState({div2f1yield: e.target.value})
  // }
  // setd2f2yield= (e)=> {
  //   this.setState({div2f2yield: e.target.value})
  // }
  // setd2f3yield= (e)=> {
  //   this.setState({div2f3yield: e.target.value})
  // }

  // setd3f1yield= (e)=> {
  //   this.setState({div3f1yield: e.target.value})
  // }
  // setd3f2yield= (e)=> {
  //   this.setState({div3f2yield: e.target.value})
  // }
  // setd3f3yield= (e)=> {
  //   this.setState({div3f3yield: e.target.value})
  // }

  //-------------------------------------------------
  generateHeader(){
    let res=[];
  // for(var i =0; i < columnHeader.length; i++){
       res.push(<th key={"Field"}>{"Field"}</th>);
       res.push(<th key={"Expected_Yield"}>{"Expected Yield"}</th>);
       res.push(<th key={"Yield"}>{"Yield"}</th>);
       res.push(<th key={"Achieved_status"}>{"Achieved status"}</th>);
      //  res.push(<th key={"Comparison"}>{"Comparison"}</th>);
  // }
  return res;
  }

  generateTableData(){
    let res=[];
    let tableData = this.state.div1target;
    if(tableData!=null){
    for(var i =0; i < tableData.length; i++){
        res.push(
         <tr >
        <td key={tableData[i].field}>{tableData[i].field}</td>
        <td key={tableData[i].target}>{tableData[i].target}</td>
        <td key= {tableData[i].total}>{tableData[i].total}</td>
        <td key={tableData[i].status}>{tableData[i].status}</td>
        {/* <td key={tableData[i].gender}>{tableData[i].gender}</td> */}
        </tr>
        )
    }
    }
    return res;
  }

  generateTable2Data(){
    let res=[];
    let tableData = this.state.div2target;
    if(tableData!=null){
    for(var i =0; i < tableData.length; i++){
        res.push(
         <tr >
        <td key={tableData[i].field}>{tableData[i].field}</td>
        <td key={tableData[i].target}>{tableData[i].target}</td>
        <td key= {tableData[i].total}>{tableData[i].total}</td>
        <td key={tableData[i].status}>{tableData[i].status}</td>
        {/* <td key={tableData[i].gender}>{tableData[i].gender}</td> */}
        </tr>
        )
    }
    }
    return res;
  }

  generateTable3Data(){
    let res=[];
    let tableData = this.state.div3target;
    if(tableData!=null){
    for(var i =0; i < tableData.length; i++){
        res.push(
         <tr >
        <td key={tableData[i].field}>{tableData[i].field}</td>
        <td key={tableData[i].target}>{tableData[i].target}</td>
        <td key= {tableData[i].total}>{tableData[i].total}</td>
        <td key={tableData[i].status}>{tableData[i].status}</td>
        {/* <td key={tableData[i].gender}>{tableData[i].gender}</td> */}
        </tr>
        )
    }
    }
    return res;
  }





  setFieldData = async() => {

    
    console.log(this.state.getMonth);
    console.log(this.state.getYear);
   
    var monthofYear = (parseInt(this.state.getYear*100)+parseInt(this.state.getMonth)+parseInt(1000000));
    //this.setState({this.state.yearMonth: (this.state.getYear*100)+this.state.getMonth+1000000});
    console.log(monthofYear);

    await axios.get('http://localhost:8000/api/getTarget/get-all/'+monthofYear).then(response => {
      this.setState({div1target: response.data});
    console.log(this.state.div1target);
    });

    var monthofYear2 = (parseInt(monthofYear)+parseInt(1000000));
    await axios.get('http://localhost:8000/api/getTarget/get-all/'+monthofYear2).then(response => {
      this.setState({div2target: response.data});
    console.log(this.state.div2target);
    });

    var monthofYear3 = (parseInt(monthofYear)+parseInt(2000000));
    await axios.get('http://localhost:8000/api/getTarget/get-all/'+monthofYear3).then(response => {
      this.setState({div3target: response.data});
    console.log(this.state.div3target);
    });
    
  }
  render() {
    const { classes } = this.props;

    //-- month picker -----------------------------------
    // 
    const mvalue2 = '1'
    //----------------------------------------------------
    return (
      <div
      //className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>
         <div >
      <div>
      
      </div>
      </div>
      <div>
      <h1 className="title">Yield Summary</h1>
      <h4 className="title2"></h4>
      </div>
      <div>
      {/* <label>Pick A Month</label>
                <div className="edit">
                    <Picker
                        ref="pickAMonth"
                        years={[2008, 2010, 2011, 2012, 2014, 2015, 2016, 2017]}
                        value={mvalue}
                        lang={pickerLang.months}
                        onChange={this.handleAMonthChange}
                        onDismiss={this.handleAMonthDissmis}
                        >
                       <MonthBox value={makeText(mvalue)} onClick={this.handleClickMonthBox} />
                    </Picker>
                </div> */}
        
        {/* <div>
        <Demo name={this.state.nameMP} />
        </div> */}

          <div className="row" >

             <div className="col-sm-3">
              </div>

              <div className="col-sm-4">
                
                  

                  <select className="form-control" placeholder = "Year " value = {this.state.getYear} onChange={(event) => {this.setState({ getYear: event.target.value }, function () {this.setFieldData();});}}>
                    <option value="None"> </option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                  </select>

                  
              
              </div>

                 <div className="col-sm-4">
                 
                 <select className="form-control" placeholder = "Month " value = {this.state.getMonth} onChange={(event) => {this.setState({ getMonth: event.target.value }, function () {this.setFieldData();})}}>
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


      <div className="griditem">
          {/* <GridContainer justify="center"> */}
              {/* <GridItem xs={8} sm={12} md={24}> */}
              
                <CustomTabs 
                  title="Divisions :"
                  
                  headerColor= "warning"
                  tabs={[
                    {
                      tabName: "Division 1",
                     
                      tabContent: (
                      
                        <div>
                          <table className="table  table-hover">
                          <thead>
                              <tr>
                              {this.generateHeader()}
                              </tr>
                          </thead>
                          <tbody>
                              {this.generateTableData()}
                          </tbody>
                          </table>
                        </div>
                       
                      )
                    },
                    {
                      tabName: "Division 2",
                      //tabIcon: Code,
                      tabContent: (
                        <div>
                          <table className="table  table-hover">
                          <thead>
                              <tr>
                              {this.generateHeader()}
                              </tr>
                          </thead>
                          <tbody>
                              {this.generateTable2Data()}
                          </tbody>
                          </table>
                        </div>
                        
                      )
                    },
                    {
                      tabName: "Division 3",
                      //tabIcon: Cloud,
                      tabContent: (
                        <div>
                          <table className="table  table-hover">
                          <thead>
                              <tr>
                              {this.generateHeader()}
                              </tr>
                          </thead>
                          <tbody>
                              {this.generateTable3Data()}
                          </tbody>
                          </table>
                        </div>
                         )
                    }
                  ]}
                />
              {/* </GridItem> */}
              
            {/* </GridContainer> */}
          </div>
        <GridContainer>

        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
