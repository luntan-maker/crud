import logo from './logo.svg';
import './App.css';
// import { propfind } from '../../api/routes';

async function App() {
  const todos = await fetch("")
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          Learn React 
        <TodoRow name="today"/>
        <TodoInput name="today"/>
      </header>
    </div>
  );
}

function TodoRow(props) {
  return (
    <div>
      <input type="checkbox" onChange={changeText}/>
      <label>{props.name}</label>
      <button onclick={changeRow}>Change</button>
      <button onclick={deleteRow}>Delete</button>
    </div>
  )
}

function TodoInput(){
  return (
    <div>
      <input/>
      <button onclick={submitInput}>Submit</button>
      <button onclick={cancelInput}>Cancel</button>
    </div>
  )
}

function changeText(){
  // Strikethrough text label if true, remove if false
}
function changeRow(){
  // Change the ui to change the row
}
function deleteRow(){
  // Remove the component and delete from db
}
function submitInput(){
  // Add to ui and db
}
function cancelInput(){
  // Simply remove from ui
}


export default App;
