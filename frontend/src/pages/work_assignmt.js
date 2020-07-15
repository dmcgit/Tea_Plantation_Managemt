import React, {Component} from "react";
import "./App.css";
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
import firebase from "../config/firebase.js";
import DatePicker from "react-datepicker";
 
//date input
import "react-datepicker/dist/react-datepicker.css";

// import axios for http request handling
import axios from 'axios';

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
      labourer_id: null,
      work_assignmt: null,
      amount: null,
      field: null,
     
      // date:null,
      date: new Date(),
      Ready: false,
      errors: {
        labourer_id: '',
        work_assignmt: '',
        amount: '',
        date:'',
      }
    };
  }

  handleChange= (event)=> {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(name)
    console.log(value)
    console.log(this.state.labourer_id)
   

    let errors = this.state.errors;
    
    
    switch (name) {
      case 'text1': 
        errors.labourer_id = 
          value.length < 0
            ?'ID must be 4 characters long!'
            : '';
        break;
      case 'text2': 
        errors.work_assignmt = 
        value.length < 0
            ? 'this is not valid!'
            : '';
        break;
      case 'text3': 
        errors.amount = 
          value.length < 0 
            ? 'amount must be a number'
            : '';
        break;
      default:
        break;
    }

    

  }



  handleBack = () => {
    window.location.replace("/conductor/ConductorDailyWork");
  
  }
   


  handleSubmit = () => {
    const { field, labourer_id, work_assignmt } = this.state;
    const division=localStorage.getItem('currentUserDivision');
    const date = this.getDate();

    axios({
      method: 'post',
      url: 'http://localhost:8000/api/workAssign/insert',
      data: {
        //division: division,
        date: date,
        mobile: labourer_id,
        type: work_assignmt,
        field: field,
        amount: 0
      }
    }).then(function (response) {
      console.log(response)
      alert(response.data);
    }).catch(function (error) {
      console.log(error)
      alert("Work assignment failed" + "\n"+ error);
    });

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

    let dateString = yyyy + '-' + mm + '-' + dd;

    return dateString;
  }
     
  render() {
    const {errors} = this.state;
  return (
    
    <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>
    

    <div className="wrapper">
    <h1 className="title">Daily Work Assignment</h1>

      <form name="myForm" >      
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.labourer_id}
              name="labourer_id"
              className="input"
              type="text"
              onChange={(event) => this.setState({ labourer_id: event.target.value })}
              placeholder="Labourer ID" required/>
              {errors.labourer_id.length > 0 && 
                <span className='error'>{errors.labourer_id}</span>}
          </div>
        </div>
      </div>
      

    


      <div classname="input">
        <select className="form-control" placeholder = "Work Assignment" value = {this.state.work_assignmnt} onChange={(event) => this.setState({ work_assignmt: event.target.value })}>
          <option value="None"> </option>
          <option value="Plucking">Plucking</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Drainage">Drainage</option>
        </select>
      
      </div>

      <div classname="input">
        <select className="form-control" placeholder = "Field" value = {this.state.field} onChange={(event) => this.setState({ field: event.target.value })}>
          <option value="None"> </option>
          <option value="Field_1">Field 1</option>
          <option value="Field_2">Field 2</option>
          <option value="Field_3">Field 3</option>
          <option value="Field_4">Field 4</option>
          <option value="Field_5">Field 5</option>
          <option value="Field_6">Field 6</option>
          <option value="Field_7">Field 7</option>
          <option value="Field_8">Field 8</option>
          <option value="Field_9">Field 9</option>
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
    
  );
}

}
render(<App />, document.getElementById('root'))
export default App;