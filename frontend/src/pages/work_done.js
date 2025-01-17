import React, {Component} from "react";
import "./App.css";
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";


class App extends Component {
  render() {
    return (
      <Register/>
    );
  }
}

class Register extends Component{
  constructor(props) {
    super(props);
  
    this.state =
     {
          labourer_id:null,
          work_assignmt:null,
          status:null,
          amount:null,
          field:null,
          division:null,
          date:new Date(),
          tableData:[],
          Ready:false,
    };
  }


  handleChange= (event)=> 
  {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(name)
    console.log(value)
    console.log(this.state.labourer_id)
   
  
    let errors = this.state.errors;
          
    switch (name) {
      case 'labourer_id': 
        errors.labourer_id = 
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


  handleLoad = async(e) => {
    const date = this.getDate();
    // this.setState({Ready:true});
    if(this.state.labourer_id.length != 10){
      alert("Invalid ID Format");
      this.setState({Ready:false});
    }
    
    else{
      this.setState({Ready:true})
    axios.get('http://localhost:8000/api/workDone/load/'+this.state.labourer_id).then(response =>{
      console.log(response.data);
      this.setState({labourer_id:response.data['lMobile']});
      this.setState({work_assignmt:response.data['description']});
       if(!response.data['description']){
        this.setState({Ready:false});
         alert("Labourer doesn't exists");
       }
      this.setState({field:response.data['fieldID']});
      this.setState({amount:response.data['amount']});
      this.setState({status:response.data['status']});
     console.log(this.state.work_assignmt);

     
    }).catch(function(error){
      console.log(error);
       })

      } 
       
      
  }


  handleBack = () => 
  {
    window.location.replace("/conductor/ConductorDailyWork");
  }


  handleSubmit = () => 
  {
    const { field , labourer_id, amount, status, work_assignmt } = this.state;
    const date = this.getDate();

          if(status) 
          {
            //work_assignment!= 'Plucking'
            axios({
              method: 'post',
              url: 'http://localhost:8000/api/WorkDone/submit',
              data: 
              {
                date:date,
                lMobile:labourer_id,
                description:work_assignmt,
                fieldID:field,
                amount:0 ,
                status:status
              }
            }).then(function (response) {
              console.log(response)
              alert(response.data);
            }).catch(function (error) {
              console.log(error)
              alert("workDone insertion failed" + "\n"+ error);
            });
        
          }
          // work_assignment == 'Plucking'
          else 
          {
            axios({
              method: 'post',
              url: 'http://localhost:8000/api/WorkDone/submit',
              data: 
              {
                date: date,
                lMobile: labourer_id,
                description: work_assignmt,
                fieldID: field,
                amount: amount,
                status: "Null"
              }
            }).then(function (response) {
              console.log(response)
              alert(response.data);
            }).catch(function (error) {
              console.log(error)
              alert("WorkDone Insertion failed" + "\n"+ error);
            });    
    }
    
  
  }


  getDate = () => 
  {
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

     
  render() {
    const {errors} = this.state;
  return (    
    <div className="App"
      style=
      {{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>

  <div className="wrapper">
    <h1 className="title">Evening Summary</h1>                                                          {/*   Evening Summary */}

        <form name="myForm" >
      
                  <div className="field">
                    <p>Laborer Mobile</p>                                                                {/* Laborer Mobile */}
                     <div className="field">
                      <div className="control">
                       <input value={this.state.labourer_id}
                          name="labourer_id"
                          className="input"
                          type="text"
                          onChange={(event) => this.setState({ labourer_id: event.target.value })}
                          placeholder="Labourer ID" required/>
                      </div>
                    </div>
                  </div>
      
     
            {!this.state.Ready ?
              <DatePicker className="date"                                                                            
                selected={this.state.date}
                  onChange={(date) => this.setState({ date })}/>
             : null}

            {!this.state.Ready ?
               <div className='submit'>
                 <button onClick={(e) => this.handleLoad(e)}>Load</button>
               </div>
            : null}

      {this.state.Ready ?
            <div className="field">
              <p>Work Type</p>
              <div className="field">
                <div className="control">
                  <input value={this.state.work_assignmt}
                    name="work_assignmt"
                    className="input"
                    type="text"
                    onChange={(event) => this.setState({ work_assignmt: event.target.value })}
                    placeholder="Work Assignmt" required/>              
                </div>
              </div>
            </div>
      : null}

      {this.state.Ready ?
          <div className="field">
             <p>fieldID</p>
              <div className="field">
                <div className="control">
                  <input value={this.state.field}
                    name="field"
                    className="input"
                    type="text"
                    onChange={(event) => this.setState({ field: event.target.value })}
                    placeholder="field" required/>
               </div>
              </div>
            </div>
      : null}

      {this.state.Ready && this.state.work_assignmt != 'Plucking' ?
           <div classname="input">
              <p>Status</p>
              <select className="form-control" placeholder = "status" value = {this.state.status} onChange={(event) => this.setState({ status: event.target.value })}>
                  <option value="None"> </option>
                  <option value="Completed">Completed</option>
                  <option value="Not Completed">Not Completed</option>
              </select>
          </div>
      : null}

      {this.state.Ready && this.state.work_assignmt == 'Plucking' ?
          <div className="field">
            <label className="label" ></label>
              <div className="field">
                <div className="control">
                  <p>Amount</p>
                  <input value={this.state.amount}
                  name="amount"
                  className="input"
                  type="number"
                  onChange={(event) => this.setState({ amount: event.target.value })}
                  placeholder="amount (kg)" required/>
                </div>
              </div>
           </div>
      : null}
      
      {this.state.Ready ?
          <div className='submit'>
               <button onClick={this.handleSubmit}>Submit</button>
          </div>
      : null}
   </form>

           <button type="submit" className="back" onClick={this.handleBack}>Back</button>
            
      </div>
    </div>
    
  );
}

}
render(<App />, document.getElementById('root'))
export default App;
