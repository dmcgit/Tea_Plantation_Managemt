import React, { Component } from 'react';
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
// import "./UserProfile.css";
import "../../pages/App.css";
 import firebase from "../../config/firebase.js";

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
        
        Div_location:null,
        // conductor:null,
        div_no:null,
        conductor_id:null,
        no_of_feild:null,
        status:null,
       
       

        value: '',
        errors: {
        Div_location:'',
        // conductor:"",
        div_no:"",
        conductor_id:"",
        no_of_feild:'',
        status:''
      
        
          }
    };
     
    }
    handleChange = (event) => {

      console.log(this.state.div_no);
      console.log(this.state.Div_location);
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
  
      switch (name) {
        case 'Div_no': 
          errors.Div_location = 
          validEmailRegex.test(value)
              ? 'Phone_number must be 10 characters long!'
              : '';
          break;
        case 'div_location': 
          errors.feild_no = 
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
      window.location.replace("/Admin/Division");
    
    }
    handleSubmit = () => {

      
        console.log("submit");
        // console.log("nic"+this.state.Phone_number);
 // -----------------------------------------------------------
 // post request sample. URL should be according to the backend routes.
 // data should be the required request body data
 axios({ 
   method: 'post',
   url: 'http://localhost:8000/api/division/insert',
   data: {
    
      divisionDIVNO :this.state.div_no,
      divisionLocation :this.state.Div_location,
      divisionStatus : 'Active'
    
      // divisionDIVNO :'d',
      // divisionLocation :'western',
      // divisionStatus : 'Active'
    
   }
 }).then(function (response) {
   console.log(response)
   alert(response.data);
 }).catch(function (error) {
   console.log(error)
   alert("Division insertion failed" + "\n"+ error);
 });
     
      // const{Div_location,conductor,div_no,conductor_id,no_of_feild} = this.state;
     
      
      //  if(firebase.database().ref("Division")) {
      //   firebase.database().ref("Division").child(Div_location).update({
          
      //     div_no:div_no,
      //     conductor_id:conductor_id,
      //     no_of_feild:no_of_feild,
      //     status:"Active",
          
        
      //   })
      //   alert("Division Added");
      //   window.location.replace("/Admin/Division");
      //   // .then(() => alert("success"))
      //   // .catch(() => alert("fail"))
        
      
      // }
      
      // else(firebase.database().ref("Division").child(feild){
        
      //   firebase.database().ref("Division").child(Div_location).update({
          
      //     div_no:div_no,
      //     conductor_id:conductor_id,
      //     no_of_feild:no_of_feild,
          
          
        
      //   })

      // }

      console.log('xxxxx',axios);
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
        
        <h2 className="heading">Add Division</h2>
        
        <form name="myForm" >


        <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.div_no}
              name="div_no"
              className="input"
              type="text"
              onChange={(event) => this.setState({ div_no: event.target.value })}
              placeholder="div_no" required/>
               {errors.div_no.length > 0 &&  
                 <span className='error'>{errors.div_no}</span>} 
          </div>
        </div>
      </div>
        
        <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.Div_location}
              name="Div_location"
              className="input"
              type="text"
              onChange={(event) => this.setState({ Div_location: event.target.value })}
              placeholder="Div_location" required/>
               {errors.Div_location.length > 0 &&  
                 <span className='error'>{errors.Div_location}</span>} 
          </div>
        </div>
      </div>

      

      {/* <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.feild_no}
              name="conductor_id"
              className="input"
              type="text"
              onChange={(event) => this.setState({ conductor_id: event.target.value })}
              placeholder="conductor_id" required/>
               {errors.conductor_id.length > 0 &&  
                 <span className='error'>{errors.conductor_id}</span>} 
          </div>
        </div>
      </div> */}

    

          {/* <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.feild_no}
              name="no_of_feild"
              className="input"
              type="text"
              onChange={(event) => this.setState({ no_of_feild: event.target.value })}
              placeholder="no_of_feild" required/>
               {errors.no_of_feild.length > 0 &&  
                 <span className='error'>{errors.no_of_feild}</span>} 
          </div>
        </div>
      </div> */}

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