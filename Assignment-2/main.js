let loadbutton = document.getElementById("loadbutton");
loadbutton.addEventListener("click", Load);
let refreshbutton = document.getElementById("refreshbutton");
refreshbutton.addEventListener("click",refresh);
let userdata = null;

async function Load(e) {
    console.log(e);
    e.target.style = "display:none"
    document.getElementById("refreshbutton").style="";
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
            let td = document.createElement("td");
            td.innerHTML = user[key];
            tr.appendChild(td);
        }
        let td = document.createElement("td");
        td.innerHTML = `<button class = 'editbutton'>Edit</button>
                        <button class = 'deletebutton'>Delete</button>
                        <button class = 'savebutton' style = 'display:none'>Save</button>
                        <button class = 'cancelbutton' style = 'display:none'>Cancel</button>`
        td.querySelector(".editbutton").addEventListener("click",edit);
        td.querySelector(".deletebutton").addEventListener("click",deleterow);
        td.querySelector(".savebutton").addEventListener("click",save);
        td.querySelector(".cancelbutton").addEventListener("click",cancel);

        tr.appendChild(td);
        table.appendChild(tr);
    }   


    container.firstChild.before(table);
}

function edit(e){
    let tr = e.target.parentElement.parentElement;
    tr.querySelector(".editbutton").style.display = "none";
    tr.querySelector(".deletebutton").style.display = "none";
    tr.querySelector(".cancelbutton").style.display = "";
    tr.querySelector(".savebutton").style.display = "";

    Array.from(tr.children).forEach(function(td,i) {
        if(i<tr.children.length-1){
        let input  = document.createElement("input");
        input.setAttribute("value",td.innerHTML);
        td.innerHTML = "";
        td.appendChild(input) ;
        }
    });
    
}

function deleterow(e){
    let tr = e.target.parentElement.parentElement;
    let rowIndex = tr.rowIndex;
    tr.parentElement.removeChild(tr);
    userdata.splice(rowIndex-1,1);

}
function save(e){
    let tr = e.target.parentElement.parentElement;
    tr.querySelector(".savebutton").style.display = "none";
    tr.querySelector(".cancelbutton").style.display = "none";
    tr.querySelector(".editbutton").style.display = "";
    tr.querySelector(".deletebutton").style.display = "";
    let index = tr.rowIndex;
    let rowth = tr.parentElement.firstChild;
    Array.from(tr.children).forEach(function(td,i) {
        if(i<tr.children.length-1){
        let key = rowth.children[i].innerHTML;
        let input  = td.firstChild;
        td.innerHTML = input.value;
        userdata[index-1][key] = input.value;
        }
    });
}

function cancel(e){
    e.target.style = "display:none";
    let tr = e.target.parentElement.parentElement;
    tr.querySelector(".cancelbutton").style.display = "none";
    tr.querySelector(".savebutton").style.display = "none";
    tr.querySelector(".editbutton").style.display = "";
    tr.querySelector(".deletebutton").style.display = "";
    let index = tr.rowIndex;
    let rowth = tr.parentElement.firstChild;
    Array.from(tr.children).forEach(function(td,i) {
        if(i<tr.children.length-1){
            let key = rowth.children[i].innerHTML;
        td.innerHTML = userdata[index-1][key];
        }
    });
}

async function refresh(e){
    let container = document.getElementById("vertical-center");
    container.removeChild(container.firstChild);
    document.getElementById("refreshbutton").style="";
    await fetch("./data.json")
        .then(response => {
            return response.json();
        }).then(data => {
            userdata = data;
        });
    CreateTable();

}