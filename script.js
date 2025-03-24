// Task Class: Represents a single task
class Task {
    constructor(name, description, status = 'pending') {
    this.id = Date.now() // Unique ID based on timestamp
    this.name = name
    this.description = description
    this.status = status
    }
}
// Load tasks from local storage (if available)
let tasks = JSON.parse(localStorage.getItem('tasks')) || []

//  Function to Display Tasks
function renderTasks(filter = 'all') {
    const taskList = document.getElementById('task-list')
  taskList.innerHTML = '' // Clear the list before rendering

  // Filter tasks based on selected status
    tasks
    .filter((task) => filter === 'all' || task.status === filter)
    .forEach((task) => {
        const li = document.createElement('li')
        li.classList.add('task')
        if (task.status === 'completed') li.classList.add('completed')

      // Task details + buttons
        li.innerHTML = `
                <div>
                    <strong>${task.name}</strong>: ${task.description}
                </div>
                <div class="task-buttons">
                    <button onclick="toggleStatus(${task.id})">
                        ${
                            task.status === 'pending' ? ' Complete' : ' Pending'
                        }
                    </button>
                    <button onclick="editTask(${task.id})"> Edit</button>
                    <button onclick="deleteTask(${task.id})"> Delete</button>
                </div>
            `

        taskList.appendChild(li)
    })

  // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//  Function to Add a Task
function addTask() {
    const nameInput = document.getElementById('task-name')
    const descInput = document.getElementById('task-desc')

    if (nameInput.value.trim() === '' || descInput.value.trim() === '') {
    alert('Please enter a task name and description.')
    return
    }

    const newTask = new Task(nameInput.value, descInput.value)
    tasks.push(newTask)
    renderTasks()

  nameInput.value = '' // Clear input
    descInput.value = ''
}

// Function to Edit a Task
function editTask(id) {
    const task = tasks.find((task) => task.id === id)
    if (!task) return

    const newName = prompt('Enter new task name:', task.name)
    const newDesc = prompt('Enter new task description:', task.description)

    if (newName.trim() !== '' && newDesc.trim() !== '') {
    task.name = newName
    task.description = newDesc
    renderTasks()
    } else {
    alert('Task name and description cannot be empty!')
    }
}

//  Function to Toggle Task Status (Complete/Pending)
function toggleStatus(id) {
    const task = tasks.find((task) => task.id === id)
    if (task) {
    task.status = task.status === 'pending' ? 'completed' : 'pending'
    renderTasks()
    }
}

//  Function to Delete a Task
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks()
}

//  Function to Filter Tasks
function filterTasks(status) {
    renderTasks(status)
}

// Initialize: Render Tasks on Page Load
renderTasks()
