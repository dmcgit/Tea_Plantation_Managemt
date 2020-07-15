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

        Division_no:null,
        field_no:null,
        field_type:null,
        crop_type:null,
        replantation_date:null,
        status:null,
       
       

        value: '',
        errors: {
        Division_no:'' ,   
        Field:'',
        field_no:'',
        field_type:'',
        crop_type:'',
        replantation_date:'',
        status:'',
        
      
        
          }
    };
     
    }
    handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
  
      switch (name) {
        case 'Division_no': 
          errors.Division_no = 
          validEmailRegex.test(value)
              ? 'Phone_number must be 10 characters long!'
              : '';
          break;
        case 'feild_no': 
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
      window.location.replace("/Admin/Field");
    
    }
    handleSubmit = () => {

      axios.post('http://localhost:8000/api/field/delete/'+ this.state.field_no
      ).then(res => console.log(res.data)); 

    //  event.preventDefault();
    //   const{Division_no,field_type,field_no,crop_type,replantation_date,status} = this.state;
     
      
       
    //     firebase.database().ref("Division").child(Division_no).child(field_no).update({
            
            
           
    //         status:"Delete"
          
        
    //     })
        alert("Field Deleted");
        window.location.replace("/Admin/Field");
        // .then(() => alert("success"))
        // .catch(() => alert("fail"))
        
      
      
      
      // else(firebase.database().ref("Division").child(feild){
        
      //   firebase.database().ref("Division").child(Division_no).update({
          
      //     conductor_name:conductor_name,
      //     conductor_id:conductor_id,
      //     no_of_feild:no_of_feild,
          
          
        
      //   })

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
        
        <h2 className="heading">Delete Field</h2>
        
        <form name="myForm" >
{/* 

        <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.field_no}
              name="field_no"
              className="input"
              type="text"
              onChange={(event) => this.setState({ field_no: event.target.value })}
              placeholder="field_no" required/>
               {errors.field_no.length > 0 &&  
                 <span className='error'>{errors.field_no}</span>} 
          </div>
        </div>
      </div>
        
         <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.field_no}
              name="field_no"
              className="input"
              type="text"
              onChange={(event) => this.setState({ field_no: event.target.value })}
              placeholder="field_no" required/>
               {errors.field_no.length > 0 &&  
                 <span className='error'>{errors.field_no}</span>} 
          </div>
        </div>
      </div> */}
      
      

      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.field_no}
              name="field_no"
              className="input"
              type="text"
              onChange={(event) => this.setState({ field_no: event.target.value })}
              placeholder="field_no" required/>
               {errors.field_no.length > 0 &&  
                 <span className='error'>{errors.field_no}</span>} 
          </div>
        </div>
      </div>

      {/* <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.replantation_date}
              name="replantation_date"
              className="input"
              type="text"
              onChange={(event) => this.setState({ replantation_date: event.target.value })}
              placeholder="replantation_date" required/>
               {errors.replantation_date.length > 0 &&  
                 <span className='error'>{errors.replantation_date}</span>} 
          </div>
        </div>
      </div>  */}
      {!this.state.Ready ?
      <div className='submit'>
              <button onClick={this.handleSubmit}>Delete</button>
       </div>
       : null}

        </form>
        </div>>
        </div>
        
      );
    }
  }

  render(<App/>, document.getElementById('root'))
 export default App;