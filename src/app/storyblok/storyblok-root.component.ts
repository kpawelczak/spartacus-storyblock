import { Component, OnInit } from '@angular/core';
import { Components } from './components';
import { StoryblokService } from './storyblok.service';

@Component({
  selector: 'storyblok-root',
  template: `
    <div class="root">

      <div *ngIf="story.content">
        <ndc-dynamic [ndcDynamicComponent]="components['product']" [ndcDynamicInputs]="story.content">
        </ndc-dynamic>
      </div>

    </div>
  `
})
export class StoryblokRootComponent implements OnInit {

  story = { content: null, name: '' };

  components = Components;

  constructor(private storyblokService: StoryblokService) {
    window.storyblok.init();
    window.storyblok.on(['change', 'published'], function() {
      location.reload(true);
      console.log('x')
    });
  }

  ngOnInit() {
    this.storyblokService.getStory('product', { version: 'draft' })
      .then(data => {
        this.story = data.story;
      });
  }
}
