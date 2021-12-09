import React, { useEffect, useState } from "react";
import { getAllCategories, getAllSpoons, getTasks } from "./TaskManager";
import { Button, Card, Form, Row, InputGroup} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

export const TaskList = () => {
    const [tasks, setTasks] = useState([])
    const [categories, setCategories] = useState([])
    const [spoons, setSpoons] = useState([])
    const [params, setParams] = useState({}) // state to contain filter parameters.
    
    const taskFetcher = () => {
        getTasks(params).then(data => {setTasks(data)}) // passing params as an argument.
    }

    useEffect(() => {
        taskFetcher()
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

    return (
        <>
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
                taskFetcher()
                }}>Apply filters</button>
                    
            </form>

            <Row xs='auto' md='auto' lg='auto'>
                {
                    tasks.length === 0 ?
                    <p>There are no results to be displayed</p> :
                    tasks.map(task => {
                        return <Card key={task.id} style={{ width: '18rem', margin: '2rem' }}>
                            <CardHeader>{task.category?.label}</CardHeader>
                            <Card.Body key={task.id}>
                                <Card.Title>{task.name}</Card.Title>
                                <Card.Text>{task.description}</Card.Text>
                                <Card.Text>Spoons: {task.spoon?.number_of_spoons}</Card.Text>
                            </Card.Body>
                        </Card>
                    })
                }
            </Row>
        </>
    )
}