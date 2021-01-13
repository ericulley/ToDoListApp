
class Create extends React.Component {
    render() {
        return (
            <div>

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

        </div>
    }
}


ReactDOM.render(
    <App></App>,
    document.querySelector('main'))
