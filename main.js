const taskinput = document.querySelector(".new_task");
const tasktype = document.querySelector(".task_input select");
const addbtn = document.querySelector(".btn1")
const tasksection = document.querySelector(".collection_section")
const taskfrom = document.querySelector(".task_input form");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function createTaskElement(task, index){
    const newtask = document.createElement("div");
    newtask.classList.add("collection");
    newtask.innerHTML= `
                <div> 
                    <input title = "check" 
                           type = "checkbox"
                           ${task.completed ? "checked" : ""}
                    >
                </div>
                
                <div class = "task-name ${task.completed ? "completed" : ""}">
                    ${task.text}
                </div>
                
                <div class="extra">
                    <div class="task-type"> ${task.type}
                </div>
                <div class="delete-btn">Delete </div>
                </div>`;
                
                
                newtask.dataset.index = index;
                tasksection.appendChild(newtask);
}


function displayTasks(){
    tasksection.innerHTML = "";
    tasks.forEach(function(task,index){
        createTaskElement(task, index);
    })
}

function addTask(event){
    event.preventDefault();
    const taskText = taskinput.value.trim()
    const selectedtype = tasktype.value;
    
    if(taskText === ""){
        alert("Please eneter a task!")
        return;

    }
    const store_task= {
        text: taskText,
        type:selectedtype,
        completed:false
    };
    tasks.push(store_task)
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

    taskinput.value= "";
    taskinput.focus();
}

addbtn.addEventListener("click", addTask);
taskfrom.addEventListener("submit", addTask);

tasksection.addEventListener("click", function(event){
    if(event.target.classList.contains("delete-btn")){
        const task= event.target.closest(".collection");
        const index= task.dataset.index;
        tasks.splice(index,1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks()
    }
});

tasksection.addEventListener("change", function(event){
    if(event.target.type === "checkbox"){
        const task = event.target.closest(".collection");
        const index = task.dataset.index;
        tasks[index].completed = event.target.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
       
        displayTasks()

        
    }
});

const theme = document.querySelector(".theme");
const savedTheme = localStorage.getItem("theme");

if(savedTheme === "light"){
    document.body.classList.add("light-theme");
    theme.src = "light_theme.png";

}
else{
    theme.src = "dark_theme.png";
}


theme.addEventListener("click", function(){
    document.body.classList.toggle("light-theme");
    if(document.body.classList.contains("light-theme")){
        theme.src = "light_theme.png";
        localStorage.setItem("theme", "light");
    }
    else{
        theme.src = "dark_theme.png";
        localStorage.setItem("theme", "dark");
    }
});

displayTasks();