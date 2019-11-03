import React, { Component } from "react";
import AnimateHeight from "react-animate-height";

class SettingsPannel extends Component {
  state = {
    isSettingsVisible: false
  };

  componentWillMount() {
    this._toggleSettingsPannel(this.props);
    document.addEventListener('mousedown', this._handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClick, false);
  }

  _handleClick = e => {
      if (!this.node.contains(e.target)) {
          this.props.onDismiss();
      }
  }

  componentWillReceiveProps(nextProps) {
    this._toggleSettingsPannel(nextProps);
  }

  _toggleSettingsPannel = props => {
    if (props.isSettingsVisible !== this.state.isSettingsVisible) {
      this.setState({ isSettingsVisible: props.isSettingsVisible });
    }
  };

  _getWrapperClassName = () => {
    const { isSettingsVisible } = this.state;
    if (isSettingsVisible) {
      return "fRow jCC settings-open";
    } else {
      return "fRow jCC settings-close";
    }
  };

  render() {
    return (
      <div
        id="bottom-notification-panel"
        className={this._getWrapperClassName()}
        ref={node => this.node = node}
      >
        <div className="fColumn" id="settings-area-wrapper">
          <div id="dismiss-wrapper" className="fRow jCE aIC">
            <button onClick={this.props.onDismiss}>Close</button>
          </div>
          <div id="theme-switch-wrapper" className="fRow jCSB aIC">
            <h4>Dark Mode</h4>
            <label className="toggle">
              <input className="toggle-checkbox" type="checkbox" />
              <div className="toggle-switch"></div>
              <span className="toggle-label"></span>
            </label>
          </div>
          <div id="automatic-theme-switch-wrapper" className="fRow jCSB aIC">
            <h4>Automatic switch themes</h4>
            <label className="toggle">
              <input className="toggle-checkbox" type="checkbox" />
              <div className="toggle-switch"></div>
              <span className="toggle-label"></span>
            </label>
          </div>
          <div id="search-history-switch-wrapper" className="fRow jCSB aIC">
            <h4>Store search history</h4>
            <label className="toggle">
              <input className="toggle-checkbox" type="checkbox" />
              <div className="toggle-switch"></div>
              <span className="toggle-label"></span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsPannel;
