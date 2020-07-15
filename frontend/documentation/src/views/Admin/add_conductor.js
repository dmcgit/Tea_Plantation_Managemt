import React, { Component } from 'react';
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
// import "./UserProfile.css";
import "../../pages/App.css";
import firebase from "../../config/firebase.js";
 
// import axios for http request handling
import axios from 'axios';

class App extends Component {
    render() {
      return (
        <Register />
      );
    }
  }
  
  
  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        nic:null,
        Phone_number:null,
        First_name: null,
        dob : null,
        Address: null,
        Status:null,
        div:null,
        value: '',
        errors: {
        nic:'',
        Phone_number:'',
        First_name: '',
        dob : '',
        Address: '',
        Status:'',
        div:'',
          }
    };
  
      // this.handleChange = this.handleChange.bind(this);
      // this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
  
      switch (name) {
        case 'Phone_number': 
          errors.Phone_number = 
          validEmailRegex.test(value)
              ? 'Phone_number must be 10 characters long!'
              : '';
          break;
        case 'First_name': 
          errors.First_name = 
          validEmailRegex.test(value)
              ? 'Full Name must be  characters long!'
              : '';
          break;
        case 'Last_name': 
          errors.Last_name = 
            validEmailRegex.test(value)
              ? ''
              : ' is not valid!';
          break;
        case 'Address': 
          errors.Address = 
          validEmailRegex.test(value)
              ? 'Password must be 8 characters long!'
              : '';
          break;
          case 'Status': 
          errors.Status = 
          validEmailRegex.test(value)
              ? 'Password must be 8 characters long!'
              : '';
          break;

        default:
          break;
      }
  
      this.setState({errors, [name]: value});
    }
  
    
    handleBack = () => {
      window.location.replace("/Admin/conductor");
    
    }
    handleSubmit = (event) => {

      axios({ 
        method: 'post',
        url: 'http://localhost:8000/api/conductor/insertConductortostaff',
        data: {
           
           conductorNIC: this.state.nic,
           conductorPosition:'conductor',
           conductorName: this.state.name,
           conductorMobile: this.state.Phone_number,
           conductorDOB:this.state.dob,
           conductorAddress: this.state.Address,
           conductorStatus: 'Active',
           conductorDivNo:this.state.div
        }

        
  
       
      }).then(function (response) {
        console.log(response)
        alert(response.data);
      }).catch(function (error) {
        console.log(error)
        alert("conductor insertion faild" + "\n"+ error);
      });

      // alert('A name was submitted: ' + this.state.value);
    //   event.preventDefault();
       
    //   const{Phone_number,First_name,Last_name,Address,Status} = this.state;
    //   if(Phone_number==null|| First_name==null||Last_name==null||Address==null){
    //     alert("Please Complete all the details");
       
    //   }
    //   else if(Phone_number.length!=10){
        
    //     alert("Wrong Phone Number");
    //     window.location.reload();
    //   }

      
      
    //   else{
        
    //   firebase.database().ref("Manager").child(Phone_number).update({
        
    //     First_name:First_name,
    //     Last_name:Last_name,
    //     Address:Address,
    //     Status:"Active"
      
    //   })
    //   alert("Manager Added");
    //   window.location.replace("/Admin/Manager");
      
      
    // }

    
    }
    render() {
      const {errors} = this.state;
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
        
        <h2 className="heading">Add Conductor</h2>
        
        <form name="myForm" >
        
        <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.nic}
              name="nic"
              className="input"
              type="text"
              onChange={(event) => this.setState({ nic: event.target.value })}
              placeholder="NIC" required/>
               {/* {errors.Phone_number.length > 0 &&  
                 <span className='error'>{errors.nic}</span>}  */}
          </div>
        </div>
      </div>
        <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.Phone_number}
              name="Phone_number"
              className="input"
              type="text"
              onChange={(event) => this.setState({ Phone_number: event.target.value })}
              placeholder="Phone_number" required/>
               {/* {errors.Phone_number.length > 0 &&  
                 <span className='error'>{errors.Phone_number}</span>}  */}
          </div>
        </div>
      </div>

          <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.First_name}
              name="First_name"
              className="input"
              type="text"
              onChange={(event) => this.setState({ First_name: event.target.value })}
              placeholder="Name" required/>
               {/* {errors.First_name.length > 0 &&  
                 <span className='error'>{errors.First_name}</span>}  */}
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.dob}
              name="Last_name"
              className="input"
              type="date"
              onChange={(event) => this.setState({ dob: event.target.value })}
              placeholder="DOB" required/>
               {/* {errors.Last_name.length > 0 &&  
                 <span className='error'>{errors.dob}</span>}  */}
          </div>
        </div>
      </div>
      
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.Address}
              name="Address"
              className="input"
              type="text"
              onChange={(event) => this.setState({ Address: event.target.value })}
              placeholder="Address" required/>
               {/* {errors.Address.length > 0 &&  
                 <span className='error'>{errors.Address}</span>}  */}
          </div>
        </div>
      </div>
      
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.div}
              name="Address"
              className="input"
              type="text"
              onChange={(event) => this.setState({ div: event.target.value })}
              placeholder="Division No" required/>
               {/* {errors.div.length > 0 &&  
                 <span className='error'>{errors.div}</span>}  */}
          </div>
        </div>
      </div>
      
      


         <div className='submit'>
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
         
        </form>
        </div>>
        </div>
        
      );
    }
  }

  render(<App/>, document.getElementById('root'))
 export default App;