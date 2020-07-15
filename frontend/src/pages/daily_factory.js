import React, {Component} from "react";
import "./App.css";
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
import firebase from "../config/firebase.js";
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
      div: "div 1",
      // date:null,
      date: new Date(),
      Ready: false,
      errors: {
        factory_id: '',
        work_assignmt: '',
        amount: '',
        weight:'',
        date:'',
        curDate:(new Date().getDate()+'-'+new Date().getMonth()+1+'-'+new Date().getFullYear()).toString()
      }
    };
  
   console.log("set"+this.state.curDate);
  }

 

  handleBack = () => {
   window.location.replace("/conductor/ConductorDailyWork");
   
    
  }



 handleSubmit = () => {
  
  // -----------------------------------------------------------
  // post request sample. URL should be according to the backend routes.
  // data should be the required request body data
  axios({
    method: 'post',
    url: 'http://localhost:8000/factory/insert',
    data: {
      divNo:'div1',
      factID:this.state.factory_id,
      curDate:this.state.date,
      weight:this.state.weight,
      amountRS:this.state.amount
    }
  }).then(function (response) {
    console.log(response)
    alert(response.data);
  }).catch(function (error) {
    console.log(error)
    alert("Factory Data insertion faild" + "\n"+ error);
  });
  // -----------------------------------------------------------

  const { factory_id,amount,weight } = this.state;
  if (
    factory_id == null ||
    amount == null ||
    weight == null
  ) {
    alert("Please Complete all the details");
  } 
  else {
    // firebase
    //   .database()
    //   .ref("Labourer")
    //   .child(Phone_number)
    //   .update({
    //     First_name: First_name,
    //     Last_name: Last_name,
    //     Address: Address,
    //     Status: "Active"
    //   });
    // .then(() => alert("success"))
    // .catch(() => alert("fail"))
  }
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
  <h2 className="heading">Factory Assignment</h2>

      <form name="myForm" >

     
      
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input
              name="factory_id"
              className="input"
              type="text"
              onChange={(event) => this.setState({ factory_id: event.target.value })}
              placeholder="Factory ID" required/>
              {errors.factory_id.length > 0 && 
                <span className='error'>{errors.factory_id}</span>}
          </div>
        </div>
      </div>
      

    

      
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input
             name="amount"
             className="input"
             type="number"
              onChange={(event) => this.setState({ weight: event.target.value })}
              placeholder="Amount (kg)" required/>
              {errors.amount.length > 0 && 
                <span className='error'>{errors.amount}</span>}
          </div>
        </div>
      </div>
      <div className="field">
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
      </div>
      

      <DatePicker className="date" 
        selected={this.state.date}
        onChange={(date) => this.setState({ date })}
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