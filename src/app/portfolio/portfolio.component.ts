import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ProjectService, Project } from '../projects.service';
import { FilterService } from './filters/filter.service';

@Component({
  selector: 'app-portfolio',
  template: `
    <app-filters></app-filters>
    <app-project-table></app-project-table>
  `,
  styles: []
})
export class PortfolioComponent implements OnInit {
  filteredProjects: Project[];

  private onDestroy = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.filterService.activeTags
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(activeTags => {
        this.filteredProjects = this.projectService.projects
          .filter(projects => projects.tags
            .find(tag => activeTags.includes(tag)) !== undefined);
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
