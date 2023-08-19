import React, { useState } from 'react'
import { Col, Row } from "react-bootstrap"

const CollapsibleContainer = ({ header, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true)

    const toggleContainer = () => {
        setIsCollapsed(!isCollapsed)
    }
    return (
        <Row style={{ width: "100%" }}>
            {header}
            <button
                style={{ marginBottom: '10px' }}
                onClick={toggleContainer}
            >
                {isCollapsed ? 'Expand' : 'Collapse'}
            </button>

            {!isCollapsed && (
                <div>
                    {children}
                </div>
            )}
        </Row>
    )
}

export default CollapsibleContainer