import { Component } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  teams: any[] = [];

  constructor(private apiService: ApiService) { }

  public searchLeague = (leagueName) => {
    this.apiService.listTeams(encodeURI(leagueName)).subscribe((teams: any[]) => {console.log(teams); this.teams = teams});
  };

  leagueName: string;
}
