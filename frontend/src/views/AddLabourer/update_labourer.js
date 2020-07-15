import React, {Component} from "react";
import "./Apps.css";
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";

import axios from 'axios';

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
          phoneNo: '',
          nic:'-',
          name:'-',
          address:'-',
          Ready:false,
          error: null,
        };
      }
      handleBack = () => {
        window.location.replace("/conductor/AddLabourer");
      };
    
    
      onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
      handleLoad = async (e) => {
        localStorage.setItem('laborerUpdate', this.state.phoneNo);
        console.log(localStorage.getItem('laborerUpdate'));
        this.setState({Ready:true});
        axios.get('http://localhost:8000/api/laborer/get/'+localStorage.getItem('laborerUpdate')).then(response=>{
          this.setState({nic:response.data['nic']});
          this.setState({mobile:response.data['mobile_no']});
          this.setState({name:response.data['name']});
          this.setState({address:response.data['address']});
       
          console.log(response.data);
          console.log(this.state.Ready);
          //this.setNewEndDate();
         }).catch(function(error){
           console.log(error);
         });
     console.log(this.state.Ready);
      }

      handleSubmit = () => {
        
        axios({
          method: 'post',
          url: 'http://localhost:8000/api/laborer/update',
          data: {
            laborerNIC:this.state.nic,
            laborerName:this.state.name,
            laborerAddress:this.state.address,
            laborerMobileNo:this.state.mobile,  
            laborerStatus:"Active"}
        }).then(function (response) {
          console.log(response)
          alert(response.data);
        }).catch(function (error) {
          console.log(error)
          alert("Data Updation failed" + "\n"+ error);
        });
        //window.location.replace("/updateLaborer");
   
      };
     
  render() {
    const { phoneNo, error } = this.state;
    const isInvalid =phoneNo === '';
  return (
    
    <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>
    
    <div className="submit">
          <button onClick={this.handleBack}>Back</button>
        </div>
      
    <div className="wrapper">
  <h2 className="heading">Update Laborer</h2>

      <form onSubmit={this.onSubmit} >
      {!this.state.Ready ?
      <div classname="input">
          
          <input className="input"
          name="phoneNo"
          value={phoneNo}
          onChange={this.onChange}
          type="text"
          placeholder="Phone No"
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
        <p >NIC</p>
        <div className="field">
          <div className="control">
            <input value={this.state.nic}
              name="amount"
              className="input"
              type="text"
              onChange={(event) => this.setState({ nic: event.target.value })}
              placeholder={this.state.nic} required/>
              {/* {errors.amount.length > 0 && 
                <span className='error'>{errors.amount}</span>} */}
          </div>
        </div>
      </div>
      : null}
       {this.state.Ready ?
        <div className="field">
       <p >Mobile Number</p>
        <div className="field">
          <div className="control">
            <input value={this.state.phoneNo}
              name="amount"
              className="input"
              type="text"
              onChange={(event) => this.setState({ phoneNo: event.target.value })}
              placeholder={this.state.phoneNo} required/>
              {/* {errors.amount.length > 0 && 
                <span className='error'>{errors.amount}</span>} */}
          </div>
        </div>
      </div>
      : null}
       {this.state.Ready ?
        <div className="field">
        <p >Name</p>
        <div className="field">
          <div className="control">
            <input value={this.state.name}
              name="amount"
              className="input"
              type="text"
              onChange={(event) => this.setState({ name: event.target.value })}
              placeholder={this.state.name} required/>
              {/* {errors.amount.length > 0 && 
                <span className='error'>{errors.amount}</span>} */}
          </div>
        </div>
      </div>
      : null}
       {this.state.Ready ?
        <div className="field">
        <p >Address</p>
        <div className="field">
          <div className="control">
            <input value={this.state.address}
              name="amount"
              className="input"
              type="text"
              onChange={(event) => this.setState({ address: event.target.value })}
              placeholder={this.state.address} required/>
              {/* {errors.amount.length > 0 && 
                <span className='error'>{errors.amount}</span>} */}
          </div>
        </div>
      </div>
      : null}

      {this.state.Ready ?
        <button disabled={isInvalid} type="submit" onClick={this.handleSubmit}>
          Update
        </button>
        :null}
      </form>

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