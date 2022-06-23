import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
// import { propfind } from '../../api/routes';

function App() {
  const [rows, setRows] = useState([])
  const getRow = async () =>{
    // const {data} = await fetch("localhost:3000/read", {method:"GET", mode:'cors'});
    fetch("http://localhost:3000/read", {method:"GET", mode:'cors'})
      .then(response =>response.json())
      .then(data=> {
        setRows(data);
      });
    // setRows(data);
  }
  useEffect(()=>{
    getRow()
  }, [])
  // console.log(rows);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          Learn React 
        <div id="rows">
          {rows.map((row)=>{
            return (
              <>
                <TodoRow name={row.testing}/>
              </>
            )
          })}
        </div>


        {/* <TodoRow name="today"/> */}
        {/* <TodoInput/> */}
        <div id="addOneSpot"></div>
        <button id="addOne" onClick={addOne}>Add one</button>
      </header>
    </div>
  );
}

function TodoRow(props) {
  return (
    <div>
      <input type="checkbox" id="check" onChange={changeText}/>
      <label id="name">{props.name}</label>
      <button onClick={changeRow}>Change</button>
      <button onClick={deleteRow}>Delete</button>
    </div>
  )
}

function addOne(){
  
  var addOne = document.getElementById("addOneSpot");
  var addOneBtn = document.getElementById("addOne")
  addOneBtn.disabled = true;
  var inp = document.createElement("input")
  var submitBtn = document.createElement("button")
  var cancelBtn = document.createElement("button")

  inp.id="name"

  submitBtn.innerText="Submit"
  cancelBtn.innerText="Cancel"

  submitBtn.addEventListener("click", async (event)=>{

    var textOf = event.target.parentNode.querySelector("#name").value
    await fetch("http://localhost:3000/create?title="+textOf, {method:"POST", mode:'cors'});
    console.log("made it past the fetch")
    // <div>
    //   <input type="checkbox" onChange={changeText}/>
    //   <label id="name">{props.name}</label>
    //   <button onClick={changeRow}>Change</button>
    //   <button onClick={deleteRow}>Delete</button>
    // </div>
    var addTo = document.getElementById("rows")
    var divOf = document.createElement("div")
    var check = document.createElement("input")
    var label = document.createElement("label")
    var changeBtn = document.createElement("button");
    var deleteBtn = document.createElement("button");

    check.type = "checkbox";
    label.id = "name";
    label.innerText = textOf;
    changeBtn.addEventListener("click", changeRow);
    changeBtn.innerText = "Change";
    deleteBtn.addEventListener("click", deleteRow);
    deleteBtn.innerText = "Delete";

    divOf.appendChild(check);
    divOf.appendChild(label);
    divOf.appendChild(changeBtn);
    divOf.appendChild(deleteBtn);
    addTo.appendChild(divOf)

    // console.log(parent.querySelector("#name").value)
    event.target.parentNode.innerHTML=""
    addOneBtn.disabled = false;
  })

  cancelBtn.addEventListener("click", (event)=>{
    
    event.target.parentNode.innerHTML=""
    addOneBtn.disabled = false;
  })

  addOne.appendChild(inp)
  addOne.appendChild(submitBtn)
  addOne.appendChild(cancelBtn)
}

function changeText(event){
  // Strikethrough text label if true, remove if false
  var label = event.target.parentNode.querySelector("#name")
  if (event.target.checked){
    label.style.setProperty('text-decoration', 'line-through');
  } else {
    label.style.setProperty('text-decoration', '');
  }
}
function changeRow(event){
  // Change the ui to change the row
  // Replace the insides with an input and a submit and cancel button
  // Submit button sends information to database and recreates the entry
  // Cancel recreates the previous row
  var parent = event.target.parentNode
  // console.log(parent);
  var originalValue = parent.querySelector("#name").innerText;
  var checkedBox = parent.querySelector("#check").checked;
  parent.innerHTML="";

  var input = document.createElement("input");
  input.id = "input";
  var submitBtn = document.createElement("button");
  submitBtn.disabled = true;
  var cancelBtn = document.createElement("button");

  submitBtn.innerText = "Submit";
  submitBtn.id = "submit";
  cancelBtn.innerText = "Cancel";

  input.addEventListener("keypress", (event)=> {
    var button = event.target.parentNode.querySelector("#submit");
    var inp = event.target.parentNode.querySelector("#input");
    console.log(inp.value)
    if (inp.value.length<1){
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  })

  submitBtn.addEventListener("click", async (event)=>{

    await fetch("http://localhost:3000/update?title="+originalValue+"&replace="+input.value, {method:"PUT", mode:'cors'});


    parent = event.target.parentNode;
    
    var originalInput = document.createElement("input")
    var originalLabel = document.createElement("label")
    var originalChangeBtn = document.createElement("button");
    var originalDeleteBtn = document.createElement("button");

    originalInput.type = "checkbox";
    // originalInput.checked = false;
    originalInput.id = "check";

    originalLabel.id = "name";
    originalLabel.innerText = input.value;

    originalChangeBtn.addEventListener("click", changeRow)
    originalChangeBtn.innerText = "Change";
    
    originalDeleteBtn.addEventListener("click", deleteRow);
    originalDeleteBtn.innerText = "Delete";


    parent.innerHTML="";
    parent.appendChild(originalInput);
    parent.appendChild(originalLabel);
    parent.appendChild(originalChangeBtn);
    parent.appendChild(originalDeleteBtn);
  })

  cancelBtn.addEventListener("click", (event)=>{
    parent = event.target.parentNode;
    
    var originalInput = document.createElement("input")
    var originalLabel = document.createElement("label")
    var originalChangeBtn = document.createElement("button");
    var originalDeleteBtn = document.createElement("button");

    originalInput.type = "checkbox";
    originalInput.checked = checkedBox;
    originalInput.id = "check";
    originalInput.addEventListener("change", changeText);

    originalLabel.id = "name";
    originalLabel.innerText = originalValue;

    originalChangeBtn.addEventListener("click", changeRow)
    originalChangeBtn.innerText = "Change";

    originalDeleteBtn.addEventListener("click", deleteRow);
    originalDeleteBtn.innerText = "Delete";


    parent.innerHTML="";
    parent.appendChild(originalInput);
    parent.appendChild(originalLabel);
    parent.appendChild(originalChangeBtn);
    parent.appendChild(originalDeleteBtn);
  })

  parent.appendChild(input);
  parent.appendChild(submitBtn);
  parent.appendChild(cancelBtn);
  
}
async function deleteRow(event){
  // Remove the component and delete from db
  var parent = event.target.parentNode
  var text_of = parent.querySelector("#name").innerText
  console.log(text_of)
  await fetch("http://localhost:3000/delete?title="+text_of, {method:"DELETE", mode:'cors'});

  parent.innerHTML="";
  
}

export default App;
