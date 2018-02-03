import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Tag } from '../../projects.service';

@Injectable()
export class FilterService {
  private _activeTags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>(
    Object.keys(Tag).map(key => Tag[key])
  );
  activeTags = this._activeTags.asObservable();
}
