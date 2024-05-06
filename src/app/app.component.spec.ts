import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ItemService } from './core/services/item/item.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Item } from './core/interfaces/item';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let itemService: ItemService;

  const dummyItems = [
    {
      id: 1,
      img: 'sample1.jpg',
      type: '1',
      title: 'Title 1',
      description: 'Description 1',
    },
    {
      id: 2,
      img: 'sample2.jpg',
      type: '2',
      title: 'Title 2',
      description: 'Description 2',
    },
  ] as Item[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [ItemService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have typeMapping', () => {
    const dummyTypeMapping = {
      '1': 'Paisagem',
      '2': 'Flor',
      '3': 'Pizza',
    };

    fixture.detectChanges();
    expect(component.typeMapping).toEqual(dummyTypeMapping);
  });
  it('should have item', () => {
    component.items = dummyItems;

    fixture.detectChanges();
    expect(component.items).toEqual(dummyItems);
  });

  it('#ngOnInit should retrieve items', async () => {
    const getItemsSpy = jest
      .spyOn(itemService, 'getItems')
      .mockResolvedValue(dummyItems);

    await component.ngOnInit();

    expect(getItemsSpy).toHaveBeenCalled();
    expect(component.items).toEqual(dummyItems);
  });

  it('#searchItems should filter items by title', async () => {
    component.items = [...dummyItems];
    await component.searchItems('Title 1');

    expect(component.items).toEqual([dummyItems[0]]);
  });

  it('#deleteItem should remove the correct item from list', () => {
    component.items = [...dummyItems];
    component.deleteItem(dummyItems[0]);

    expect(component.items).toEqual([dummyItems[1]]);
  });
  it('#deleteItem should alert when item is not found', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    component.items = [...dummyItems];

    const nonExistentItem = {
      id: 999,
      img: 'nonexistent.jpg',
      type: '3',
      title: 'Nonexistent title',
      description: 'Nonexistent description',
    };

    component.deleteItem(nonExistentItem);

    expect(window.alert).toHaveBeenCalledWith(
      'Failed to identify item for deletion'
    );
  });
});
