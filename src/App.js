import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
          {id: "1", name:"New task is created", status: "Progress"},
          {id: "2", name:"Task can be moved to done", status: "Progress"},
          {id: "3", name:"Place task in To-Do", status: "Complete"},
          {id: "4", name:"Review the task", status: "Complete"}
      ],
      containers: {
        Progress: [], Complete: []
      },
    }
  }

  componentDidMount() {
    this.initialList();
  }

  dragComplete = (ev) => {
    ev.preventDefault();
  }

  dropContainer = (ev, board) => {
    let name = ev.dataTransfer.getData("name");

    let tasks = this.state.tasks.filter((task) => {
        if (task.name == name) {
            task.status = board;
        }
        return task;
    });

    this.setState({
        tasks: tasks,
    });
    this.initialList();
  }

  initDrag = (event, name) => {
  event.dataTransfer.setData("name", name);
  }

  initialList = () => {
    let tasks = { Progress: [], Complete: [] };

    this.state.tasks.forEach ((task) => {
      tasks[task.status].push(
        <div key={task.id} 
          onDragStart = {(event) => this.initDrag(event, task.name)}
          draggable
          className= "drag" >
          {task.name}
        </div>
      );
    });
    this.setState({
      containers: tasks,
  });
  }

render() {
    return (
      <div className="d-container">
        
        <span className="heading">List of tasks</span>
        
        <div className="progress-container"
	            onDragOver={(ev)=>this.dragComplete(ev)}
	            onDrop={(ev)=>{this.dropContainer(ev, "Progress")}}>
  	
    <span className="group-name">To-Do</span>
  	          {this.state.containers.Progress}
      </div>
        
        <div className="drop-container"
            onDragOver={(ev)=>this.dragComplete(ev)}
            onDrop={(ev)=>this.dropContainer(ev, "Complete")}>
          
          <span className="group-name">Complete</span>
          {this.state.containers.Complete}
        
        </div>	        
      </div>
    );
  }
}