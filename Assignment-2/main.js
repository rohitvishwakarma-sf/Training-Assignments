let loadbutton = document.getElementById("loadbutton");
// const fs = require('fs');
loadbutton.addEventListener("click", loadRefreshbutton);
let userdata = null;

async function loadRefreshbutton(e) {
    // var mydata = JSON.parse(data);
    await fetch("./data.json")
        .then(response => {
            return response.json();
        }).then(data => {
            userdata = data;
        });


    //creating table
    CreateTable();

}

function CreateTable() {
    let container = document.getElementById("vertical-center");
    let table = document.createElement('table');
    let tr = document.createElement("tr");
    for (let heading in userdata[0]) {
        let theader = document.createElement("th");
        theader.innerHTML = heading;
        tr.appendChild(theader);
    }
    table.appendChild(tr);
    for(let user of userdata){
        let tr = document.createElement("tr");
        for(let key in user){
            console.log(key);
            let td = document.createElement("td");
            td.innerHTML = user[key];
            tr.appendChild(td);
        }
        let editbutton = document.createElement("button");
        editbutton.innerHTML = "EDIT";
        editbutton.className = "editbutton";
        let deletebutton = document.createElement("button");
        deletebutton.className = "editbutton";
        deletebutton.innerHTML = "DEL";
        let td = document.createElement("td");
        td.appendChild(editbutton);
        td.appendChild(deletebutton);
        tr.appendChild(td);
        table.appendChild(tr);
    }



    container.firstChild.before(table);
}