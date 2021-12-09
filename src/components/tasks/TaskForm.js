import React, { useEffect, useState } from "react";
import { getAllCategories, getAllSpoons } from "./TaskManager";


export const TaskForm = () => {
    const [categories, setCategories] = useState([])
    const [spoons, setSpoons] = useState([])
    const [task, setTask] = useState({})

    useEffect(() => {
        getAllCategories().then(data => setCategories(data))
        getAllSpoons().then(data => setSpoons(data))
    }, [])

    return (
        <>
            <form>
                <h1>Create New Task</h1>
                
                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' placeholder='Task Name'/>
                    </div>
                </fieldset>

                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='categoryId'>Category</label>
                        <select name='categoryId' >
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
                        <select name='spoonId' >
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
                        <input type='textarea' name='description' placeholder='Task Description'/>
                    </div>
                </fieldset>
            </form>
 
        </>
    )
}
