class Create extends React.Component {
    render() {
        return (
            <div id="create-container">
                <h2>New Todo</h2>
                <form onSubmit={this.props.handleSubmit}>
                    <h4 htmlFor="name">Name</h4>
                    <input id="name" type="text" onChange={this.props.handleChange} />
                    <h4 htmlFor="date">Date</h4>
                    <input id="date" type="date" onChange={this.props.handleChange} />
                    <h4 htmlFor="description">Description</h4>
                    <textarea id="description" type="text" onChange={this.props.handleChange} ></textarea>
                    <h4 htmlFor="completed">Completed</h4>
                    <input id="completed" type="checkbox" onChange={this.props.handleCheck} />
                    <input type="submit" value="New ToDo" />
                </form>
            </div>
        )
    }
}

class Show extends React.Component {
    changeStyle = (todo) => {
        return {
            textDecoration: todo.completed ? "line-through" : "none"
        }
    }
    render() {
        const { todos } = this.props.state;
        return (
            <div id="show-container">
                <div id="show-labels-container">
                    <h4 className="show-label name">Name</h4>
                    <h4 className="show-label description">Description</h4>
                    <h4 className="show-label date">Date</h4>
                    <h4 className="show-label completed">Completed</h4>
                    <h4 className="show-label edit">Edit</h4>
                </div>
                {todos.map(todo => {
                    return (
                        <div key={todo._id} className="todo-container">
                            <div style={this.changeStyle(todo)} className="todo-item name">{todo.name}</div>
                            <div style={this.changeStyle(todo)} className="todo-item description">{todo.description}</div>
                            <div style={this.changeStyle(todo)} className="todo-item date">{todo.date}</div>
                            <div className="todo-item completed">{todo.completed ? "Yes" : "No"}</div>
                            <div className="todo-item edit">
                                <Edit todo={todo} handleChange={this.props.handleChange} handleCheck={this.props.handleCheck} handleSubmit={this.props.handleSubmit} updateTodo={this.props.updateTodo} deleteTodo={this.props.deleteTodo}></Edit>
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
                    <input id="name" type="text" className="edit-item" onChange={this.props.handleChange} defaultValue={this.props.todo.name} />
                    <br />
                    <label htmlFor="date">Date</label>
                    <input id="date" type="date" className="edit-item" onChange={this.props.handleChange} defaultValue={this.props.todo.date} />
                    <br />
                    <label htmlFor="description">Description</label>
                    <textarea id="description" className="edit-item" type="text" onChange={this.props.handleChange} defaultValue={this.props.todo.description}></textarea>
                    <br />
                    <label htmlFor="completed">Completed</label>
                    <input id="completed" className="edit-item" type="checkbox" onChange={this.props.handleCheck} checked={this.props.todo.completed} />
                    <br />
                    <input id="edit-todo-button" className="edit-item" type="submit" value="Edit ToDo" />
                    <button id="delete-button" className="edit-item" type="button" onClick={this.props.deleteTodo} value={this.props.todo._id}>DELETE</button>
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
            document.getElementById('completed').checked = false,
            document.getElementById('name').value = "",
            document.getElementById("date").value = "",
            document.getElementById("description").value = ""
        )
    }
    deleteTodo = event => {
        axios.delete("/todo/" + event.target.value).then(response => {
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
            <Show state={this.state} handleChange={this.handleChange} handleCheck={this.handleCheck} handleSubmit={this.handleSubmit} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
        </div>
    }
}

$(() => {
    $("body").on("click", "#edit-todo-button", function () {
        $("details").removeAttr("open");
    })
    // $("body").on("click", "#delete-button", function () {
    //     $("details").removeAttr("open");
    // })
})

ReactDOM.render(
    <App></App>,
    document.querySelector('main'))
