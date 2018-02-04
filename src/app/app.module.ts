import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProjectService } from './projects.service';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProjectTableComponent } from './portfolio/project-table/project-table.component';
import { FiltersComponent } from './portfolio/filters/filters.component';
import { FilterService } from './portfolio/filters/filter.service';
import { TagPipe } from './portfolio/filters/tag.pipe';
import { ProjectCardComponent } from './portfolio/project-table/project-card/project-card.component';
import { FooterComponent } from './footer/footer.component';
import { MaxCharPipe } from './portfolio/project-table/project-card/max-char.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    ProjectTableComponent,
    FiltersComponent,
    TagPipe,
    ProjectCardComponent,
    FooterComponent,
    MaxCharPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ProjectService,
    FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
