
class App extends React.Component {
    state = {

    }
    render = () => {
        return <div id="react-container">
            <h1>React ToDo</h1>

            <Name />
        </div>
    }
}


ReactDOM.render(
    <App></App>,
    document.querySelector('.body-container'))
