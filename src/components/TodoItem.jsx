import { useState, useEffect, useRef } from "react";

import {
    Card,
    ProgressBar,
    ButtonIcon,
} from 'react-rainbow-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faPencilAlt,
    faCheck,
} from '@fortawesome/free-solid-svg-icons';

import { capitalize, secondsToDhms } from "../tools/tools";

export function TodoItem({ todo, num, deleteTask, editTask, markDone, currentTime }) {
    const [text, setText] = useState(capitalize(todo.task))
    const [textDecoration, setTextDecoration] = useState('none')

    const color = useRef('transparent')
    const time = useRef('Waiting...')
    const progression = useRef(0)

    useEffect(() => {
        setText(capitalize(todo.task))
    }, [todo.task])

    useEffect(() => {
        if (todo.deadline) {
            time.current = Math.floor((todo.deadline - currentTime) / 1000)
        } else {
            time.current = 'Waiting...'
        }

    }, [todo.deadline, currentTime])

    useEffect(() => {
        if (todo.status) {
            color.current = 'green'
            return
        } else if (currentTime > todo.deadline && todo.deadline) {
            color.current = 'red'
            return
        } else {
            color.current = '#4dc9cb'
            return
        }
    })

    useEffect(() => {
        if (todo.status) {
            setTextDecoration('line-through')
        } else {
            setTextDecoration('none')
        }
    }, [todo.status])

    useEffect(() => {
        let taskProgression = ((1 - (Math.floor((todo.deadline - currentTime) / 1000) / (Math.floor(todo.deadline / 1000) - Math.floor(todo.startTime / 1000)))) * 100).toFixed()
        if (taskProgression <= 100) {
            progression.current = taskProgression
        } else if (taskProgression > 100) {
            progression.current = 100
        } else if (taskProgression < 0) {
            progression.current = 0
        }
    })

    return (
        <>
            <div className="rainbow-m-around_medium">
                <Card style={{ boxShadow: `0px 0px 7px ${color.current}` }}>
                    <div className="rainbow-p-around_medium task-box-inner">
                        <span className='task-name'>
                            {!todo.status ? `${num}. ` : ''}
                            <span style={{ textDecoration: textDecoration }}>{text}</span>
                        </span>
                        <div className='task-buttons'>
                            <ButtonIcon
                                variant="border-filled"
                                disabled={todo.status}
                                onClick={() => markDone(todo.id)}
                                size="medium"
                                tooltip="Mark Done"
                                icon={<FontAwesomeIcon icon={faCheck} />}
                            />
                            <ButtonIcon
                                variant="border-filled"
                                disabled={todo.status}
                                onClick={() => editTask(todo)}
                                size="medium"
                                tooltip="Edit"
                                icon={<FontAwesomeIcon icon={faPencilAlt} />}
                            />
                            <ButtonIcon
                                variant="border-filled"
                                onClick={() => deleteTask(todo.id)}
                                size="medium"
                                tooltip="Delete"
                                icon={<FontAwesomeIcon icon={faTrashAlt} />}
                            />
                        </div>
                    </div>

                    {todo.deadline && !todo.status ?
                        <div className="rainbow-p-around_x-small">

                            <div className='line'></div>

                            <div className="rainbow-align-content_space-between rainbow-p-bottom_x-small">
                                <span className="rainbow-font-size-text_medium">
                                    {time.current > 0 ? `Time remains: ${secondsToDhms(time.current)}` : typeof (time.current) === 'string' ? time.current : 'Time is out'}
                                </span>

                                <span aria-hidden="true">
                                    <strong className="rainbow-font-size-text_small rainbow-color_brand">
                                        {progression.current}% of time has past
                                    </strong>
                                </span>

                            </div>

                            <ProgressBar value={progression.current} size='small' />
                        </div> : null
                    }
                </Card>
            </div>
        </>
    )
}