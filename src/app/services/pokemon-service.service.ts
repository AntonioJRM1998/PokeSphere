import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonList } from '../model/pokemon.model';
import { isNil } from 'lodash';
import { AppConfig } from '../config';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseApiUrl = AppConfig.apiBaseUrl;
  constructor(private readonly httpClient: HttpClient) {}

  public getPokemonList(url?: string): Observable<PokemonList> {
    url = isNil(url) ? `${this.baseApiUrl}/pokemon` : url;
    return this.httpClient.get<PokemonList>(url);
  }

  public getPokemonByName(name: string): Observable<any> {
    return this.httpClient.get(`${this.baseApiUrl}/pokemon/${name}`);
  }

  public getPokemonById(url: string, id?: number): Observable<any> {
    const setUrl = isNil(id) ? `${this.baseApiUrl}/pokemon/${id}` : url;
    return this.httpClient.get(setUrl);
  }

  public getPokemonByUrl(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  public getPokemonCharacteristics(name: string) {
    return this.httpClient.get(`${this.baseApiUrl}/characteristic/${name}`);
  }
}
