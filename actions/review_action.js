import { AsyncStorage } from 'react-native';

import {
  FETCH_ALL_REVIEWS,
  SELECT_DETAIL_REVIEW,
  CALSUM_REVIEW,
  CALSUM_MANEGE
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

export const calSum = (count) => {
  let Sum = count * 1.5;
  var array = [];
  array[0] = [count];
  array[1] = [Sum];
  console.log(array);
  return { type: CALSUM_REVIEW, payload: array};
};

export const check = (check) => {
  if(check === 0){
    // check = 1
    console.log(check)
  }
  // else check = 0
  else console.log(check)
  return { type: CALSUM_MANEGE, payload: check };
};
