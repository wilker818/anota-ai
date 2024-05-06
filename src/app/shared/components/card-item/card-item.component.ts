import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../../core/interfaces/item';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'card-item',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent {
  @Input() item!: Item;

  constructor() {}

  @Output() onDeleteItem = new EventEmitter<Item>();

  handleDeleteItem(item: Item) {
    this.onDeleteItem.emit(item);
  }
}
