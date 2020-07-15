import React ,{Component} from "react";
import "./pays.css";
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
      expenseID:null,
      division:null,
      divNo:null,
      status:null,
      Ready: false,
      errors: {
        descriptions: '',
        amount: '',
        divNo:'',
        division:'',
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
   
  }
  

  handleSubmit = () => {
    const date = this.getDate();
     console.log(this.state.status);

    axios({
      method: 'post',
      url: 'http://localhost:8000/api/expenses/insert',
      data: {
        divExpenseID:this.state.divExpenseID,
        divNo: "None",
        expenseID:this.state.expense,
        descriptions:'null',
        date: this.getDate(),
        amount:this.state.amount,
        status:"New"
      }
    }).then(function (response) {
      console.log(response)
      alert(response.data);
    }).catch(function (error) {
      console.log(error)
      alert("Laborer insertion failed" + "\n"+ error);
    });
    // -----------------------------------------------------------

    const { description, amount,expense } = this.state;
    if (
      description == null ||
      amount == null 
    ) {
      alert("Success");
    } else if (expense.length != 10) {
      alert("Wrong Phone Number");
      window.location.reload();
    } 
  };



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

      <br/>
      <br/>
      <br/>
        <DatePicker className="date1" 
        selected={this.state.date}
        onChange={(date) => this.setState({ date })}
      />


<div className="wra" > 
  <h2 className="title">Expenditures</h2>
          <form className="form">
            <hr/>
  
  
 
 
  {
    this.state.officers.map((officer, index) => {
      return(
        <div className="form-row" key={index}>
    <div className="form-group-col-md-6" >
    <div className="field">
    <div classname="input">
    <div className="control">
       <select className="form-control" placeholder = "Month " value = {this.state.expense} onChange={(event) => this.setState({ expense: event.target.value })}>
                    <option value="None"> </option>
                    <option value="5">Maintenance</option>
                    <option value="6">Electricity</option>
                    <option value="7">phone</option>
                    <option value="9">fuel</option>
                    <option value="8">Vehicle Repairing</option>
                    <option value="10">Road tax</option>
                    <option value="11">Legal cases</option>
                    <option value="12">welfare</option>
                    <option value="13">Borrowing from Shop</option>
                    <option value="14">Chemical</option>
                    <option value="16">Hardware</option>
                  </select>
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
              onChange={(event) => this.setState({amount:event.target.value})}
              placeholder="amount" required/>
             
          </div>
        </div>
      </div>
    </div> 

  </div>

      )
    })
  }
  
  
      
      
  
 
  <button type="submit" className="btn-btn-success" onClick={this.handleSubmit}>Send</button>
</form>
<button type="submit" className="back" onClick={this.handleBack}>Back</button>
            
      </div>
      
      </div>       
      );      
    }
  }