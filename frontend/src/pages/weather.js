import React, {Component} from "react";
import "./App.css";
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
import firebase from "../config/firebase.js";
import DatePicker from "react-datepicker";

//date input
import "react-datepicker/dist/react-datepicker.css";

// import axios for http request handling
import axios from 'axios';



class App extends Component {
  render() {
    return (
      <Register />

    );
  }
}

const weatherKey = "908e3fa4fa642c99e912a2c9e1ea72f6";

class Register extends Component{
  constructor(props) {
    super(props);

    this.state = {
      city : undefined,
      weather: undefined,
      temper: undefined,
      humidity: undefined,

      field: 'field_1',
      division:localStorage.getItem('currentUserDivision'),
      // date:null,
      date: new Date(),
      Ready: false,
      errors: {
        weather: '',
        date:'',
      }
    };
    this.getWeather();
  }

  //weather api
  getWeather = async() =>{
    const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Colombo,LK&appid=${weatherKey}`);

    const response = await apiCall.json();

    console.log(response);

    this.setState({
      weather : response.weather[0].description,
      city : response.name,
      temper : (response.main.temp - 273.15),
      humidity : response.main.humidity
    });
  }

  handleChange= (event)=> {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(name)
    console.log(value)
    console.log(this.state.weather)


    let errors = this.state.errors;




  }

  handleSubmit = () => {
    const { division,field, weather, city, temper, humidity } = this.state;
    const date = this.getDate();

    axios({
      method: 'post',
      url: 'http://localhost:8000/api/weather/insert',
      data: {
        weatherDivision: division,
        weatherDate: date,
        weatherStatus: weather
      }
    }).then(function (response) {
      console.log(response)
      alert(response.data);
    }).catch(function (error) {
      console.log(error)
      alert("Weather recording faild" + "\n"+ error);
    });
    window.location.replace("/conductor/ConductorDailyWork");


  }
//testnew


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

    let dateString = yyyy + '-' + mm + '-' + dd;

    return dateString;
  }

  handleBack = () => {
    window.location.replace("/conductor/ConductorDailyWork");

  }

  render() {
    const {errors} = this.state;
  return (

    <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}

    >



    <div className="wrapper">
  <h2 className="heading">Weather</h2>

      <form name="myForm" >

     <DatePicker className="date"
        selected={this.state.date}
        onChange={(date) => this.setState({ date })}
      />

      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.weather}
              name="weather"
              className="input"
              type="text"
              onChange={(event) => this.setState({ weather: event.target.value })}
              placeholder="weather" required/>
              {/* {errors.labourer_id.length > 0 &&
                <span className='error'>{errors.labourer_id}</span>} */}
          </div>
        </div>
      </div>

      <div className="field">
      <label className="label2"> {this.state.city}</label>
      </div>

      <div className="field">
      <label>Temperature: {this.state.temper}°c</label>
      </div>

      <div className="field">
      <label>Humidity: {this.state.humidity}%</label>
      </div>




      <div className='submit'>
              <button onClick={this.handleSubmit}>Confirm</button>
            </div>



      </form>
      <button type="submit" className="back" onClick={this.handleBack}>Back</button>
      </div>
    </div>

  );
}

}
render(<App />, document.getElementById('root'))
export default App;
