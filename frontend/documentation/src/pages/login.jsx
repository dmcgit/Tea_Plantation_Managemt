import React, {Component} from "react";
import "./App.css";
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
import firebase from "../config/firebase.js";
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
          email: '',
          password: '',
          error: null,
        };
      }

      onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      handleSubmit = () => {

        // -----------------------------------------------------------
        // post request sample. URL should be according to the backend routes.
        // data should be the required request body data
        
        axios.get('http://localhost:8000/login/auth/'+this.state.email
        ).then(response=>{
          var hashedPassword=crypto.createHash('md5').update(this.state.password).digest('hex');
          var dbPassword=response.data['password'];
         
          if(hashedPassword==dbPassword){
            if(response.data['position']=='conductor'){
              axios.get('http://localhost:8000/login/get/'+this.state.email).then(response=>{
                localStorage.setItem('currentUserDivision', response.data['div']);
              }).catch(function(error){
                console.log(error);
              });
              window.location.replace("/conductor/ConductorDailyWork");

            }
            else if(response.data['position']=='manager'){
              window.location.replace("/manager/DailySummary");
            }
            else if(response.data['position']=='clerk'){
              window.location.replace("/clerk/ExpensesHandling");
            }
            else if(response.data['position']=='admin'){
              window.location.replace("/admin/Division");
            }
            
            else{

            }
          }
          else{
            alert("Incorrect Password");
            window.location.reload();
          }
      }).catch(function(error){
        console.log(error);
        alert("Incorrect Username");
        window.location.reload();
      });
        // -----------------------------------------------------------
    
        const { email, password} = this.state;
        if (
          email == null ||
          password == null         
        ) {
          alert("Please Complete all the details");
          window.location.reload();
        } 
      };
     
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
  return (
    
    <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>
    
   
      
    <div className="wrapper">
  <h2 className="heading">Login</h2>

      <form onSubmit={this.onSubmit} >
      <div classname="input">
          
          <input className="input"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        </div>
        <div classname="input">
          <input className="input"
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        </div>
        <button disabled={isInvalid} type="submit" onClick={this.handleSubmit}>
          Sign In
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