import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "@spartacus/storefront";
import { DynamicModule } from 'ng-dynamic-component';
import { AppComponent } from './app.component';
import { FeatureComponent } from './feature/feature.component';
import { GridComponent } from './grid/grid.component';
import { PageComponent } from './page/page.component';
import { SpartacusModule } from './spartacus/spartacus.module';
import { StoryblokDirective } from './storyblok.directive';
import { StoryblokService } from './storyblok.service';
import { TeaserComponent } from './teaser/teaser.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    StoryblokDirective,
    TeaserComponent,
    GridComponent,
    FeatureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DynamicModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule
  ],
  providers: [
    StoryblokService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
