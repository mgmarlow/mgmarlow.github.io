import { Component, OnInit, Input } from '@angular/core';
import { Project, Tag } from '../../../projects.service';
import { FilterService } from '../../filters/filter.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styles: [`
    .tag:hover {
      cursor: pointer;
    }
  `]
})
export class ProjectCardComponent {
  @Input() project: Project

  constructor(private filterService: FilterService) {}

  setTag(tag: string) {
    this.filterService.setActiveTag(tag as Tag);
  }
}
