import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (options: BootstrapContext) => bootstrapApplication(App, config, options);

export default bootstrap;
