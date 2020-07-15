import React, { Component } from 'react';
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
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
        Location:null,
        // conductor:null,
        conductor_name:null,
        conductor_id:null,
        no_of_feild:null,
        status:null,
        loaded:false,
       Ready:false,

        value: '',
        errors: {
        Division_no:'',
        Location:'',
        search_Division_no:'',
        // conductor:"",
        conductor_name:"",
        conductor_id:"",
        no_of_feild:'',
        status:''
      
        
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
        case 'conductor_id': 
          errors.conductor_id = 
            validEmailRegex.test(value)
              ? ''
              : ' is not valid!';
          break;
        case 'conductor_name': 
          errors.conductor_name = 
          validEmailRegex.test(value)
              ? 'Password must be 8 characters long!'
              : '';
          break;
          case 'no_of_feild': 
          errors.no_of_feild = 
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
    // handleLoad = (event)  =>{
    //     event.preventDefault();
    //     const search_Division_no = this.state.search_Division_no;
 
    //     firebase.database().ref('Division').child(search_Division_no).once('value',(snapshot) => {
    //       if(snapshot.exists()){
    //       this.setState({
    //         Division_no     : search_Division_no,
    //         conductor_id    : snapshot.val().conductor_id,
    //         conductor_name  : snapshot.val().conductor_name,
    //         no_of_feild     : snapshot.val().no_of_feild,
    //         loaded          : true,
 
    //       })
    //       }
    //       else{
    //         alert('User not exist.');
    //         window.location.replace("/Admin/Division");
    //       }
    //     })
    //   }
    
    // handleBack = () => {
    //   window.location.replace("/Admin/Division");
    
    // }
    
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
    handleLoad = async (e) => {
      localStorage.setItem('divisionUpdate', this.state.Division_no);
      console.log(localStorage.getItem('divisionUpdate'));
      this.setState({Ready:true});
      axios.get('http://localhost:8000/api/division/get/'+localStorage.getItem('divisionUpdate')).then(response=>{
        this.setState({Division_no:response.data['divno']});
        this.setState({Location:response.data['location']});
        // this.setState({name:response.data['name']});
         this.setState({Ready:true});
     
        console.log(response.data);
        console.log(this.state.Ready);
        //this.setNewEndDate();
       }).catch(function(error){
         console.log(error);
       });
   console.log(this.state.Ready);
    }
 handleBack = () => {
      window.location.replace("/Admin/Division");
    
    }
    handleSubmit = () => {
     
      axios({
        method: 'post',
        url: 'http://localhost:8000/api/division/update',
        data: {
          divisionDIVNO:this.state.Division_no,
          divisionLocation:this.state.Location,
           
          }
      }).then(function (response) {
        console.log(response)
        alert(response.data);
      }).catch(function (error) {
        console.log(error)
        alert("Data Updation failed" + "\n"+ error);
      });



      // event.preventDefault();
      // const{Division_no,search_Division_no,conductor,conductor_name,conductor_id,no_of_feild} = this.state;
       
      // if(Division_no == null || conductor_id ==null ||conductor_name ==null || no_of_feild==null){
      //   alert("Please Complete all the details");
      // }

      // else{
      //   if(search_Division_no!==Division_no){
      //     firebase.database().ref("Division").child(search_Division_no).remove();
      //   }
       
      //   firebase.database().ref("Division").child(Division_no).update({
          
      //     conductor_name:conductor_name,
      //     conductor_id:conductor_id,
      //     no_of_feild:no_of_feild,
      //     Status:"Active",
          
        
      //   })
      //   .then(() => {
      //     this.setState({
      //       search_Division_no:'',
      //       conductor_id:'',
      //       conductor_name:'',
      //       no_of_feild:'',
      //       loaded:false,
      //     })
      //     alert("Division Updated");
      //     window.location.replace("/Admin/Division");
      //   })
        
      //   // .then(() => alert("success"))
      //   // .catch(() => alert("fail"))
        
      
      // }
      
      // else(firebase.database().ref("Division").child(feild){
        
      //   firebase.database().ref("Division").child(Division_no).update({
          
      //     conductor_name:conductor_name,
      //     conductor_id:conductor_id,
      //     no_of_feild:no_of_feild,
          
          
        
      //   })

      // }
  }


    
    
    render() {
      const {Division_no,isInvalid,error,errors} = this.state;
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
        
        <h2 className="heading">Update Division</h2>
        
        
        <form onSubmit={this.onSubmit} >
      {!this.state.Ready ?
      <div classname="input">


          <input className="input"
          name="Division_no"
          value={Division_no}
          onChange={this.onChange}
          type="text"
          placeholder="Division_no"
        />
        </div>
          :null}
        {!this.state.Ready ?
        <button disabled={isInvalid} type="submit" onClick={this.handleLoad}>
          Load Data
        </button>
        :null}

        {error && <p>{error.message}</p>}
        
       
      {this.state.Ready ?
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <p >Division No</p>
          <div className="control">
            <input value={this.state.Division_no}
              name="Division_no"
              className="input"
              type="text"
              onChange={(event) => this.setState({ Division_no: event.target.value })}
              placeholder={this.state.Division_no} required/>
               {errors.Division_no.length > 0 &&  
                 <span className='error'>{errors.Division_no}</span>} 
          </div>
        </div>
      </div>
      : null}

      {this.state.Ready ? 
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <p>Location</p>
          <div className="control">
            <input value={this.state.Location}
              name="Location"
              className="input"
              type="text"
              onChange={(event) => this.setState({ Location: event.target.value })}
              placeholder={this.state.location} required/>
               {errors.Location.length > 0 &&  
                 <span className='error'>{errors.Location}</span>} 
          </div>
        </div>
      </div>
      :null}  
      

      {this.state.Ready ?
      <div className='submit'>
              <button onClick={this.handleSubmit}>Submit</button>
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