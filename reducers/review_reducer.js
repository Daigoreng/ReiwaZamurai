import {
    FETCH_ALL_REVIEWS,
    SELECT_DETAIL_REVIEW,
} from '../actions/types';

const INITIAL_STATE = { // 初期データ
  allReviews: [], // `allReviews`は最初、空の配列とする
  detailReview: [],
};


export default (state = INITIAL_STATE, action) => { // `state`と`action`を受け取り、
  switch (action.type) { // もし`action`の`type`が
    case FETCH_ALL_REVIEWS: // `FETCH_ALL_REVIEWS`だったら、
      return { ...state, allReviews: action.payload }; // `state`の`allReviews`項目を上書きして返す

    case SELECT_DETAIL_REVIEW: // ←追記ここから
      return { ...state, detailReview: action.payload };

    default: // それ以外だったら、
      return state; // `state`を何もいじらずそのまま返す
  }
};