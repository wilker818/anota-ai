import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';

import { HeaderComponent } from './layout/components/header/header.component';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { CardItemComponent } from './shared/components/card-item/card-item.component';
import { CardItemLoadingComponent } from './shared/components/card-item-loading/card-item-loading.component';
import { Item } from './core/interfaces/item';
import { ItemService } from './core/services/item/item.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    HeaderComponent,
    SearchBarComponent,
    CardItemComponent,
    CardItemLoadingComponent,
    NgIf,
    NgForOf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  typeMapping: Record<string, string> = {
    '1': 'Paisagem',
    '2': 'Flor',
    '3': 'Pizza',
  };
  items!: Item[];
  loading: boolean = false;
  mockArrayLoading = Array.from({ length: 12 }, (_, i) => i + 1);

  constructor(private itemService: ItemService) {}

  async ngOnInit(): Promise<void> {
    await this.getItems();
  }

  async getItems() {
    try {
      this.loading = true;
      const items = await this.itemService.getItems();

      items.forEach((item: Item) => {
        item.type = this.typeMapping[item.type];
      });

      this.items = [...items];
    } catch (error) {
      console.error(error);
      window.alert('Failed to fetch item data');
    } finally {
      this.loading = false;
    }
  }

  async searchItems(searchedtext: string) {
    if (!searchedtext) {
      await this.getItems();
      return;
    }

    searchedtext = searchedtext
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    this.items = this.items.filter((item) =>
      item.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(searchedtext)
    );
  }

  deleteItem(itemActual: Item) {
    const indexItem = this.items.findIndex((item) => item.id === itemActual.id);
    if (indexItem == -1) {
      window.alert('Failed to identify item for deletion');
      return;
    }

    this.items.splice(indexItem, 1);
  }
}
