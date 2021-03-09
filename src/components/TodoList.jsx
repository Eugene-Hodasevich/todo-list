import { useState, useEffect } from "react";
import { Card } from 'react-rainbow-components';
import { CreateTodo } from "./CreateTodo";
import { TodoItems } from "./TodoItems";
import { ModalWindow } from "./ModalWindow";

export function TodoList() {
    const [todo, setTodo] = useState([])
    const [modalIsOpened, setModalIsOpened] = useState(false)
    const [todoToEdit, setTodoToEdit] = useState()

    useEffect(() => {
        setTodo(JSON.parse(localStorage.getItem('todo')))
    }, [])

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todo))
    }, [todo])

    function editTask(todo) {
        setTodoToEdit(todo)
        setModalIsOpened(true)
    }

    function deleteTask(id) {
        let arr = todo.filter(todo => {
            return todo.id !== id
        })
        setTodo(arr)
    }

    function markDone(id) {
        setTodo(todo.map(todo => {
            if (todo.id === id) {
                todo.deadline = ''
                todo.status = !todo.status
            }
            return todo
        }))
    }

    function createTask(newTask) {
        if (newTask.task) {
            let maxId
            if (todo.length) {
                let idsArr = todo.map((todo) => todo.id)
                maxId = Math.max(...idsArr)
            } else {
                maxId = 1
            }
            // newTask.deadline = ''
            newTask.id = maxId + 1

            setTodo([...todo, { ...newTask, id: generateId() }])
        }
    }

    function generateId() {
        if (todo.length) {
            let idsArr = todo.map((todo) => todo.id)
            return Math.max(...idsArr) + 1
        }
        return 1
    }

    function changeTodo(renewedTodo) {
        let newTodoArray = todo.filter(todo => todo.id !== todoToEdit.id)
        setTodo([...newTodoArray, renewedTodo])
        setModalIsOpened(false)
    }

    function onModalClose() {
        setModalIsOpened(false)
    }

    return (
        <div className='todo-list'>

            <div className="rainbow-p-around_small">
                <Card className='create-task-box'>
                    <h1>Task List</h1>
                </Card>
            </div>

            <CreateTodo
                todo={todo}
                submit={createTask}
            />

            <TodoItems
                todo={todo}
                markDone={markDone}
                editTask={editTask}
                deleteTask={deleteTask}
                action
            />

            {modalIsOpened ?
                <ModalWindow
                    todoToEdit={todoToEdit}
                    modalIsOpened={modalIsOpened}
                    onModalClose={onModalClose}
                    acceptChangedTodo={changeTodo}
                />
                : null
            }
        </div>
    )
}

