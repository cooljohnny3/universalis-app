import React, { FormEvent } from "react";

import "./App.css";
import SidePanel from "./components/SidePanel"
import Content from "./components/Content"
import Search from "./components/Search";
import ItemListingResponse from "./model/itemListingResponse";
import World from "./model/world";
import { getData } from "./services/universalis";
import { FAVORITES_KEY } from "./constants";

interface AppProps { }
interface AppState {
  data?: ItemListingResponse,
  searchId: string,
  searchText: string,
  limit: string,
  selectedWorld: String,
  homeWorld: World,
  isLoading: boolean,
  error: string,
  // name -> id
  favorites: Map<string, string>,
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    searchText: "",
    searchId: "",
    limit: "",
    selectedWorld: World.Behemoth,
    homeWorld: World.Behemoth,
    isLoading: false,
    error: "",
    favorites: new Map(),
  }

  constructor(props: AppProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFavoriteTap = this.handleFavoriteTap.bind(this);
  }

  render() {
    const state = this.state;
    return (
      <div className="app">
        <SidePanel
          items={state.favorites}
          handleClick={(value: [string, string]) => { this.setState({ searchText: value[0], searchId: value[1] }) }}
        />
        <h1>Universalis App</h1>
        <form onSubmit={this.handleSubmit}>
          <Search
            isFavorite={state.favorites.has(state.searchText)}
            searchText={state.searchText}
            updateSearchText={(value: string) => this.setState({ searchText: value })}
            updateSearchId={(value: string) => this.setState({ searchId: value })}
            updateFavorite={this.handleFavoriteTap}
          />
          <input id="limit-input" type="number" min="1" placeholder="Limit" value={state.limit} onChange={(e) => this.setState({ limit: e.target.value })} />
          <select onChange={(e) => this.setState({ selectedWorld: e.target.value })}>
            {Object.keys(World).map((world) => {
              return <option key={world}>{world}</option>
            })}
          </select>
          <input type="submit" value="Submit" />
        </form>
        {state.error.length > 0 && <h4 className="error-text">{state.error}</h4>}
        {state.isLoading && <h4>Loading...</h4>}
        {state.data && !this.state.isLoading && <Content
          homeWorld={state.homeWorld}
          listings={state.data.listings}
          sales={state.data.recentHistory}
          nqSaleVelocity={state.data.nqSaleVelocity}
          hqSaleVelocity={state.data.hqSaleVelocity}
          stackSizeHistogramNQ={state.data.stackSizeHistogramNQ}
          stackSizeHistogramHQ={state.data.stackSizeHistogramHQ}
        />}
      </div>
    );
  }

  componentDidMount() {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if(storedFavorites !== null) {
      this.setState({
        favorites: new Map(JSON.parse(storedFavorites))
      });
    }
  }

  updateListingData() {
    const state = this.state;
    if (state.searchId.length > 0) {
      this.setState({
        isLoading: true,
        error: ""
      })
      getData(state.searchId, state.limit).then((result) => {
        this.setState({
          data: result,
          isLoading: false,
        });
      }).catch((err) => {
        this.setState({
          isLoading: false,
          error: err,
        })
      });
    } else {
      this.setState({
        error: "Please enter a search term",
      })
    }
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();
    this.setState({
      homeWorld: this.state.selectedWorld as World
    })
    this.updateListingData();
  }

  handleFavoriteTap(checked: boolean) {
    const state = this.state;
    if(state.searchId !== '') {
      let newMap = new Map(state.favorites);
      if(checked) {
        newMap.set(state.searchText, state.searchId);
      } else {
        newMap.delete(state.searchText);
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(newMap.entries())));
      this.setState({
        favorites: newMap
      })
    }
  }
}

export default App;

