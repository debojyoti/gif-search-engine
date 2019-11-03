import React, { Component } from "react";
import GridResultViewer from "../components/grid-result-viewer";

class SearchPage extends Component {
  state = {};
  render() {
    return (
      <div id="result-mode" className="fColumn jCC aIC">
        <div id="result-header" className="fRow jCC aIC">
          <img
            src="runtime_assets/images/random-gifs.gif"
            alt=""
            id="featured-icon"
            style={{width: 40, marginRight: 20}}
          />
          <h3>Searched gifs</h3>
        </div>
        <GridResultViewer />
      </div>
    );
  }
}

export default SearchPage;
