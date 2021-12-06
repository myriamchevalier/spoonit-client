import React from "react";
import { Route } from "react-router";
import { Randomizer } from "./tasks/Randomizer";

export const ApplicationViews = () => {
    return <>
            <Route exact path="/">
                <Randomizer />
            </Route>
    </>
}