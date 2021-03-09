import { useState, useEffect } from "react";

import { Card, Textarea, Button } from "react-rainbow-components";

export function CreateTodo({ todo, submit }) {
    const [task, setTask] = useState({
        task: '', status: false
    })

    useEffect(() => {
        setTask(prev => {
            return { ...prev, task: '' }
        })
    }, [todo.length]);

    function inputChange(e) {
        setTask(prev => {
            return { ...prev, task: e.target.value }
        })
    }

    return (
        <>
            <div className="rainbow-p-around_small">
                <Card className='create-task-box'>
                    <Textarea
                        id="example-textarea-1"
                        rows={1}
                        placeholder="Add Task"
                        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto add-task-textarea"
                        onChange={inputChange}
                        value={task.task}
                    />

                    <Button
                        shaded
                        label="Add Task"
                        onClick={() => submit(task)}
                        variant="brand"
                        className="rainbow-m-around_medium add-task-button"
                    />
                </Card>
            </div>
        </>
    )
}