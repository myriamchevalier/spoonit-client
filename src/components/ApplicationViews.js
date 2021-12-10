import React from "react";
import { Route } from "react-router";
import { Randomizer } from "./tasks/Randomizer";
import { TaskList } from "./tasks/TaskList";
import { TaskForm } from "./tasks/TaskForm";

export const ApplicationViews = () => {
    return <>
            
            <Route exact path="/">
                <Randomizer />
            </Route>
            <Route exact path="/tasks">
                <TaskList />
            </Route>
            <Route exact path="/tasks/form">
                <TaskForm />
            </Route>
            <Route exact path="/tasks/edit/:taskId(\d+)">
                <TaskForm />
            </Route>
            <Route exact path="tips">
                Tips
            </Route>
    </>
}