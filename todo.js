const taskForm=document.querySelector('#taskform');
const taskInput=document.querySelector('#task');
const emptyErrorModal=document.querySelector('#emptyEror');
const taskList=document.querySelector('#taskList');
const removeAllTasks=document.querySelector('#btnRemoveAll');
const searchInput=document.querySelector('#search');
const deleteModal=document.querySelector('#deleteModal');
const deleteTaskbtn=document.querySelector('#deleteTask');

function loadEvents(){
    document.addEventListener('DOMContentLoaded',handleLoadTasks);
    taskform.addEventListener('submit',handleSubmit);
    document.addEventListener('click',handleConfirmDelete);
    document.addEventListener('click',handleRemoveAll);
    document.addEventListener('keyup',handleSearch);
document.addEventListener('click',handleDelete);
}
function handleConfirmDelete(evt){
    evt.preventDefault();
    if(evt.target.classList.contains('delete-item')){
        taskId=evt.target.getAttribute("data-id");
        deleteTaskbtn.setAttribute('data-id',taskId);
        M.Modal.init(deleteModal).open();
    }else if(evt.target.parentElement.classList.contains('delete-item')){
        taskId=evt.target.parentElement.getAttribute("data-id");
        deleteTaskbtn.getAttribute('data-id',taskId);
        M.Modal.init(deleteModal).open();
    }
}
function handleLoadTasks(evt){
    const storageTasks=getTasksFromStorage();
    storageTasks.forEach(function(task){
        createTask(task);
    })
}
function HandleSubmit(evt){
    evt.preventDefault();
    const taskValue=taskInput.value;
    if(taskValue.trim()===''){
        M.Modal.init(emptyErrorModal).open();
        return;
    }
    createAndAddToStorage(taskValue);
}
function createAndAddToStorage(taskValue){
    const taskObj={
        id: getId(),
        value:taskValue
    };
    addTaskToStorage(taskObj);
    createTask(taskObj);
}
function addTaskToStorage(taskObj){
    const storageTasks=getTasksFromStorage();
    storageTasks.push(taskObj);
    localStorage.setItem('tasks',JSON.stringify(storageTasks));
}
function getTasksFromStorage(){
    return JSON.parse(localStorage.getItem('tasks')) || [];
}
function handleDelete(evt){
    let taskId-evt.target.dataset.id;
    const taskNodes=taskList.children;
    for(let i=0; i<taskNodes.length;i++)
    {
        if(taskNodes[i].dataset.id==taskId){
            taskNodes[i].remove();
            break;
        }
    }
    removeFromStorage(taskId);
}
function removeFromStorage(taskId){
    let storageTasks=getTasksFromStorage();
    storageTasks=storageTasks.filter(function
        (task){
            return task.id!=taskId;
        }
    );
    localStorage.setItem('tasks',JSON.stringify(storageTasks));
}
function handleRemoval(evt){
    evt.preventDefault();
    //taskList.innerHTML=''; //slow method in js
    //faster method
    while(taskList.firstElementChild){
        taskList.firstElementChild.remove();

    }
    localStorage.setItem('tasks',JSON.stringify([]));
}

function handleSearch(evt){
    const searchValue=searchInput.value.toLowerCase();
    const tasks=taskList.children;
    for(let i=0;i<taskList.lastElementChild;i++){
        const task=tasks[i].textContent;
        console.log(task);
        const index=task.toLowerCase().indexOf(searchValue);
        const searchLength=searchValue.length;
        if(index===-1){
            tasks[i].style.display='none';
        }else if (searchValue!==''){
            const spanTag=tasks[i].children[0];
            const firstPart=task.substring(0,index);
            const searchedPart=task.substring(index,index+searchLength);
            const lastPart=task.substring(index,index+searchLength);
             const finalString=`${firstPart}
             <strong>${searchedPart}</strong>$
             {lastPart}`;
             spanTag.innerHTML=finalString;
             tasks[i].style.display='block';
        }else{
            tasks[i].children[0].innerHTML=task;
            tasks[i].style.display='block';
        }
    }
}
function createTask(taskObj){
    const LI=document.createElement('li');
    const LINK=document.createElement('a');
    const SPAN=document.createElement('span');

    LI.className='collection-item';
    SPAN.className='task-content';
    SPAN.appendChild(document.createTextNode(taskObj.value))
    LI.appendChild(SPAN);
    LI.setAttribute('data-id',taskObj.id);

    LINK.className='delete-item secondary-content';
    LINK.setAttribute('title','Remove Task');
    LINK.innerHTML="<i class=fa fa-trash></i>";

    LINK.setAttribute('data-id',taskObj.id);
    LINK.style.cursor='pointer';

    LI.appendChild(LINK);

    taskList.appendChild(LI);
    taskInput.value="";
}
function getId(){
    return Math.round((Math.random()+1)*1000000000);
}
loadEvents();



