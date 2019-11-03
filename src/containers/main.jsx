import React, { Component } from "react";
import Search from "../components/search";
import { Route, Switch } from "react-router-dom";
import "../assets/style.css";
import Header from "../components/header";
import Footer from "../components/footer";
import SettingsPannel from "./settings-panel";

class Main extends Component {
  state = {
    hello: 1
  };
  componentDidMount() {
    console.log("this.props :", this.props);
    // setInterval(() => {
    //     this.setState({hello: this.state.hello+1}, () => {
    //         this.props.history.replace('/search');
    //     })
    // }, 2000);
  }

  _makeSettingsPannelVisible = () => {
    if (!this.state.isSettingsVisible) {
        this.setState({
            isSettingsVisible: true
        })
    }
  }

  _hideSettings  = () => {
    this.setState({
        isSettingsVisible: false
    })
  }

  render() {
      const { isSettingsVisible } = this.state;
    return (
      <React.Fragment>
        <div id="app-wrapper">
          <div id="light-theme">
            <Header makeSettingsPannelVisible={this._makeSettingsPannelVisible} />
            <Switch>
              <Route
                exact
                path="/search"
                render={() => (
                  <Search hello={this.state.hello} {...this.props} />
                )}
              />
            </Switch>
            <Footer />
            <SettingsPannel isSettingsVisible={isSettingsVisible} onDismiss={this._hideSettings} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
