import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StoryblokService } from '../storyblok.service';

enum DescriptionContentType {
  PARAGRAPH = 'paragraph'
}

interface DescriptionContent {
  content: any
  type: DescriptionContentType
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnChanges {

  story = { content: null, name: '' };

  @Input()
  name: string = '';

  @Input()
  sku: string = '';

  @Input()
  price: string = '';

  @Input()
  description: any;

  @Input()
  _editable: string = '';

  items: Array<DescriptionContent> = [];

  constructor(private storyblokService: StoryblokService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.description) {
      this.items = this.description.content.map((content: any) => {
        return { type: content.type, content: content.content[0] };
      });
    }
  }

}
