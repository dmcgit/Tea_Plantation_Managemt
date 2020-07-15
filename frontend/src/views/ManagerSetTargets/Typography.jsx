import React from "react";
import "./targets.css";
import firebase from "../../config/Fire";
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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      div1:0,
      div2:0,
      div3:0,
      tableDiv1Data:[],
      tableDiv2Data:[],
      tableDiv3Data:[],
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

  handleSubmit1 = () => {
    const { div1f1yield,div1f2yield,div1f3yield } = this.state;

    firebase.database().ref("target").child("division_1").update({
      "field_1/target": div1f1yield,
      "field_2/target": div1f2yield,
      "field_3/target": div1f3yield
    })
    alert("Target successfully set");
    //  .then(() => alert('Success'))  
    //  .catch(() => alert('Failed'))
   
  //  firebase.database().ref("target").child("division_1").child("field_1").update({
  //     target: div1f1yield
  //   })   
  //   // .then(() => alert('Success'))  
  //   // .catch(() => alert('Failed'))

  //   firebase.database().ref("target").child("division_1").child("field_2").update({
  //     target: div1f2yield
  //   })   
  //   firebase.database().ref("target").child("division_1").child("field_3").update({
  //     target: div1f3yield
  //   })   

  }

  handleSubmit2 = () => {
    const { div2f1yield,div2f2yield,div2f3yield } = this.state;

    firebase.database().ref("target").child("division_2").update({
      "field_1/target": div2f1yield,
      "field_2/target": div2f2yield,
      "field_3/target": div2f3yield
    })
    alert("Target successfully set");
  }

  handleSubmit3 = () => {
    const { div3f1yield,div3f2yield,div3f3yield } = this.state;

    firebase.database().ref("target").child("division_3").update({
      "field_1/target": div3f1yield,
      "field_2/target": div3f2yield,
      "field_3/target": div3f3yield
    })
    alert("Target successfully set");
  }

  setFieldData = async() => {
    // var user = firebase.auth().currentUser;
    // var uid;

    // if (user == null) {
    //   //uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
    //     console.log("LOGGED");              // this value to authenticate with your backend server, if
    //                   // you have one. Use User.getToken() instead.
    // }
    //var uid=localStorage.getItem('currentUserDivision');
    //console.log(uid);
    
    var ref = firebase.database().ref("target").child("division_1").child("fields");
    //var sum=0;
    // var fieldSum=0;
    // var count=0;
    var i=0;
    var data=[];
    var fieldn=[];
    var fArea=[];
    await ref.once('value',function (snapshot) {                
     // let feildData=snapshot.val();
      snapshot.forEach(field=>{
      //   field.forEach(laborer=>{
      //     if(laborer.val().category=="plucking"){
      //     count=count+1;
      //     fieldSum = fieldSum +laborer.val().amount;
      //     }
      //   })
        
         //data[i]=[field.key,"-",field.child("area").val()];
         fieldn[i]=[field.key];
         fArea[i]=[field.child("area").val()];
      //   sum=sum+fieldSum;
      //   fieldSum=0;
      //  // console.log(count);
      //   count=0;
          i=i+1;

      
      })
    });    
    //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field1:sum});  
    //this.setState({div1: sum});  
    //this.setState({tableDiv1Data:data});

    this.setState({div1field1:fieldn[0]});
    this.setState({div1field2:fieldn[1]});
    this.setState({div1field3:fieldn[2]});

    this.setState({div1area1:fArea[0]});
    this.setState({div1area2:fArea[1]});
    this.setState({div1area3:fArea[2]});



    // this.setState({div1count: i});
    var ref = firebase.database().ref("target").child("division_2").child("fields");
    //sum=0;
    data=[];
    i=0;
    await ref.once('value',function (snapshot) {                
      // let feildData=snapshot.val();
       snapshot.forEach(field=>{
        //data[i]=[field.key,"-",field.child("area").val()];
        fieldn[i]=[field.key];
         fArea[i]=[field.child("area").val()];
        i=i+1;
       })

     });   
    //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field2:sum});  
    //this.setState({div2: sum}); 
    //console.log(data);
    //this.setState({tableDiv2Data:data});


    this.setState({div2field1:fieldn[0]});
    this.setState({div2field2:fieldn[1]});
    this.setState({div2field3:fieldn[2]});

    this.setState({div2area1:fArea[0]});
    this.setState({div2area2:fArea[1]});
    this.setState({div2area3:fArea[2]});

    // var ref = firebase.database().ref("Dwork").child("2019-09-20").child("div3"); 
    // var sum=0;
    // var fieldSum=0;
    // var count=0;
    // var i=0;
    // var data=[];
    // await ref.once('value',function (snapshot) {                
    //  // let feildData=snapshot.val();
    //   snapshot.forEach(field=>{
    //     field.forEach(laborer=>{
    //       if(laborer.val().category=="plucking"){
    //       count=count+1;
    //       fieldSum = fieldSum +laborer.val().amount;
    //       }
    //     })
        
    //     data[i]=[field.key,fieldSum,count];
    //     sum=sum+fieldSum;
    //     fieldSum=0;
    //    // console.log(count);
    //     count=0;
    //     i=i+1;
    //   })
    // });    
    // //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field1:sum});  
    // this.setState({div3: sum});  
    // this.setState({tableDiv3Data:data});
    var ref = firebase.database().ref("target").child("division_3").child("fields"); 
    //sum=0;
    data=[];
    i=0;
    await ref.once('value',function (snapshot) {                
      // let feildData=snapshot.val();
       snapshot.forEach(field=>{
        //data[i]=[field.key,"-",field.child("area").val()];
        fieldn[i]=[field.key];
         fArea[i]=[field.child("area").val()];
        i=i+1;
       })

     });   
    //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field2:sum});  
    //this.setState({div3: sum}); 
    //console.log(data);
    //this.setState({tableDiv3Data:data});

    this.setState({div3field1:fieldn[0]});
    this.setState({div3field2:fieldn[1]});
    this.setState({div3field3:fieldn[2]});

    this.setState({div3area1:fArea[0]});
    this.setState({div3area2:fArea[1]});
    this.setState({div3area3:fArea[2]});


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
                          <div class="row" >
                            <div class="col-sm-4">
                              Field
                            </div>
                            <div class="col-sm-4">
                              Area of the field
                            </div>
                            <div class="col-sm-4">
                              Expected yield
                            </div>
                          </div>

                          
                          <div class="row">
                            <div class="col-sm-4">
                              {this.state.div1field1}
                            </div>
                            <div class="col-sm-4">
                              {this.state.div1area1}
                            </div>
                            <div class="col-sm-4">
                            <input 
                              name="div1area1"
                              //className="input"
                              type="text"
                              //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                              onChange={this.setd1f1yield}
                              value={this.state.div1f1yield}
                              placeholder="kg" />
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-sm-4">
                            {this.state.div1field2}
                            </div>
                            <div class="col-sm-4">
                            {this.state.div1area2}
                            </div>
                            <div class="col-sm-4">
                            <input 
                              name="div1area2"
                              //className="input"
                              type="text"
                              //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                              onChange={this.setd1f2yield}
                              value={this.state.div1f2yield}
                              placeholder="kg" />
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-sm-4">
                            {this.state.div1field3}
                            </div>
                            <div class="col-sm-4">
                            {this.state.div1area3}
                            </div>
                            <div class="col-sm-4">
                            <input 
                              name="div1area3"
                              //className="input"
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
                          <div class="row" >
                            <div class="col-sm-4">
                              Field
                            </div>
                            <div class="col-sm-4">
                              Area of the field
                            </div>
                            <div class="col-sm-4">
                              Expected yield
                            </div>
                          </div>

                          
                          <div class="row">
                            <div class="col-sm-4">
                              {this.state.div2field1}
                            </div>
                            <div class="col-sm-4">
                              {this.state.div2area1}
                            </div>
                            <div class="col-sm-4">
                            <input 
                              name="div2area1"
                              //className="input"
                              type="text"
                              //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                              onChange={this.setd2f1yield}
                              value={this.state.div2f1yield}
                              placeholder="kg" />
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-sm-4">
                            {this.state.div2field2}
                            </div>
                            <div class="col-sm-4">
                            {this.state.div2area2}
                            </div>
                            <div class="col-sm-4">
                            <input 
                              name="div2area2"
                              //className="input"
                              type="text"
                              //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                              onChange={this.setd2f2yield}
                              value={this.state.div2f2yield}
                              placeholder="kg" />
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-sm-4">
                            {this.state.div2field3}
                            </div>
                            <div class="col-sm-4">
                            {this.state.div2area3}
                            </div>
                            <div class="col-sm-4">
                            <input 
                              name="div2area3"
                              //className="input"
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
                        <div class="row" >
                          <div class="col-sm-4">
                            Field
                          </div>
                          <div class="col-sm-4">
                            Area of the field
                          </div>
                          <div class="col-sm-4">
                            Expected yield
                          </div>
                        </div>

                        
                        <div class="row">
                          <div class="col-sm-4">
                            {this.state.div3field1}
                          </div>
                          <div class="col-sm-4">
                            {this.state.div3area1}
                          </div>
                          <div class="col-sm-4">
                          <input 
                            name="div3area1"
                            //className="input"
                            type="text"
                            //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                            onChange={this.setd3f1yield}
                            value={this.state.div3f1yield}
                            placeholder="kg" />
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-4">
                          {this.state.div1field2}
                          </div>
                          <div class="col-sm-4">
                          {this.state.div3area2}
                          </div>
                          <div class="col-sm-4">
                          <input 
                            name="div3area2"
                            //className="input"
                            type="text"
                            //onChange={(event) => this.setState({ labourer_id: event.target.value })}
                            onChange={this.setd3f2yield}
                            value={this.state.div3f2yield}
                            placeholder="kg" />
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-4">
                          {this.state.div3field3}
                          </div>
                          <div class="col-sm-4">
                          {this.state.div3area3}
                          </div>
                          <div class="col-sm-4">
                          <input 
                            name="div3area3"
                            //className="input"
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
