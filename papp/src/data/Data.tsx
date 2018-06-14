// use redux to manage login state
import { createStore } from 'redux'
import { combineReducers } from 'redux';

// use redux-persist to save session data locally
import { persistStore, persistReducer } from 'redux-persist';
import { REHYDRATE } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


// This file defines all data model using in the app
export interface IAuth{
  fbToken: string;
  userName: string;
}

export interface IState
{
  auth: IAuth;
}

export interface IAction
{
  type: string;
  auth: IAuth;
}

// define initial state of app
const INITIAL_STATE: IState = {
  auth: {fbToken:'', userName: 'x'}
};

// define data persistence config
const PERSIST_CONFIG = {
 key: 'root',
 storage: storage,
 whitelist: ['auth'], // refer rootReducer's list
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

export class PowerlessData {
  // singleton object
  private static data: PowerlessData;

  private constructor() {
    // create a root reducer to include all rules to transform
    // actions to state changes
    let rootReducer = combineReducers({
      auth: this.authReducer
    });

    // create a persist reducer wrapper so that it will persist data
    // before it calls our wrapped reducers
    const pReducer = persistReducer(PERSIST_CONFIG, rootReducer);

    // create a store with updateState as state transformer
    this.store = createStore(pReducer);
    this.persistor = persistStore(this.store);
  }

  public static getData() {
    if(!PowerlessData.data) {
      PowerlessData.data = new PowerlessData();
    }

    return PowerlessData.data;
  }

  // define state transformer based on action
  private authReducer(state :IState = INITIAL_STATE, action:IAction) {
    switch(action.type){
      case REHYDRATE:
       console.log('state loaded from storage: ' + JSON.stringify(state));
       break;
      case 'success':
        state.auth = action.auth;
        break;
      case 'fail':
        break;
      default:
        break;
    }

    return state;
  }

  public getStore() {
    return this.store;
  }

  public getPersistor() {
    return this.persistor;
  }
}
