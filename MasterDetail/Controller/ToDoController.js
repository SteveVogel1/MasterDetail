import { ObservableList, Observable } from "../Observable/Observable.js";
import { Todo } from "../Model/ToDo.js"


export { TodoController }

const TodoController = () => {

    let id = 1;
    const todos = ObservableList([]);

    const addTodo = () => {
        const newTodo = Todo(id++);
        todos.add(newTodo);
        return newTodo;
    };


    const selectedTodo = Observable();


    return {
        numberOfTodos:      todos.count,
        numberOfopenTasks:  () => todos.countIf( todo => ! todo.getDone() ),
        addTodo:            addTodo,
        removeTodo:         todos.del,
        onTodoAdd:          todos.onAdd,
        onTodoRemove:       todos.onDel,
        removeTodoRemoveListener: todos.removeDeleteListener, // only for the test case, not used below
        getSelection:       selectedTodo
    }

}




