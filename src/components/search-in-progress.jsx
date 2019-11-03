import React, { Component } from "react";

const SearchInProgress = props => {
  // loader visibility condition check
  let loaderClassName = "fColumn jCC aIC dnone";
  if (props && props.isVisible) {
    loaderClassName = "fColumn jCC aIC";
  }
  return (
    <div id="loading" className={loaderClassName}>
      <div id="loading-animation"></div>
      <h4>Loading</h4>
    </div>
  );
};

export default SearchInProgress;
