import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from "@angular/forms";


import { AppComponent } from './app.component';
import { UserLoginComponent } from './authentication/user_login.component'
import { WorkflowsIndexComponent } from './workflows/workflows_index.component';
import { WorkflowShowComponent } from './workflows/workflow_show.component';
import { UserAuthenticated } from './authentication/user_authenticated';
import { JwtInterceptor } from "./authentication/jwt_interceptor"


const appRoutes : Routes = [
  { path: 'user_login', component: UserLoginComponent },
  { path: 'workflows/:id', component: WorkflowShowComponent, canActivate: [UserAuthenticated] },
  { path: 'workflows', component: WorkflowsIndexComponent, canActivate: [UserAuthenticated] }
];

@NgModule({
  declarations: [
    AppComponent,
    WorkflowShowComponent,
    WorkflowsIndexComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [
    UserAuthenticated,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
