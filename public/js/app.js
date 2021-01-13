
class Create extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" onChange={this.handleChange} value={this.state.name}/>
                    <br/>
                    <label htmlFor="date">Date</label>
                    <input id="date" type="text" onChange={this.handleChange} value={this.state.date}/>
                    <br/>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" type="text" onChange={this.handleChange} value={this.state.description}></textarea>
                    <br/>
                    <input type="submit"/>
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
        }))
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
        axios.put("/animals/" + id, this.state).then(response => {
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
            <Create></Create>
        </div>
    }
}


ReactDOM.render(
    <App></App>,
    document.querySelector('main'))
