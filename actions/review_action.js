import { AsyncStorage } from 'react-native';

import {
  FETCH_ALL_REVIEWS,
  SELECT_DETAIL_REVIEW,
  CALSUM_REVIEW,
  COUNT_REVIEW
} from './types';




export const fetchAllReviews = () => {
  return async (dispatch) => {
    let stringifiedAllReviews = await AsyncStorage.getItem('allReviews');
    let allReviews = JSON.parse(stringifiedAllReviews);

    if (allReviews === null) {
      allReviews = [];
      await AsyncStorage.setItem('allReviews', JSON.stringify(allReviews));
    }

    dispatch({ type: FETCH_ALL_REVIEWS, payload: allReviews });
  };
};

export const selectDetailReview = (selectedReview) => {
  return { type: SELECT_DETAIL_REVIEW, payload: selectedReview };
};

let countReview = 0;

export const countreview = () => {
  countReview += 1
  return { type: COUNT_REVIEW, payload: countReview};
};

let calsumReview = 0

export const check = () => {
  if(calsumReview === 0){
    calsumReview = 1
  }
  else if(calsumReview === 1) calsumReview = 0
  return { type: CALSUM_REVIEW, payload: calsumReview };
};
