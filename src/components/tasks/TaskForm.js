import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getAllCategories, getAllSpoons, createNewTask, getSingleTask, updateTask } from "./TaskManager";
import "./TaskForm.css"

export const TaskForm = () => {
    const [categories, setCategories] = useState([])
    const [spoons, setSpoons] = useState([])
    const [task, setTask] = useState({})
    const history = useHistory()
    const { taskId } = useParams()

    useEffect(() => {
        getAllCategories().then(data => setCategories(data))
        getAllSpoons().then(data => setSpoons(data))
    }, [])

    useEffect(() => {
        if (taskId) {
            getSingleTask(taskId).then((taskData) => {
                setTask(
                    // Unpack response
                    {
                        ...taskData,
                        categoryId: taskData.category.id,
                        spoonId: taskData.spoon.id
                    }
                )
            })
        }
    }, [taskId])

    const handleControlledInputChange = (e) => {
        const newTask = { ...task }
        newTask[e.target.name] = e.target.value
        setTask(newTask)
    }

    return (
        <>
            <div className="form-container">
                <form className="task-form">
                    <h2>{taskId ? 'Update a task' : 'Create new task'}</h2>

                    <fieldset>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' name='name' placeholder='Task Name'
                                value={task.name} onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className='form-group'>
                            <label htmlFor='categoryId'>Category</label>
                            <select name='categoryId' value={task.categoryId}
                                onChange={handleControlledInputChange}>
                                <option value="" >Select a category</option>
                                {
                                    categories.map(cat => {
                                        return <option value={cat.id} key={cat.id}>{cat.label}</option>
                                    })
                                }
                            </select>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className='form-group'>
                            <label htmlFor='spoonId'>Spoons</label>
                            <select name='spoonId' value={task.spoonId}
                                onChange={handleControlledInputChange}>
                                <option value="" >Select an amount of spoons</option>
                                {
                                    spoons.map(spoon => {
                                        return <option value={spoon.id} key={spoon.id}>{spoon.number_of_spoons}</option>
                                    })
                                }
                            </select>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className='form-group'>
                            <label htmlFor='description'>Description</label>
                            <input type='textarea' name='description' placeholder='Task Description'
                                value={task.description} onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
            <button onClick={e => {
                e.preventDefault()
                taskId ? updateTask(task)
                    .then(() => history.push('/tasks'))
                    : createNewTask(task)
                        .then(() => history.push('/tasks'))
            }}>Save Task</button>
                </form>
            </div>

        </>
    )
}
