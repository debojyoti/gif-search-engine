import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "../assets/style.css";
import Header from "../components/header";
import SettingsPannel from "./settings-panel";
import SearchPage from "../pages/search-page";
import FeaturedPage from "../pages/featured-gifs-page";
import IdlePage from "../pages/idle-page";
import { connect } from "react-redux";
import { themeTriggers } from "../config";
import { updateSettings } from "../redux/actions/settings-data";

class Main extends Component {
  state = {
    isDarkModeEnabled: true,
    themeUpdateTimer: null
  };

  componentDidMount() {
    this._setTheme();
    this._initiateThemeChangerIfEnabled();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {};
    if (
      nextProps.settingsData.isDarkModeEnabled !== prevState.isDarkModeEnabled
    ) {
      newState = {
        ...newState,
        isDarkModeEnabled: nextProps.settingsData.isDarkModeEnabled
      };
    }
    if (Object.keys(newState).length) {
      return newState;
    } else {
      return null; // Triggers no change in the state
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.settingsData.isAutomaticThemeUpdateEnabled !==
      this.props.settingsData.isAutomaticThemeUpdateEnabled
    ) {
      this._initiateThemeChangerIfEnabled();
    }
  }

  _setTheme = () => {
    this.setState({
      isDarkModeEnabled: this.props.settingsData.isDarkModeEnabled
    });
  };

  _makeSettingsPannelVisible = () => {
    if (!this.state.isSettingsVisible) {
      this.setState({
        isSettingsVisible: true
      });
    }
  };

  _hideSettings = () => {
    this.setState({
      isSettingsVisible: false
    });
  };

  _getThemeId = () => {
    const { isDarkModeEnabled } = this.state;
    return isDarkModeEnabled ? "dark-theme" : "light-theme";
  };

  _initiateThemeChangerIfEnabled = () => {
    const { settingsData } = this.props;
    if (settingsData.isAutomaticThemeUpdateEnabled) {
      const currentMode = this._getCurrentMode();
      // Check if instant theme change is required
      if (currentMode === "evening" && !settingsData.isDarkModeEnabled) {
        // It's evening but dark mode is not enabled!
        // So enable it
        this.props.updateSettings({ ...settingsData, isDarkModeEnabled: true });
      } else if (currentMode === "morning" && settingsData.isDarkModeEnabled) {
        // It's morning but light mode is not enabled!
        // So enable it
        this.props.updateSettings({
          ...settingsData,
          isDarkModeEnabled: false
        });
      }
      const upComingMode = currentMode === "morning" ? "evening" : "morning";
      // Set timer for next theme change
      const timeToTriggerNextThemeChange = this._getTimeDiffInMiliSecondsForUpcomingMode(
        upComingMode
      );
      this._setTimerToChangeThemeAutomatically(
        timeToTriggerNextThemeChange,
        upComingMode
      );
    } else {
      let { themeUpdateTimer } = this.state;
      // Clear timer instance
      if (themeUpdateTimer) {
        clearTimeout(themeUpdateTimer);
        themeUpdateTimer = null;
        this.setState({ themeUpdateTimer });
      }
    }
  };

  _setTimerToChangeThemeAutomatically = (
    timeToTriggerNextThemeChange,
    upComingMode
  ) => {
    let { themeUpdateTimer } = this.state;
    // First clear it
    if (themeUpdateTimer) {
      clearTimeout(themeUpdateTimer);
      themeUpdateTimer = null;
    }
    // Assign new timeout instance
    themeUpdateTimer = setTimeout(() => {
      if (upComingMode === "morning") {
        this.props.updateSettings({
          ...this.props.settingsData,
          isDarkModeEnabled: false
        });
        // Set timer for next change
        const timeToTriggerNextThemeChange = this._getTimeDiffInMiliSecondsForUpcomingMode(
          "evening"
        );
        this._setTimerToChangeThemeAutomatically(
          timeToTriggerNextThemeChange,
          "evening"
        );
      } else {
        this.props.updateSettings({
          ...this.props.settingsData,
          isDarkModeEnabled: true
        });
        // Set timer for next change
        const timeToTriggerNextThemeChange = this._getTimeDiffInMiliSecondsForUpcomingMode(
          "morning"
        );
        this._setTimerToChangeThemeAutomatically(
          timeToTriggerNextThemeChange,
          "morning"
        );
      }
    }, timeToTriggerNextThemeChange);
    this.setState({ themeUpdateTimer });
  };

  _getCurrentMode = () => {
    const currentHour = new Date().getHours();
    if (
      currentHour >= themeTriggers.evening ||
      currentHour < themeTriggers.morning
    ) {
      return "evening";
    } else if (
      currentHour >= themeTriggers.morning &&
      currentHour < themeTriggers.evening
    ) {
      return "morning";
    }
  };

  _getTimeDiffInMiliSecondsForUpcomingMode = upComingMode => {
    let upcomingDate;
    let upcomingMonth;
    let upcomingYear;
    const upcomingHours = new Date().getHours();
    if (upcomingHours > themeTriggers[upComingMode]) {
      // Change will occur next day
      const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      upcomingDate = tomorrow.getDate();
      upcomingMonth = tomorrow.getMonth();
      upcomingYear = tomorrow.getFullYear();
    } else {
      // Change will occur in current day
      const today = new Date();
      upcomingDate = today.getDate();
      upcomingMonth = today.getMonth();
      upcomingYear = today.getFullYear();
    }
    return (
      new Date(
        upcomingYear,
        upcomingMonth,
        upcomingDate,
        themeTriggers[upComingMode]
      ) - new Date()
    );
  };

  render() {
    const { isSettingsVisible } = this.state;
    return (
      <React.Fragment>
        <div id="app-wrapper">
          <div id={this._getThemeId()}>
            <Header
              makeSettingsPannelVisible={this._makeSettingsPannelVisible}
            />
            <div id="app-body">
              <Switch>
                <Route
                  exact
                  path={`${this.props.match.path}/search`}
                  render={() => <SearchPage {...this.props} />}
                />
                <Route
                  exact
                  path={`${this.props.match.path}/featured`}
                  render={() => <FeaturedPage {...this.props} />}
                />
                <Route
                  exact
                  path={`/`}
                  render={() => <IdlePage {...this.props} />}
                />
                <Route exact path="*" render={() => <Redirect to="/" />} />
              </Switch>
            </div>
            <SettingsPannel
              isSettingsVisible={isSettingsVisible}
              onDismiss={this._hideSettings}
            />
          </div>
        </div>
      </React.Fragment>
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
)(Main);
