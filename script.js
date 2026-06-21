const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "active")
            return !task.completed;

        if (currentFilter === "completed")
            return task.completed;

        return true;
    });

    filteredTasks.forEach((task, index) => {

        let li = document.createElement("li");

        if (task.completed)
            li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>

            <div>
                <button class="completeBtn">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="editBtn">Edit</button>

                <button class="deleteBtn">Delete</button>
            </div>
        `;
        li.querySelector(".completeBtn").addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        li.querySelector(".editBtn").addEventListener("click", () => {
            let newText = prompt("Edit Task", task.text);

            if (newText) {
                task.text = newText;
                saveTasks();
                renderTasks();
            }
        });

        li.querySelector(".deleteBtn").addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {

    if (taskInput.value.trim() === "")
        return;

    tasks.push({
        text: taskInput.value,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

renderTasks();
