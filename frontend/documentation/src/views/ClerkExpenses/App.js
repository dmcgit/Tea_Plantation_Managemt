import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Confirm from './Confirm';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">React Confirm Bootstrap</h1>
                </header>
                <h2>Example</h2>
                <p className="App-intro">
                    <Confirm
                        onConfirm={() => {
                            alert('Confirmed');
                        }}
                        body="Are you sure you want to delete this?"
                        confirmText="Confirm Delete"
                        title="Deleting Stuff">
                        <button>Delete Stuff</button>
                    </Confirm>
                </p>
            </div>
        );
    }
}

export default App;
