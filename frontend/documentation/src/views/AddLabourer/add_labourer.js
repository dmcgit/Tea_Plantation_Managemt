import React, { Component } from "react";
import { render } from "react-dom";
import carfix from "./SunrisePeekTeaEstate.jpg";
import "./add_labourer.css";
import "../../pages/App.css";
import firebase from "../../config/firebase.js";

// import axios for http request handling
import axios from 'axios';

class App extends Component {
  render() {
    return <Register />;
  }
}

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      Phone_number: "",
      Nic:'',
      Name: "",
      Address: "",
      Status: "",

      value: "",
      errors: {
        Phone_number: "",
        Nic:'',
        Name: "",
        Address: "",
        Status: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "Phone_number":
        errors.Phone_number = validEmailRegex.test(value)
          ? "Phone_number must be 10 characters long!"
          : "";
        break;
      case "First_name":
        errors.First_name = validEmailRegex.test(value)
          ? "Full Name must be  characters long!"
          : "";
        break;
      case "Last_name":
        errors.Last_name = validEmailRegex.test(value) ? "" : " is not valid!";
        break;
      case "Address":
        errors.Address = validEmailRegex.test(value)
          ? "Password must be 8 characters long!"
          : "";
        break;
      case "Status":
        errors.Status = validEmailRegex.test(value)
          ? "Password must be 8 characters long!"
          : "";
        break;

      default: 
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleBack = () => {
    window.location.replace("/conductor/AddLabourer");
  };

  handleSubmit = () => {
            console.log("submit"); 
            console.log("nic"+this.state.Phone_number);
            console.log(this.state.Name);
           
            console.log(this.state.Address);
            console.log(this.state.Nic);
            
            
    // -----------------------------------------------------------
    // post request sample. URL should be according to the backend routes.
    // data should be the required request body data
    axios({ 
      method: 'post',
      url: 'http://localhost:8000/api/laborer/insert',
      data: {
        // laborerMobileNo: '0717556713',
        // laborerNIC: '123458882v',
        // laborerName: 'srimal',
        // laborerAddress: 'no100',
        // laborerStatus: 'Active'

        laborerMobileNo: this.state.Phone_number,
        laborerNIC: this.state.Nic,
        laborerName: this.state.Name,
        laborerAddress: this.state.Address,
        laborerStatus: 'Active'

      }
      

     
    }).then(function (response) {
      console.log(response)
      alert(response.data);
    }).catch(function (error) {
      console.log(error)
      alert("Laborer insertion faild" + "\n"+ error);
    });
    // -----------------------------------------------------------

    //const { Phone_number, First_name, Last_name, Address, Status } = this.state;
    // if (
    //   Phone_number == null ||
    //   First_name == "" ||
    //   Last_name == "" ||
    //   Address == ""
    // ) {
    //   alert("Please Complete all the details");
    // } else if (Phone_number.length != 10) {
    //   alert("Wrong Phone Number");
    //   window.location.reload();
    // }
    
    // else {
    //   // firebase
    //   //   .database()
    //   //   .ref("Labourer")
    //   //   .child(Phone_number)
    //   //   .update({
    //   //     First_name: First_name,
    //   //     Last_name: Last_name,
    //   //     Address: Address,
    //   //     Status: "Active"
    //   //   });
    //   // .then(() => alert("success"))
    //   // .catch(() => alert("fail"))
    // }

    alert("submitted") ;
  };
 

  render() {
    const { errors } = this.state;
    return (
      <div
        className="App"
        style={{
          backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
        }}
      >
        <div className="submit">
          <button onClick={this.handleBack}>Back</button>
        </div>
        <div className="wrapper">
          <h2 className="heading">Add Labourer</h2>

          <form name="myForm">

          <div className="field">
              <label className="label" />
              <div className="field">
                <div className="control">
                  <input
                    value={this.state.Nic}
                    name="Nic"
                    className="input"
                    type="text"
                    onChange={event =>
                      this.setState({ Nic: event.target.value })
                    }
                    placeholder="NIC"
                    required
                  />
                  {errors.Nic.length > 0 && (
                    <span className="error">{errors.Nic}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label" />
              <div className="field">
                <div className="control">
                  <input
                    value={this.state.Phone_number}
                    name="Phone_number"
                    className="input"
                    type="text"
                    onChange={event =>
                      this.setState({ Phone_number: event.target.value })
                    }
                    placeholder="Phone_number"
                    required
                  />
                  {errors.Phone_number.length > 0 && (
                    <span className="error">{errors.Phone_number}</span>
                  )}
                </div>
              </div>
            </div>

            

            <div className="field">
              <label className="label" />
              <div className="field">
                <div className="control">
                  <input
                    value={this.state.Name}
                    name="Name"
                    className="input"
                    type="text"
                    onChange={event =>
                      this.setState({ Name: event.target.value })
                    }
                    placeholder="Name"
                    required
                  />
                  {errors.Name.length > 0 && (
                    <span className="error">{errors.Name}</span>
                  )}
                </div>
              </div>
            </div>

           

            <div className="field">
              <label className="label" />
              <div className="field">
                <div className="control">
                  <input
                    value={this.state.Address}
                    name="Address"
                    className="input"
                    type="text"
                    onChange={event =>
                      this.setState({ Address: event.target.value })
                    }
                    placeholder="Address"
                    required
                  />
                  {errors.Address.length > 0 && (
                    <span className="error">{errors.Address}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="submit">
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
          </form>
        </div>
        >
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
export default App;