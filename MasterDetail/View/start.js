import {TodoController} from '../Controller/ToDoController.js';
import {TodoOpenView, TodoTotalView, TodoItemsView} from './views.js'

const todoController = TodoController();

// binding of the main view

document.getElementById('plus').onclick    = _ => todoController.addTodo();

// create the sub-views, incl. binding

TodoItemsView(todoController, document.getElementById('todoContainer'));
TodoTotalView(todoController, document.getElementById('numberOfTasks'));
TodoOpenView (todoController, document.getElementById('openTasks'));

// init the model

todoController.addTodo();