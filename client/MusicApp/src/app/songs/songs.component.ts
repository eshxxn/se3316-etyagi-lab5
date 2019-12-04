import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
state = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const url = "http://localhost:1234/song/all"
    this.http.get(url).subscribe(data => {
      Object.values(data).forEach(item => {
        state.push({
          title: item.title,
          artist: item.artist,
          album: item.album,
          year: item.year,
          genre: item.genre,
          rating: item.rating
        })
      })
    })
  }

}
