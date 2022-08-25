import React from "react";

import "./TableDisplay.css";
import View from "../model/view";

interface TableDisplayProps {
    title: string,
    listings: View[],
    homeWorldAverage?: number,
}

function TableDisplay(props: TableDisplayProps) {
    let body: JSX.Element[] = props.listings.map((view: View, index: number) => {
        let percentDiffContent : JSX.Element = <td>N/A</td>;
        if(props.homeWorldAverage !== undefined) {
            const percentDiff = (view.pricePerUnit - props.homeWorldAverage) / ((props.homeWorldAverage + view.pricePerUnit) / 2) * 100;
            percentDiffContent = <td className={percentDiff > 0 ? "green" : "red"}>{percentDiff.toFixed(2)}%</td>;
        }
        
        return (
            <tr key={index}>
                <td>{view.pricePerUnit}</td>
                <td>{view.quantity}</td>
                <td>{view.worldName}</td>
                {props.homeWorldAverage && percentDiffContent}
            </tr>
        )
    });
    return (
        <div>
            <h4>{props.title}</h4>
            <div className="list-results">
            <table>
            <thead>
                <tr>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>World</th>
                    {props.homeWorldAverage && <th>% Diff</th>}
                </tr>
            </thead>
                <tbody>
                    {body}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default TableDisplay;