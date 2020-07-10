import {
  FIREBASE_ITEMS_DELETE,
  FIREBASE_ITEMS_ERROR,
  FIREBASE_ITEMS_GET,
  FIREBASE_ITEMS_START,
} from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case FIREBASE_ITEMS_GET:
      return {
        ...state,
        loading: false,
        items: action.items,
      };
    case FIREBASE_ITEMS_START:
      return {
        ...state,
        loading: true,
      };
    case FIREBASE_ITEMS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FIREBASE_ITEMS_DELETE:
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };
    default:
      return state;
  }
}
