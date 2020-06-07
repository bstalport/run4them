// @flow
import {authorize} from 'react-native-app-auth';
import {App_Service} from 'src/services';
import Config from 'src/config/config';

//import { Strava } from 'strava';

import {take, put, call, fork, all} from 'redux-saga/effects';

import {
  GET_FACEBOOK_DATA,
  GET_STRAVA_ACTIVITIES,
  fetchDataActionCreators,
} from './actions';

export function* asyncGetFacebookUserData({payload}) {
  const {facebookToken} = payload;

  // eslint-disable-next-line
  const url = `https://graph.facebook.com/v2.11/me?access_token=${facebookToken}&fields=id,name,email,picture{url}`;

  try {
    const response = yield call(App_Service, {url, method: 'GET'});

    if (response.result === 'ok') {
      yield put(
        fetchDataActionCreators.getFacebookUserDataSuccess(response.data),
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchGetFacebookUserData() {
  while (true) {
    const action = yield take(GET_FACEBOOK_DATA);
    yield* asyncGetFacebookUserData(action);
  }
}

export function* asyncGetStravaActivitiesData({payload}) {
  const stravaToken = payload.stravaAccessToken;
  let enddate = new Date().getTime()/1000;
  let startdate = new Date();
  startdate = (new Date(
    startdate.setDate(startdate.getDate() - Config.periodOfActivityToRead),
  )).getTime()/1000;

  const url =
    `https://www.strava.com/api/v3/athlete/activities?before=` +
    enddate +
    `&after=` +
    startdate;

  try {
    const response = yield call(App_Service, {
      url,
      method: 'GET',
      BearerToken: stravaToken,
    });
    if (response.result === 'ok') {
      yield put(
        fetchDataActionCreators.setStravaActivities({
          stravaActivities: response.data,
        }),
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchGetStravaActivitiesData() {
  while (true) {
    const action = yield take(GET_STRAVA_ACTIVITIES);
    yield* asyncGetStravaActivitiesData(action);
  }
}

export default function* () {
  yield all([
    fork(watchGetFacebookUserData),
    fork(watchGetStravaActivitiesData),
  ]);
}
