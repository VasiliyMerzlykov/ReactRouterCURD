import './App.css';
import React, { Component } from 'react'
import AddForm from './components/AddForm';

class App extends Component {

  state = {
    input: '',
    notes: [],
  };

  componentDidMount = () => this.update();

  update = () => {
    fetch('http://localhost:7777/notes')
      .then(res => res.json())
      .then(notes => this.setState({ notes }))
  };

  handleInputChange = (e) => {
    this.setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  onSubmit = () => {
    const content = this.state.input;
    if (content === "") return
    fetch('http://localhost:7777/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ content }),
    })
      .then(() => {
        this.setState({ input: '' });
        this.update();
      });
  };

  removeHandel = (e) => {
    fetch(`${'http://localhost:7777/notes'}/${e.target.id}`, { method: 'DELETE' })
      .then(() => this.update())
  };

  render() {
    window.state = this.state
    return (
      <>
        <h1>Notes</h1>
        <button onClick={this.update}>Получить записи</button>
        <div>
          {this.state.notes.map(item =>
            <div key={item.id} style={{ width: "300px", height: "150px", border: '1px solid red', position: 'relative', boxSizing: 'border-box' }}>
              <div >{item.content}</div>
              <button id={item.id} onClick={this.removeHandel} style={{ position: 'absolute', right: "0px", }}>Delete</button>
            </div>)}
        </div>
        <AddForm handleInputChange={this.handleInputChange} handleAdd={this.onSubmit} message={this.state.input} />
      </>
    );
  };
};


export default App;
