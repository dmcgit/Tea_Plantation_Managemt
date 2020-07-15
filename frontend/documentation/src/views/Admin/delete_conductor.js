import React, {Component} from "react";
import "./App.css";
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
//import firebase from "../config/firebase.js";
import axios from 'axios';
var crypto=require('crypto');
//import DatePicker from "react-datepicker";
 
//date input
//import "react-datepicker/dist/react-datepicker.css";

//dropdown
//import ControlledOpenSelect from "../isuru-components/dropdown-button2.js"


class App extends Component {
  render() {
    return (
      <Register />
      
    );
  }
}

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          nic: '',
          
          error: null,
        };
      }

      // onSubmit = event => {
      //   //console.log(this.state.email);
      //   const { email, password } = this.state;
        
      //     firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(firebaseUser){
      //       //console.log("SUCCESS");
      //       var user = firebase.auth().currentUser;
      //       var ref = firebase.database().ref("Users").child(user.uid); 
      //       ref.once('value',function (snapshot) {  
      //         console.log(snapshot.val());
      //         let type=snapshot.val().type;
      //         if(type=="manager"){
      //           console.log("hERER");
      //           window.location.replace("/manager/DailySummary");
                
      //         }   
      //         else if(type=="conductor"){           
      //        let division=snapshot.val().division;
      //        localStorage.setItem('currentUserDivision', division);
      //        console.log(division);
      //       //  var ref2=firebase.database().ref("7_Day").child(division).child("end_Date");
      //       //   ref2.on('value',function (snapshot) {       
      //       //     let data = snapshot.val();
      //       //     var currentEndDate=new Date(data).getDate();
      //       //     var currentEndMonth=new Date(data).getMonth();
      //       //     var currentEndYear=new Date(data).getFullYear();
      //       //     var currentEnd=currentEndDate+'-'+(currentEndMonth+1)+'-'+currentEndYear;
      //       //     localStorage.setItem('currentEnd',currentEnd);
      //       //   });
            
             
      //       var date=new Date().getDate();
      //       var month=new Date().getMonth()+1;
      //       var year=new Date().getFullYear();
      //       var today=date+'-'+month+'-'+year;
      //       localStorage.setItem('today', today);
      
      //     //  var uid=localStorage.getItem('currentUserDivision');
      //     //  console.log(uid);
           
    
      //       // this.props.history.push("/dashboard");
      //     //  return <Redirect to="/admin/dashboard"/>;
      //     window.open("/conductor/ConductorDailyWork");
      //         }
      //       }); 
            
      //     }).catch(function(error) {
      //       console.log(error.code);

      //       alert(error.message);
      //    });
    
      //   event.preventDefault();
      // };
      onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      handleSubmit = () => {
        console.log(this.state.nic);
        
        axios.post('http://localhost:8000/api/conductor/delete/'+this.state.nic
        ).then(res => console.log(res.data));
        
    
   
      };


      handleBack = () => {
        window.location.replace("/Admin/conductor");
      
      }
     
  render() {
    const { nic, error } = this.state;
    const isInvalid =nic === '';
  return (
    
    <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>
    
    <div className='submit'>
              <button onClick={this.handleBack}>Back</button>
            </div>
      
    <div className="wrapper">
  <h2 className="heading">Delete Conductor</h2>

      <form onSubmit={this.onSubmit} >
      <div classname="input">
          
          <input className="input"
          name="nic"
          value={nic}
          onChange={this.onChange}
          type="text"
          placeholder="NIC"
        />
        </div>
      
        <button disabled={isInvalid} type="submit" onClick={this.handleSubmit}>
          Delete
        </button>
        {error && <p>{error.message}</p>}
      </form>
     
      
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
render(<App />, document.getElementById('root'))
export default App;