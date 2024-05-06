import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Item } from '../../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private API_URL = environment.API_URL;

  constructor(private readonly http: HttpClient) {}

  /**
   * get items
   * @returns {Promise<Item[]>}
   */
  async getItems(): Promise<Item[]> {
    const uri = `${this.API_URL}/cardlist.json`;
    const result$ = this.http.get(uri).pipe(map((res) => res as Item[]));

    return firstValueFrom(result$);
  }
}
