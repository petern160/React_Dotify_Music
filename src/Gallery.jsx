import React, { Component } from "react";
import "./App.css";

class Gallery extends Component {
  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);
    audio.play();
  }
  render() {
    const { tracks } = this.props;
    return (
      <div>
        {tracks.map((track, k) => {
          // console.log("track", track);
          const trackImg = track.album.images[0].url;
          return (
            <div key={k} className="track">
              <img
                src={trackImg}
                onClick={() => this.playAudio(track.preview_url)}
                className="track-img"
                alt="track"
              />
              <p className="track-text">{track.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Gallery;
