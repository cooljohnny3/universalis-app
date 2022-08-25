import React from "react"

import "./Content.css";

import Stats from "./Stats";
import TableDisplay from "./TableDisplay";
import Listing from "../model/listingView";
import World from "../model/world";
import SalesView from "../model/salesView";
import ListingView from "../model/listingView";
import WorldData from "../model/worldData";

interface ContentProps {
    homeWorld: World,
    listings: Listing[],
    sales: SalesView[],
    nqSaleVelocity: number,
    hqSaleVelocity: number,
    stackSizeHistogramNQ: Object,
    stackSizeHistogramHQ: Object,
}

function Content(props: ContentProps) {
    let normalListings: Listing[] = [];
    let hqListings: Listing[] = [];
    props.listings.forEach((listing: Listing) => {
        if(listing.hq) {
            hqListings.push(listing);
        } else {
            normalListings.push(listing);
        }
    });
    let normalSales: SalesView[] = [];
    let hqSales: SalesView[] = [];
    props.sales.forEach((sale: SalesView) => {
        if(sale.hq) {
            hqSales.push(sale);
        } else {
            normalSales.push(sale);
        }
    });
    const normalWorldDataMap = buildWorldDataMap(normalListings);
    const hqWorldDataMap = buildWorldDataMap(hqListings);
    const normalHomeWorldData = normalWorldDataMap.get(props.homeWorld);
    const hqHomeWorldData = hqWorldDataMap.get(props.homeWorld);
    let normalHomeWorldAverage: number | undefined;
    let hqHomeWorldAVerage: number | undefined;
    if(normalHomeWorldData !== undefined) {
        normalHomeWorldAverage = normalHomeWorldData.sum / normalHomeWorldData.numberOfListings;
    }
    if(hqHomeWorldData !== undefined) {
        hqHomeWorldAVerage = hqHomeWorldData.sum / hqHomeWorldData.numberOfListings;
    }
    return (
        <div className="content">
            <h2>Normal</h2>
            <div className="content-row">
                <Stats 
                    homeWorld={props.homeWorld} 
                    worldDataMap={normalWorldDataMap}
                    saleVelocity={props.nqSaleVelocity}
                    stackSizeData={props.stackSizeHistogramNQ}
                />
                <TableDisplay title="Listings" listings={normalListings} homeWorldAverage={normalHomeWorldAverage}/>
                <TableDisplay title="Recent Sales" listings={normalSales}/>
            </div>
            {hqListings.length !== 0 && hqSales.length !== 0 && 
            <>
            <h2>HQ</h2>
            <div className="content-row">
                <Stats 
                    homeWorld={props.homeWorld} 
                    worldDataMap={hqWorldDataMap}
                    saleVelocity={props.hqSaleVelocity}
                    stackSizeData={props.stackSizeHistogramHQ}
                />
                <TableDisplay title="Listings" listings={hqListings} homeWorldAverage={hqHomeWorldAVerage}/>
                <TableDisplay title="Recent Sales" listings={hqSales}/>
            </div>
            </>}
        </div>
    )
}

function buildWorldDataMap(listings: ListingView[]) : Map<World, WorldData> {
    let worldMap: Map<World, WorldData> = new Map();
    listings.forEach((listing) => {
       if(listing.worldName !== undefined) {
            if(worldMap.has(listing.worldName)) {
                let prevData: WorldData | undefined = worldMap.get(listing.worldName);
                if(prevData !== undefined) {
                    prevData.sum += listing.pricePerUnit;
                    prevData.quantity += listing.quantity;
                    prevData.numberOfListings++;
                    worldMap.set(listing.worldName, prevData);
                }
            } else {
                    let newData: WorldData = {
                        sum: listing.pricePerUnit,
                        quantity: listing.quantity,
                        numberOfListings: 1,
                    };
                    worldMap.set(listing.worldName, newData);
            }
        }
    });
    return worldMap;
}

export default Content;