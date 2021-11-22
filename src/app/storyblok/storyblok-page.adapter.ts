import { Injectable } from '@angular/core';
import {
  CmsComponent,
  CmsPageAdapter,
  CmsStructureModel,
  ContentSlotComponentData,
  PageContext,
} from '@spartacus/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Client, { Story, StoryblokComponent, StoryData } from 'storyblok-js-client';

@Injectable({
  providedIn: 'root',
})
export class StoryblokPageAdapter implements CmsPageAdapter {
  private sbClient = new Client({
    accessToken: 'VdziNCfLKEb9bN9QT9XSEQtt', // Add your token here
  });

  constructor() {
  }

  load(pageContext: PageContext): Observable<CmsStructureModel> {
    return from(this.getStory(`pages/${pageContext.id}`)).pipe(
      map((story) => {
        return this.convert(story.data.story);
      })
    );
  }

  private getStory(slug: string, params?: object): Promise<Story> {
    return this.sbClient.getStory(slug, params);
  }

  private convert(source: StoryData): CmsStructureModel {
    const cmsStrucutre: CmsStructureModel = {
      page: {
        type: 'Content',
        title: source.name,
        pageId: source.id.toString(),
        template: 'StoryblokPageTemplate',
        label: source.full_slug,
        slots: {
          StoryblokSlot: {
            components: source.content.body.map((sbComponent: StoryblokComponent<'component'>) =>
              this.toContentSlotComponentData(sbComponent)
            ),
          },
        },
      },
      components: source.content.body.map((sbComponent: StoryblokComponent<'component' | 'call_to_action'>) =>
        this.toCmsComponent(sbComponent)
      ),
    };
    return cmsStrucutre;
  }

  private toContentSlotComponentData(
    source: StoryblokComponent<'component' | 'call_to_action'>
  ): ContentSlotComponentData {
    return {
      uid: source._uid,
      typeCode: source.component,
      flexType: source.component,
    };
  }

  private toCmsComponent(source: StoryblokComponent<'component' | 'call_to_action'>): object | CmsComponent {
    return {
      uid: source._uid,
      typeCode: source.component.toString(),
      ...source,
    };
  }
}
