const clear = document.querySelector('.clear');

const dateElement = document.querySelector('#date');

const list = document.querySelector('#list');

const input = document.querySelector('#input');

//class names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LineThrough = "lineThrough";

let List= [];
let id=0;
let emptyList = []

//Display date
const options = {weekday: "short", month:"long", day:"numeric"};
const today = new Date();

dateElement.textContent = today.toLocaleDateString("en-us",options);


function addTodo(toDo, id, done, trash){
    if (trash){return;}
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LineThrough: "";
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                 `;
                 const pos = "beforeend";
                 list.insertAdjacentHTML(pos,item);
}

//add an item to list as user press enter key

document.addEventListener("keyup", function(e){
    
    if(e.keyCode === 13){
        const toDo = input.value;
        //if input isn't empty
        if(toDo){
                addTodo(toDo,id, false, false);

                List.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                })
        }
        console.log(List);
        id++;
        input.value = "";
    }
})

//clear event listener
clear.addEventListener("click", function(){
    const e = document.querySelector("ul");
    const child = document.querySelector(".item ");
    while(e.firstChild){
        e.removeChild(e.firstChild);
    }
    
    

})
//function complete todo
function completetoDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LineThrough);
    List[element.id].done = List[element.id].done ? false : true;
}

//remove todo
function removetoDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    List[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    

    if(elementJob === "complete"){
        completetoDo(element);
    }
    else if (elementJob === "delete"){
        removetoDo(element);
    }
})

