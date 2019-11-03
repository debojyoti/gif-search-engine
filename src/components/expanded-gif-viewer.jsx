import React, { Component } from "react";
import { sleepTime } from "../helper-methods";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { showToast } from "../helper-methods/index";

class ExpandedGifViewer extends Component {
  state = {
    isAutoPlayEnabled: false,
    isPlayOverridden: false
  };

  componentDidMount() {
    this._registerEvents();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.isAutoPlayEnabled !== this.state.isAutoPlayEnabled &&
      !this.state.isPlayOverridden
    ) {
      this.setState({ isAutoPlayEnabled: this.props.isAutoPlayEnabled });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this._handleClick, false);
  }

  _registerEvents = () => {
    document.addEventListener("mousedown", this._handleClick, false);
  };

  _handleClick = e => {
    if (this.node && !this.node.contains(e.target)) {
      this._closeViewer();
    }
  };

  _getWrapperClassName = () => {
    const { isVisible } = this.props;
    if (isVisible) {
      return "fRow jCC gif-viewer-open";
    } else {
      return "fRow jCC gif-viewer-close";
    }
  };

  _toggleGifPlay = () => {
    this.setState({ isPlayOverridden: true }, async () => {
      await sleepTime(300);
      this.setState({ isAutoPlayEnabled: !this.state.isAutoPlayEnabled });
    });
  };

  _closeViewer = () => {
    this.setState({ isPlayOverridden: false }, () => {
      this.props.onDismiss();
    });
  };

  _formatGifTitle = title => {
    if (title && title.length) {
      if (title.length > 40) {
        return title.substring(0, 39) + "...";
      } else {
        return title;
      }
    } else {
      return <span>&nbsp;</span>;
    }
  };

  _showCopySuccessMessage = () => {
    showToast("Copied to your clipboard!", "success");
  };

  render() {
    const { isVisible, gif } = this.props;
    const { isAutoPlayEnabled } = this.state;
    console.log("isAutoPlayEnabled :", isAutoPlayEnabled);
    return (
      <div
        id="gif-expander-wrapper"
        className={this._getWrapperClassName()}
        ref={node => (this.node = node)}
      >
        <div className="fColumn" id="gif-details-wrapper">
          <div id="expander-dismiss-wrapper" className="fRow jCE aIC">
            <button onClick={this._closeViewer}>Close</button>
          </div>
          <div id="gif-wrapper">
            {isVisible ? (
              isAutoPlayEnabled ? (
                <img src={gif.images.downsized.url} alt="" />
              ) : (
                <img src={gif.images.downsized_still.url} alt="" />
              )
            ) : null}
            {gif ? (
              <div id="gif-full-action-list" className="fColumn jCS aIS">
                <div id="gif-name-section" className="fRow jCS aIC">
                  <div
                    id="play-pause"
                    className="fRow jCC aIC"
                    onClick={() => this._toggleGifPlay()}
                  >
                    {isAutoPlayEnabled ? (
                      <i className="fa fa-pause" aria-hidden="true"></i>
                    ) : (
                      <i className="fa fa-play" aria-hidden="true"></i>
                    )}
                  </div>
                  <p>{this._formatGifTitle(gif.title)}</p>
                </div>
                <div id="gif-all-links" className="fRow jCS aIC">
                  <CopyToClipboard
                    text={gif.url || ""}
                    onCopy={this._showCopySuccessMessage}
                  >
                    <div className="social-link">
                      <i className="fa fa-link" aria-hidden="true"></i>
                    </div>
                  </CopyToClipboard>
                  <a
                    href={`http://www.facebook.com/sharer/sharer.php?u=${gif.url}`}
                    target="_blank"
                    style={{ textDecoration: "none", color: "white"  }}
                  >
                    <div className="social-link">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </div>
                  </a>

                  <a
                    href={`https://giphy.com/login/twitter?next=https://giphy.com/login/twitter/finalize?next=${gif.url}`}
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <div className="social-link">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </div>
                  </a>
                </div>
                <div id="embed-code" style={{ marginTop: 40 }}>
                  <p>
                    <i className="fa fa-code" aria-hidden="true"></i>&nbsp; GIF
                    Embed Code
                  </p>
                  <textarea
                    name=""
                    id=""
                    rows="6"
                    disabled
                    defaultValue={`<iframe
src="${gif.embed_url}"
width="480"
height="480"
frameBorder="0"
className="giphy-embed"
allowFullScreen
></iframe>
<p>
<a href="${gif.url}">
  via GIPHY
</a>
</p>`}
                  ></textarea>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ExpandedGifViewer;
