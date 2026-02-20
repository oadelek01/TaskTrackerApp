document.addEventListener("DOMContentLoaded", () => {

    // References
    const form = document.getElementById("taskForm");
    const taskTitleInput = document.getElementById("taskTitle");
    const priorityInput = document.getElementById("priority");
    const dueDateInput = document.getElementById("dueDate");
    const taskList = document.getElementById("taskList");
    const totalTasksSpan = document.getElementById("totalTasks");
    const completedTasksSpan = document.getElementById("completedTasks");

    // Load tasks from localStorage or start empty
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentFilter = "all";

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Update task counters
    function updateCounters() {
        totalTasksSpan.textContent = tasks.length;
        completedTasksSpan.textContent = tasks.filter(t => t.completed).length;
    }

    // Render tasks to the page
    function renderTasks() {
        taskList.innerHTML = "";

        // Apply filter
        let filteredTasks = tasks;
        if (currentFilter === "active") {
            filteredTasks = tasks.filter(t => !t.completed);
        } else if (currentFilter === "completed") {
            filteredTasks = tasks.filter(t => t.completed);
        }

        // Create task elements
        filteredTasks.forEach(task => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            if (task.completed) taskDiv.classList.add("completed");

            // Left: title + due date
            const leftDiv = document.createElement("div");
            leftDiv.innerHTML = `
                <strong>${task.title}</strong>
                ${task.dueDate ? `<br><small>Due: ${task.dueDate}</small>` : ""}
            `;

            // Priority badge
            const badge = document.createElement("span");
            badge.classList.add("priority", task.priority.toLowerCase());
            badge.textContent = task.priority;

            // Complete/Undo button bound directly to the task object
            const completeBtn = document.createElement("button");
            completeBtn.textContent = task.completed ? "Undo" : "Complete";
            completeBtn.addEventListener("click", () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasks();
                renderTasks();
            });

            // Right side: priority badge + buttons
            const rightDiv = document.createElement("div");
            rightDiv.appendChild(badge);
            rightDiv.appendChild(completeBtn);
            rightDiv.appendChild(deleteBtn);

            // Combine left and right
            taskDiv.appendChild(leftDiv);
            taskDiv.appendChild(rightDiv);

            taskList.appendChild(taskDiv);
        });

        updateCounters();
    }

    // Handle new task submission
    form.addEventListener("submit", e => {
        e.preventDefault();
        const title = taskTitleInput.value.trim();
        const priority = priorityInput.value;
        const dueDate = dueDateInput.value;

        if (!title) {
            alert("Task title cannot be empty.");
            return;
        }

        // Create new task with unique ID
        const newTask = {
            id: Date.now(),
            title,
            priority,
            dueDate,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        form.reset();
    });

    // Filter buttons
    document.getElementById("allFilter").onclick = () => {
        currentFilter = "all";
        renderTasks();
    };
    document.getElementById("activeFilter").onclick = () => {
        currentFilter = "active";
        renderTasks();
    };
    document.getElementById("completedFilter").onclick = () => {
        currentFilter = "completed";
        renderTasks();
    };

    // Initial render
    renderTasks();
});