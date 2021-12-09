import React from "react"
import { Link, useHistory } from "react-router-dom"
import { Nav } from "react-bootstrap"

export const SideNavBar = () => {
    const history = useHistory()
    return (
        <SideNavBar>
            <Link href="/home">Active</Link>
            <Link eventKey="link-1">Link</Link>
            <Link eventKey="link-2">Link</Link>
            <Link eventKey="disabled" disabled>
                Disabled
            </Link>
      
        </SideNavBar>
    )
}

