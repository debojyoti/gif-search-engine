import React, { Component } from "react";

class Header extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div id="header-wrapper">
          <div id="header" className="fRow aIC jCSB fWW">
            <div id="left-part" className="fRow aIC">
              <div id="gifted-logo-wrapper"></div>
              <h3>GIFt'ed</h3>
            </div>
            <div id="middle-part" className="fRow aIC">
              <div id="search-wrapper" className="fRow aIC jCC">
                <input type="text" placeholder="Search gifs" autoFocus />
                <span>
                  <i className="fa fa-search" aria-hidden="true"></i>
                </span>
              </div>
            </div>
            <div id="right-part" className="fRow aIC">
              <div
                id="settings"
                className=" fRow jCSB aIC"
                onClick={this.props.makeSettingsPannelVisible}
              >
                <p>Settings</p>
                <div>
                  <i className="fa fa-cog" aria-hidden="true"></i>
                </div>
              </div>
              <h6 className="hide-on-medium">powered by</h6>
              <div id="giphy-logo-wrapper" className="hide-on-medium"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;