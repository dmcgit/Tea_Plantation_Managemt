import React from "react";
import "./Targets.css";
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
      //get date
      date: new Date(),

      //-------
      div1:0,
      div2:0,
      div3:0,
      tableDiv1Data:[],
      tableDiv2Data:[],
      tableDiv3Data:[],
      tableDiv1Year:[],
      tableDiv2Year:[],
      tableDiv3Year:[],
      // fieldn:[],
      // fArea:[],
      div1count:0,
      div2count:0,
      div3count:0,

      div1field1:0,
      div1field2:0,
      div1field3:0,
      div2field1:0,
      div2field2:0,
      div2field3:0,
      div3field1:0,
      div3field2:0,
      div3field3:0,

      div1area1:0,
      div1area2:0,
      div1area3:0,
      div2area1:0,
      div2area2:0,
      div2area3:0,
      div1area1:0,
      div2area2:0,
      div3area3:0,

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

  //inputfield

  setd1f1yield= (e)=> {
    this.setState({div1f1yield: e.target.value})
  }
  setd1f2yield= (e)=> {
    this.setState({div1f2yield: e.target.value})
  }
  setd1f3yield= (e)=> {
    this.setState({div1f3yield: e.target.value})
  }

  setd2f1yield= (e)=> {
    this.setState({div2f1yield: e.target.value})
  }
  setd2f2yield= (e)=> {
    this.setState({div2f2yield: e.target.value})
  }
  setd2f3yield= (e)=> {
    this.setState({div2f3yield: e.target.value})
  }

  setd3f1yield= (e)=> {
    this.setState({div3f1yield: e.target.value})
  }
  setd3f2yield= (e)=> {
    this.setState({div3f2yield: e.target.value})
  }
  setd3f3yield= (e)=> {
    this.setState({div3f3yield: e.target.value})
  }

  getDateString = async () => {
    let date = this.state.date;
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    if(dd < 10) {
      dd = '0' + dd;
    }

    if(mm < 10) {
      mm = '0' + mm;
    }

    let dateString = yyyy + '-' + mm + '-' + dd;

    return dateString;
  }

  getMonthString = async () => {
    let date = this.state.date;
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    if(mm < 10) {
      mm = '0' + mm;
    }

    let dateString = yyyy + '-' + mm;

    return dateString;
  }

  handleSubmit1 = () => {
    const { div1f1yield,div1f2yield,div1f3yield } = this.state;

    // -----------------------------------------------------------
    // post request sample. URL should be according to the backend routes.
    // data should be the required request body data
    var dString = this.getDateString;
    var mString = this.getMonthString;

    axios({
      method: 'post',
      url: 'http://localhost:8000/api/setTarget/insert',
      data: {
        division: 'div1',
        fieldTarget1: div1f1yield,
        fieldTarget2: div1f2yield,
        fieldTarget3: div1f3yield,
        field1: 1,
        field2: 2,
        field3: 3,
        date: dString,
        month: mString
      }
    }).then(function (response) {
      console.log(response)
      alert(response.data);
    }).catch(function (error) {
      console.log(error)
      alert("Target setting faild" + "\n"+ error);
    });
    // console.log(dString);
    // console.log(mString);
    
    // -----------------------------------------------------------

    // firebase.database().ref("target").child("division_1").update({
    //   "field_1/target": div1f1yield,
    //   "field_2/target": div1f2yield,
    //   "field_3/target": div1f3yield
    // })
    // alert("Target successfully set");
    
  }

  handleSubmit2 = () => {
    const { div2f1yield,div2f2yield,div2f3yield } = this.state;
    const dString = this.getDateString;
    const mString = this.getMonthString;
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/setTarget/insert',
      data: {
        division: 'div2',
        fieldTarget1: div2f1yield,
        fieldTarget2: div2f2yield,
        fieldTarget3: div2f3yield,
        field1: 4,
        field2: 5,
        field3: 6,
        date: dString,
        month: mString
      }
    }).then(function (response) {
      console.log(response)
      alert(response.data);
    }).catch(function (error) {
      console.log(error)
      alert("Target setting failed" + "\n"+ error);
    });

    // firebase.database().ref("target").child("division_2").update({
    //   "field_1/target": div2f1yield,
    //   "field_2/target": div2f2yield,
    //   "field_3/target": div2f3yield
    // })
    // alert("Target successfully set");
  }

  handleSubmit3 = () => {
    const { div3f1yield,div3f2yield,div3f3yield } = this.state;
    const dString = this.getDateString;
    const mString = this.getMonthString;
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/setTarget/insert',
      data: {
        division: 'div3',
        fieldTarget1: div3f1yield,
        fieldTarget2: div3f2yield,
        fieldTarget3: div3f3yield,
        field1: 7,
        field2: 8,
        field3: 9,
        date: dString,
        month: mString
      }
    }).then(function (response) {
      console.log(response)
      alert(response.data);
    }).catch(function (error) {
      console.log(error)
      alert("Target setting failed" + "\n"+ error);
    });

    // firebase.database().ref("target").child("division_3").update({
    //   "field_1/target": div3f1yield,
    //   "field_2/target": div3f2yield,
    //   "field_3/target": div3f3yield
    // })
    // alert("Target successfully set");
  }

  setFieldData = async() => {
    

    await axios.get('http://localhost:8000/api/setTarget/get-all/div1').then(response => {
      var i=0;
      let a = this.state.tableDiv1Data.slice()
    
      while(response.data[i]){
          a[response.data[i]['field']]=response.data[i]['area'];
          i+=1;
      }
      this.setState({tableDiv1Data: a});
      //console.log("AAAA",this.state.tableDiv1Data);
      i=0;
      let y1 = this.state.tableDiv1Year.slice()
      while(response.data[i]){
        y1[response.data[i]['field']]=response.data[i]['plantYear'];
        i+=1;
      }
      this.setState({tableDiv1Year: y1});

    console.log(response.data);
    // console.log(a);
    console.log(this.state.tableDiv1Data);
    //console.log(this.state.tableDiv1Year);
    });
    
    //  var ref1 = firebase.database().ref("target").child("division_1").child("fields");
    
    // // var i=0;
    // // var data=[];
    // // var fieldn=[];
    // // var fArea=[];
    // await ref1.once('value',function (snapshot) {                
     
    //   // snapshot.forEach(field=>{
      
        
         
    //   //    //fieldn[i]=[field.key];
    //   //    //fArea[i]=[field.child("area").val()];
      
    //   //     //i=i+1;

      
    //   // })
    // });    
   
    this.setState({div1field1:"Field 1"});
    this.setState({div1field2:"Field 2"});
    this.setState({div1field3:"Field 3"});

    // console.log(this.state.tableDiv1Data[1]);
    // console.log(this.state.tableDiv1Data[2]);
    // console.log(this.state.tableDiv1Data[3]);

    this.setState({div1area1:this.state.tableDiv1Data[1]});
    this.setState({div1area2:this.state.tableDiv1Data[2]});
    this.setState({div1area3:this.state.tableDiv1Data[3]});


    
     //var ref1 = firebase.database().ref("target").child("division_2").child("fields");
    
    // data=[];
    // i=0;
     //await ref1.once('value',function (snapshot) {                
      
    //    snapshot.forEach(field=>{
        
    //     fieldn[i]=[field.key];
    //      fArea[i]=[field.child("area").val()];
    //     i=i+1;
    //    })

      //});   
   
    
    await axios.get('http://localhost:8000/api/setTarget/get-all/div2').then(response => {
      var i=0;
      let b = this.state.tableDiv2Data.slice()
      while(response.data[i]){
          b[response.data[i]['field']]=response.data[i]['area'];
          i+=1;
      }
      this.setState({tableDiv2Data: b});

      i=0;
      let y2 = this.state.tableDiv2Year.slice()
      while(response.data[i]){
        y2[response.data[i]['field']]=response.data[i]['plantYear'];
        i+=1;
      }
      this.setState({tableDiv2Year: y2});

    // console.log(response.data);
    // console.log(b);
    console.log(this.state.tableDiv2Data);
    });

    this.setState({div2field1:"Field 3"});
    this.setState({div2field2:"Field 4"});
    this.setState({div2field3:"Field 5"});

    this.setState({div2area1:this.state.tableDiv2Data[4]});
    this.setState({div2area2:this.state.tableDiv2Data[5]});
    this.setState({div2area3:this.state.tableDiv2Data[6]});

   
    // var ref = firebase.database().ref("target").child("division_3").child("fields"); 
    
    // data=[];
    // i=0;
    // await ref.once('value',function (snapshot) {                
      
    //    snapshot.forEach(field=>{
        
    //     fieldn[i]=[field.key];
    //      fArea[i]=[field.child("area").val()];
    //     i=i+1;
    //    })

    //  });   
   

    await axios.get('http://localhost:8000/api/setTarget/get-all/div3').then(response => {
      var i=0;
      let c = this.state.tableDiv3Data.slice()
      while(response.data[i]){
          c[response.data[i]['field']]=response.data[i]['area'];
          i+=1;
      }
      this.setState({tableDiv3Data: c});

      i=0;
      let y3 = this.state.tableDiv1Year.slice()
      while(response.data[i]){
        y3[response.data[i]['field']]=response.data[i]['plantYear'];
        i+=1;
      }
      this.setState({tableDiv3Year: y3});

    // console.log(response.data);
    // console.log(c);
    console.log(this.state.tableDiv3Data);
    });

    this.setState({div3field1:"Field 7"});
    this.setState({div3field2:"Field 8"});
    this.setState({div3field3:"Field 9"});

    this.setState({div3area1:this.state.tableDiv3Data[7]});
    this.setState({div3area2:this.state.tableDiv3Data[8]});
    this.setState({div3area3:this.state.tableDiv3Data[9]});


  }
  render() {
    const { classes } = this.props;
    return (
      <div
      //className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>
         <div >
      <div>
        {/* <GridContainer justify='center'>
        <GridItem xs={18} sm={12} md={6}>
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
         
        </GridContainer> */}
       
        
      </div>
      <div>
      <h1 className="title">Set Yield Targets</h1>
      <h4 className="title2">Set the expected yield per each field for the current month</h4>
      </div>
      </div>
      <div className="griditem">
          {/* <GridContainer justify="center"> */}
              {/* <GridItem xs={8} sm={12} md={24}> */}
              
                <CustomTabs 
                  title="Divisions :"
                  
                  headerColor="success"
                  tabs={[
                    {
                      tabName: "Division 1",
                      // tabIcon: BugReport,
                    //   tabContent: (
                    //     <Table
                    //   tableHeaderColor="primary"
                    //   tableHead={[ "Field ", "Yeild(kg)","Area of the field (Acres)"]}
                    //   tableData={this.state.tableDiv1Data}
                    // />
                    //   )
                      tabContent: (
                        
                        <form>
                          <div className="row" >
                            <div className="col-sm-3">
                              Field
                            </div>
                            <div className="col-sm-3">
                              Area of the field
                            </div>
                            <div className="col-sm-3">
                              Planted year
                            </div>
                            <div className="col-sm-3">
                              Expected yield
                            </div>
                          </div>

                          
                          <div className="row">
                            <div className="col-sm-3">
                              {this.state.div1field1}
                            </div>
                            <div className="col-sm-3">
                              {this.state.div1area1}
                            </div>
                            <div className="col-sm-3">
                              {this.state.tableDiv1Year[1]}
                            </div>
                            <div className="col-sm-3">
                            <input 
                              name="div1area1"
                              //classNameName="input"
                              type="text"
                              //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                              onChange={this.setd1f1yield}
                              value={this.state.div1f1yield}
                              placeholder="kg" />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-3">
                            {this.state.div1field2}
                            </div>
                            <div className="col-sm-3">
                            {this.state.div1area2}
                            </div>
                            <div className="col-sm-3">
                              {this.state.tableDiv1Year[2]}
                            </div>
                            <div className="col-sm-3">
                            <input 
                              name="div1area2"
                              //classNameName="input"
                              type="text"
                              //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                              onChange={this.setd1f2yield}
                              value={this.state.div1f2yield}
                              placeholder="kg" />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-3">
                            {this.state.div1field3}
                            </div>
                            <div className="col-sm-3">
                            {this.state.div1area3}
                            </div>
                            <div className="col-sm-3">
                              {this.state.tableDiv1Year[3]}
                            </div>
                            <div className="col-sm-3">
                            <input 
                              name="div1area3"
                              //classNameName="input"
                              type="text"
                              //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                              onChange={this.setd1f3yield}
                              value={this.state.div1f3yield}
                              placeholder="kg" />
                            </div>
                          </div>

                          <div>
                            <button onClick={this.handleSubmit1}>Submit</button>
                          </div>

            
                        </form>
            
                       
                      )
                    },
                    {
                      tabName: "Division 2",
                      //tabIcon: Code,
                      tabContent: (
                        <form>
                          <div className="row" >
                          <div className="col-sm-3">
                              Field
                            </div>
                            <div className="col-sm-3">
                              Area of the field
                            </div>
                            <div className="col-sm-3">
                              Planted year
                            </div>
                            <div className="col-sm-3">
                              Expected yield
                            </div>
                          </div>

                          
                          <div className="row">
                            <div className="col-sm-3">
                              {this.state.div2field1}
                            </div>
                            <div className="col-sm-3">
                              {this.state.div2area1}
                            </div>
                            <div className="col-sm-3">
                              {this.state.tableDiv2Year[4]}
                            </div>
                            <div className="col-sm-3">
                            <input 
                              name="div2area1"
                              //classNameName="input"
                              type="text"
                              //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                              onChange={this.setd2f1yield}
                              value={this.state.div2f1yield}
                              placeholder="kg" />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-3">
                            {this.state.div2field2}
                            </div>
                            <div className="col-sm-3">
                            {this.state.div2area2}
                            </div>
                            <div className="col-sm-3">
                              {this.state.tableDiv2Year[5]}
                            </div>
                            <div className="col-sm-3">
                            <input 
                              name="div2area2"
                              //classNameName="input"
                              type="text"
                              //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                              onChange={this.setd2f2yield}
                              value={this.state.div2f2yield}
                              placeholder="kg" />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-3">
                            {this.state.div2field3}
                            </div>
                            <div className="col-sm-3">
                            {this.state.div2area3}
                            </div>
                            <div className="col-sm-3">
                              {this.state.tableDiv2Year[6]}
                            </div>
                            <div className="col-sm-3">
                            <input 
                              name="div2area3"
                              //classNameName="input"
                              type="text"
                              //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                              onChange={this.setd2f3yield}
                              value={this.state.div2f3yield}
                              placeholder="kg" />
                            </div>
                          </div>

                          <div>
                            <button onClick={this.handleSubmit2}>Submit</button>
                          </div>

            
                        </form>
            
                      )
                    },
                    {
                      tabName: "Division 3",
                      //tabIcon: Cloud,
                      tabContent: (
                        <form>
                        <div className="row" >
                        <div className="col-sm-3">
                              Field
                            </div>
                            <div className="col-sm-3">
                              Area of the field
                            </div>
                            <div className="col-sm-3">
                              Planted year
                            </div>
                            <div className="col-sm-3">
                              Expected yield
                            </div>
                        </div>

                        
                        <div className="row">
                          <div className="col-sm-3">
                            {this.state.div3field1}
                          </div>
                          <div className="col-sm-3">
                            {this.state.div3area1}
                          </div>
                          <div className="col-sm-3">
                              {this.state.tableDiv3Year[7]}
                            </div>
                          <div className="col-sm-3">
                          <input 
                            name="div3area1"
                            //classNameName="input"
                            type="text"
                            //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                            onChange={this.setd3f1yield}
                            value={this.state.div3f1yield}
                            placeholder="kg" />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-3">
                          {this.state.div3field2}
                          </div>
                          <div className="col-sm-3">
                          {this.state.div3area2}
                          </div>
                          <div className="col-sm-3">
                              {this.state.tableDiv3Year[8]}
                            </div>
                          <div className="col-sm-3">
                          <input 
                            name="div3area2"
                            //classNameName="input"
                            type="text"
                            //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                            onChange={this.setd3f2yield}
                            value={this.state.div3f2yield}
                            placeholder="kg" />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-3">
                          {this.state.div3field3}
                          </div>
                          <div className="col-sm-3">
                          {this.state.div3area3}
                          </div>
                          <div className="col-sm-3">
                              {this.state.tableDiv3Year[9]}
                            </div>
                          <div className="col-sm-3">
                          <input 
                            name="div3area3"
                            //classNameName="input"
                            type="text"
                            //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                            onChange={this.setd3f3yield}
                            value={this.state.div3f3yield}
                            placeholder="kg" />
                          </div>
                        </div>

                        <div>
                          <button onClick={this.handleSubmit3}>Submit</button>
                        </div>

          
                      </form>
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
