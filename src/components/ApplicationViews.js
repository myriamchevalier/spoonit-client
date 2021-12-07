import React from "react";
import { Route } from "react-router";
import { Randomizer } from "./tasks/Randomizer";
import { TaskList } from "./tasks/TaskList";

export const ApplicationViews = () => {
    return <>
            <Route exact path="/">
                <Randomizer />
            </Route>
            <Route exact path="/tasks">
                <TaskList />
            </Route>
    </>
}