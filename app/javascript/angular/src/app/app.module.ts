import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { WorkflowsIndexComponent } from './workflows_index.component';


const appRoutes : Routes = [
  { path: 'workflows', component: WorkflowsIndexComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    WorkflowsIndexComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
