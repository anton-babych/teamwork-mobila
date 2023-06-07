import { createSelector } from '@ngrx/store';
import { appProductFeatureSelector } from './app-product.reducers';
import { STATUS_FEATURE_KEY } from './status.reducers';

export const statusFeatureSelector = createSelector(
  appProductFeatureSelector,
  (state) => state[STATUS_FEATURE_KEY]
);
export const selectError = createSelector(statusFeatureSelector, (state) => state.error);
export const selectLoading = createSelector(statusFeatureSelector, (state) => state.loading);
export const selectLoaded = createSelector(statusFeatureSelector, (state) => state.loaded);
