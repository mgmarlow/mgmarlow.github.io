import { Pipe, PipeTransform } from '@angular/core';
import { Tag, Project } from '../../projects.service';

@Pipe({
  name: 'tag'
})
export class TagPipe implements PipeTransform {
  transform(projects: Project[], activeTags: Tag[]): any {
    return projects
      .filter(project => project.tags
        .find(tag => activeTags.includes(tag)) !== undefined);
  }
}
