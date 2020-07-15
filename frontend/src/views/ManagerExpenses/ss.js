'use strict';
import React ,{Component} from "react";
import "./pay.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import carfix from "./SunrisePeekTeaEstate.jpg";
import DatePicker from "react-datepicker"; 
import MultiSelect from "@khanacademy/react-multi-select";
import firebase from "../../config/firebase.js"

import { render } from "react-dom";


class WorkAssign extends Component{
  constructor(props) {
    super(props);

    this.state = {
        selected1: [],
        selected2:[],
        date:new Date(),
      maintenance: null,
      m_amount: null,
      electricity: null,
      phone: null,
      veh_no: null,
      veh_amount: null,
      fuel: null,
      road_tax: null,
      case_no: null,
      le_amount: null,
      welfare: null,
      wel_amount: null,
      shop_no: null,
      last_paid: null,
      shop_amount: null,
      chemical: null,
      che_cost: null,
      fertilizer: null,
      ferti_amount: null,
      hardware: null,
      hard_amount: null,
      ready: false,
      showInputField1: false,
      showInputField2: false,
      showInputField3: false,
      showInputField4: false,
      showInputField5: false,
      showInputField6: false,
      showInputField7: false,
      showInputField8: false,
      showInput1: false,
      showInput2: false,
      showInput3: false,
      errors: {
        date:'',
        maintenance: '',
        m_amount: '',
        electricity: '',
        phone: '',
        veh_no: '',
        veh_amount: '',
        fuel: '',
        road_tax: '',
        case_no: '',
        le_amount: '',
        welfare: '',
        wel_amount: '',
        shop_no: '',
        last_paid: '',
        shop_amount: '',
        chemical: '',
        che_cost: '',
        fertilizer: '',
        ferti_amount: '',
        hardware: '',
        hard_amount: '',
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

  //  switch (name) {
  //     case 'text1': 
  //       errors.labourer_id = 
  //         value.length < 0
  //           ?'ID must be 4 characters long!'
  //           : '';
  //       break;
  //     case 'text2': 
  //       errors.work_assignmt = 
  //       value.length < 0
  //           ? 'this is not valid!'
  //           : '';
  //       break;
  //     case 'text3': 
  //       errors.amount = 
  //         value.length < 0 
  //           ? 'amount must be a number'
  //           : '';
  //       break;
  //     default:
  //       break;
  //   }
   
  }
  

  handleSubmit = () =>{
   const{
    maintenance,
    m_amount,
    electricity,
    phone,
    veh_no,
    veh_amount,
    fuel,
    road_tax,
    case_no,
    le_amount,
    welfare,
    wel_amount,
    shop_no,
    last_paid,
    shop_amount,
    chemical,
    che_cost,
    fertilizer,
    ferti_amount,
    hardware,
    hard_amount,
   }=this.state;

   const date=this.getDate();

   const expenses = {
    'Maintenance': { 'amount': m_amount },
    'Electricity': { 'amount': electricity },
    'Phone': { 'amount': phone },
    'Road_tax': { 'amount': road_tax },
    'Vehicle_repairing': { 'veh_no': veh_no, 'amount': veh_amount },
    'Fuel': { 'amount': fuel },
    'Legal': { 'case_no': case_no, 'amount': le_amount },
    'Welfare': { 'welfare': welfare, 'amount': wel_amount },
    'Shop': { 'shop_no': shop_no, 'last_paid': last_paid, 'amount': shop_amount },
    'Chemical': { 'chemical': chemical, 'amount': che_cost },
    'Fertilizer': { 'fertilizer': fertilizer, 'amount': ferti_amount },
    'Hardware': { 'hardware': hardware, 'amount': hard_amount },
   }

   firebase.database().ref('Expenses').child(date).update(expenses)
   .then(() => console.log("YES"))
   .catch(() => console.log("NO"));
  }


  onSelect1(selected) {
    if(Object.keys(selected).length == 8) {
      selected.forEach((index) => {
        const stateTrigger = "showInputField" + index;
        this.setState({[stateTrigger]: true}); 
      })
    }
    else if(Object.keys(selected).length == 0) {
      let count = 1;
      while(count <= 8) {
        const stateTrigger = "showInputField" + count;
        this.setState({[stateTrigger]: false});
        count++;
      }
    }
    else {
      const currentSelected = this.state.selected1;
      const added = selected.filter((index) => !currentSelected.includes(index));
      const removed = currentSelected.filter((index) => !selected.includes(index));
      const index = added.concat(removed);
      const stateTrigger = "showInputField" + index[0];
      this.setState({[stateTrigger]: !this.state[stateTrigger]});
    } 
    this.setState({selected1: selected});
  }

  onSelect2(selected) {
    if(Object.keys(selected).length == 3) {
      selected.forEach((index) => {
        const stateTrigger = "showInput" + index;
        this.setState({[stateTrigger]: true}); 
      })
    }
    else if(Object.keys(selected).length == 0) {
      let count = 1;
      while(count <= 3) {
        const stateTrigger = "showInput" + count;
        this.setState({[stateTrigger]: false});
        count++;
      }
    }
    else {
      const currentSelected = this.state.selected2;
      const added = selected.filter((index) => !currentSelected.includes(index));
      const removed = currentSelected.filter((index) => !selected.includes(index));
      const index = added.concat(removed);
      const stateTrigger = "showInput" + index[0];
      this.setState({[stateTrigger]: !this.state[stateTrigger]});
    } 
    this.setState({selected2: selected});
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

    let dateString = dd + '-' + mm + '-' + yyyy;

    return dateString;
  }
  
  // onSelect2(selected2){
  //   const currentSelected = this.state.selected2;
  //   const added = selected2.filter((index) => !currentSelected.includes(index));
  //   const removed = currentSelected.filter((index) => !selected2.includes(index));
  //   const index = added.concat(removed);
  //   const stateTrigger = "showInputField" + index[0];
  //   this.setState({
  //       selected: selected2,
  //       [stateTrigger]: !this.state[stateTrigger]
  //   }); 
  // }


  
  handleBack = () => {
    window.location.replace("/manager/ExpensesHandling");
  
  }
    render() {   
        const options = [
            {label: "Electricity", value: 1},
            {label: "Phone", value: 2},
            {label: "Vehicle Repairing", value: 3},
            {label: "Fuel", value: 4},
            {label: "Road Tax", value: 5},
            {label: "Legal", value: 6},
            {label: "Welfare/Donations", value: 7},
            {label: "Borrowing from Shops", value: 8},
            
          ];

          const option = [
            {label: "Chemical", value: 1},
            {label: "Fertilizer", value: 2},
            {label: "Hardware", value: 3},
          ];
          const {selected1} = this.state;
          const {selected2} = this.state;
       
      
return(  
<div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}
      
    >
       <DatePicker className="date1" 
        selected={this.state.date}
        onChange={(date) => this.setState({ date })}
      />
    
<div className="wrap">

      < div className="heading">
          <h2>Expenditures</h2>
      </div>

 <form>

    <h4>Miscellaneous</h4>

    <div className="form-row" >

       <div className="form-group-col-md-6" >
          <input type="text" value={this.state.maintenance} name="maintenance" className="form-control" onChange={(event) => this.setState({ maintenance: event.target.value })} placeholder="Maintenance"/>
       </div>

       <div className="form-group-col-md-6">
          <input type="text" className="form-control" value={this.state.m_amount} name="m_amount" onChange={(event) => this.setState({ m_amount: event.target.value })} placeholder="Amount (Rs)"/>
       </div>
       
    </div>
 

  <h4>Utility</h4>  
<hr/>
  <MultiSelect className="dropdown"
      options={options}
      selected={selected1}
      onSelectedChanged={selected => {this.onSelect1(selected)}}
    />
  <div className="form-row">

       {this.state.showInputField1 ?
       <div className="form-group-col-md-6" >
       <label>Electricity</label>
            <input type="text" className="form-control"  value={this.state.electricity} name="electricity" onChange={(event) => this.setState({ electricity: event.target.value })} placeholder="Electricity (Rs)"/>
       </div>
       :null}

       {this.state.showInputField2 ?
       <div className="form-group-col-md-6">
       <label>Phone</label>
            <input type="text" className="form-control"  value={this.state.phone} name="phone" onChange={(event) => this.setState({ phone: event.target.value })} placeholder="Phone (Rs)"/>
       </div>
       :null}

  </div>


  {this.state.showInputField3 ?
  <div className="form-row">

        <div className="form-group-col-md-6" >
        <label>Vehicle Number</label>
            <input type="text" className="form-control"  value={this.state.veh_no} name="veh_no" onChange={(event) => this.setState({ veh_no: event.target.value })} placeholder="Vehicle_no"/>
        </div>

        <div className="form-group-col-md-6">
        <label>Charge</label>
            <input type="text" className="form-control"  name="veh_amount" value={this.state.veh_amount} onChange={(event) => this.setState({ veh_amount: event.target.value })} placeholder="Amount (Rs)"/>
        </div>

  </div>
  :null}


  <div className="form-row">

       {this.state.showInputField4 ?
       <div className="form-group-col-md-6" >
       <label>Fuel</label>
           <input type="text" className="form-control"  value={this.state.fuel} name="fuel" onChange={(event) => this.setState({ fuel: event.target.value })} placeholder="Fuel (Rs)"/>
       </div>
       :null}

       {this.state.showInputField5 ?
       <div className="form-group-col-md-6">
       <label>Road Tax</label>
           <input type="text" className="form-control" value={this.state.road_tax} name="road_tax" onChange={(event) => this.setState({ road_tax: event.target.value })} placeholder="Rd_tax (Rs)"/>
       </div>
       :null}

  </div>


  {this.state.showInputField6 ?
  <div className="form-row">

       <div className="form-group-col-md-6" >
       <label>Case Number</label>
             <input type="text" className="form-control"  value={this.state.case_no} name="case_no" onChange={(event) => this.setState({ case_no: event.target.value })} placeholder="Case_no"/>
       </div>

       <div className="form-group-col-md-6">
       <label>Charge</label>
             <input type="text" className="form-control" value={this.state.le_amount} name="le_amount" onChange={(event) => this.setState({ le_amount: event.target.value })} placeholder="Amount (Rs)"/>
       </div>

  </div>
  :null}


  {this.state.showInputField7 ?
  <div className="form-row">

       <div className="form-group-col-md-6" >
       <label>Welfare</label>
             <input type="text" className="form-control"  value={this.state.welfare} name="welfare" onChange={(event) => this.setState({ welfare: event.target.value })} placeholder="Welfare"/>
       </div>

       <div className="form-group-col-md-6">
       <label>Charge</label>
             <input type="text" className="form-control"  value={this.state.wel_amount} name="wel_amount" onChange={(event) => this.setState({ wel_amount: event.target.value })} placeholder="Amount (Rs)"/>
       </div>

    </div>
    :null}


    {this.state.showInputField8 ?
    <div className="form-row">

       <div className="form-group-col-md-2" >
       <label>Shop Number</label>
             <input type="text" className="form-control"  value={this.state.shop_no} name="shop_no" onChange={(event) => this.setState({ shop_no: event.target.value })} placeholder="Shop_no"/>
       </div>

       <div className="form-group-col-md-2">
       <label>Last Paid</label>
             <input type="text" className="form-control" value={this.state.last_paid} name="last_paid" onChange={(event) => this.setState({ last_paid: event.target.value })} placeholder="LastPaidDate"/>
       </div>

       <div className="form-group-col-md-2">
       <label>Charge</label>
             <input type="text" className="form-control"  value={this.state.shop_amount} name="shop_amount" onChange={(event) => this.setState({ shop_amount: event.target.value })} placeholder="Amount (Rs)"/>
       </div>

  </div>
  :null}
  <br/>
  

  <h4>Other</h4>
<hr/>
  <MultiSelect
      options={option}
      selected={selected2}
      onSelectedChanged={selected => {this.onSelect2(selected)}}
    />
  {this.state.showInput1 ?
  <div className="form-row">

      <div className="form-group-col-md-6" >
      <label>Chemical</label>
             <input type="text" className="form-control"  value={this.state.chemical} name="chemical" onChange={(event) => this.setState({ chemical: event.target.value })}  placeholder="Chemical"/>
      </div>

      <div className="form-group-col-md-6">
      <label>Cost</label>
             <input type="text" className="form-control" value={this.state.che_cost} name="che_cost"  onChange={(event) => this.setState({ che_cost: event.target.value })} placeholder="Amount (Rs)"/>
      </div>

  </div>
  :null}

  {this.state.showInput2 ?
  <div className="form-row">

      <div className="form-group-col-md-6" >
      <label>Fertilizer</label>
             <input type="text" className="form-control" value={this.state.fertilizer} name="fertilizer" onChange={(event) => this.setState({ fertilizer: event.target.value })} placeholder="Fertilizer"/>
      </div>

      <div className="form-group-col-md-6">
      <label>Cost</label>
             <input type="text" className="form-control" value={this.state.ferti_amount} name="ferti_amount" onChange={(event) => this.setState({ ferti_amount: event.target.value })} placeholder="Amount (Rs)"/>
      </div>

  </div>
  :null}


  {this.state.showInput3 ?
  <div className="form-row">

      <div className="form-group-col-md-6" >
      <label>Hardware</label>
             <input type="text" className="form-control" value={this.state.hardware} name="hardware" onChange={(event) => this.setState({ hardware: event.target.value })} placeholder="Hardware"/>
      </div>

      <div className="form-group-col-md-6">
      <label>Cost</label>
             <input type="text" className="form-control" value={this.state.hard_amount} name="hard_amount" onChange={(event) => this.setState({ hard_amount: event.target.value })} placeholder="Amount (Rs)"/>
      </div>

  </div>
  :null}
 <br/>
 <br/>
 
  <button type="submit" className="btn-btn-primary" onClick={this.handleSubmit}>Send</button>
    
  


 </form>
 <button type="submit" className="back" onClick={this.handleBack}>Back</button>
</div>
     </div> 
    );      
  }
}



export default WorkAssign;