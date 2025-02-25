import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonList } from '../model/pokemon.model';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class PokemonServiceService {
  url = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private readonly httpClient: HttpClient) {}

  public getPokemonList(url?: string): Observable<PokemonList> {
    url = isNil(url) ? this.url : url;
    return this.httpClient.get<PokemonList>(this.url);
  }

  public getPokemonByName(name: string): Observable<any> {
    return this.httpClient.get(`${this.url}/${name}`);
  }
}
