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


    let selectedTodo = Observable();

    const setSelected = (todo) => {
        //Unbind all
        selectedTodo = todo;
        //Bind all
    }


    return {
        numberOfTodos:      todos.count,
        numberOfopenTasks:  () => todos.countIf( todo => ! todo.getDone() ),
        addTodo:            addTodo,
        removeTodo:         todos.del,
        onTodoAdd:          todos.onAdd,
        onTodoRemove:       todos.onDel,
        removeTodoRemoveListener: todos.removeDeleteListener, // only for the test case, not used below
        getSelection:       selectedTodo,
        setSelected:        (todo) => setSelected(todo)
    }

}




