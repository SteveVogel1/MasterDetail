
// View-specific parts
export {TodoItemsView, TodoTotalView, TodoOpenView, TodoDetailView}


const TodoItemsView = (todoController, rootElement) => {

    const render = todo => {

        function createElements() {
            const template = document.createElement('DIV'); // only for parsing
            template.innerHTML = `
                <button class="delete">&times;</button>
                <label type="text" size="42"></label>
                <input type="checkbox">
            `;
            return template.children;
        }
        const [deleteButton, inputElement, checkboxElement] = createElements();

        checkboxElement.onclick = _ => {
            todo.setDone(checkboxElement.checked);
            if(checkboxElement.checked) {
                todo.save();
            }
        }

        todoController.getSelection.onChange( selTodo => {
            if(selTodo === todo){
                inputElement.classList.add("selectedTodo");
            }else{
                inputElement.classList.remove("selectedTodo");
            }

        });

        deleteButton.onclick    = _ => todoController.removeTodo(todo);

        inputElement.onclick = _ => todoController.setSelection(todo);
        inputElement.innerText = todo.getTitle();


        todoController.onTodoRemove( (removedTodo, removeMe) => {
            if (removedTodo !== todo) return;
            if(removedTodo === todoController.getSelection.getValue()){
                todoController.setSelection(undefined);
            }

            rootElement.removeChild(inputElement);
            rootElement.removeChild(deleteButton);
            rootElement.removeChild(checkboxElement);
            removeMe();
        });

        const todoCheckDirty = () => {
            if(todo.getTitleIsDirty.getValue() || todo.getDescriptionIsDirty.getValue() || todo.getDateIsDirty.getValue()){
                inputElement.classList.add("isDirty");
            }else{
                inputElement.classList.remove("isDirty");
            }
        }

        todo.getTitleIsDirty.onChange( (val) => {
            todoCheckDirty();
        });
        todo.getDescriptionIsDirty.onChange( (val) => {
            todoCheckDirty();
        });
        todo.getDateIsDirty.onChange( (val) => {
            todoCheckDirty();
        });

        todo.onChangeTitle( (val) => {
            inputElement.innerText = todo.getTitle();
        });

        rootElement.appendChild(deleteButton);
        rootElement.appendChild(inputElement);
        rootElement.appendChild(checkboxElement);
    };

    // binding

    todoController.onTodoAdd(render);




    // we do not expose anything as the view is totally passive.
};

const TodoTotalView = (todoController, numberOfTasksElement) => {

    const render = () =>
        numberOfTasksElement.innerText = "" + todoController.numberOfTodos();

    // binding

    todoController.onTodoAdd(render);
    todoController.onTodoRemove(render);
};

const TodoOpenView = (todoController, numberOfOpenTasksElement) => {

    const render = () =>
        numberOfOpenTasksElement.innerText = "" + todoController.numberOfopenTasks();

    // binding

    todoController.onTodoAdd(todo => {
        render();
        todo.onChangeDone(render);
    });
    todoController.onTodoRemove(render);
};


const TodoDetailView = (todoController) => {

    const render = (todo) => {

        const idElement = document.getElementById("detailID");
        const titleElement = document.getElementById("detailTitle");
        const descriptionElement = document.getElementById("detailDescription");
        const dateElement = document.getElementById("detailDate");

        if(typeof todo === 'undefined' ){
            //Disabling inputs
            titleElement.disabled = true;
            descriptionElement.disabled = true;
            dateElement.disabled = true;

            idElement.innerHTML = "";
            titleElement.value = "";
            descriptionElement.value = "";
            dateElement.value = "";

            titleElement.classList.remove("isDirty");
            descriptionElement.classList.remove("isDirty");
            dateElement.classList.remove("isDirty");

        }else{

            //Enabling inputs
            titleElement.disabled = false;
            descriptionElement.disabled = false;
            dateElement.disabled = false;

            //Setting values
            idElement.innerHTML = todo.getId;
            titleElement.value = todo.getTitle();
            descriptionElement.value = todo.getDescription();
            dateElement.value = todo.getDate();


            //Binding
            todo.onChangeTitle( () => {
                titleElement.value = todo.getTitle();
            });

            todo.onChangeDescription( () => {
                descriptionElement.value = todo.getDescription();
            });

            todo.onChangeDate( () => {
                dateElement.value = todo.getDate();
            });

            //Input events
            titleElement.oninput = _ => {
                todo.setTitle(titleElement.value);
            }

            descriptionElement.oninput = _ => {
                todo.setDescription(descriptionElement.value);
            }

            dateElement.oninput = _ => {
                todo.setDate(dateElement.value);
            }

            //Is Dirty
            todo.getTitleIsDirty.onChange( (val) => {
                if(val){
                    titleElement.classList.add("isDirty");
                }else{
                    titleElement.classList.remove("isDirty");
                }
            });

            todo.getDescriptionIsDirty.onChange( (val) => {
                if(val){
                    descriptionElement.classList.add("isDirty");
                }else{
                    descriptionElement.classList.remove("isDirty");
                }
            });

            todo.getDateIsDirty.onChange( (val) => {
                if(val){
                    dateElement.classList.add("isDirty");
                }else{
                    dateElement.classList.remove("isDirty");
                }
            });
        }
    };

    document.getElementById("save").onclick = () => {
        todoController.getSelection.getValue().save();
    };

    document.getElementById("back").onclick= () => {
        todoController.getSelection.getValue().undo();
    };

    todoController.getSelection.onChange( todo => {
        render(todo);
    });

}
