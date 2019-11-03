import { BASE_URL } from "../config/index";
import { makePostRequest } from "../http-connectors";

export const fetchFeaturedGifs = (limit = 25, offset = 0) => {
  return new Promise((resolve, reject) => {
    makePostRequest(BASE_URL + "/trending", true, {
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
