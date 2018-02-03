import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tag } from '../../projects.service';
import { FilterService } from './filter.service';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styles: [`
    span {
      margin-right: 5px;
      -moz-user-select: none;
      user-select: none;
    }

    span:hover {
      cursor: pointer;
    }
  `]
})
export class FiltersComponent implements OnInit, OnDestroy {
  tags: string[];
  activeTags: Tag[];

  private onDestroy = new Subject<void>();

  constructor(private filterService: FilterService) {
    this.filterService.activeTags
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(activeTags => this.activeTags = activeTags);
  }

  ngOnInit() {
    this.tags = Object.values(Tag);
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  toggleActive(tag: Tag) {
    this.filterService.toggleActive(tag);
  }
}
