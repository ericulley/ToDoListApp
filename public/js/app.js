
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
