// use redux to manage login state
import { createStore } from 'redux'
import { combineReducers } from 'redux';

// use redux-persist to save session data locally
import { persistStore, persistReducer } from 'redux-persist';
import { REHYDRATE } from 'redux-persist';

import {AsyncStorage} from 'react-native'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// This file defines all data model using in the app
export interface IAuthState{
  fbToken: string;
  userName: string;
  loggedin: boolean;
}

// define app state
export interface IState
{
  authState: IAuthState;
}

export interface IAuthAction
{
  type: string;
  auth: IAuthState;
}

// define initial state of app
const INITIAL_STATE: IState = {
  authState : {
    fbToken: '',
    userName: 'x',
    loggedin: false,
  },
};

// define data persistence config
const PERSIST_CONFIG = {
 key: 'powerless',
 storage: storage,
 whitelist: ['auth'], // refer rootReducer's list
 // stateReconciler: autoMergeLevel1 // see "Merge Process" section for details.
};

export class PowerlessData {
  // singleton object
  private static data: PowerlessData;

  private constructor() {
    // create a root reducer to include all rules to transform
    // actions to state changes
    let rootReducer = combineReducers({
      // this reduce key will be a node in the state tree
      auth: this.authReducer
    });

    // create a persist reducer wrapper so that it will persist data
    // before it calls our wrapped reducers
    const pReducer = persistReducer(PERSIST_CONFIG, rootReducer);

    // create a store with updateState as state transformer
    this.store = createStore(pReducer);
    this.persistor = persistStore(this.store, {log: true});
  }

  public static getData() {
    if(!PowerlessData.data) {
      PowerlessData.data = new PowerlessData();
    }

    return PowerlessData.data;
  }

  // define state transformer based on action
  private authReducer(state :IState = INITIAL_STATE, action :IAuthAction) {
    console.log('before auto reducer, state=' + JSON.stringify(state));
    switch(action.type){
      case 'success':
        state.authState = action.auth;
        break;
      case 'fail':
        state.authState = {auth: { loggedin:'false' } };
        break;
    }

    console.log('after auto reducer @ ' + action.type
    + ', state=' + JSON.stringify(state));
    return state;
  }

  public getStore() {
    return this.store;
  }

  public getPersistor() {
    return this.persistor;
  }
}
