import React, { useState } from "react"

import "./SidePanel.css";

interface SidePanelProps {
    items: Map<string, string>,
    handleClick: Function,
}

function SidePanel(props: SidePanelProps) {
    const [isOpen, setIsOpen] = useState(false);

    const className = "panel " + (isOpen ? "open" : "closed");
    let body: JSX.Element[] = [];
    props.items.forEach((value: string, key: string) => {
        body.push(<p key={value} onClick={() => props.handleClick([key, value])}>{key}</p>);
    });
    return (
        <div className={className}>
            <div className="icon" onClick={() => setIsOpen(!isOpen)}>{isOpen ? '<' : '>'}</div>
            <>{isOpen && body}</>
        </div>
    )
}

export default SidePanel;