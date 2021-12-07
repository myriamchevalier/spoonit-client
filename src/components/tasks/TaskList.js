import React, { useEffect, useState } from "react";
import { getAllCategories, getAllSpoons, getAllTasks } from "./TaskManager";
import { Card, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

export const TaskList = () => {
    const [ tasks, setTasks ] = useState([])
    const [ categories, setCategories] = useState([])
    const [ spoons, setSpoons] = useState([])

    const taskFetcher = () => {
        getAllTasks().then(data=>setTasks(data))
    }

    useEffect(() =>{
        taskFetcher()
    }, [])

    useEffect(() =>{
        getAllCategories().then(data=>setCategories(data))
    }, [])

    useEffect(() =>{
        getAllSpoons().then(data=>setSpoons(data))
    }, [])

    
   
    return (
        <>
        {/* Top of page, filtering options */}
        <Form>
            <Form.Label>Filter by Category</Form.Label>
            {
                categories.map(cat => {
                    return <Form.Check>
                        {cat.label}
                    </Form.Check>
                })
            }
            <Form.Label>Filter by amount of spoons</Form.Label>
            <Form.Select>
            <option>Select a number of spoons</option>
            {
                spoons.map(spoon => {
                    return <option value={spoon.id}>{spoon.number_of_spoons}</option>
                })
            }
            </Form.Select>
        </Form>

        <Row xs='auto'md='auto' lg='auto'>
            {
                tasks.map(task => {
                    return <Card style={{ width: '18rem', margin: '2rem' }}>
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