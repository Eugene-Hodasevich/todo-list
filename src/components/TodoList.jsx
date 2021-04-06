import { useState, useEffect } from "react";
import { Card } from 'react-rainbow-components';
import { CreateTodo } from "./CreateTodo";
import { TodoItems } from "./TodoItems";
import { ModalWindow } from "./ModalWindow";

export function TodoList() {
    const [todos, setTodos] = useState([])
    const [modalIsOpened, setModalIsOpened] = useState(false)
    const [todoToEdit, setTodoToEdit] = useState()

    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem('todo')))
    }, [])

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todos))
    }, [todos])

    function editTask(todo) {
        setTodoToEdit(todo)
        setModalIsOpened(true)
    }

    function deleteTask(id) {
        let arr = todos.filter(todo => {
            return todo.id !== id
        })
        setTodos(arr)
    }

    function markDone(id, e) {
        e.currentTarget.blur()

        setTodos(todos.map(todo => {
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
            if (todos.length) {
                let idsArr = todos.map((todo) => todo.id)
                maxId = Math.max(...idsArr)
            } else {
                maxId = 1
            }

            newTask.id = maxId + 1

            setTodos([...todos, { ...newTask, id: generateId() }])
        }
    }

    function generateId() {
        if (todos.length) {
            let idsArr = todos.map((todo) => todo.id)
            return Math.max(...idsArr) + 1
        }
        return 1
    }

    function changeTodo(renewedTodo) {
        let newTodoArray = todos.filter(todo => todo.id !== todoToEdit.id)
        setTodos([...newTodoArray, renewedTodo])
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
                todo={todos}
                submit={createTask}
            />

            <TodoItems
                todos={todos}
                markDone={markDone}
                editTask={editTask}
                deleteTask={deleteTask}
                action
            />

            {modalIsOpened &&
                <ModalWindow
                    todoToEdit={todoToEdit}
                    modalIsOpened={modalIsOpened}
                    onModalClose={onModalClose}
                    acceptChangedTodo={changeTodo}
                />
            }
        </div>
    )
}

