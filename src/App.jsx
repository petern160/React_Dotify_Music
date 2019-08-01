import React, { Component } from "react";
import "./App.css";
import { FormGroup, FormControl, InputGroup, Button } from "react-bootstrap";
import Profile from "./Profile";

const ACCESS_ID = process.env.REACT_APP_AUTH_KEY;
console.log("this is my access_ID", ACCESS_ID);
// const TOP_TRACKS = process.env.REACT_APP_TOP_TRACKS;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null
    };
  }

  search() {
    console.log("this.stae", this.state);
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = `https://api.spotify.com/v1/artists/`;

    fetch(FETCH_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer [${ACCESS_ID}]`
      }
    })
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        console.log("artist", artist);
        this.setState({ artist });

        let FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
        fetch(FETCH_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${ACCESS_ID}`
          }
        })
          .then(response => response.json())
          .then(json => {
            console.log("artist top tracks", json);
          });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Dotify</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="search for an artist"
              value={this.state.query}
              onChange={event => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.search();
                }
              }}
            />
            <Button variant="success" onClick={() => this.search()}>
              search
            </Button>
          </InputGroup>
        </FormGroup>
        {this.state.artist !== null ? (
          <div>
            <Profile artist={this.state.artist} />
            <div className="Gallery">Gallery</div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default App;
