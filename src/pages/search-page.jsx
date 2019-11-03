import React, { Component } from "react";
import GridResultViewer from "../components/grid-result-viewer";

class SearchPage extends Component {
  state = {};
  render() {
    return (
      <div id="result-mode" className="fColumn jCC aIC">
        <div id="result-header" className="fRow jCC aIC">
          <img
            src="images/featured-star-transparent.gif"
            alt=""
            id="featured-icon"
            style="width: 70px"
          />
          <h3>Searched gifs</h3>
        </div>
        <GridResultViewer />
      </div>
    );
  }
}

export default SearchPage;
