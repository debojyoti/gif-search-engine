import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "../assets/style.css";
import Header from "../components/header";
import SettingsPannel from "./settings-panel";
import SearchPage from "../pages/search-page";
import FeaturedPage from "../pages/featured-gifs-page";
import IdlePage from "../pages/idle-page";
import { connect } from "react-redux";

class Main extends Component {
  state = {
    isDarkModeEnabled: true
  };

  componentWillMount() {
    this._setTheme();
  }

  componentDidMount() {}

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.settingsData.isDarkModeEnabled !==
      prevState.isDarkModeEnabled
    ) {
      return { isDarkModeEnabled: nextProps.settingsData.isDarkModeEnabled };
    } else return null; // Triggers no change in the state
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
    return isDarkModeEnabled? "dark-theme" : "light-theme"; 
  }

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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
