import React from "react";

import Badge from 'react-bootstrap/Badge';

class Home extends React.Component {
  state ={
    tab: 1,
    input: "",
    editing: -1,
    editingText: "",
    activities: [],
  }

  inputHandler = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  submitHandler = () => {
    var activities = this.state.activities

    activities.push({
      name: this.state.input,
      check: false
    })

    this.setState({
      activities,
      input: ""
    })
  }

  tabHandler = (index) => {
    this.setState({
      tab: index
    })
  }

  editHandler = (index) => {
    this.setState({
      editing: index,
      editingText: this.state.activities[index].name
    })
  }

  editingHandler = (e) => {
    this.setState({
      editingText: e.target.value
    })
  }

  editedText = () => {
    var activities = this.state.activities

    activities[this.state.editing].name = this.state.editingText

    this.setState({
      editing: -1,
      editingText: ""
    })
  }

  checkHandler = (index) => {
    var activities = this.state.activities

    if(activities[index].check){
      activities[index].check = false
    }else{
      activities[index].check = true
    }

    this.setState({
      activities: activities
    })
  }

  removeHandler = (index) => {
    let activities = []

    this.state.activities.forEach((val, i) => {
      if( i !== index){
        activities.push(val)
      }
    })

    this.setState({
      activities: activities
    })
  }

  render(){
    return(
      <div className="container rounded p-2 mt-5 todo-box">
        <h2 className="text-center mb-4">To Do List</h2>
        <div className="input-box">
          <input type="text" placeholder="Nama kegiatan" className="rounded-0 border border-primary" value={this.state.input} onChange={this.inputHandler} />
          <button className="btn btn-primary rounded-0" onClick={this.submitHandler}><i className="bi bi-plus-lg"></i></button>
        </div>
        <div className="tab-box text-center mt-2">
          <span className={`mx-2 ${this.state.tab === 1 ? "selected-tab" : null}`} onClick={() => this.tabHandler(1)}>All Task <Badge bg="primary">{this.state.activities.length}</Badge></span>
          <span className={`mx-2 ${this.state.tab === 2 ? "selected-tab" : null}`} onClick={() => this.tabHandler(2)}>Incompleted <Badge bg="warning">{this.state.activities.filter(x=> x.check === false).length}</Badge></span>
          <span className={`mx-2 ${this.state.tab === 3 ? "selected-tab" : null}`} onClick={() => this.tabHandler(3)}>Completed <Badge bg="success">{this.state.activities.filter(x=> x.check === true).length}</Badge></span>
        </div>
        <div className="list-box">
          {
            this.state.activities.length > 0 ?
              this.state.activities.map((val, i) => {
                return (
                  this.state.tab === 1 ?
                    <div>
                      <input type="checkbox" onClick={() => this.checkHandler(i)} disabled={this.state.editing === i ? true : false} />
                      <input className="text-left rounded-0" type="text" onChange={this.editingHandler} value={this.state.editing === i ? this.state.editingText : val.name} disabled={this.state.editing === i ? false : true} />
                      {
                        this.state.editing === i ?
                          <i className="bi bi-send mx-3" onClick={this.editedText}></i>
                        : <i className="bi bi-pen mx-3" onClick={() => this.editHandler(i)}></i>
                      }
                      <i className="bi bi-trash" onClick={this.state.editing === i ? null : () => this.removeHandler(i)}></i>
                    </div>
                  : this.state.tab === 2 ?
                    !val.check?
                      <div>
                        <input type="checkbox" onClick={() => this.checkHandler(i)} disabled={this.state.editing === i ? true : false} />
                        <input className="text-left rounded-0" type="text" onChange={this.editingHandler} value={this.state.editing === i ? this.state.editingText : val.name} disabled={this.state.editing === i ? false : true} />
                        {
                          this.state.editing === i ?
                            <i className="bi bi-send mx-3" onClick={this.editedText}></i>
                          : <i className="bi bi-pi mx-3" onClick={() => this.editHandler(i)}></i>
                        }
                        <i className="bi bi-trash" onClick={this.state.editing === i ? null : () => this.removeHandler(i)}></i>
                      </div>
                    : <p className="text-center mt-5 text-secondary">Nothing to show :(</p>
                  : this.state.tab === 3 ?
                    val.check ?
                      <div>
                        <input type="checkbox" onClick={() => this.checkHandler(i)} disabled={this.state.editing === i ? true : false} />
                        <input className="text-left rounded-0" type="text" onChange={this.editingHandler} value={this.state.editing === i ? this.state.editingText : val.name} disabled={this.state.editing === i ? false : true} />
                        {
                          this.state.editing === i ?
                            <i className="bi bi-send mx-3" onClick={this.editedText}></i>
                          : <i className="bi bi-pen mx-3" onClick={() => this.editHandler(i)}></i>
                        }
                        <i className="bi bi-trash" onClick={this.state.editing === i ? null : () => this.removeHandler(i)}></i>
                      </div>
                    : <p className="text-center mt-5 text-secondary">Nothing to show :(</p>
                  : null
                )
              })
            : <p className="text-center mt-5 text-secondary">Nothing to show :(</p>
          }
        </div>
      </div>
    )
  }
}

export default Home;