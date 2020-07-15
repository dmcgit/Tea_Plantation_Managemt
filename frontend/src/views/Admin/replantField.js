import React, {Component} from "react";
import "./App.css";
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
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
      FieldID: null,
      status: null,
      amount: null,
      //field: "Field 1",
      // date:null,
      date: new Date(),
      Ready: false,
      errors: {
        FieldID: '',
        status: '',
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
        errors.FieldID = 
          value.length < 0
            ?'FieldID must be entered!'
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
    window.location.replace("/Admin/Field");
    
  }

/*
  handleLoad = async (e) => {
    e.preventDefault();
    const { labourer_id } = this.state;
    const date = this.getDate()
    const ref = firebase.database().ref("Daily Work Data").child(date);


    await ref.once('value', (snapshot) => {
      snapshot.forEach((field) => {
        ref.child(field.key).once('value', (data) => {
          if(data.hasChild(labourer_id)) {
            this.flag = true;
            this.setState({ field: field.key })
            this.fetchData(date, field.key, labourer_id);
            return ;
          }
        })
      })
    })
   
    
  }

  fetchData = async (date, field, labourer_id) => {
    console.log('OK')
    await firebase.database().ref("Daily Work Data").child(date).child(field).child(labourer_id).once('value', (snapshot) => {
      this.setState({
        work_assignmt: snapshot.val().work_assignmt,
        Ready: true,
      })
    })
  }
  */

  handleSubmit = () => {
    var cdate=this.getDate();
    console.log(this.state.fieldID);
    axios({
        method: 'post',
        url: 'http://localhost:8000/api/field/fieldReplant',
        data: {
          fieldID:this.state.fieldID,
          status:this.state.status,
          date:cdate /////$$$$ISSUE WITH MONTH$$$$$$
        }
      }).then(function (response) {
        console.log(response)
        alert(response.data);
      }).catch(function (error) {
        console.log(error)
        alert("Reset Data insertion failed" + "\n"+ error);
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
  <h2 className="heading">Replanting/Clearance</h2>

      <form name="myForm" >

     
      
      
        
        <div className="field"><p>FieldID</p>
          <div className="control">
            <input value={this.state.fieldID}
              name="fieldID"
              className="input"
              type="text"
              onChange={(event) => this.setState({ fieldID: event.target.value })}
              placeholder="Field ID" required/>
             
          </div>
        </div>
      
      

    

      
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

      <div classname="control"> <p>Status</p>
        <select className="input" value = {this.state.status} onChange={(event) => this.setState({ status: event.target.value })}>
          <option value="None"> </option>
          <option value="1">Replanted</option>
          <option value="0">Cleared</option>
          
        </select>
        
      </div>

      <DatePicker className="date" 
        selected={this.state.date}
        onChange={(date) => this.setState({ date })}
      />

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