import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProjectService } from './projects.service';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProjectTableComponent } from './portfolio/project-table/project-table.component';
import { FiltersComponent } from './portfolio/filters/filters.component';
import { FilterService } from './portfolio/filters/filter.service';


@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    ProjectTableComponent,
    FiltersComponent
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
