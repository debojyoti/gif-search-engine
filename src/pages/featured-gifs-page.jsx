import React, { Component } from "react";
import GridResultViewer from '../components/grid-result-viewer';
import { deepClone, showToast } from "../helper-methods";
import { fetchFeaturedGifs } from '../http-calls/index';
import { GIF_LIMIT_PER_LOAD } from '../config/index';
import SearchInProgress from "../components/search-in-progress";

class FeaturedPage extends Component {
  state = {
    gifs: [],
    pagination: {},
    isSearchActive: false,
    isLoaderActive: false
  };

  async componentDidMount() {
    await this._initialLoad();
  }

  _initialLoad = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await this._toggleLoader(true);
        const gifResponse = await fetchFeaturedGifs(GIF_LIMIT_PER_LOAD, 0);
        await this._updateStateWithNewGifs(gifResponse);
        await this._toggleLoader(false);
      } catch (err) {
        showToast("Server error", "error");
      }
    });
  };

  _toggleLoader = shouldActivate => {
    return new Promise((resolve, reject) => {
      this.setState({ isLoaderActive: shouldActivate }, () => {
        resolve();
      });
    });
  };

  _updateStateWithNewGifs = gifResponse => {
    return new Promise((resolve, reject) => {
      let { gifs, pagination } = deepClone(this.state);
      if (gifResponse.pagination.count > 0) {
        // Append gifs
        gifs = [ ...gifs, ...gifResponse.data ];
        // Update pagination
        pagination = gifResponse.pagination;
      }
      this.setState({ gifs, pagination }, () => {
        resolve();
      });
    });
  };

  _loadMoreGifsIfAvailable = async () => {
    const { pagination } = deepClone(this.state);
    if (this._checkIfCanLoadMore()) {
      const gifResponse = await fetchFeaturedGifs(GIF_LIMIT_PER_LOAD, pagination.offset+GIF_LIMIT_PER_LOAD);
      await this._updateStateWithNewGifs(gifResponse);
    }
  };

  _checkIfCanLoadMore = () => {
    const {pagination} = this.state;
    return pagination.total_count - (pagination.offset+1) > 0;
  }
  
  render() {
    const { isLoaderActive, gifs, pagination } = this.state;
    return (
      <div id="result-mode" className="fColumn jCC aIC">
        <div id="result-header" className="fRow jCC aIC">
          <img
            src="runtime_assets/images/featured-star-transparent.gif"
            alt=""
            id="featured-icon"
            style={{ width: 70 }}
          />
          <h3>Featured gifs</h3>
        </div>
        <GridResultViewer 
          gifs={gifs} 
          pagination={pagination}
          canLoadMore={this._checkIfCanLoadMore()}
          loadMore={ this._loadMoreGifsIfAvailable } 
          isLoaderActive={isLoaderActive}
        />
        <SearchInProgress isVisible={isLoaderActive} />
      </div>
    );
  }
}

export default FeaturedPage;
