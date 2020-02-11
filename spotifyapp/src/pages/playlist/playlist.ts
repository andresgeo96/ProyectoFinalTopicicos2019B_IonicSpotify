import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import SpotifyWebApi from 'spotify-web-api-js';
import { Media, MediaObject } from '@ionic-native/media';
 
@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {
  tracks = [];
  playlistInfo = [];
  playing = false;
  spotifyApi: any;
  currentTrack: MediaObject = null;
  loading: Loading;

  
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private media: Media, private loadingCtrl: LoadingController) {
    let playlist = this.navParams.get('playlist');
    this.spotifyApi = new SpotifyWebApi();
    this.loadPlaylistData(playlist);
  }

  
  loadPlaylistData(playlist) {
    this.loading = this.loadingCtrl.create({
      content: "Loading Tracks...",
    });
    this.loading.present();

    this.spotifyApi.getPlaylist(playlist.id).then(data => {
      
      this.playlistInfo = data;
      this.tracks = data.tracks.items;
      console.log("hola");
      if (this.loading) {
        this.loading.dismiss();
      }
    });
 
  }

  play(item) {
    this.playing = true;
 
    this.currentTrack = this.media.create(item);
 
    this.currentTrack.onSuccess.subscribe(() => {
      this.playing = false;
    });
    this.currentTrack.onError.subscribe(error => {
      this.playing = false;
    });
    
    this.currentTrack.play();
  }
 
  playActiveDevice(item) {
    this.spotifyApi.play({ uris: [item.track.uri] });
  }
 
  stop() {
    if (this.currentTrack) {
      this.currentTrack.stop();
      this.playing = false;
    }
  }
 
  open(item) {
    window.open(item.track.external_urls.spotify, '_system', 'location=yes');
  }
 
}