import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getAllCategories, getAllSpoons, createNewTask } from "./TaskManager";


export const TaskForm = () => {
    const [categories, setCategories] = useState([])
    const [spoons, setSpoons] = useState([])
    const [task, setTask] = useState({})
    const history = useHistory()

    useEffect(() => {
        getAllCategories().then(data => setCategories(data))
        getAllSpoons().then(data => setSpoons(data))
    }, [])

    const handleControlledInputChange = (e) => {
        const newTask = {...task}
        newTask[e.target.name] = e.target.value
        setTask(newTask)
    }

    return (
        <>
            <form>
                <h1>Create New Task</h1>
                
                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' placeholder='Task Name' onChange={handleControlledInputChange}/>
                    </div>
                </fieldset>

                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='categoryId'>Category</label>
                        <select name='categoryId' onChange={handleControlledInputChange}>
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
                        <select name='spoonId' onChange={handleControlledInputChange}>
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
                        <input type='textarea' name='description' placeholder='Task Description' onChange={handleControlledInputChange}/>
                    </div>
                </fieldset>
            </form>

            <button onClick={e => {
            e.preventDefault()
            createNewTask(task)
            .then(history.push('/tasks'))}}>Save Task</button>
 
        </>
    )
}
