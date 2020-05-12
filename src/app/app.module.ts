import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {EditComponent} from './components/edit/edit.component';
import {CodemirrorModule} from "@ctrl/ngx-codemirror";
import {FormsModule} from "@angular/forms";
import {StoreModule} from '@ngrx/store';
import {reducer} from "./store/reducer";

@NgModule({
  declarations: [
    AppComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CodemirrorModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
    StoreModule.forRoot({reducer}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
