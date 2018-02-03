interface Project {
  title: string;
  description: string;
  tech: string[];
  codeLink?: string;
  websiteLink?: string;
  npm?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Stationery',
    description: `
    A tool for composing letters in the command line.
    Write letters quickly with a simple interface with support for custom templates.
    `,
    tech: ['node', 'javascript'],
    codeLink: 'https://github.com/mgmarlow/dss',
    npm: 'npm install stationery'
  },
  {
    title: 'IQMS EnterpriseIQ',
    description: `
    ERP software for medium-sized manufacturers.
    `,
    tech: ['Angular', 'C#, .NET Core', `Oracle`],
    websiteLink: 'https://www.iqms.com'
  },
  {
    title: 'EnergyDashboard',
    description: `
    Visualize data gathered from agricultural refrigeration systems in an
    intuitive web interface.
    `,
    tech: ['React', 'HighCharts', 'C# MVC', 'SQL Server'],
    websiteLink: 'https://energydashboard.com/'
  },
  {
    title: 'Goo Fighters',
    description: `
    Destroy evil slime monsters with a variety of weapons in this twin-stick shooter.
    Inspiried by the Ludum Dare 33 jam, "you are the monster".
    Collaboration with Nick Preheim.
    `,
    codeLink: 'https://github.com/impixelgames/GooFighters',
    tech: ['Gamemaker']
  }
];
