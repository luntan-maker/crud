import logo from './logo.svg';
import './App.css';
import React, {useEffect, useRef} from 'react';

class App extends React.Component {

  componentDidMount() {
    var data = getAll()
    addAll(data)
  }
  
  render() { return <div className="App">
      <header className="App-header">
        
        <button onClick={makeForm} id="createNew">Create new</button>
        <button onClick={refreshPage}>Refresh</button>
        <div id="inputForm"></div>
        <div id="data"></div>
      </header>
    </div>
  };
}
function refreshPage(){
  window.location.reload(false);
}
async function getAll(){
  var url = "http://127.0.0.1:5000/getAll"
  return await new Promise((resolve, reject) =>{
    fetch(url)
    .then(response => response.json())
    .then(data => {
      resolve(data.response)
    })
  }) 
  // return data
}
async function addAll(data){
  // if (data != undefined){
    var par = document.getElementById("data")

    var datum = await data
    for (let i =0; i < datum.length; i++){
      var div = document.createElement("div");
      var text = document.createElement("label");
      var close = document.createElement("button");
      var edit = document.createElement("button");

      close.textContent="delete"
      edit.textContent = "edit";
      div.id = datum[i][0]
      div.className = datum[i][1]
      text.textContent = datum[i][1]
      // test.id = "a" + datum[i][0]

      close.addEventListener('click', function deleteRow(event){
        console.log(event.target.parentElement.id);
        deleteIt(event.target.parentElement.id)
      })
      edit.addEventListener('click', function changeRow(event){
        var parent = event.target.parentElement
        for (var i = 0; i< parent.children.length; i++){
          parent.children[i].remove()
        }
        var sep = document.createElement("div");

        var changeBox = document.createElement("input");
        var sendButton = document.createElement("button");

        sendButton.textContent = "Submit change"

        sendButton.addEventListener('click', async function sendChange(event){
          await changeIt(changeBox.value, parent.className);
          // refreshPage();
        })

        sep.append(changeBox);
        sep.append(sendButton);
        
        div.append(sep)
        
      })


      div.append(text)
      div.append(close);
      div.append(edit)
      
      par.append(div)
      
    }
}
function changeIt(data, id){
  var url = "http://127.0.0.1:5000/changeOne" + "?id=" + id + "&data=" + data
  fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))

}
function deleteIt(id){
  var url = "http://127.0.0.1:5000/deleteOne" + "?id=" + id
  fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
}

function onSubmit(){
  console.log("Hello")

  var save_as = document.getElementById("input_id");
  var query = save_as.value

  var url = "http://127.0.0.1:5000/createOne" + "?data=" + query
  fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
}


function makeForm(){
  var starting_point = document.getElementById("inputForm")
  var input_box = document.createElement("input");
  var send_button = document.createElement("button");

  var createNew = document.getElementById("createNew");
  createNew.disabled = true

  send_button.textContent= "Save name";
  send_button.onclick = onSubmit

  input_box.id = "input_id"

  starting_point.append(input_box);
  starting_point.append(send_button);
}



export default App;
