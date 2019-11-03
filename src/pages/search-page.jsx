import React, { Component } from "react";
import GridResultViewer from "../components/grid-result-viewer";
import { deepClone, showToast } from "../helper-methods";
import { searchGifs } from "../http-calls/index";
import { GIF_LIMIT_PER_LOAD } from "../config/index";
import SearchInProgress from "../components/search-in-progress";
import IdleMode from "../components/idle-mode";

class SearchPage extends Component {
  state = {
    gifs: [],
    pagination: {},
    search: {
      isActive: false,
      searchedTerm: null
    },
    isLoaderActive: false
  };

  componentDidMount() {
    this._search(this.props.searchedTerm);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchedTerm !== this.props.searchedTerm) {
      this._search(this.props.searchedTerm);
    }
  }

  _search = searchedTerm => {
    const { search } = deepClone(this.state);
    if (searchedTerm && searchedTerm.length) {
      search.isActive = true;
      search.searchedTerm = searchedTerm;
      this.setState(
        { search, gifs: [], pagination: {}, isLoaderActive: false },
        () => {
          this._initialLoad();
        }
      );
    }
  };

  _toggleLoader = shouldActivate => {
    return new Promise((resolve, reject) => {
      this.setState({ isLoaderActive: shouldActivate }, () => {
        resolve();
      });
    });
  };

  _initialLoad = () => {
    const { search } = deepClone(this.state);
    return new Promise(async (resolve, reject) => {
      try {
        await this._toggleLoader(true);
        const gifResponse = await searchGifs(
          search.searchedTerm,
          GIF_LIMIT_PER_LOAD,
          0
        );
        await this._updateStateWithNewGifs(gifResponse);
        await this._toggleLoader(false);
      } catch (err) {
        showToast("Server error", "error");
      }
    });
  };

  _updateStateWithNewGifs = gifResponse => {
    return new Promise((resolve, reject) => {
      let { gifs, pagination } = deepClone(this.state);
      if (gifResponse.pagination.count > 0) {
        // Append gifs
        gifs = [...gifs, ...gifResponse.data];
        // Update pagination
        pagination = gifResponse.pagination;
      }
      this.setState({ gifs, pagination }, () => {
        resolve();
      });
    });
  };

  _loadMoreGifsIfAvailable = async () => {
    console.log("object 123");
    const { pagination, search } = deepClone(this.state);
    if (this._checkIfCanLoadMore()) {
      const gifResponse = await searchGifs(
        search.searchedTerm,
        GIF_LIMIT_PER_LOAD,
        pagination.offset + GIF_LIMIT_PER_LOAD
      );
      await this._updateStateWithNewGifs(gifResponse);
    }
  };

  _checkIfCanLoadMore = () => {
    const { pagination } = this.state;
    return pagination.total_count - (pagination.offset + 1 + GIF_LIMIT_PER_LOAD) > 0;
  };

  render() {
    const { isLoaderActive, gifs, pagination, search } = this.state;
    return (
      <div id="result-mode" className="fColumn jCC aIC">
        {gifs.length ? (
          <div id="result-header" className="fRow jCC aIC">
            <img
              src="runtime_assets/images/random-gifs.gif"
              alt=""
              id="featured-icon"
              style={{ width: 40, marginRight: 20 }}
            />
            <h3>{search.searchedTerm || "Searched"} gifs</h3>
          </div>
        ) : null}
        {search.isActive ? (
          <React.Fragment>
            {!isLoaderActive ? (
              <GridResultViewer
                gifs={gifs}
                pagination={pagination}
                canLoadMore={this._checkIfCanLoadMore()}
                loadMore={this._loadMoreGifsIfAvailable}
                isLoaderActive={isLoaderActive}
              />
            ) : null}
            <SearchInProgress isVisible={isLoaderActive} />
          </React.Fragment>
        ) : (
          <IdleMode />
        )}
      </div>
    );
  }
}

export default SearchPage;
