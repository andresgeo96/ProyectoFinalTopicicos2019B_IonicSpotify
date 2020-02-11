import { Component } from '@angular/core';
import { NavController, Platform, LoadingController, Loading } from 'ionic-angular';
import SpotifyWebApi from 'spotify-web-api-js';
import { Storage } from '@ionic/storage';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  result = {};
  spotifyApi = new SpotifyWebApi();
  loading: Loading;
  loggedIn = false;
  playlists = [];

  constructor(public navCtrl: NavController, private storage: Storage, private plt: Platform, private loadingCtrl: LoadingController) {
    this.plt.ready().then(() => {
      this.storage.get('logged_in').then(res => {
        if (res) {
          this.authWithSpotify(true);
        }
      })
    });
  }

  authWithSpotify(showLoading = false) {
    const config = {
      clientId: "3b97caf62cd1429784e248f6c088f650",
      redirectUrl: "devdacticspotify://callback",
      scopes: ["streaming", "playlist-read-private", "user-read-email", "user-read-private"],
      tokenExchangeUrl: "https://spotifyservertoken.herokuapp.com/exchange",
      tokenRefreshUrl: "https://spotifyservertoken.herokuapp.com/refresh",
    };

    if (showLoading) {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }

    cordova.plugins.spotifyAuth.authorize(config)
    .then(({accessToken, encryptedRefreshToken, expiresAt }) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.spotifyApi.setAccessToken(accessToken);
      this.loggedIn = true;
      this.storage.set('logged_in', true);
      this.getUserPlaylists();
    }, err => {
      if (this.loading) {
        this.loading.dismiss();
      }
    });
  }

  getUserPlaylists() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando Playlists...'
    });
    this.loading.present();

    this.spotifyApi.getUserPlaylists()
    .then(data => {
      if (this.loading) {
        this.loading.dismiss();
      }
      this.playlists = data.items;
    }, err => {
      if (this.loading) {
        this.loading.dismiss();
      }
    });
  }

  openPlaylist(item) {
    this.navCtrl.push('PlaylistPage', { playlist: item });
  }

  logout() {
    cordova.plugins.spotifyAuth.forget();

    this.loggedIn = false;
    this.playlists = [];
    this.storage.set('logged_in', false);
  }

}
