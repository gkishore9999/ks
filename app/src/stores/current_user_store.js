import AppDispatcher from '../dispatcher/dispatcher.js';
import CurrentUserConstants from "../constants/current_user_constants.js";
import EventEmitter from 'eventemitter3';

const CHANGE_EVENT = "change";

class CurrentUserStore extends EventEmitter {
  constructor () {
    super();
    this.currentUser = {};
  }

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  get () {
    return Object.assign({}, this.currentUser);
  }

  isLoggedIn () {
    const result = Object.keys(this.currentUser).length > 0 ? true : false;
    return result;
  }

  set (user) {
    this.currentUser = user;

    currentUserStore.emit(CHANGE_EVENT);
  }
}

const currentUserStore = new CurrentUserStore();

AppDispatcher.register(function (payload) {
  switch (payload.actionType) {
    case CurrentUserConstants.RECEIVE_CURRENT_USER:
      currentUserStore.set(payload.currentUser);
      break;
  }
});

export default currentUserStore;
