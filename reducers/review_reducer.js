import {
  FETCH_ALL_REVIEWS,
  SELECT_DETAIL_REVIEW,
  CALSUM_REVIEW,
  CALSUM_MANEGE
} from '../actions/types';

const INITIAL_STATE = {
  allReviews: [],
  detailReview: [],
  calsumReview: [],
  calsumManege: []
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_REVIEWS:
      return { ...state, allReviews: action.payload };

    case SELECT_DETAIL_REVIEW:
      return { ...state, detailReview: action.payload };

    case CALSUM_REVIEW:
        return { ...state, calsumReview: action.payload };

    case CALSUM_MANEGE:
        return { ...state, calsumManege: action.payload };

    default:
      return state;
  }
};
