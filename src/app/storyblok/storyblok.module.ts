import { NgModule } from '@angular/core';
import { DynamicModule } from 'ng-dynamic-component';
import { StoryblokService } from './storyblok.service';
import { StoryblokRootComponent } from './storyblok-root.component';
import { PageComponent } from './page/page.component';
import { StoryblokDirective } from './storyblok.directive';
import { TeaserComponent } from './teaser/teaser.component';
import { GridComponent } from './grid/grid.component';
import { FeatureComponent } from './feature/feature.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    DynamicModule
  ],
  declarations: [
    StoryblokRootComponent,
    PageComponent,
    StoryblokDirective,
    TeaserComponent,
    GridComponent,
    FeatureComponent
  ],
  exports: [
    StoryblokRootComponent
  ],
  providers: [
    StoryblokService
  ]
})
export class StoryblokModule {

}
