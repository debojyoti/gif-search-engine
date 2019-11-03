import { getToken } from "../token-interceptor";
// import { checkIfSessionExpired } from "../helper-methods";
import { handleErrorIfAvailable } from "../error-handler";

/**
 *
 *      General http methods
 *
 */

const structureQueryParams = params => {
  let queryStrings = "?";
  const keys = Object.keys(params);
  keys.forEach((key, index) => {
    queryStrings += key + "=" + params[key];
    if (params[keys[index + 1]]) {
      queryStrings += "&";
    }
  });
  return queryStrings;
};

export const makeGetRequest = async (
  url,
  attachAPIKey = false,
  params = null,
  additionalHeaderParams
) => {
  let queryString = "";
  if (params) {
    queryString = structureQueryParams(params);
  }
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (attachAPIKey) {
    const api_key = getToken();
    if (api_key) {
      headers["api_key"] = api_key;
    }
  }
  if (additionalHeaderParams && Object.keys(additionalHeaderParams).length) {
    headers = { ...headers, ...additionalHeaderParams };
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url + queryString, {
        method: "GET",
        headers: headers
      })
        .then(async res => {
          handleErrorIfAvailable(res);
          if (res.status.toString()[0] !== "2") {
            try {
              const parsedBody = await res.json();
              reject({ status: res.status, body: parsedBody });
              return;
            } catch (err) {
              reject({ status: res.status, body: null });
              return;
            }
          }
          return res.json();
        })
        .then(jsonResponse => {
          resolve(jsonResponse);
        })
        .catch(e => {
          console.log("XHR GET Error: ", e);
          reject(e);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

export const makePostRequest = async (
  url,
  attachAPIKey = false,
  params = {},
  additionalHeaderParams
) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (attachAPIKey) {
    const api_key = getToken();
    if (api_key) {
      headers["api_key"] = api_key;
    }
  }
  if (additionalHeaderParams && Object.keys(additionalHeaderParams).length) {
    headers = { ...headers, ...additionalHeaderParams };
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(params)
      })
        .then(
          async res => {
            handleErrorIfAvailable(res);
            if (res.status.toString()[0] !== "2") {
              try {
                const parsedBody = await res.json();
                reject({ status: res.status, body: parsedBody });
                return;
              } catch (err) {
                reject({ status: res.status, body: null });
                return;
              }
            }
            return res.json();
          },
          error => {
            reject(error);
          }
        )
        .then(
          jsonResponse => {
            resolve(jsonResponse);
          },
          error => {
            reject(error);
          }
        )
        .catch(error => {
          reject(error);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

export const makePutRequest = async (url, attachAPIKey = false, params = {}, additionalHeaderParams) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (attachAPIKey) {
    const api_key = getToken();
    if (api_key) {
      headers["api_key"] = api_key;
    }
  }
  if (additionalHeaderParams && Object.keys(additionalHeaderParams).length) {
    headers = { ...headers, ...additionalHeaderParams };
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(params)
      })
        .then(
          async res => {
            handleErrorIfAvailable(res);
            if (res.status.toString()[0] !== "2") {
              try {
                const parsedBody = await res.json();
                reject({ status: res.status, body: parsedBody });
                return;
              } catch (err) {
                reject({ status: res.status, body: null });
                return;
              }
            }
            return res.json();
          },
          error => {
            reject(error);
          }
        )
        .then(
          jsonResponse => {
            resolve(jsonResponse);
          },
          error => {
            reject(error);
          }
        )
        .catch(error => {
          reject(error);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

export const makeDeleteRequest = async (
  url,
  attachAPIKey = false,
  params = {},
  additionalHeaderParams
) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (attachAPIKey) {
    const api_key = getToken();
    if (api_key) {
      headers["api_key"] = api_key;
    }
  }
  if (additionalHeaderParams && Object.keys(additionalHeaderParams).length) {
    headers = { ...headers, ...additionalHeaderParams };
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(params)
      })
        .then(
          async res => {
            handleErrorIfAvailable(res);
            if (res.status.toString()[0] !== "2") {
              try {
                const parsedBody = await res.json();
                reject({ status: res.status, body: parsedBody });
                return;
              } catch (err) {
                reject({ status: res.status, body: null });
                return;
              }
            }
            return res.json();
          },
          error => {
            reject(error);
          }
        )
        .then(
          jsonResponse => {
            resolve(jsonResponse);
          },
          error => {
            reject(error);
          }
        )
        .catch(error => {
          reject(error);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};