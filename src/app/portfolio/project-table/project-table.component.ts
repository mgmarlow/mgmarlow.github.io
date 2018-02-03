import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../projects.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styles: []
})
export class ProjectTableComponent {
  @Input() projects: Project[];
}
