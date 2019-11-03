import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "../assets/style.css";
import Header from "../components/header";
import SettingsPannel from "./settings-panel";
import SearchPage from "../pages/search-page";
import FeaturedPage from "../pages/featured-gifs-page";
import IdlePage from "../pages/idle-page";

class Main extends Component {
  state = {
    hello: 1
  };
  componentDidMount() {}

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

  render() {
    const { isSettingsVisible } = this.state;
    return (
      <React.Fragment>
        <div id="app-wrapper">
          <div id="light-theme">
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
                  path={`${this.props.match.path}/`}
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

export default Main;
