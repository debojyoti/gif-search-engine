import React, { Component } from "react";
import GridResultViewer from '../components/grid-result-viewer';

class FeaturedPage extends Component {
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
          <h3>Featured gifs</h3>
        </div>
        <GridResultViewer />
      </div>
    );
  }
}

export default FeaturedPage;
