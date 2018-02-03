import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ProjectService, Project, Tag } from '../projects.service';
import { FilterService } from './filters/filter.service';

@Component({
  selector: 'app-portfolio',
  template: `
    <app-filters></app-filters>
    <app-project-table [projects]="projects | tag:activeTags"></app-project-table>
  `,
  styles: []
})
export class PortfolioComponent implements OnInit {
  projects: Project[];
  activeTags: Tag[];

  private onDestroy = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.projects = [ ...this.projectService.projects ];
    this.filterService.activeTags
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(activeTags => this.activeTags = activeTags);
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
