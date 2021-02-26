// First of all, get reference to your html
let input = document.getElementById('todo')
let addTodo = document.getElementById('addBtn')
let formSubmit = document.getElementById('input')
let todoItemsList = document.querySelector('.todo-items')

// Initializa an empty array
let todos = []

// Add event to form
formSubmit.addEventListener('submit', (event) => {
    event.preventDefault()
    if (input.value !== '') {
        // console.log(input.value)
        let date = new Date(Date.now())
        let newTodo = {
            date: date.toLocaleDateString(),
            name: input.value,
            completed: false
        }

        // Clear Input
        input.value = ''
        // This line adds Todo to the Local Storage
        todos.push(newTodo)
        addToLocalStorage(todos)
    }
})

// Add todo to Local Storage
function addToLocalStorage(todo) {
    localStorage.setItem('todos', JSON.stringify(todo))
    getTodo(todos)
}

// Get Todos
function getTodo() {
    // alert('Hello World')
    let todoItems = localStorage.getItem('todos')
    if (todoItemsList) {
        todos = JSON.parse(todoItems)
        renderTodo(todos)
    }
}

// Render todoItems
function renderTodo(todo) {
    todoItemsList.innerHTML = ''

    // Loop through todoitems
    todo.forEach(item => {
        // check if the item is completed
        const checked = item.completed ? 'checked': null;

        const li = document.createElement('li');
        // <li class="item"> </li>
        li.setAttribute('class', 'item');
        // <li class="item" data-key="20200708"> </li>
        li.setAttribute('data-key', item.name);
        /* <li class="item" data-key="20200708"> 
            <input type="checkbox" class="checkbox">
            Go to Gym
            <button class="delete-button">X</button>
            </li> */
        // if item is completed, then add a class to <li> called 'checked', which will add line-through style
        if (item.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>
        `;
        // finally add the <li> to the <ul>
        todoItemsList.append(li);
    })
}

// Toggle Todo's Checked class
function toggle(name) {
    todos.forEach(item => {
        if (item.name == name) {
            item.completed = !item.completed
        }
    })
    addToLocalStorage(todos)
}

function deleteTodo(name) {
    todos = todos.filter(todo => {
        return todo.name != name
    })
    // Add todos back to localStorage
    addToLocalStorage(todos)
}

todoItemsList.addEventListener('click', (event)=> {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'))
    }

    if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'))
    }
})
