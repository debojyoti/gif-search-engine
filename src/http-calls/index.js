import { BASE_URL } from "../config/index";
import { makeGetRequest } from "../http-connectors";
import { getToken } from "../token-interceptor";

export const fetchFeaturedGifs = (limit = 25, offset = 0) => {
  return new Promise((resolve, reject) => {
    makeGetRequest(BASE_URL + "/trending", true, {
      limit,
      offset
    })
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};
