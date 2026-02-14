let tasks = [];
let editingId = null; // Track which row is currently in "edit mode"

const taskForm = document.getElementById("taskForm");
const taskTableBody = document.getElementById("taskTableBody");
const addBtn = document.getElementById("addBtn");
const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
const activityStatusSection = document.getElementById("activityStatusSection");

// Init
checkTableVisibility();

// Event Listener for Form Submission
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = document.getElementById("taskName").value.trim();
    const priority = document.getElementById("priority").value;
    const category = document.getElementById("category").value;
    const dueDate = document.getElementById("dueDate").value;

    if (!taskName || !priority || !category || !dueDate) {
        alert("Please fill in all fields.");
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(dueDate);

    if (selectedDate < today) {
        alert("Due date cannot be in the past.");
        return;
    }

    // Add Task (No update mode in form anymore, editing is inline)
    addTask(taskName, priority, category, dueDate);
    taskForm.reset();
});

// Event Listener for Delete Selected
// Event Listener for Delete Selected
deleteSelectedBtn.addEventListener("click", function () {
    const selectedCheckboxes = document.querySelectorAll('input[name="taskSelect"]:checked');
    if (selectedCheckboxes.length === 0) {
        alert("Please select at least one task to delete.");
        return;
    }

    if (confirm(`Are you sure you want to delete ${selectedCheckboxes.length} task(s)?`)) {
        const idsToDelete = Array.from(selectedCheckboxes).map(cb => parseInt(cb.value));
        tasks = tasks.filter(t => !idsToDelete.includes(t.id));
        renderTasks();
    }
});

function addTask(name, priority, category, date) {
    const task = {
        id: Date.now(),
        name: name,
        priority: priority,
        category: category,
        dueDate: date,
        completed: false
    };
    tasks.push(task);
    renderTasks();
}

// Switch row to edit mode
function editTask(id) {
    editingId = id;
    renderTasks();
}

// Cancel edit mode
function cancelEdit() {
    editingId = null;
    renderTasks();
}

// Save changes from inline edit
function saveTask(id) {
    const row = document.getElementById(`row-${id}`);
    const nameInput = row.querySelector(".edit-name");
    const dateInput = row.querySelector(".edit-date");
    const priorityInput = row.querySelector(".edit-priority");
    const categoryInput = row.querySelector(".edit-category");

    const newName = nameInput.value.trim();
    const newDate = dateInput.value;
    const newPriority = priorityInput.value;
    const newCategory = categoryInput.value;

    if (!newName || !newDate || !newPriority || !newCategory) {
        alert("Fields cannot be empty.");
        return;
    }

    // Validate Date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(newDate);

    if (selectedDate < today) {
        alert("Due date cannot be in the past.");
        return;
    }

    const task = tasks.find(t => t.id === id);
    if (task) {
        task.name = newName;
        task.dueDate = newDate;
        task.priority = newPriority;
        task.category = newCategory;
    }

    editingId = null;
    renderTasks();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function formatDateDisplay(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
}

function getStatus(task) {
    if (task.completed) return "DONE";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    if (due < today) return "OVERDUE";
    return "IN PROGRESS";
}

function checkTableVisibility() {
    if (tasks.length === 0) {
        activityStatusSection.style.display = "none";
    } else {
        activityStatusSection.style.display = "block";
    }
}

function renderTasks() {
    taskTableBody.innerHTML = "";
    checkTableVisibility();

    tasks.forEach(task => {
        const row = document.createElement("tr");
        row.id = `row-${task.id}`;
        const isEditing = (task.id === editingId);

        if (isEditing) {
            // Render Input Fields
            row.innerHTML = `
                <td></td> <!-- No select in edit mode -->
                <td><input type="text" class="edit-input edit-name" value="${task.name}"></td>
                <td><input type="date" class="edit-input edit-date" value="${task.dueDate}"></td>
                <td>
                    <select class="edit-input edit-priority">
                        <option value="high" ${task.priority === 'high' ? 'selected' : ''}>HIGH</option>
                        <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>MEDIUM</option>
                        <option value="low" ${task.priority === 'low' ? 'selected' : ''}>LOW</option>
                    </select>
                </td>
                <td>
                    <select class="edit-input edit-category">
                        <option value="Academic" ${task.category === 'Academic' ? 'selected' : ''}>Academic</option>
                         <option value="Organization" ${task.category === 'Organization' ? 'selected' : ''}>Organization</option>
                        <option value="Personal" ${task.category === 'Personal' ? 'selected' : ''}>Personal</option>
                         <option value="Other" ${task.category === 'Other' ? 'selected' : ''}>Other</option>
                    </select>
                </td>
                <td>--</td>
                <td>--</td>
                <td>
                    <button class="action-btn save-btn" onclick="saveTask(${task.id})">Save</button>
                    <button class="action-btn cancel-btn" onclick="cancelEdit()">Cancel</button>
                </td>
            `;
        } else {
            // Render Normal View
            const statusText = task.completed ? "DONE" : getStatus(task);
            const checkClass = task.completed ? "completed" : "not-completed";

            row.innerHTML = `
                <td><input type="checkbox" name="taskSelect" value="${task.id}"></td>
                <td>${task.name}</td>
                <td>${formatDateDisplay(task.dueDate)}</td>
                <td>${task.priority.toUpperCase()}</td>
                <td>${task.category}</td>
                <td><span class="status-text">${statusText}</span></td>
                <td>
                    <div class="complete-check-container">
                        <div class="custom-checkbox ${checkClass}" onclick="toggleComplete(${task.id})">
                            <i>✔</i>
                        </div>
                    </div>
                </td>
                <td>
                    <button class="action-btn edit-btn" onclick="editTask(${task.id})">Edit</button>
                </td>
            `;
        }

        taskTableBody.appendChild(row);
    });
}
