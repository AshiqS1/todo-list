import React, { Component } from 'react';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // initial value of state.
            todos: [] // todo list is initially empty.
        }
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }

    // This function adds a new todo from NewTodoForm to our todos list in this.state.todos. 
    addTodo(todo) {
        this.setState({
            todos: [...this.state.todos, todo]
        })
    }

    // This function removes a todo from current state of this.state.todos array, based on id. 
    // We do this by filtering out the todo which has the id that's passed in.
    removeTodo(id) {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }

    // This function maps over this.state.todos array, and toggles completed value (true/false), for the individual todo with specific id. 
    toggleCompletion(id) {
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed }
            }
            return todo;
        })

        this.setState({
            todos: updatedTodos
        })
    }

    // This function maps over this.state.todos array, and updates the task data, for the individual todo with specific id. 
    updateTodo(id, updatedTask) {
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, task: updatedTask }
            }
            return todo;
        })

        this.setState({
            todos: updatedTodos
        })
    }

    // This function maps over this.state.todos array, and returns <Todo /> component(s) to render on-screen.
    renderTodos() {
        return (
            <ul>
                {
                    this.state.todos.map(todo => (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            task={todo.task}
                            completed={todo.completed}
                            // removeTodo={() => this.removeTodo(todo.id)} -- passing function (with argument) to child using arrow function. 
                            removeTodo={this.removeTodo} // passing function (with argument) to child without using arrow function.
                            updateTodo={this.updateTodo} // passing function (with argument) to child without using arrow function.
                            toggleTodo={this.toggleCompletion}
                        />
                    ))
                }
            </ul>
        )
    }

    render() {
        return (
            <div className="TodoList">
                <NewTodoForm addTodo={this.addTodo} />
                <h2>List of Todos:</h2>
                {this.renderTodos()}
            </div>
        )
    }
}

export default TodoList;