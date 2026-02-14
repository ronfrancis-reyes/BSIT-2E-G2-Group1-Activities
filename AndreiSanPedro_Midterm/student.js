// Variable to track which row is currently being edited
let editRow = null;

function addTask() {
    const title = document.getElementById('taskTitle').value;
    const desc = document.getElementById('taskDesc').value;
    const priority = document.getElementById('priority').value;
    const date = document.getElementById('dueDate').value;

    // Validation: Empty fields
    if (!title || !desc || !priority || !date) {
        alert("Please fill all fields!");
        return;
    }

    // Validation: Past dates
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (selectedDate < today) {
        alert("Due date cannot be in the past!");
        return;
    }

    // If we are editing, remove the old row first
    if (editRow) {
        editRow.remove();
        editRow = null;
        document.getElementById('saveBtn').innerText = "Save Task";
        document.getElementById('saveBtn').style.backgroundColor = "#007bff";
    }

    const tableBody = document.getElementById('taskTableBody');
    const row = document.createElement('tr');

    let priorityClass = "";
    if (priority === "High") priorityClass = "prio-high";
    else if (priority === "Medium") priorityClass = "prio-med";
    else priorityClass = "prio-low";

    row.innerHTML = `
        <td>${title}</td>
        <td>${desc}</td>
        <td class="${priorityClass}">${priority}</td>
        <td>${date}</td>
        <td class="status-text">Pending</td>
        <td>
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="del-btn" onclick="deleteTask(this)">Delete</button>
            <button class="done-btn" onclick="toggleComplete(this)">✓</button>
        </td>
    `;

    tableBody.appendChild(row);
    clearInputs();
}

function editTask(btn) {
    // If another row was already being edited, restore it first
    if (editRow) {
        editRow.style.opacity = "1";
        editRow.style.backgroundColor = "transparent";
    }

    const row = btn.closest('tr');
    editRow = row;

    // 1. Keep the info visible in the table but style it to show it's being edited
    row.style.opacity = "0.5";
    row.style.backgroundColor = "#fff3cd"; // Light yellow highlight

    // 2. Fill the form with the current data
    document.getElementById('taskTitle').value = row.cells[0].innerText;
    document.getElementById('taskDesc').value = row.cells[1].innerText;
    document.getElementById('priority').value = row.cells[2].innerText;
    document.getElementById('dueDate').value = row.cells[3].innerText;

    // 3. Change button text to "Update Task" to clarify the action
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = "Update Task";
    saveBtn.style.backgroundColor = "#ffc107";
    saveBtn.style.color = "black";

    // Scroll to top so the user sees the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function clearInputs() {
    document.getElementById('taskTitle').value = "";
    document.getElementById('taskDesc').value = "";
    document.getElementById('priority').selectedIndex = 0;
    document.getElementById('dueDate').value = "";
    editRow = null;
}

function deleteTask(btn) {
    if(confirm("Delete this task?")) {
        btn.closest('tr').remove();
    }
}

function toggleComplete(btn) {
    const row = btn.closest('tr');
    const status = row.querySelector('.status-text');
    if (status.innerText === "Pending") {
        status.innerText = "Completed";
        row.classList.add('row-complete');
    } else {
        status.innerText = "Pending";
        row.classList.remove('row-complete');
    }
}