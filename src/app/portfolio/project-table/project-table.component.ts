import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../projects.service';

@Component({
  selector: 'app-project-table',
  template: `
    <div *ngFor="let project of projects">{{ project.title }}</div>
  `,
  styles: []
})
export class ProjectTableComponent implements OnInit {
  @Input() projects: Project[];

  constructor() { }

  ngOnInit() {
  }

}
