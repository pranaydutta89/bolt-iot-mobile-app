import { Component } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouteConfigLoadEnd
} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export default class HomePage {
  public homeId = this.route.snapshot.paramMap.get('homeId');

  constructor(private route: ActivatedRoute) {}
}
