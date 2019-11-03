import React, { Component } from "react";
import { updateSettings } from "../redux/actions/settings-data";
import { connect } from "react-redux";
import { deepClone } from "../helper-methods";

class SettingsPannel extends Component {
  state = {
    isSettingsVisible: false,
    settings: {
      isDarkModeEnabled: false,
      isAutomaticThemeUpdateEnabled: false,
      isSearchHistoryEnabled: true
    }
  };

  componentDidMount() {
    this._syncSettingsWithStore();
    this._registerEvents();  
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {};
    if (
      nextProps.isSettingsVisible !==
      prevState.isSettingsVisible
    ) {
      newState = { ...newState, isSettingsVisible: nextProps.isSettingsVisible };
    } 
    if (
      JSON.stringify(nextProps.settingsData) !==
      JSON.stringify(prevState.settings)
    ) {
      newState =  { ...newState, settings: nextProps.settingsData };
    }
    if (Object.keys(newState).length) {
      return newState;
    } else {
      return null; // Triggers no change in the state
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this._handleClick, false);
  }

  _registerEvents = () => {
    document.addEventListener("mousedown", this._handleClick, false);
  }

  _handleClick = e => {
    if (this.node && !this.node.contains(e.target)) {
      this.props.onDismiss();
    }
  };

  _syncSettingsWithStore = () => {
    const { settingsData } = this.props;
    this.setState({ settings: settingsData });
  }

  _getWrapperClassName = () => {
    const { isSettingsVisible } = this.state;
    if (isSettingsVisible) {
      return "fRow jCC settings-open";
    } else {
      return "fRow jCC settings-close";
    }
  };

  _toggleSettings = settingName => {
    const { settings } = deepClone(this.state);
    // Update local state
    settings[settingName] = !settings[settingName];
    this.setState({ settings }, () => {
      // Update in store
      this.props.updateSettings(settings);
    });
  };

  render() {
    const { settings } = this.state;
    return (
      <div
        id="bottom-notification-panel"
        className={this._getWrapperClassName()}
        ref={node => (this.node = node)}
      >
        <div className="fColumn" id="settings-area-wrapper">
          <div id="dismiss-wrapper" className="fRow jCE aIC">
            <button onClick={this.props.onDismiss}>Close</button>
          </div>
          <div id="theme-switch-wrapper" className="fRow jCSB aIC">
            <h4>Dark Mode</h4>
            <label className="toggle">
              <input
                className="toggle-checkbox"
                type="checkbox"
                checked={settings.isDarkModeEnabled}
                onChange={e => this._toggleSettings("isDarkModeEnabled")}
                disabled={settings.isAutomaticThemeUpdateEnabled? true: null}
              />
              <div className="toggle-switch"></div>
              <span className="toggle-label"></span>
            </label>
          </div>
          <div id="automatic-theme-switch-wrapper" className="fRow jCSB aIC">
            <h4>Automatic switch themes</h4>
            <label className="toggle">
              <input
                className="toggle-checkbox"
                type="checkbox"
                checked={settings.isAutomaticThemeUpdateEnabled}
                onChange={e =>
                  this._toggleSettings("isAutomaticThemeUpdateEnabled")
                }
              />
              <div className="toggle-switch"></div>
              <span className="toggle-label"></span>
            </label>
          </div>
          <div id="search-history-switch-wrapper" className="fRow jCSB aIC">
            <h4>Store search history</h4>
            <label className="toggle">
              <input
                className="toggle-checkbox"
                type="checkbox"
                checked={settings.isSearchHistoryEnabled}
                onChange={e => this._toggleSettings("isSearchHistoryEnabled")}
              />
              <div className="toggle-switch"></div>
              <span className="toggle-label"></span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    settingsData: state.settingsData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSettings: settings => dispatch(updateSettings(settings))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPannel);
