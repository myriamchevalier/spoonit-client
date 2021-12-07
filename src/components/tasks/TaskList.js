import React, { useEffect, useState } from "react";
import { getAllTasks } from "./TaskManager";
import { Card } from "react-bootstrap";
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
    return (
        <>
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