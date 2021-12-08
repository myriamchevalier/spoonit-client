import React, { useEffect, useState } from "react";
import { getAllCategories, getAllSpoons, getTasks } from "./TaskManager";
import { Button, Card, Form, Row } from "react-bootstrap";
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

    return (
        <>
            {/* Top of page, filtering options */}
            <Form>
                <Form.Label>Filter by Category</Form.Label>
                <Form.Select onChange={(e) => { 
                    const value = e.currentTarget.value // grabbing the value of what user selects
                    const updatedParams = { ...params } // making a copy of the params state
                    if (value) {
                        updatedParams.categoryId = value // if user selects a category, value added to copy of state
                    } else {
                        delete updatedParams.categoryId // if user unselects a category, delete categoryId from the copy of state
                    }
                    setParams(updatedParams) // No matter what, params state gets updated with copy of state.
                }}>
                    <option value="" >Select a category</option>
                    {
                        categories.map(cat => {
                            return <option value={cat.id}>{cat.label}</option>
                        })
                    }
                </Form.Select>

                <Form.Label>Filter by amount of spoons</Form.Label>
                <Form.Select onChange={(e) => {
                    const value = e.currentTarget.value
                    const updatedParams = { ...params }
                    if (value) {
                        updatedParams.spoonId = value
                    } else {
                        delete updatedParams.spoonId
                    }
                    setParams(updatedParams)
                }

                }>
                    <option value="">Select a number of spoons</option>
                    {
                        spoons.map(spoon => {
                            return <option value={spoon.id}>{spoon.number_of_spoons}</option>
                        })
                    }
                </Form.Select>
                <Button onClick={taskFetcher}>Apply filters</Button>
            </Form>

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