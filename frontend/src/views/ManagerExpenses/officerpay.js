import React ,{Component} from "react";
import "./Apps.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import carfix from "./SunrisePeekTeaEstate.jpg";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../../config/firebase.js";
import axios from "axios";

export default class OfficerPay extends Component {
    
  constructor(props) {
    super(props);
  
    this.state = {
      date: new Date(),
      descriptions:null,
      amount:null,
      divExpenseID:null,
      expenseID:"4",
      division:localStorage.getItem('currentUserDivision'),
      officers: [{descriptions: '', amount: '', divExpenseID: ''}],
      divNo:null,
      status:null,
      Ready: false,
      errors: {
        descriptions: '',
        amount: '',
        divNo:'',
        division:'division_1',
        date:'',
        divExpenseID:'',
        expenseID:'',
        status:''
      }
    };
  }

  handleChange= (event)=> {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(name)
    console.log(value)
    console.log(this.state.descriptions)

    let errors = this.state.errors;

   switch (name) {
      case 'text1': 
        errors.descriptions = 
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
  

  handleSubmit = () => {
    const { division, officers } = this.state;
    const date = this.getDate();
     console.log(this.state.status);
    
    Promise.all(officers.map((officer) => {
      axios({
        method: 'post',
        url: 'http://localhost:8000/api/expenses/insert',
        data: {
          divExpenseID:officer.divExpenseID,
          divNo: "div1",
          expenseID: "4",
          descriptions:officer.descriptions,
          date: this.getDate(),
          amount:officer.amount,
          status:"New"
        }
      })
    }))
    .then(function (response) {
      console.log(response)
      alert("Successfully Inserted");
    }).catch(function (error) {
      console.log(error)
      alert("Laborer insertion failed" + "\n"+ error);
    });

  }


  getDate = () => {
    let date = new Date();
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


  handleAddInput = (e) => {
    e.preventDefault();
    this.setState({
      officers: this.state.officers.concat([{descriptions: '', amount: '', divExpenseID: ''}])
    })
  }


  handleRemoveInput = (event, index) => {
    event.preventDefault();
    let officers = this.state.officers;
    officers.splice(index, 1);
    this.setState({ officers })
  }


  handleOnChangeofficerID = (event, index) => {
    event.preventDefault();
    let officers = this.state.officers.slice();
    officers[index].descriptions = event.target.value;
    this.setState({ officers })
  }


  handleOnChangeamount = (event, index) => {
    event.preventDefault();
    let officers = this.state.officers.slice();
    officers[index].amount = event.target.value;
    this.setState({ officers })
  }

  handleOnChangedivExpenseID = (event, index) => {
    event.preventDefault();
    let officers = this.state.officers.slice();
    officers[index].divExpenseID = event.target.value;
    this.setState({ officers })
  }


  handleBack = () => {
    window.location.replace("/manager/ExpensesHandling");
  
  }

    render () {
      let { officers } = this.state;

      return (
       
        <div
      className="App"
      style={{
        backgroundImage: `url(${carfix})`
      }}
      
    >

      <br/> <br/><br/>
        <DatePicker className="date1" 
        selected={this.state.date}
        onChange={(date) => this.setState({ date })}
      />


<div className="wrapp" style={{width:1050,height:450}}> 
  <h2 className="title">Officers' Payments</h2>
          <form className="form">
            <hr/> 
  {
    this.state.officers.map((officer, index) => {
      return(
        <div className="form-row" key={index}>
    <div className="form-group-col-md-6" >
      
    <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.descriptions}
             type="text"
              name="descriptions"
              className="form-control"
              type="text"
              onChange={(event) => this.handleOnChangeofficerID(event, index)}
              placeholder="officer ID" required/>
         
          </div>
        </div>
      </div>
    </div>
    <div className="form-group-col-md-6">
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
             <input value={this.state.amount}
             type="text"
              name="amount"
              className="form-control"
              type="text"
              onChange={(event) => this.handleOnChangeamount(event, index)}
              placeholder="amount" required/>
             
          </div>
        </div>
      </div>
    </div>

    <div className="form-group-col-md-6">
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <button type="submit" className="btn-btn-success" onClick={(event) => this.handleRemoveInput(event, index)}>Remove</button>
        </div>
      </div>
    </div>
</div>

      )
    })
  }    
  
  <button type="submit" className="btn-btn-success2"  onClick={this.handleAddInput}>Add</button>
  <button type="submit" className="btn-btn-success3" onClick={this.handleSubmit}>Send</button>
 
</form>
<br/><br/><br/>
<button type="submit" className="back" onClick={this.handleBack}>Back</button>
            
      </div>
      
      </div>       
      );      
    }
  }