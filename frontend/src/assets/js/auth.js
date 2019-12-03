import firebase from 'firebase/app';

import { firebaseConnect } from './firebase.connect';
import { navigateTo } from './navigation';

class AuthFirebase {
  constructor() {
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.clearSession();
  }

  async loginWithGoogle() {
    try {
      this.userCredential = await firebaseConnect.fireAuth.signInWithPopup(this.googleProvider);

      await this.startSession(this.userCredential.user);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async startSession(user) {
    this.userLogged = user;
    await this.getToken();
    this.interval = setInterval(() => {
      this.getToken(true);
    }, 1000 * 60 * 58);
  }

  async getToken(refreshToken = false) {
    this.token = await this.userLogged.getIdToken(refreshToken);
  }

  isLogged() {
    return this.token && this.userLogged;
  }

  isNewUser() {
    return this.userCredential && this.userCredential.additionalUserInfo.isNewUser;
  }

  async logout() {
    try {
      await firebaseConnect.fireAuth.signOut();
      this.clearSession();
      return true;
    } catch (error) {
      return false;
    }
  }

  clearSession() {
    this.userCredential = null;
    this.userLogged = null;
    this.token = '';
    window.authInstance = null;
    clearInterval(this.interval);
  }

  listenerState() {
    firebaseConnect.fireAuth.onAuthStateChanged(async user => {
      console.log('onAuthStateChanged : ', user);
      if (user) {
        await this.startSession(user);
        navigateTo('/home');
      } else {
        navigateTo('/login');
      }
    });
  }
}

function createInstance() {
  if (!window.authInstance) {
    window.authInstance = new AuthFirebase();
  }
  return window.authInstance;
}

export let authFirebase = createInstance();
