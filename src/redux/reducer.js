import * as types from './index';
import globalState from './globalState';
// import {loginStatus, userToken} from './action';

/**
 * Reducer
 */

export default function parentFlowReducer(
  state = globalState.localStates,
  action,
) {
  switch (action.type) {
 
    case types.USER_TOKEN:
      return {
        ...state,
        userToken: action.payload.userToken,
      };
    
    default:
      return state;
  }
}

/**
 * Actions
 */

export const actions = {
 
  setUserToken: userToken => {
    return {
      type: types.USER_TOKEN,
      payload: {userToken: userToken},
    };
  },
 
};
