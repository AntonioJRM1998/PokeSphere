import { anything, instance, mock, verify, when } from 'ts-mockito';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AppConfig } from '../config';
import { PokemonAllCards } from '../model/pokemon-cards.model';
import { PokemonCardService } from './pokemon-card-service.service';

describe('PokemonCardService', () => {
  let service: PokemonCardService;
  let httpClientMock: HttpClient;

  beforeEach(() => {
    httpClientMock = mock(HttpClient);
    service = new PokemonCardService(instance(httpClientMock));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cards by name', (done) => {
    const name = 'Pikachu';
    const expectedResponse: PokemonAllCards = { data: [] } as PokemonAllCards;

    when(
      httpClientMock.get<PokemonAllCards>(anything(), anything())
    ).thenReturn(of(expectedResponse) as any);

    service.getCardsByName(name).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      done();
    });
  });
});
