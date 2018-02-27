import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PullRequestService } from './services/pull-request/pull-request.service';
import { RepositoriesService } from './services/repositories/repositories.service';

import { ButtonModule } from 'primeng/button';

import { AppComponent } from './app.component';
import { LoginControlComponent } from './login-controls/login-control/login-control.component';

import { SafeHTML } from './pipes/safe-html-pipe'
import { DiffViewerComponent } from './diff-viewer/diff-viewer.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginControlComponent,
    SafeHTML,
    DiffViewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    HttpClientModule
  ],
  providers: [
    PullRequestService,
    RepositoriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
