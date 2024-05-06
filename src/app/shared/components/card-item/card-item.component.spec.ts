import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemComponent } from './card-item.component';
import { Item } from '../../../core/interfaces/item';

describe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;

  const dummyItem: Item = {
    id: 1,
    img: 'sample1.jpg',
    type: '1',
    title: 'Title 1',
    description: 'Description 1',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardItemComponent);
    component = fixture.componentInstance;
    component.item = dummyItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set @Input property correctly in item', () => {
    fixture.detectChanges();
    expect(component.item).toEqual(dummyItem);
  });

  it('should display item details correctly', () => {
    const compiled = fixture.nativeElement;

    const img: HTMLImageElement = compiled.querySelector(
      '.aai-home-card__view-image'
    );
    expect(img.src).toContain(component.item.img);

    const typeDiv: HTMLElement = compiled.querySelector(
      '.aai-home-card__view-tag'
    );
    expect(typeDiv.textContent).toContain(component.item.type);

    const title: HTMLElement = compiled.querySelector(
      '.aai-home-card__content-title'
    );
    expect(title.textContent).toContain(component.item.title);

    const description: HTMLElement = compiled.querySelector(
      '.aai-home-card__content-description'
    );
    expect(description.textContent).toContain(component.item.description);
  });

  it('should call handleDeleteItem on delete button click', () => {
    jest.spyOn(component, 'handleDeleteItem');

    const button = fixture.debugElement.nativeElement.querySelector(
      '.aai-home-card__btn-delete'
    );
    button.click();

    expect(component.handleDeleteItem).toHaveBeenCalledWith(component.item);
  });
});
