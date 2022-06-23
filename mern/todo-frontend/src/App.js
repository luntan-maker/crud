import logo from './logo.svg';
import './App.css';
// import { propfind } from '../../api/routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          Learn React 
        <TodoRow name="today"/>
        <TodoInput/>
      </header>
    </div>
  );
}

function TodoRow(props) {
  return (
    <div>
      <input type="checkbox" onChange={changeText}/>
      <label>{props.name}</label>
      <button onClick={changeRow}>Change</button>
      <button onClick={deleteRow}>Delete</button>
    </div>
  )
}

function TodoInput(){
  return (
    <div>
      <input/>
      <button onClick={submitInput}>Submit</button>
      <button onClick={cancelInput}>Cancel</button>
    </div>
  )
}

function changeText(){
  // Strikethrough text label if true, remove if false
  console.log("Hello");
}
function changeRow(){
  // Change the ui to change the row
  console.log("Hello");
}
function deleteRow(){
  // Remove the component and delete from db
  console.log("Hello");
}
function submitInput(){
  // Add to ui and db
  console.log("Hello");
}
function cancelInput(){
  // Simply remove from ui
  console.log("Hello");
}


export default App;
