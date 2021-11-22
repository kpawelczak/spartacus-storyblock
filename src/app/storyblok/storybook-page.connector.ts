import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CmsPageAdapter,
  CmsStructureConfigService,
  CmsStructureModel,
  PageContext,
  SemanticPathService,
} from '@spartacus/core';
import { combineLatest, iif, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { StoryblokPageAdapter } from './storyblok-page.adapter';

@Injectable()
export class StoryBookPageConnector {
  constructor(
    private cmsPageAdapter: CmsPageAdapter,
    private storyblokPageAdapter: StoryblokPageAdapter,
    private cmsStructureConfigService: CmsStructureConfigService,
    private semanticPathService: SemanticPathService
  ) {}

  get(pageContext: PageContext): Observable<any> {
    return this.cmsStructureConfigService.shouldIgnoreBackend(pageContext.id).pipe(
      switchMap((loadFromConfig) => iif(() => loadFromConfig, of({}), this.loadOccPage(pageContext))),
      switchMap((page) => this.mergeDefaultPageStructure(pageContext, page))
    );
  }

  private loadOccPage(pageContext: PageContext): Observable<CmsStructureModel> {
    return this.cmsPageAdapter.load(pageContext).pipe(
      catchError((error) => {
        if (error?.status === 404) return this.mergeStoryblokPageWithHome(pageContext);
        if (error?.status === 400) return of({});
        return throwError(error);
      })
    );
  }

  private mergeStoryblokPageWithHome(pageContext: PageContext): Observable<CmsStructureModel> {
    const homepageId = this.semanticPathService.get('home');
    const homepage$ = this.cmsPageAdapter.load({ id: homepageId });
    const storyblokPage$ = this.loadStoryblokPage(pageContext);
    return combineLatest([homepage$, storyblokPage$]).pipe(
      map(([homepageStructure, storyblokPageStructure]) => {
        const merged: CmsStructureModel = {
          page: {
            ...storyblokPageStructure.page,
            slots: { ...homepageStructure.page?.slots, ...storyblokPageStructure.page?.slots },
          },
          components: [...(homepageStructure.components ?? []), ...(storyblokPageStructure.components ?? [])],
        };
        return merged;
      })
    );
  }

  private loadStoryblokPage(pageContext: PageContext): Observable<CmsStructureModel> {
    return this.storyblokPageAdapter.load(pageContext).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          return of({});
        } else {
          return throwError(error);
        }
      })
    );
  }

  private mergeDefaultPageStructure(
    pageContext: PageContext,
    pageStructure: CmsStructureModel
  ): Observable<CmsStructureModel> {
    return this.cmsStructureConfigService.mergePageStructure(pageContext.id, pageStructure);
  }
}
