import { combineReducers } from 'redux';

import ReviewReducer from './review_reducer'; // `review_reducer.js`は後ほど作ります


export default combineReducers({ // 本来はここで複数のReducerをひとまとめにする
  review: ReviewReducer, // `ReviewReducer`(review_reducer.js)を`review`とする
});