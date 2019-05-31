import { AsyncStorage } from 'react-native';

import {
    FETCH_ALL_REVIEWS,
    SELECT_DETAIL_REVIEW,
} from './types';


// Action creatorを作成
export const fetchAllReviews = () => {
  // Reducerに渡す`type`と`payload`を指定  
    return async (dispatch) => {
        let stringifiedAllReviews = await AsyncStorage.getItem('allReviews');
        let allReviews = JSON.parse(stringifiedAllReviews);

        if (allReviews == null) {
            // `AsyncStorage`に空の評価データを書き込む(非同期処理)
            allReviews = [];
            await AsyncStorage.setItem('allReviews', JSON.stringify(allReviews));
        }
        dispatch({ type: FETCH_ALL_REVIEWS, payload: allReviews });
    }
};

export const selectDetailReview = (selectedReview) => { // ←追記ここから
    return { type: SELECT_DETAIL_REVIEW, payload: selectedReview };
}; // ←追記ここまで