import React from "react";
import { Row, Col } from "react-bootstrap";
import { Route, Redirect } from "react-router";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NavBar } from "./nav/NavBar";
import { SideNav } from "./nav/SideNav";

export const SpoonIt = () => {
    return (<>
        <Route render={() => {
            if (localStorage.getItem('si_token')) {
                return <>
                <Row>
                    <Col xs={2} >
                        <Route>
                            <SideNav />
                        </Route>
                    </Col>
                    <Col xs={10}>
                        <Route>
                            <NavBar />
                            <ApplicationViews />
                        </Route>
                    </Col>
                </Row>
                </>
            } else {
                return <Redirect to='/login'/>
            }
        }} />
        <Route path='/login'>
            <Login />
        </Route>

        <Route path='/register'>
            <Register />
        </Route>
    </>)
}