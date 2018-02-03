import { Component, OnInit } from '@angular/core';

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  ngOnInit() {
    particlesJS.load('root', './assets/particles.json');
  }
}
