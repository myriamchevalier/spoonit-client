import React, { useEffect, useState } from "react";
import { getRandomTask, getAllCategories, getAllSpoons } from "./TaskManager";

export const Randomizer = () => {
    const [randomTask, setRandomTask] = useState([])
    const [categories, setCategories] = useState([])
    const [spoons, setSpoons] = useState([])
    const [params, setParams] = useState({})

    const randomTaskFetcher = () => {
        getRandomTask(params).then(data => {setRandomTask(data)}) // passing params as an argument.
    }

    useEffect(() => {
        randomTaskFetcher()
        getAllCategories().then(data => setCategories(data))
        getAllSpoons().then(data => setSpoons(data))
    }, [])

    const handleControlledInputChange = (e) => {
        const value = e.currentTarget.value
        const updatedParams = { ...params }
        if (value) {
            updatedParams[e.currentTarget.name] = value
        } else {
            delete updatedParams[e.currentTarget.name]
        }
        setParams(updatedParams)
    }

    return <>
        <h1>SpoonIt!</h1>
                    {/* Top of page, filtering options */}
            <form>
                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='categoryId'>Filter by Category</label>
                        <select name='categoryId' onChange={handleControlledInputChange}>
                    <option value="" >Select a category</option>
                    {
                        categories.map(cat => {
                            return <option value={cat.id}>{cat.label}</option>
                        })
                    }
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='spoonId'>Filter by Category</label>
                        <select name='spoonId' onChange={handleControlledInputChange}>
                    <option value="" >Select an amount of spoons</option>
                    {
                        spoons.map(spoon => {
                            return <option value={spoon.id}>{spoon.number_of_spoons}</option>
                        })
                    }
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='createdBy'>What view would you prefer?</label>
                        <input type='radio' name='createdBy' value='' onChange={handleControlledInputChange}/> All Tasks
                        <input type='radio' name='createdBy' value='tr' onChange={handleControlledInputChange}/> My Tasks Only
                     
                    </div>
                </fieldset>
        
                <button onClick={(event)=> {
                event.preventDefault() 
                randomTaskFetcher()}}>
                Apply filters
                </button>
                    
            </form>



        
    </>
}