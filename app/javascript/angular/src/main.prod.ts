import './polyfills.ts';
import { enableProdMode } from '@angular/core';
import { platformBrowser} from '@angular/platform-browser';

import { AppModuleNgFactory } from './app/app.module.ngfactory';

enableProdMode();

const bootApplication = () => {
  platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
    .catch(err => console.log(err));
};

if (document.readyState === 'complete') {
  window.onload = () => bootApplication();
  location.reload();
} else{
  document.addEventListener('DOMContentLoaded', bootApplication);
}
