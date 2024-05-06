import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  imports: [FormsModule, NgOptimizedImage],
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Input() searchInput!: string;
  @Output() onSearchItems = new EventEmitter<string>();

  handleSearchItem(search: string) {
    this.onSearchItems.emit(search);
  }
}
