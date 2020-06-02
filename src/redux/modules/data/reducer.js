// @flow

import Authentication from 'src/firebase/authentication';
import firestore from '@react-native-firebase/firestore';

import {
  GET_FACEBOOK_DATA_SUCCESS,
  GET_STRAVA_ACTIVITIES,
  SET_STRAVA_ACTIVITIES,
  SET_HEALTHKIT_ACTIVITIES,
  CLEAR_ACTIVITIES,
  SET_CURRENT_ACTIVITY,
  UPDATE_SPONSOR_IN_ACTIVITY,
  USER_PROFILE,
  CLEAR_ALL,
} from './actions';

export const DEFAULT = {};

function stravaToActivities(data) {
  return {};
}

export default function data(state = DEFAULT, action = {}) {
  const {type, payload} = action;

  switch (type) {
    case GET_FACEBOOK_DATA_SUCCESS: {
      return {
        ...state,
        user: payload,
      };
    }

    case CLEAR_ACTIVITIES:{
      return {
        ...state,
        activities: [],
        activitiesUpdated: false
      };
    }

    case UPDATE_SPONSOR_IN_ACTIVITY:{
      if (payload.sponsor) {
        return {
          ...state,
          currentActivity: {
            ...state.currentActivity,
            sponsor : payload.sponsor
          }
        };
      }
    }

    case SET_CURRENT_ACTIVITY:{
      if (payload) {
        const currentActivity = state.activities.filter((result) => result.activityId == payload.activityId);
        if (currentActivity.length >0){
        return {
          ...state,
          currentActivity: currentActivity[0]
        };
      }else{
        return state;
      }
      }
    }
    case SET_HEALTHKIT_ACTIVITIES: {
      if (payload) {
        const user = Authentication.getCurrentUser();
        let activities = state.activities || [];

        payload.healthKitActivities.forEach((act) =>
          activities.push({
            activityId: 'healthkit_' + act.activityId,
            activityName: act.activityName,
            userId: user.uid,
            sponsorId: null,
            source: act.sourceName,
            //startTime: firestore.Timestamp.fromDate(new Date(act.start)),
            //endTime: firestore.Timestamp.fromDate(new Date(act.end)),
            moving_time: (new Date(act.start) - new Date(act.end)) / 1000,
            distance: act.distance,
            status: 'pending',
            calories: act.calories,
            //elapsed_time:act.elapsed_time,
            //start_latlng: firestore.GeoPoint(act.start_latlng[0], act.start_latlng[1]),
            //end_latlng: firestore.GeoPoint(act.end_latlng[0], act.end_latlng[1]),
            //map_polyline: act.map.summary_polyline,
            //elev_low: act.elev_low,
            //elev_high: act.elev_high,
            //total_elevation_gain: act.total_elevation_gain,
            //average_speed: act.average_speed,
            //strava_athlete_id:
          }),
        );
        return {
          ...state,
          activities: activities,
          activitiesUpdated: true
        };
      } else {
        return state;
      }
    }

    case SET_STRAVA_ACTIVITIES: {
      if (payload) {
        const user = Authentication.getCurrentUser();
        let activities = state.activities || [];
        payload.stravaActivities.map((act) =>
          activities.push({
            activityId: 'strava_' + act.id,
            activityName: act.name,
            userId: user.uid,
            sponsorId: null,
            source: 'Strava',
            startTime: firestore.Timestamp.fromDate(
              new Date(act.start_date_local),
            ),
            endTime: firestore.Timestamp.fromDate(
              new Date(new Date(act.start_date_local).getTime() + (act.moving_time*1000))
            ),
            moving_time: act.moving_time,
            //elapsed_time:act.elapsed_time,
            start_latlng: new firestore.GeoPoint(
              act.start_latlng[0],
              act.start_latlng[1],
            ),
            end_latlng: new firestore.GeoPoint(
              act.end_latlng[0],
              act.end_latlng[1],
            ),
            map_polyline: act.map.summary_polyline,
            elev_low: act.elev_low,
            elev_high: act.elev_high,
            total_elevation_gain: act.total_elevation_gain,
            distance: act.distance,
            average_speed: act.average_speed,
            status: 'pending',
            strava_athlete_id:act.athlete.id
            //calories
          }),
        );
        return {
          ...state,
          activities: activities,
          activitiesUpdated: true
        };
      } else {
        return state;
      }
    }
    case GET_STRAVA_ACTIVITIES: {
      if (payload) {
        return {
          ...state,
          stravaAccessToken: payload.stravaAccessToken,
          activitiesUpdated: false
        };
      } else {
        return state;
      }
    }
    case USER_PROFILE: {
      if (payload) {
        return {
          ...state,
          userProfile: payload.userProfile,
        };
      } else {
        return state;
      }
    }

    case CLEAR_ALL: {
      return {}
    }

    default:
      return state;
  }
}
