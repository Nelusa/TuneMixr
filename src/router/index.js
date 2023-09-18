import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/auth/LoginPage.vue";
import SignupPage from "../views/auth/SignupPage.vue";
import CreatePlaylistPage from "../views/playlists/CreatePlaylistPage.vue";
import PlaylistDetailsPage from "../views/playlists/PlaylistDetailsPage.vue";
import UserPlaylistsPage from "../views/playlists/UserPlaylistsPage.vue";

//route guard
import { projectAuth } from "../firebase/config";

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (user) {
    next({ name: "Home" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
      beforeEnter: requireAuth,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
      beforeEnter: requireNoAuth,
    },
    {
      path: "/signup",
      name: "Signup",
      component: SignupPage,
      beforeEnter: requireNoAuth,
    },
    {
      path: "/playlists/create",
      name: "CreatePlaylist",
      component: CreatePlaylistPage,
      beforeEnter: requireAuth,
    },
    {
      path: "/playlists/:id",
      name: "PlaylistDetails",
      component: PlaylistDetailsPage,
      props: true,
      beforeEnter: requireAuth,
    },
    {
      path: "/playlists/user",
      name: "UserPlaylists",
      component: UserPlaylistsPage,
      beforeEnter: requireAuth,
    },
  ],
});

export default router;
