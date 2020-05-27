// @flow

import { set, isEmpty } from 'lodash';

export default async function App_Service({ url, method, BearerToken, params }) {
  const headers = {};

  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');
  if (BearerToken && BearerToken !=''){
    set(headers, 'Authorization', 'Bearer '+BearerToken);
  }

  const reqBody = {
    method,
    headers
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  return fetch(url, reqBody)
    .then(response => response.json())
    .then((data) => {
      return {
        result: 'ok',
        data
      };
    })
    .catch(() => {
      return {
        result: 'error',
        message: 'Please check your internet connection!'
      };
    });
}
