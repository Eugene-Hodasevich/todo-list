import { useCallback, useEffect, useState } from "react";

import { TodoItem } from "./TodoItem";

export function TodoItems({ todo, markDone, editTask, deleteTask }) {
    const [time, setTimes] = useState(Date.now())

    useEffect(() => {
        let interval
        if (time >= 0) {
            interval = setInterval(() => {
                setTimes(Date.now())
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [])

    const sortedTodoArr = useCallback(() => {
        let arr = [...todo]

        arr.sort((a, b) => {
            if (!a.deadline) {
                return 1
            } else if (!b.deadline) {
                return - 1
            }
            return a.deadline - b.deadline
        })

        let arrTodoDone = arr.filter((todo) => todo.status ? todo : null)
        let arrTodoInProcess = arr.filter((todo) => !todo.status ? todo : null)

        return [...arrTodoInProcess, ...arrTodoDone]
    }, [todo])

    function setTodoItems() {
        let num = 1
        return sortedTodoArr().map((task) => {
            return (
                <TodoItem
                    markDone={markDone}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    key={task.id}
                    action
                    num={num++}
                    todo={task}
                    currentTime={time}
                />
            )
        })
    }

    return (
        <div>
            {setTodoItems()}
        </div>
    )
}