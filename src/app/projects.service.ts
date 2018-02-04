import { Injectable } from '@angular/core';

export enum Tag {
  Code = 'code',
  Article = 'article',
  Other = 'other',
  OpenSource = 'open source'
}

export interface Project {
  title: string;
  tags: Tag[];
  date: Date;
  description?: string;
  tech?: string[];
  code?: string;
  site?: string;
  npm?: string;
}

@Injectable()
export class ProjectService {
  projects: Project[] = [
    {
      title: 'Angular Meetup Frontend Workflow Talk',
      description: `
      I gave a talk at the Angular meetup in Mountain View about frontend workflow
      and Angular Playground.
      Video coming soon.
      `,
      tags: [Tag.Other],
      date: new Date('1/24/18'),
      code: 'https://github.com/mgmarlow/playground-talk-2018'
    },
    {
      title: 'Be a Happier Programmer with Sed',
      site: 'https://hackernoon.com/be-a-happier-programmer-with-sed-cc540e0b58d3',
      tags: [Tag.Article],
      date: new Date('1/23/18'),
      description: `
      Okay, I will admit that is a bit of a contentious title. However, after this classic 
      command line utility saved me hours of repetitive work I felt it needed to be said.
      In the earlier days of TypeScript, string enums did not exist. There were, however,
      several different workarounds that accomplished a similar goal. The variant that
      my company used internally involved creating a class with a number of static getters
      that returned string values.`
    },
    {
      title: 'Front End Workflow: Re-envisioned',
      site: 'https://hackernoon.com/front-end-workflow-re-envisioned-43f800bb01bd',
      tags: [Tag.Article],
      date: new Date('11/11/17'),
      description: `
      As front end development embraces component-centered design, so should the
      approach towards constructing user interfaces. Two years ago Thinking in React
      changed the way I design user interfaces. To put it lamely, it made designing
      UI more programmer-friendly: divide a chunk of UI into pieces, approach each
      piece individually as stateless markup, and add logic only after the whole structure is finished.
      `
    },
    {
      title: 'Creating Interfaces for Angular Services',
      site: 'https://hackernoon.com/creating-interfaces-for-angular-services-1bb41fbbe47c',
      tags: [Tag.Article],
      date: new Date('10/1/17'),
      description: `
      When dealing with a class that needs access to different data sources depending on its
      context, it is often useful to model those data sources with a common interface.
      Likewise in Angular, we may run across situations where an injected service needs to
      have different implementations depending on its context, a perfect candidate for an
      interface. However, since interfaces are not compiled into the JavaScript output of
      TypeScript, achieving this with an Angular service is rather unintuitive.
      `
    },
    {
      title: 'Creating Adaptable Data Stores in Angular',
      site: 'https://hackernoon.com/creating-adaptable-data-stores-in-angular-38df2d22b5c',
      tags: [Tag.Article],
      date: new Date('9/2/17'),
      description: `
      One of the most interesting issues addressed during application development is managing
      state. New paradigms have changed the way web applications deal with and manipulate their
      state, deviating from the two-way data binding mechanisms of AngularJS to a more functional
      uni-directional flow with React and Redux. Now that Angular has been out for a while and
      is approaching “stability”, the same questions arise on how to best manage application state.
      Sending and manipulating data through @Input bindings and @Output events can works great for
      small applications but quickly becomes unwieldy as an application grows.
      `
    },
    {
      title: 'Angular Playground',
      description: `
      An open source tool for building Angular components quickly and efficiently.
      `,
      tech: ['Angular'],
      code: 'https://github.com/socreate/angular-playground',
      npm: 'npm install angular-playground',
      site: 'http://www.angularplayground.it/',
      tags: [Tag.Code, Tag.OpenSource],
      date: new Date('6/1/17')
    },
    {
      title: 'Stationery',
      description: `
      A tool for composing letters in the command line.
      Write letters quickly with a simple interface with support for custom templates.
      `,
      tech: ['node', 'javascript'],
      code: 'https://github.com/mgmarlow/dss',
      npm: 'npm install stationery',
      tags: [Tag.Code, Tag.OpenSource],
      date: new Date('12/24/17')
    },
    {
      title: 'IQMS EnterpriseIQ',
      description: `
      ERP software for medium-sized manufacturers.
      `,
      tech: ['Angular', 'C#, .NET Core', `Oracle`],
      site: 'https://www.iqms.com',
      tags: [Tag.Code],
      date: new Date('6/1/16')
    },
    {
      title: 'EnergyDashboard',
      description: `
      Visualize data gathered from agricultural refrigeration systems in an
      intuitive web interface.
      `,
      tech: ['React', 'HighCharts', 'C# MVC', 'SQL Server'],
      site: 'https://energydashboard.com/',
      tags: [Tag.Code],
      date: new Date('6/1/15')
    },
    {
      title: 'Goo Fighters',
      description: `
      Destroy evil slime monsters with a variety of weapons in this twin-stick shooter.
      Inspiried by the Ludum Dare 33 jam, "you are the monster".
      Collaboration with Nick Preheim.
      `,
      code: 'https://github.com/impixelgames/GooFighters',
      tech: ['Gamemaker'],
      site: 'https://impixelgames.itch.io/goo-fighters',
      tags: [Tag.Code, Tag.OpenSource],
      date: new Date('10/3/16')
    },
    {
      title: 'Vehicle Saftey Analysis',
      description: `
      Classification methods determined which car factors contribute most towards
      risk rating. Data provided by UC Irvine Machine Learning Repository.
      `,
      tech: ['R', 'Classification', 'Data mining'],
      code: 'https://github.com/mgmarlow/Safety-Rating-Analysis',
      tags: [Tag.Code, Tag.OpenSource],
      date: new Date('5/17/15')
    }
  ];
}
