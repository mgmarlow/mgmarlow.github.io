import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../projects.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styles: []
})
export class ProjectCardComponent {
  @Input() project: Project
}
