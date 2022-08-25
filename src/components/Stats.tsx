import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";
import { Bar } from 'react-chartjs-2';

import World from "../model/world";
import WorldData from "../model/worldData";
import "./Stats.css";

interface StatsProps {
    homeWorld: World,
    worldDataMap: Map<World, WorldData>,
    saleVelocity: number,
    stackSizeData: Object
}

function Compare(props: StatsProps) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip,
    );
    const options = {
        responsive: true,
    };
    const data = {
        datasets: [
            {
                data: props.stackSizeData,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }
        ]
    }

    const homeWorldMapData = props.worldDataMap.get(props.homeWorld);
    let homeAverage = 0;
    if(homeWorldMapData !== undefined) {
        homeAverage = homeWorldMapData.sum / homeWorldMapData.numberOfListings;
        props.worldDataMap.set(props.homeWorld, homeWorldMapData);
    }

    return (
        <div>
            <h4>Stats</h4>
            <table className="stats">
            <thead>
                <tr>
                    <th>World</th>
                    <th>Average</th>
                    <th>% Diff</th>
                </tr>
            </thead>
            <tbody>
            {Object.keys(World).map((world) => {
                const worldMapData = props.worldDataMap.get(world as World);
                let worldAverage: number | undefined;
                let percentDiff: number = 0;
                if(worldMapData !== undefined && homeWorldMapData !== undefined) {
                    if(worldMapData?.numberOfListings > 0) {
                        worldAverage = worldMapData.sum / worldMapData.numberOfListings;
                        percentDiff = (worldAverage - homeAverage) / ((homeAverage + worldAverage) / 2) * 100;
                    }
                }
                let percentDiffContent;
                if(percentDiff !== 0) {
                    percentDiffContent = <td className={percentDiff > 0 ? "green" : "red"}>{percentDiff.toFixed(2)}%</td>;
                } else {
                    percentDiffContent = <td>N/A</td>
                }
                return <tr key={world}><td>{world}</td><td>{worldAverage?.toFixed(2) ?? "N/A"}</td>{percentDiffContent}</tr>
            })}
            </tbody>
            </table>
            <p>Sale Velocity: {props.saleVelocity}</p>
            <Bar options={options} data={data} />
        </div>
    )
}

export default Compare;