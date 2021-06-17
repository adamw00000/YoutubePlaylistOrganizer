import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {
  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public user: gapi.auth2.GoogleUser | undefined;
  public authCode: string | undefined;
  public userId: string | undefined;

  private AUTH_CODE_KEY = 'authCode';
  private USER_ID_KEY = 'userId';

  async ngOnInit() {
    if (localStorage.getItem(this.AUTH_CODE_KEY) !== null)
      this.authCode = localStorage.getItem(this.AUTH_CODE_KEY)!;
    if (localStorage.getItem(this.USER_ID_KEY) !== null)
      this.userId = localStorage.getItem(this.USER_ID_KEY)!;
    
    if (await this.checkIfUserAuthenticated()) {
      this.user = this.authInstance!.currentUser.get();
    }
  }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve function is the callback
    // passed to gapi.load
    const loadPromise = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi loaded
    // and that we can call gapi.init
    return loadPromise.then(async () => {
      await gapi.auth2
        .init({
          client_id: '388838755801-9nb28jc48rt2iupe4q38lhl8qvnpq27t.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/youtube'
        })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance!.signIn().then(
        (user: gapi.auth2.GoogleUser) => this.user = user,
        (error: string) => this.error = error
      );
    });
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance!.isSignedIn.get();
  }

  async getAuthCode(): Promise<string> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance!.grantOfflineAccess().then(
        (result: {code: string}) => {
          this.authCode = result.code;
          localStorage.setItem(this.AUTH_CODE_KEY, this.authCode);
          this.userId = this.authInstance.currentUser.get().getId();
          localStorage.setItem(this.USER_ID_KEY, this.userId);
        },
        (error: string) => this.error = error
      );
    });
  }

  async revokeAccess(): Promise<void> {
    if (!this.gapiSetup) {
      return;
    }

    this.authInstance!.disconnect();

    this.user = undefined;
    this.userId = undefined;
    localStorage.removeItem(this.USER_ID_KEY);
    this.authCode = undefined;
    localStorage.removeItem(this.AUTH_CODE_KEY);
  }


  async signOut(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance!.signOut().then(
        () => {
          this.user = undefined;
        },
        (error: string) => this.error = error
      );
    });
  }
}
