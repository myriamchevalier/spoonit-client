import React from "react"
import { Link, useHistory } from "react-router-dom"
import { Nav } from "react-bootstrap"

export const SideNav = () => {
    const history = useHistory()
    return (
        <Nav variant="pills"  className="flex-column">
            <Nav.Link href="/tasks">View All Tasks</Nav.Link>
            <Nav.Link eventKey="active">Link</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav>
    )
}
