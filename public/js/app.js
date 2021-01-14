class Create extends React.Component {
    render() {
        return (
            <div id="create-container">
                <h2>New Todo</h2>
                <form onSubmit={this.props.handleSubmit}>
                    <h4 htmlFor="name">Name</h4>
                    <input id="name" type="text" onChange={this.props.handleChange}/>
                    <br />
                    <h4 htmlFor="date">Date</h4>
                    <input id="date" type="date" onChange={this.props.handleChange}/>
                    <br />
                    <h4 htmlFor="description">Description</h4>
                    <textarea id="description" type="text" onChange={this.props.handleChange}></textarea>
                    <br />
                    <h4 htmlFor="completed">Completed</h4>
                    <input id="completed" type="checkbox" onChange={this.props.handleCheck}/>
                    <br />
                    <input type="submit" value="New ToDo" />
                </form>
            </div>
        )
    }
}

class Show extends React.Component {
    render() {
        const { todos } = this.props.state;
        return (
            <div id="show-container">
                <div id="show-labels-container">
                    <h4 className="show-label name">Name</h4>
                    <h4 className="show-label">Description</h4>
                    <h4 className="show-label">Date</h4>
                    <h4 className="show-label">Completed</h4>
                    <h4 className="show-label edit">Edit</h4>
                </div>
                {todos.map(todo => {
                    return (
                        <div className="todo-container">
                            <div className="todo-item name">{todo.name}</div>
                            <div className="todo-item">{todo.description}</div>
                            <div className="todo-item">{todo.date}</div>
                            <div className="todo-item">{todo.completed ? "Yes" : "No"}</div>
                            <div className="todo-item edit">
                                <Edit todo={todo} handleChange={this.props.handleChange} handleCheck={this.props.handleCheck} handleSubmit={this.props.handleSubmit} updateTodo={this.props.updateTodo}></Edit>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

class Edit extends React.Component {
    render() {
        return (
            <details>
                <summary>Edit</summary>
                <form id={this.props.todo._id} onSubmit={this.props.updateTodo}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" onChange={this.props.handleChange} defaultValue={this.props.todo.name} />
                    <br />
                    <label htmlFor="date">Date</label>
                    <input id="date" type="date" onChange={this.props.handleChange} defaultValue={this.props.todo.date} />
                    <br />
                    <label htmlFor="description">Description</label>
                    <textarea id="description" type="text" onChange={this.props.handleChange} defaultValue={this.props.todo.description}></textarea>
                    <br />
                    <label htmlFor="completed">Completed</label>
                    <input id="completed" type="checkbox" onChange={this.props.handleCheck} defaultValue={this.props.todo.completed} />
                    <br />
                    <input id="edit-todo-button" type="submit" value="Edit ToDo" />
                </form>
            </details>
        )
    }
}

class App extends React.Component {
    state = {
        name: "",
        description: "",
        date: "",
        completed: false,
        todos: []
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    handleCheck = event => {
        this.setState({
            [event.target.id]: event.target.checked
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        axios.post("/todo", this.state).then(response => this.setState({
            todos: response.data,
            name: "",
            description: "",
            date: "",
            completed: false
        }),
            document.getElementById('completed').checked = false
        )
    }
    deleteTodo = event => {
        axios.delete("/todo/" + this.state).then(response => {
            this.setState({
                todos: response.data
            })
        })
    }
    updateTodo = event => {
        event.preventDefault();
        const id = event.target.id;
        axios.put("/todo/" + id, this.state).then(response => {
            this.setState({
                todos: response.data,
                name: "",
                description: "",
                completed: false
            })
            document.querySelector('details').open = false
        })
    }
    componentDidMount = () => {
        axios.get("/todo").then(response => {
            this.setState({ todos: response.data })
        })
    }
    render = () => {
        return <div id="react-container">
            <Create state={this.state} handleChange={this.handleChange} handleCheck={this.handleCheck} handleSubmit={this.handleSubmit}></Create>
            <Show state={this.state} handleChange={this.handleChange} handleCheck={this.handleCheck} handleSubmit={this.handleSubmit} updateTodo={this.updateTodo}/>
        </div>
    }
}


ReactDOM.render(
    <App></App>,
    document.querySelector('main'))
