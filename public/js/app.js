class Create extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" onChange={this.props.handleChange} value={this.props.state.name}/>
                    <br/>
                    <label htmlFor="date">Date</label>
                    <input id="date" type="date" onChange={this.props.handleChange} value={this.props.state.date}/>
                    <br/>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" type="text" onChange={this.props.handleChange} value={this.props.state.description}></textarea>
                    <br/>
                    <label htmlFor="completed">Completed</label>
                    <input id="completed" type="checkbox" onChange={this.props.handleCheck} value={this.props.state.completed}/>
                    <br/>
                    <input type="submit" value="New ToDo"/>
                </form>
            </div>
        )
    }
}

class Show extends React.Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

class Edit extends React.Component {
    render() {
        return (
            <div>

            </div>
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
        </div>
    }
}


ReactDOM.render(
    <App></App>,
    document.querySelector('main'))
