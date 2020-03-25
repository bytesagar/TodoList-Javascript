const clear = document.querySelector('.clear');

const dateElement = document.querySelector('#date');

const list = document.querySelector('#list');

const input = document.querySelector('#input');

//class names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LineThrough = "lineThrough";

let List,id;

let data = localStorage.getItem('toDo');
console.log(data);


//checking for empty data

if(data){
    List = JSON.parse(data);
    id= List.length;
    loadList(List);
}
else{
    List = [];
    id=0;
}

//load list function
function loadList(array){
    array.forEach( item => {
        addTodo(item.name,item.id,item.done,item.trash)
    })
}

//clear the list
clear.addEventListener('click', ()=>{
    localStorage.clear();
    location.reload();

})
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
                });
        }
        localStorage.setItem('toDo', JSON.stringify(List));

        console.log(List);
        id++;
        input.value = "";
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

    localStorage.setItem('toDo', JSON.stringify(List))
})

