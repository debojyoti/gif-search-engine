import React, { Component } from "react";

class IdlePage extends Component {
  state = {};
  render() {
    return (
      <div id="idle-mode" className="fColumn jCC aIC">
        <div id="landing-bot"></div>
        <h5>
          Try searching something or browse{" "}
          <span id="featured">featured gifs</span>!
        </h5>
      </div>
    );
  }
}

export default IdlePage;
