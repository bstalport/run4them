// @flow

import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import {
  data
} from '../modules';

const config = {
  key: 'LIFTED_REDUX_STORE',
  storage: AsyncStorage
};

const appReducer = persistCombineReducers(config, {
  data,
});

export default function rootReducer(state, action) {
  return appReducer(state, action);
}
