import { ObservableList, Observable } from "../Observable/observable.js";



export {TodoController}

const TodoController = () => {

    let id = 1;
    const todos = Observable([]);

    const addTodo = () => {
        const newTodo = Todo(id++);
        todos.add(newTodo);
        return newTodo;
    };

    return {
        numberOfTodos:      todos.count,
        numberOfopenTasks:  () => todos.countIf( todo => ! todo.getDone() ),
        addTodo:            addTodo,
        removeTodo:         todos.del,
        onTodoAdd:          todos.onAdd,
        onTodoRemove:       todos.onDel,
        removeTodoRemoveListener: todos.removeDeleteListener, // only for the test case, not used below
    }

}




