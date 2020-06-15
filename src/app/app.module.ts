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
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {PreviewComponent} from './components/preview/preview.component';
import { RenderComponent } from './components/render/render.component';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    PreviewComponent,
    RenderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CodemirrorModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
    StoreModule.forRoot({app: reducer}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
