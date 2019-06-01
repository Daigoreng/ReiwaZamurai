import {
  FETCH_ALL_REVIEWS,
  SELECT_DETAIL_REVIEW,
  CALSUM_REVIEW,
  COUNT_REVIEW,
  TOTAL_DISTANCE
} from '../actions/types';

const INITIAL_STATE = {
  allReviews: [],
  detailReview: [],
  calsumReview: 0,
  countReview: 0,
  total_Distance: 0
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_REVIEWS:
      return { ...state, allReviews: action.payload };

    case SELECT_DETAIL_REVIEW:
      return { ...state, detailReview: action.payload };

    case CALSUM_REVIEW:
        return { ...state, calsumReview: action.payload };

    case COUNT_REVIEW:
        return { ...state, countReview: action.payload };
    
    case TOTAL_DISTANCE:
      return { ...state, total_Distance: action.payload };
      
    default:
      return state;
  }
};
