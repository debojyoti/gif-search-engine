import React, { Component } from "react";

class ExpandedGifViewer extends Component {
  state = {};
  render() {
    return (
      <div id="gif-expander-wrapper" className="fRow jCC dnone">
        <div className="fColumn" id="gif-details-wrapper">
          <div id="expander-dismiss-wrapper" className="fRow jCE aIC">
            <button>Close</button>
          </div>
          <div id="gif-wrapper">
            <img
              src="https://media1.giphy.com/media/eHcyHQdfPMrDJ6fCXs/giphy.gif?cid=e3b0c442717182c8e3928298c62b2534597cf38be5825d6f&rid=giphy.gif"
              alt=""
            />
            <div id="gif-full-action-list" className="fColumn jCS aIS">
              <div id="gif-name-section" className="fRow jCS aIC">
                <div id="play-pause" className="fRow jCC aIC">
                  <i className="fa fa-pause" aria-hidden="true"></i>
                </div>
                <p>The bird</p>
              </div>
              <div id="gif-all-links" className="fRow jCS aIC">
                <div className="social-link">
                  <i className="fa fa-link" aria-hidden="true"></i>
                </div>
                <div className="social-link">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </div>
                <div className="social-link">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </div>
                <div className="social-link">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </div>
              </div>
              <div id="link-message">
                <i className="fa fa-check" aria-hidden="true"></i> &nbsp; Copied
                successfully
              </div>
              <div id="embed-code">
                <p>
                  <i className="fa fa-code" aria-hidden="true"></i>&nbsp; GIF
                  Embed Code
                </p>
                <textarea name="" id="" rows="6" disabled defaultValue='<iframe
                    src="https://giphy.com/embed/QBjm4TkNLtxJDhlR8v"
                    width="480"
                    height="480"
                    frameBorder="0"
                    className="giphy-embed"
                    allowFullScreen
                  ></iframe>
                  <p>
                    <a href="https://giphy.com/gifs/BTSport-soccer-premier-league-epl-QBjm4TkNLtxJDhlR8v">
                      via GIPHY
                    </a>
                  </p>' >
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpandedGifViewer;
