import { db, storage } from "../../firebase";
import {
  FIREBASE_ITEMS_ERROR,
  FIREBASE_ITEMS_GET,
  FIREBASE_ITEMS_START,
} from "./actionTypes";

export function firebaseItems() {
  return async (dispatch) => {
    dispatch(firebaseItemsStart());
    try {
      await db
        .collection(process.env.REACT_APP_DB_COLLECTION)
        .onSnapshot((snap) => {
          const mas = [];
          snap.forEach((doc) => {
            mas.push({ ...doc.data(), id: doc.id });
          });
          dispatch(firebaseItemsSuccessGet(mas));
        });
    } catch (e) {
      dispatch(firebaseItemsError(e));
    }
  };
}

export function firebaseItemDelete(itemId, fileName) {
  return async (dispatch) => {
    try {
      const storageRef = storage.ref();
      await db
        .collection(process.env.REACT_APP_DB_COLLECTION)
        .doc(itemId)
        .delete()
        .then(() => storageRef.child(fileName).delete())
        .catch((e) => dispatch(firebaseItemsError(e)));
    } catch (e) {
      dispatch(firebaseItemsError(e));
    }
  };
}

export function firebaseItemsAdd(items) {
  return {
    type: FIREBASE_ITEMS_GET,
    items,
  };
}

export function firebaseItemsSuccessGet(items) {
  return {
    type: FIREBASE_ITEMS_GET,
    items,
  };
}

export function firebaseItemsStart() {
  return {
    type: FIREBASE_ITEMS_START,
  };
}

export function firebaseItemsError(e) {
  return {
    type: FIREBASE_ITEMS_ERROR,
    error: e,
  };
}
