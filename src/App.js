import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Hello There, Shubham Here</h2>
		    <MyButton/>
      </header>
    </div>
  );
}

function MyButton(){
	return (<button className="my-button">Click Me</button>);
}

export default App;
