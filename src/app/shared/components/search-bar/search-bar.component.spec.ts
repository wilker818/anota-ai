import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let inputElement: DebugElement;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;

    component.searchInput = '';

    inputElement = fixture.debugElement.query(By.css('.aai-nav__box-search'));
    buttonElement = fixture.debugElement.query(
      By.css('.aai-nav__box-btn-search')
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set @Input property correctly in searchInput', () => {
    component.searchInput = 'Exist string?';
    fixture.detectChanges();
    expect(component.searchInput).toEqual('Exist string?');
  });

  it('should update searchInput and call handleSearchItem on input field enter key press', () => {
    jest.spyOn(component, 'handleSearchItem');

    inputElement.triggerEventHandler('keydown.enter', null);
    fixture.detectChanges();

    expect(component.searchInput).toBe('');

    expect(component.handleSearchItem).toHaveBeenCalled();
  });
  it('should call handleSearchItem on search button click', () => {
    jest.spyOn(component, 'handleSearchItem');

    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.handleSearchItem).toHaveBeenCalled();
  });
});
