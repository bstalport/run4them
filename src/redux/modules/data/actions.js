// @flow

import { createAction } from 'redux-actions';

export const GET_FACEBOOK_DATA = 'data/GET_FACEBOOK_DATA';
export const GET_FACEBOOK_DATA_SUCCESS = 'data/GET_FACEBOOK_DATA_SUCCESS';
export const GET_STRAVA_ACTIVITIES = 'data/GET_STRAVA_ACTIVITIES';
export const SET_STRAVA_ACTIVITIES = 'data/SET_STRAVA_ACTIVITIES';
export const SET_HEALTHKIT_ACTIVITIES = 'data/SET_HEALTHKIT_ACTIVITIES';
export const CLEAR_ACTIVITIES = 'data/CLEAR_ACTIVITIES';
export const SET_CURRENT_ACTIVITY = 'data/SET_CURRENT_ACTIVITY';
export const UPDATE_SPONSOR_IN_ACTIVITY = 'data/UPDATE_SPONSOR_IN_ACTIVITY';
export const USER_PROFILE = 'data/USER_PROFILE';
export const CLEAR_ALL = 'data/CLEAR_ALL';
export const SET_ACTIVITY_HISTORY = 'data/SET_ACTIVITY_HISTORY';
export const SET_SPONSORS_LIST = 'data/SET_SPONSORS_LIST';
export const SET_USERS_LIST = 'data/SET_USERS_LIST';
export const SET_TOTALS = 'data/SET_TOTALS';

export const fetchDataActionCreators = {
  getFacebookUserData: createAction(GET_FACEBOOK_DATA),
  getFacebookUserDataSuccess: createAction(GET_FACEBOOK_DATA_SUCCESS),
  getStravaActivities:createAction(GET_STRAVA_ACTIVITIES),
  setStravaActivities:createAction(SET_STRAVA_ACTIVITIES),
  setHealthKitActivities:createAction(SET_HEALTHKIT_ACTIVITIES),
  clearActivities:createAction(CLEAR_ACTIVITIES),
  setCurrentActivity:createAction(SET_CURRENT_ACTIVITY),
  updateSponsorInCurrentActivity:createAction(UPDATE_SPONSOR_IN_ACTIVITY),
  setUserProfile:createAction(USER_PROFILE),
  clearAll:createAction(CLEAR_ALL),
  setActivityHistory:createAction(SET_ACTIVITY_HISTORY),
  setSponsorsList:createAction(SET_SPONSORS_LIST),
  setUsersList:createAction(SET_USERS_LIST),
  setTotals:createAction(SET_TOTALS),
};
