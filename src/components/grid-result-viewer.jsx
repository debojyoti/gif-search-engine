import React, { Component } from "react";
import ExpandedGifViewer from "./expanded-gif-viewer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { showToast, deepClone } from "../helper-methods/index";
import SearchInProgress from "./search-in-progress";
import InfiniteScroll from "react-infinite-scroller";
import { connect } from "react-redux";
import { updateSettings } from "../redux/actions/settings-data";

class GridResultViewer extends Component {
  state = {
    expandedViewer: {
      isVisible: false,
      selectedGif: null
    }
  };

  _toggleAutoPlay = () => {
    const { settingsData } = this.props;
    this.props.updateSettings({
      ...settingsData,
      isAutoPlayEnabled: !settingsData.isAutoPlayEnabled
    });
  };

  _showCopySuccessMessage = () => {
    showToast("Copied to your clipboard!", "success");
  };

  _formatGifTitle = title => {
    if (title && title.length) {
      if (title.length > 30) {
        return title.substring(0, 29) + "...";
      } else {
        return title;
      }
    } else {
      return <span>&nbsp;</span>;
    }
  };

  _showGifExpandedView = gif => {
    const { expandedViewer } = deepClone(this.state);
    expandedViewer.gif = gif;
    expandedViewer.isVisible = true;
    this.setState({ expandedViewer });
  };

  _hideExpandedView = () => {
    const { expandedViewer } = deepClone(this.state);
    expandedViewer.gif = null;
    expandedViewer.isVisible = false;
    this.setState({ expandedViewer });
  };

  render() {
    const {
      gifs,
      pagination,
      canLoadMore,
      loadMore,
      settingsData,
      isLoaderActive
    } = this.props;
    const { expandedViewer } = this.state;
    return (
      <React.Fragment>
        <div id="result-grid-wrapper">
          {/* <SearchInProgress /> */}
          <div id="results-wrapper" className="fColumn aIC jCC">
            <div id="result-meta-data-wrapper" className="fRow aIC jCSB">
              <h5>
                GIFs found:{" "}
                {pagination && pagination.total_count
                  ? pagination.total_count
                  : 0}
              </h5>
              <div>
                Autoplay &nbsp;{" "}
                <label className="toggle" style={{ zIndex: 9 }}>
                  <input
                    className="toggle-checkbox"
                    type="checkbox"
                    checked={settingsData.isAutoPlayEnabled}
                    onChange={e => this._toggleAutoPlay()}
                  />
                  <div className="toggle-switch"></div>
                  <span className="toggle-label"></span>
                </label>
              </div>
            </div>
            {gifs && gifs.length ? (
              <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={canLoadMore}
                threshold={250}
                loader={<SearchInProgress isVisible={true} key={0} />}
              >
                <div id="gif-result-grid" className="fRow aIC jCC">
                  {gifs.map((gif, gifIndex) => (
                    <div className="gif-result" key={gifIndex}>
                      <div
                        className="gif-thumbnail"
                        onClick={() => this._showGifExpandedView(gif)}
                        style={{
                          backgroundImage: settingsData.isAutoPlayEnabled
                            ? `url(${gif.images.downsized.url})`
                            : `url(${gif.images.downsized_still.url})`
                        }}
                      ></div>
                      <div className="gif-quick-actions  fColumn">
                        <p>{this._formatGifTitle(gif.title)}</p>
                        <div className="fRow aIC jCSB">
                          <div className="social-links fRow aIC jCE">
                            <a
                              href={`https://giphy.com/login/twitter?next=https://giphy.com/login/twitter/finalize?next=${gif.url}`}
                              target="_blank"
                              style={{ textDecoration: "none" }}
                            >
                              <div className="quick-action  fRow aIC jCC">
                                <i
                                  className="fa fa-twitter"
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </a>
                            <a
                              href={`http://www.facebook.com/sharer/sharer.php?u=${gif.url}`}
                              target="_blank"
                              style={{ textDecoration: "none" }}
                            >
                              <div className="quick-action fRow aIC jCC">
                                <i
                                  className="fa fa-facebook"
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </a>
                          </div>
                          <CopyToClipboard
                            text={gif.url || ""}
                            onCopy={() => this._showCopySuccessMessage()}
                          >
                            <div className="quick-action  fRow aIC jCC">
                              <i className="fa fa-link" aria-hidden="true"></i>
                            </div>
                          </CopyToClipboard>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            ) : !isLoaderActive ? (
              <div id="loading" className="fColumn jCC aIC">
                <div id="noresults-animation"></div>
                <h4>No Results Found :(</h4>
              </div>
            ) : null}
          </div>
        </div>

        <ExpandedGifViewer
          isVisible={expandedViewer.isVisible}
          gif={expandedViewer.gif}
          onDismiss={this._hideExpandedView}
          isAutoPlayEnabled={settingsData.isAutoPlayEnabled}
        />
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
)(GridResultViewer);
