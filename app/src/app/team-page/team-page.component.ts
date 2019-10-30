import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {switchMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

  @Input()
  teamName: string = '';
  players : any[] = [];

  constructor(private apiService: ApiService,
              private route: ActivatedRoute) { }

  ngOnInit() {
     this.route.paramMap.pipe(
      switchMap(params => {
        this.teamName = params.get('teamName');
        return this.apiService.listPlayers(this.teamName);
      })
     ).subscribe((players: any[]) => this.players = players);
  }

}
