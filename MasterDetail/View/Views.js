
// View-specific parts
export {TodoItemsView, TodoTotalView, TodoOpenView, TodoDetailView}


const TodoItemsView = (todoController, rootElement) => {

    const render = todo => {

        function createElements() {
            const template = document.createElement('DIV'); // only for parsing
            template.innerHTML = `
                <button class="delete">&times;</button>
                <input type="text" size="42" >
                <input type="checkbox">
            `;
            return template.children;
        }
        const [deleteButton, inputElement, checkboxElement] = createElements();

        checkboxElement.onclick = _ => todo.setDone(checkboxElement.checked);
        deleteButton.onclick    = _ => todoController.removeTodo(todo);
        inputElement.onclick = _ => todoController.setSelection(todo);


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

        inputElement.oninput = _ => {
            console.log("Set title on master");
            todo.setTitle(inputElement.value);
        }

        todo.onChangeDone( val => {
            console.log("Done value changed", val);
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
        const doneElement = document.getElementById("detailDone");

        if(typeof todo === 'undefined' ){
            //Disabling inputs
            titleElement.disabled = true;
            descriptionElement.disabled = true;
            dateElement.disabled = true;
            doneElement.disabled = true;

            idElement.innerHTML = "";
            titleElement.value = "";
            descriptionElement.value = "";
            dateElement.value = "";
            doneElement.checked = "";
        }else{

            console.log("new selected todo", todo);

            //Enabling inputs
            titleElement.disabled = false;
            descriptionElement.disabled = false;
            dateElement.disabled = false;
            doneElement.disabled = false;


            //Setting values
            idElement.innerHTML = todo.getId;
            titleElement.value = todo.getTitle();
            descriptionElement.value = todo.getDescription();
            dateElement.value = todo.getDate();
            doneElement.checked = todo.getDone();


            //Unbind old bindings


            //bind new bindings


            //Input events
            titleElement.oninput = _ => {
                console.log("On Input details")
                todo.setTitle(titleElement.value);
            }

            descriptionElement.oninput = _ => {
                todo.setDescription(descriptionElement.value);
            }

            dateElement.oninput = _ => {
                todo.setDate(dateElement.value);
            }

            doneElement.onclick = _ => todo.setDone(doneElement.checked);


            //Change events
            todo.onChangeTitle( () => {
               console.log("blabla title");
            });

            todo.onChangeDescription( () => {
                console.log("blabla description");
            });

            todo.onChangeDate( () => {
               console.log("Blabla date")
            });

            todo.onChangeDone( () => {
                console.log("blabla done");
            });

            //Is Dirty
            console.log(todo.getTitleIsDirty);
            todo.getTitleIsDirty.onChange( (val) => {
                if(val){
                    console.log("Got dirty");
                    titleElement.classList.add("isDirty");
                }else{
                    console.log("Clean again");
                    titleElement.classList.remove("isDirty");
                }
            })


        }


    };

    todoController.getSelection.onChange( todo => {
        render(todo);
    });

}
