import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../projects.service';

@Component({
  selector: 'app-project-table',
  template: `
    <app-project-card
      *ngFor="let project of projects"
      [project]="project">
    </app-project-card>
  `,
  styles: []
})
export class ProjectTableComponent {
  @Input() projects: Project[];
}
