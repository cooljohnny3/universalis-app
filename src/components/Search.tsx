import React, { ChangeEvent, useState } from "react";

import "./Search.css";
import Items from "../items/item_en.json";

interface SearchProps {
    isFavorite: boolean,
    searchText: string,
    updateSearchText: Function,
    updateSearchId: Function,
    updateFavorite: Function,
}

function Search(props: SearchProps) {
    const [searchResults, setSearchResults] = useState<[string, string][]>([]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        props.updateSearchText(e.target.value);
        let results: [string, string][] = [];
        if(e.target.value.length > 2) {
            const temp = Object.entries(Items).filter((item) => item[0].toLowerCase().startsWith(e.target.value.toLowerCase()));
            if(temp.length > 0 && temp[0][0] !== e.target.value) {
                results = temp;
            }
        }
        setSearchResults(results);
    }

    function handleResultClick(result: [string, string]) {
        props.updateSearchId(result[1]);
        setSearchResults([]);
        props.updateSearchText(result[0]);
    }

    return (
        <div id="search-bar">
            <input type="checkbox" checked={props.isFavorite} onChange={(e) => props.updateFavorite(e.target.checked)}/>
            <input id="id-input" type="text" placeholder="Item" value={props.searchText} onChange={(e) => handleChange(e)} />
            <div id="search-results" className={searchResults.length > 0 ? "" : "hide"}>
                {searchResults.map((result, index) => {
                    return <p key={index} onClick={() => handleResultClick(result)}>{result[0]}</p>
                })}
            </div>
        </div>
    )
}

export default Search;