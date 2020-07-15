import React, { Component } from 'react';
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
import "./App.css";
import firebase from "../config/firebase.js";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  render() {
    return (
      <Register />
    );
  }
}

// const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
// const validateForm = (errors) => {
//   let valid = true;
//   Object.values(errors).forEach(
//     (val) => val.length > 0 && (valid = false)
//   );
//   return valid;
// }

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather:null,
      
      
      date: new Date(),
      errors: {
        weather:'',
        
        date:'',
      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    let errors = this.state.errors;

    // switch (name) {
    //   case 'weather': 
    //     errors.weather = 
    //       value.length < 5
    //         ? 'Full Name must be 5 characters long!'
    //         : '';
    //     break;
    //   case 'email': 
    //     errors.email = 
    //       validEmailRegex.test(value)
    //         ? ''
    //         : 'Email is not valid!';
    //     break;
    //   case 'password': 
    //     errors.password = 
    //       value.length < 8
    //         ? 'Password must be 8 characters long!'
    //         : '';
    //     break;
    //   default:
    //     break;
    // }

    this.setState({errors, [name]: value});
  }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   if(validateForm(this.state.errors)) {
  //     // console.info('Valid Form')
  //     alert("success");
  //   }else{
  //     // console.error('Invalid Form')
  //     alert("fail");
  //   }
  // }
  handleBack = () => {
    window.location.replace("/conductor/ConductorDailyWork");
  
  }

  handleSubmit = () => {
    const {weather } = this.state;
    const division=localStorage.getItem('currentUserDivision');
    const date = this.getDate();

    firebase.database().ref("Daily Work Data").child(date).child(division).update({
      weather:weather
    });
    window.location.replace("/conductor/ConductorDailyWork");

  }
  
  getDate = () => {
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

    let dateString = dd + '-' + mm + '-' + yyyy;

    return dateString;
  }

  render() {
    const {errors} = this.state;
    return (
      <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,10,0.3), rgba(9, 93, 225,0.1)),url(${carfix})`
      }}
    >


     <div className="wrapper">
  <h1 className="title">Weather</h1>

      <form name="myForm" >

      
      <div classname="input">
        <select className="form-control" value = {this.state.weather} onChange={(event) => this.setState({ weather: event.target.value })}>
              <option value="None"> </option>
              <option value="sunny">sunny</option>
              <option value="cloudy">cloudy</option>
              <option value="rainy">rainy</option>
              <option value="windy">windy</option>
        </select>
      
      </div>

      <DatePicker className="date" 
        selected={this.state.date}
        onChange={(date) => this.setState({ date })}
      />  

      
            <div className='submit'>
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
          </form>
          <button type="submit" className="back" onClick={this.handleBack}>Back</button>
        </div>
      </div>
      // </div>
    );
  }
}

 render(<App/>, document.getElementById('root'))
 export default App;