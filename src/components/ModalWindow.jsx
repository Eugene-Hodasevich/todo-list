import { useState } from "react";
import { Modal, Button, DateTimePicker } from 'react-rainbow-components';
import {
    faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentEditable from "react-contenteditable";

export function ModalWindow({ todoToEdit, modalIsOpened, onModalClose, acceptChangedTodo }) {
    const [todoToChange, setTodoToChange] = useState(todoToEdit)
    const [newDeadline, setNewDeadline] = useState(null)

    let datePickerTime = (new Date())
    datePickerTime.setMinutes((new Date()).getMinutes() + 10)

    let maxDate = (new Date())
    maxDate.setFullYear((new Date()).getFullYear() + 5)

    function changeTodo(deadline) {
        if (+deadline < Date.now()) {
            alert('Please try to set time that more than current')
            return
        }

        setTodoToChange({ ...todoToChange, startTime: Date.now(), deadline: + deadline })
    }

    function changeTaskName(e) {
        setTodoToChange({ ...todoToChange, task: e.target.value })
    }

    return (
        <Modal
            className='modal-window'
            title="Task"
            size="medium"
            isOpen={modalIsOpened}
            onRequestClose={() => onModalClose()}
        >
            <span className='modal-task-name'>
                <ContentEditable
                    className='name-changer'
                    onChange={changeTaskName}
                    html={todoToChange.task}
                    tagName='article'
                />
            </span>

            <div className='modal-bottom'>
                <div className='date-picker'>
                    <DateTimePicker
                        value={todoToEdit && todoToEdit.deadline ? new Date(todoToEdit.deadline) : newDeadline}
                        onClick={() => setNewDeadline(datePickerTime)}
                        formatStyle="large"
                        locale="en-US"
                        label="Set deadline"
                        onChange={changeTodo}
                        minDate={(new Date())}
                        maxDate={maxDate}
                    />
                </div>
                <Button variant="neutral"
                    onClick={() => {
                        if (!todoToChange.task) {
                            alert('Name cannot be empty')
                            return
                        }
                        acceptChangedTodo(todoToChange)
                    }}
                    className="rainbow-m-around_medium"
                >
                    Accept changings
                    <FontAwesomeIcon icon={faCheck} className="rainbow-m-left_medium" />
                </Button>
            </div>

        </Modal>
    )
}