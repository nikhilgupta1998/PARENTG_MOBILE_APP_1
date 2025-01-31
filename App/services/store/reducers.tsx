/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {InjectedReducersType} from '../../utils/types/injector-typings';
import {combineReducers} from '@reduxjs/toolkit';
import {RootState} from '../../types';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return (state: RootState) => state;
  } else {
    return combineReducers({
      ...injectedReducers,
    });
  }
}
