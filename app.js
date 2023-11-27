// Selectionner les elements dans le DOM
const todoImput = document.querySelector('.insert');
const addBtn = document.querySelector('.add');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.topics');

// Ecouteurs
document.addEventListener('DOMContentLoaded',getTodos);
addBtn.addEventListener('click',setTodo);
todoList.addEventListener('click',action);
filterOption.addEventListener('input',filterTodo);

// Fonctions
function setTodo(event){
    event.preventDefault();

    // Création de la div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    // Création du li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoImput.value;
    todoDiv.appendChild(newTodo);
    console.log(todoDiv);

    // Ajout de la tache dans localstorage
    let tache = {
        content:todoImput.value,
        action:"undone"
    }
    saveTodo(tache);

    // Création du bouton Check
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.innerHTML = "<i class='fa fa-check'></i>";
    todoDiv.appendChild(completeBtn);

    // Création du bouton Delete
    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = "<i class='fa fa-trash'></i>";
    todoDiv.appendChild(trashBtn);

    // Ajouter la nouvelle div à la todo list
    todoList.appendChild(todoDiv);
    todoImput.value = "";
}

function saveTodo(todo){
    // Vérifier l'éxistence des taches dans le localstorage
    let todos = [];
    if (localStorage.getItem("todos") != null){
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    // Vérifier l'éxistence des taches dans le localstorage
    let todos = [];
    if (localStorage.getItem("todos") != null){
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(todo => {
        // Création de la div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    // Création du li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todo.content;
    todoDiv.appendChild(newTodo);

    // Création du bouton Check
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.innerHTML = "<i class='fa fa-check'></i>";
    todoDiv.appendChild(completeBtn);

    // Création du bouton Delete
    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = "<i class='fa fa-trash'></i>";
    todoDiv.appendChild(trashBtn);

    // Vérifier si la tâche est achevée ou non
    if(todo.action == "done"){
        todoDiv.classList.add("done");
    }

    // Ajouter la nouvelle div à la todo list
    todoList.appendChild(todoDiv);
    });
}

function action(event){
    const item = event.target;
    // Delete todo
    if(item.classList[0] === "trash-btn"){
        item.parentNode.classList.add('fail');
        removeTodo(item.parentNode);
        item.parentNode.remove();
    }

    // Check todo
    if(item.classList[0] === "complete-btn"){
        item.parentNode.classList.toggle("done");
        let todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach((todo,index) =>{
            if(todo.content == item.parentNode.firstChild.innerText){
               if (item.parentNode.classList.contains("done")) {
                todos[index].action = "done"
                return;
               } else {
                todos[index].action = "undone"
                return;
               } 
            }
        });
        localStorage.setItem("todos",JSON.stringify(todos));
    }
}

function removeTodo(todoDiv){
    // Vérifier l'éxistence des taches dans le localstorage
    let todos = [];
    if (localStorage.getItem("todos") != null){
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoText = todoDiv.firstChild.innerText;
    todos.forEach((todo,index)=>{
        if(todo.content === todoText){
            todos.splice(index,1)
        }
    })
    localStorage.setItem('todos',JSON.stringify(todos));
}

function filterTodo(){
    const todos = todoList.childNodes;
    let i = 0;
    todos.forEach((todo)=>{
        if (i!=0) {
            switch (event.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "done":
                    if (todo.classList.contains("done")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "undone":
                    if (!todo.classList.contains("done")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;    
            
            }
        }
        i++;
    })
}