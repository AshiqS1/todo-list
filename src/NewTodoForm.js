import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class NewTodoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // initial value of state. 
            task: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        // runs on every keystroke.
        this.setState({
            [evt.target.name]: evt.target.value
            // using computed property name ES2015.
        });
    }

    handleSubmit(evt) {
        // do something with form data upon submission. 
        evt.preventDefault();

        // Add uuid to state. 
        // Send data from NewTodoForm to TodoList, to create new todo, using function addTodo().
        const newTodo = { ...this.state, id: uuidv4(), completed: false }
        this.props.addTodo(newTodo);

        // empty out the form fields after submission. 
        this.setState({ task: "" });
    }

    render() {
        return (
            <div className="NewTodoForm">

                <h1>New Todo Form</h1>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="task">New Task: </label>
                    <input type="text" id="task" name="task" value={this.state.task} onChange={this.handleChange} />
                    <button>Add</button>
                </form>

            </div>
        )
    }
}

export default NewTodoForm;