import { Injectable } from '@angular/core';
import { AppConfig } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonAllCards } from '../model/pokemon-cards.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonCardService {
  public baseApiUrl = AppConfig.apiCardBaseUrl;

  constructor(private readonly _httpClient: HttpClient) {}

  public getCardsByName(name: string): Observable<PokemonAllCards> {
    return this._httpClient.get<PokemonAllCards>(this.baseApiUrl, {
      params: {
        q: `name:${name}`,
      },
    });
  }
}
