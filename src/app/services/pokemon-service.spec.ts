import { HttpClient } from '@angular/common/http';
import { instance, mock, when, verify } from 'ts-mockito';
import { of } from 'rxjs';
import { PokemonService } from './pokemon-service.service';
import { AppConfig } from '../config';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpClientMock: HttpClient;

  beforeEach(() => {
    httpClientMock = mock(HttpClient);
    service = new PokemonService(instance(httpClientMock));
  });

  it('should fetch pokemon list', (done) => {
    const mockResponse = { results: [{ name: 'pikachu', url: 'some-url' }] };
    when(httpClientMock.get(`${AppConfig.apiBaseUrl}/pokemon`)).thenReturn(
      of(mockResponse)
    );

    service.getPokemonList().subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
      verify(httpClientMock.get(`${AppConfig.apiBaseUrl}/pokemon`)).once();
      done();
    });
  });

  it('should fetch pokemon by name', (done) => {
    const mockResponse = { name: 'pikachu' };
    when(
      httpClientMock.get(`${AppConfig.apiBaseUrl}/pokemon/pikachu`)
    ).thenReturn(of(mockResponse));

    service.getPokemonByName('pikachu').subscribe((response) => {
      expect(response).toEqual(mockResponse);
      verify(
        httpClientMock.get(`${AppConfig.apiBaseUrl}/pokemon/pikachu`)
      ).once();
      done();
    });
  });

  it('should fetch pokemon by id', (done) => {
    const mockResponse = { id: 1, name: 'bulbasaur' };
    when(httpClientMock.get(`${AppConfig.apiBaseUrl}/pokemon/1`)).thenReturn(
      of(mockResponse)
    );

    service
      .getPokemonById(`${AppConfig.apiBaseUrl}/pokemon/1`, 1)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
        verify(httpClientMock.get(`${AppConfig.apiBaseUrl}/pokemon/1`)).once();
        done();
      });
  });

  it('should fetch pokemon by url', (done) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/1';
    const mockResponse = { id: 1, name: 'bulbasaur' };
    when(httpClientMock.get(url)).thenReturn(of(mockResponse));

    service.getPokemonByUrl(url).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      verify(httpClientMock.get(url)).once();
      done();
    });
  });

  it('should fetch pokemon characteristics', (done) => {
    const mockResponse = {
      id: 1,
      descriptions: [{ language: { name: 'en' }, description: 'Overgrow' }],
    };
    when(
      httpClientMock.get(`${AppConfig.apiBaseUrl}/characteristic/pikachu`)
    ).thenReturn(of(mockResponse));

    service.getPokemonCharacteristics('pikachu').subscribe((response) => {
      expect(response).toEqual(mockResponse);
      verify(
        httpClientMock.get(`${AppConfig.apiBaseUrl}/characteristic/pikachu`)
      ).once();
      done();
    });
  });
});
