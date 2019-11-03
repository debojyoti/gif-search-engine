import React, { Component } from "react";
import { Link } from "react-router-dom";

class IdleMode extends Component {
  state = {};

  render() {
    return (
      <div id="idle-mode" className="fColumn jCC aIC">
        <div id="landing-bot"></div>
        <h5>
          Try searching something or browse{" "}
          <Link to="/featured" >
          <span id="featured">featured gifs</span>!
          </Link>
        </h5>
      </div>
    );
  }
}

export default IdleMode;
