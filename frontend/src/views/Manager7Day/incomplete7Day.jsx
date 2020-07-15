import React, {Component} from "react";
import "../../pages/App.css";
import { render } from 'react-dom';
import carfix from "../../pages/SunrisePeekTeaEstate.jpg";
//import firebase from "../config/firebase.js";
import DatePicker from "react-datepicker";
import axios from 'axios';
//date input
import "react-datepicker/dist/react-datepicker.css";

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
      factory_id: null,
      amount: null,
      div_no: '',
      // date:null,
      date: new Date(),
      Ready: false,
      reason: '',
      endDate:'',
      errors: {
        div_no: '',
        reason: '',
        endDate:''
        
      }
    };
  
   console.log("set"+this.state.curDate);
  }

 

  handleBack = () => {
   window.location.replace("/manager/Manager7Day");
   
    
  }



 handleSubmit = () => {
   var newEndDate=this.state.endDate;
   console.log(newEndDate);
  console.log("enddate"+newEndDate.getFullYear()+'-'+newEndDate.getMonth()+1+'-'+newEndDate.getDate()+' 00:00:00');
  console.log("division"+this.state.div_no);
  console.log("reason"+this.state.reason);
  // -----------------------------------------------------------
  // post request sample. URL should be according to the backend routes.
  // data should be the required request body data
  axios({
    method: 'post',
    url: 'http://localhost:8000/conductor7Day/resetCalendar',
    data: {
      div:this.state.div_no,
      reason:this.state.reason,
      endDate:newEndDate.getFullYear()+'-'+newEndDate.getMonth()+1+'-'+newEndDate.getDate()+' 00:00:00' /////$$$$ISSUE WITH MONTH$$$$$$
    }
  }).then(function (response) {
    console.log(response)
    alert(response.data);
  }).catch(function (error) {
    console.log(error)
    alert("Reset Data insertion failed" + "\n"+ error);
  });

};

   

  getDate = () => {
    let dd = new Date().getDate();
    let mm = new Date().getMonth() + 1;
    let yyyy = new Date().getFullYear();

    if(dd < 10) {
      dd = '0' + dd;
    }

    if(mm < 10) {
      mm = '0' + mm;
    }

    let dateString = dd + '-' + mm + '-' + yyyy;
    console.log("DA"+dateString);
    return dateString;
  }

  

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   if(validateForm(this.state.errors)) {
  //     // console.info('Valid Form')
  //     alert("success");
  //   }else{
  //     // console.error('Invalid Form')
  //     alert("fail");
  //   }
  // }
     
  render() {
    const {errors} = this.state;
  return (
    
    <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}
      
    >
    
    <div className='submit'>
              <button onClick={this.handleBack}>Back</button>
            </div>

      
    <div className="wrapper">
  <h2 className="heading">Reset 7 Day Calendar</h2>

      <form name="myForm" >

      <label className="label">Division No:</label>
      
      <div classname="input">
        <select className="input" value = {this.state.div_no} onChange={(event) => this.setState({ div_no: event.target.value })}>
          <option value="None"> </option>
          <option value="div1">Division 1</option>
          <option value="div2">Division 2</option>
          <option value="div3">Division 3</option>
        </select>
      
      </div>

    

      
      <div className="field">
        <label className="label">Reason:</label>
        <div className="field">
        <div className="control">
            <textarea
              name="reason"
              className="input"
             
              onChange={(event) => this.setState({ reason: event.target.value })}
              placeholder="Reason" required/>
              {errors.reason.length > 0 && 
                <span className='error'>{errors.reason}</span>}
          </div>
        </div>
      </div>
      {/* <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input
             name="amount"
             className="input"
             type="number"
              onChange={(event) => this.setState({ amount: event.target.value })}
              placeholder="Amount (RS)" required/>
              {errors.amount.length > 0 && 
                <span className='error'>{errors.amount}</span>}
          </div>
        </div>
      </div> */}
      
      <label className="label">New Start Date:</label>
      <DatePicker className="date" 
        selected={this.state.date}
        onChange={(endDate) => this.setState({ endDate })}
      />

      
  
      <div className='submit'>
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
     
      
      </form>
      
      </div>
    </div>
    
  );
}

}
render(<App />, document.getElementById('root'))
export default App;