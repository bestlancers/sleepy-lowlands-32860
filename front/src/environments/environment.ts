// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://claudiu.xyz/api/',
  //baseUrl: 'http://localhost:3000/api/',
  firebaseConfig : {
    apiKey: 'AIzaSyBqjg6ZVIhabHbLef2QxZ1ZO0xo2VZUzRs',
    authDomain: 'claudiu-a1eb9.firebaseapp.com',
    databaseURL: 'https://claudiu-a1eb9-default-rtdb.firebaseio.com',
    projectId: 'claudiu-a1eb9',
    storageBucket: 'claudiu-a1eb9.appspot.com',
    messagingSenderId: '428311707065',
    appId: '1:428311707065:web:7a95606ba34070008cca68',
    measurementId: 'G-VQMXT5J0CB'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
