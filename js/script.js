const taskList = [];

const task = document.getElementById("task")
const taskContainer = document.getElementById("task-container");
const dateElement = document.querySelector(".date")

const options = { weekday: "long", month: "long", day: "numeric" }
dateElement.textContent = new Date().toLocaleDateString("en-US",options)

task.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (task.value) {
            addTask();
        }
    }
});

function addTask() {
    taskList.push({
        id: taskList.length,
        value: task.value,
        isCompleted: false,
        isImportant: false
    })
    task.value = "";
    showTasks()
}

function showTasks() {
    let status
    let line
    let circleIconClass
    let starIconClass
    const completeContainer = document.getElementById("complete-container");
    const incompleteContainer = document.getElementById("incomplete-container");
    const completeHeader = document.querySelector(".complete-header") 
    
    completeContainer.innerHTML = "";
    incompleteContainer.innerHTML = "";

    taskList.forEach((taskItem) => {
        if (taskItem.isCompleted) {
            status = "complete"
            line = "line"
            circleIconClass = "fa-solid"
        } else {
            status = "incomplete"
            line = ""
            circleIconClass = "fa-regular"
        }

        if (taskItem.isImportant) {
            starIconClass = "fa-solid"
            title = "Remove importance"
        } else {
            starIconClass = "fa-regular"
            title = "Mark task as Important"
        }

        let div = createNewElement("div", "task-list");
        let iconContainer = createNewElement("span", status);
        div.appendChild(iconContainer);

        let circleIcon = createNewElement("i", "fa-regular fa-circle color-blue");
        circleIcon.id = taskItem.id;
        iconContainer.appendChild(circleIcon);

        let checkedCircle = createNewElement("i", circleIconClass + " fa-circle-check color-blue");
        checkedCircle.setAttribute("job","complete")
        checkedCircle.id = taskItem.id;
        iconContainer.appendChild(checkedCircle);

        let taskValue = createNewElement("span", "task-item");
        
        let text = createNewElement("span", line);
        text.textContent = taskItem.value;
        taskValue.appendChild(text);

        let tasks = createNewElement("span");
        tasks.textContent = "Tasks";
        taskValue.appendChild(tasks);
        div.appendChild(taskValue);

        let starIcon = createNewElement("i", starIconClass + " fa-star color-blue");
        starIcon.title = title
        starIcon.id = taskItem.id;
        starIcon.setAttribute("job","important")
        div.appendChild(starIcon);

        if (taskItem.isCompleted) {
            completeContainer.insertBefore(div, completeContainer.firstChild);
        } else {
            incompleteContainer.insertBefore(div, incompleteContainer.firstChild);
        }

        if (completeContainer.hasChildNodes()) {
            completeHeader.style.display = "block";
            completeHeader.addEventListener("click", () => {
                let arrowIcon = completeHeader.firstElementChild
                arrowIcon.classList.toggle("fa-chevron-right")
                completeContainer.classList.toggle("display")
                if(arrowIcon.classList.contains("fa-chevron-right")) {
                    arrowIcon.setAttribute("title", "Expand set of tasks")
                } else {
                    arrowIcon.setAttribute("title", "Collapse set of tasks")
                }
            })           
        } else {
            completeHeader.style.display = "none";
        }
        completeHeader.children[2].textContent = completeContainer.children.length
    })
}

function createNewElement(tag, name = "") {
    let newElement = document.createElement(tag);
    newElement.className = name
    return newElement;
}

taskContainer.addEventListener("click", (event) => {
    let element = event.target;
    if (element.nodeName === "I") {
        if (element.getAttribute("job") === "complete") {
            taskList[element.id].isCompleted = taskList[element.id].isCompleted ? false : true;    
        }
        else if(element.getAttribute("job") === "important"){
            taskList[element.id].isImportant = taskList[element.id].isImportant ? false : true;
        }
        showTasks()
    };
})