import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // initial value of state. 
            isEditing: false,
            task: this.props.task,
        }
        this.handleRemove = this.handleRemove.bind(this);
        this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCompletion = this.handleCompletion.bind(this);
    }

    // Press X button to remove task from TodoList. 
    handleRemove(evt) {
        // Pass data to parent using removeTodo(id) fn.
        this.props.removeTodo(this.props.id);
    }

    // Press Edit button to show form to update an individual task. 
    toggleUpdateForm(evt) {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    // This function updates the state, everytime the form input is changed or modified. 
    handleChange(evt) {
        // runs on every keystroke.
        this.setState({
            [evt.target.name]: evt.target.value
            // using computed property name ES2015.
            // In this case, can also be written as -> task: evt.target.value
        });
    }

    // Submit update form, to edit text for an individual task. 
    handleUpdate(evt) {
        // do something with form data upon submission. 
        evt.preventDefault();

        // Pass through updated task data to parent using updateTodo(id, updatedTask) fn. 
        const updatedTask = this.state.task;
        this.props.updateTodo(this.props.id, updatedTask);

        // empty out the form fields after submission. 
        this.setState({ isEditing: !this.state.isEditing });
    }

    // Press todo text to toggle completion status. 
    handleCompletion(evt) {
        this.props.toggleTodo(this.props.id);
    }

    render() {

        let result;
        if (this.state.isEditing) {
            result = (
                <div>
                    <li>
                        <form onSubmit={this.handleUpdate}>
                            <input
                                type="text"
                                name="task"
                                value={this.state.task}
                                onChange={this.handleChange}
                            />
                            <button>Save</button>
                        </form>
                    </li>
                </div>
            )
        } else {
            result = (
                <div>
                    <li>
                        <span
                            onClick={this.handleCompletion}
                            className={this.props.completed ? "completed" : ""}
                        >
                            {this.props.task}
                        </span>
                        <button onClick={this.handleRemove}>X</button>
                        <button onClick={this.toggleUpdateForm}>Edit</button>
                    </li>
                </div>
            )
        }

        return (
            <div className="Todo">
                {result}
            </div>
        );
    }
}

export default Todo;