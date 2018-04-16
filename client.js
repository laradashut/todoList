var todoList = {
    todos: [],
    addTodo: function(todoText) {
     this.todos.push({
       todoText: todoText,
       completed: false
     });
   
    },
    changeTodo: function(position, todoText) {
       this.todos[position].todoText = todoText;
     
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
     
    },
    toggleCompleted: function(position) {
        this.todos[position].completed = !this.todos[position].completed;

    },
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        
        this.todos.forEach(function(todo) {
            if (todo.completed) {
                completedTodos++;
            }
        })

        this.todos.forEach(function(todo) {
            if (completedTodos === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        })
    }
}

var handlers = {
    addTodo: function() {
        var addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = "";
        view.displayTodos();
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = '';
        view.displayTodos();
    },
     toggleAll: function() {
        todoList.toggleAll();
         view.displayTodos();
    }
 }

var view = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        
        todoList.todos.forEach(function(todo, position) {
            var todoLi = document.createElement('li');
            var todoListWithCompletion = '';
            
            if (todo.completed) {
                todoListWithCompletion = `(x) ${todo.todoText}`;
            } else {
                todoListWithCompletion = `( ) ${todo.todoText}`;
            }
            
            todoLi.id = position;
            todoLi.textContent = todoListWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }, this)
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');

        todosUl.addEventListener('click', function(event) {
            var elementClicked = event.target;
            if (elementClicked.className === 'deleteButton') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        })
    }
};

view.setUpEventListeners();