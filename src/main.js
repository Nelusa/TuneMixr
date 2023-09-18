import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { projectAuth } from "./firebase/config";

let app;
//while refreshing the page, the user is null, so we need to check if the user is null or not --> const user = authService.currentUser is a asynchronous operation and initially user is set to null before request is completed
// we want to wait for firebase to initialize before we create the app
// onAuthStateChanged is a firebase method that takes a callback function as an argument and this callback function will fire every time the authentication state changes
projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.mount("#app");
  }
});
