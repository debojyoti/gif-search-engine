import React, { Component } from "react";
import ExpandedGifViewer from "./expanded-gif-viewer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { showToast } from "../helper-methods/index";
import SearchInProgress from "./search-in-progress";
import InfiniteScroll from 'react-infinite-scroller';

class GridResultViewer extends Component {
  state = {};

  _showCopySuccessMessage = () => {
    console.log("1 :", 1);
    showToast("Copied to your clipboard!", "success");
  };

  render() {
    const { gifs, pagination, canLoadMore, loadMore } = this.props;
    console.log('gifs :', gifs);
    return (
      <React.Fragment>
        <div id="result-grid-wrapper">
          {/* <SearchInProgress /> */}
          <div id="results-wrapper" className="fColumn aIC jCC">
            <div id="result-meta-data-wrapper" className="fRow aIC jCS">
              <h5>
                GIFs found:{" "}
                {pagination && pagination.total_count
                  ? pagination.total_count
                  : 0}
              </h5>
            </div>

            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={canLoadMore}
              threshold={250}
              loader={<SearchInProgress isVisible={true} key={0} />}
            >
              <div id="gif-result-grid" className="fRow aIC jCC">
                {gifs && gifs.length
                  ? gifs.map((gif, gifIndex) => (
                      <div className="gif-result" key={gifIndex}>
                        <div
                          className="gif-thumbnail"
                          style={{
                            backgroundImage: `url(${gif.images.preview_gif.url})`
                          }}
                        ></div>
                        <div className="gif-quick-actions fRow aIC jCSB">
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
                    ))
                  : null}
              </div>
            </InfiniteScroll>

            {/*  */}
          </div>
        </div>

        <ExpandedGifViewer />
      </React.Fragment>
    );
  }
}

export default GridResultViewer;
