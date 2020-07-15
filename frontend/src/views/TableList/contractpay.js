import React ,{Component} from "react";
import "./pay.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import carfix from "./SunrisePeekTeaEstate.jpg";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../../config/firebase.js";
import axios from "axios";

export default class ContractPay extends Component {
    
  constructor(props) {
    super(props);
  
    this.state = {
      date: new Date(),
      descriptions:null,
      amount:null,
      divExpenseID:null,
      expenseID:"2",
      division:null,
      labourers: [{descriptions: '', amount: '', divExpenseID: ''}],
      divNo:null,
      status:null,
      Ready: false,

    };
  }

  handleChange= (event)=> {
    const { name, value } = event.target;
    this.setState({ [name]: value });
       
  }
  

  handleSubmit = () => {
    const { division, labourers } = this.state;
    const date = this.getDate();    

    Promise.all(labourers.map((labourer) => {
      axios({
        method: 'post',
        url: 'http://localhost:8000/api/expenses/insert',
        data: {
          divExpenseID:labourer.divExpenseID,
          divNo:localStorage.getItem('currentUserDivision'),
          expenseID: "2",
          descriptions:labourer.descriptions,
          date: this.getDate(),
          amount:labourer.amount,
          status:"New"
        }
      })
    }))
    .then(function (response) {
      console.log(response)
      alert("Successfully inserted");
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
      labourers: this.state.labourers.concat([{descriptions: '', amount: '', divExpenseID: ''}])
    })
  }


  handleRemoveInput = (event, index) => {
    event.preventDefault();
    let labourers = this.state.labourers;
    labourers.splice(index, 1);
    this.setState({ labourers })
  }


  handleOnChangeLabourerID = (event, index) => {
    event.preventDefault();
    let labourers = this.state.labourers.slice();
    labourers[index].descriptions = event.target.value;
    this.setState({ labourers })
  }


  handleOnChangeamount = (event, index) => {
    event.preventDefault();
    let labourers = this.state.labourers.slice();
    labourers[index].amount = event.target.value;
    this.setState({ labourers })
  }

  handleOnChangedivExpenseID = (event, index) => {
    event.preventDefault();
    let labourers = this.state.labourers.slice();
    labourers[index].divExpenseID = event.target.value;
    this.setState({ labourers })
  }


  handleBack = () => {
    window.location.replace("/conductor/ExpensesHandling");
  
  }

    render () {
      return (
       
 <div className="App"
      style=
      {{
        backgroundImage: `url(${carfix})`
      }}
      
 >
 <br/> <br/> <br/>
        <DatePicker className="date1" 
        selected={this.state.date}
        onChange={(date) => this.setState({ date })} />


<div className="wrapp" style={{width:1050,height:450}}> 
  <h2 className="title">Contract Payments</h2>
          <form className="form">
            <hr/>
              {
  this.state.labourers.map((labourer, index) => {
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
                        onChange={(event) => this.handleOnChangeLabourerID(event, index)}
                        placeholder="Labourer ID" required/>
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
        <button type="submit" className="btn-btn-success2" onClick={this.handleAddInput}>Add</button>
        <button type="submit" className="btn-btn-success3" onClick={this.handleSubmit}>Send</button>

 
 </form>
 <br/><br/><br/>
<button type="submit" className="back" onClick={this.handleBack}>Back</button>
            
  </div>
</div>       
      );      
    }
  }