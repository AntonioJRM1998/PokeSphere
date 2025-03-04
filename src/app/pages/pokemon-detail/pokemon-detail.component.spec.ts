import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { mock, instance, when, verify, anything, spy } from 'ts-mockito';

import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonService } from '@services/pokemon-service.service';
import { PokemonCardService } from '@services/pokemon-card-service.service';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let mockPokemonService: PokemonService;
  let mockPokemonCardService: PokemonCardService;
  let mockActivatedRoute: ActivatedRoute;
  let mockRouter: Router;

  beforeEach(async () => {
    mockPokemonService = mock(PokemonService);
    mockPokemonCardService = mock(PokemonCardService);
    mockActivatedRoute = mock(ActivatedRoute);
    mockRouter = mock(Router);

    when(mockActivatedRoute.snapshot).thenReturn({
      params: { name: 'pikachu' },
    } as any);

    await TestBed.configureTestingModule({
      providers: [
        PokemonDetailComponent,
        { provide: PokemonService, useValue: instance(mockPokemonService) },
        {
          provide: PokemonCardService,
          useValue: instance(mockPokemonCardService),
        },
        { provide: ActivatedRoute, useValue: instance(mockActivatedRoute) },
        { provide: Router, useValue: instance(mockRouter) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch Pokemon details successfully', () => {
    const mockPokemonDetails = {
      name: 'pikachu',
      sprites: {
        other: { 'official-artwork': { front_default: 'image-url' } },
      },
    };
    const mockPokemonCards = {
      data: [{ images: { large: 'card-image-url' } }],
    };

    when(mockPokemonService.getPokemonByName('pikachu')).thenReturn(
      of(mockPokemonDetails)
    );
    when(mockPokemonCardService.getCardsByName('pikachu')).thenReturn(
      of(mockPokemonCards) as any
    );

    component.getPokemonDetails();
    expect(component.cardUrlImage()).toBe('card-image-url');
  });

  it('should handle error when fetching Pokemon details', () => {
    when(mockPokemonService.getPokemonByName('pikachu')).thenReturn(
      throwError(() => new Error('API error'))
    );
    when(mockPokemonCardService.getCardsByName('pikachu')).thenReturn(
      of({ data: [] })
    );

    fixture.detectChanges();

    expect(component.isError()).toBeTruthy();
  });

  it('should enter to catchError in getCardsByName', () => {
    const mockPokemonDetails = {
      name: 'pikachu',
      sprites: {
        other: { 'official-artwork': { front_default: 'image-url' } },
      },
    };
    when(mockPokemonService.getPokemonByName('pikachu')).thenReturn(
      of(mockPokemonDetails)
    );

    when(mockPokemonCardService.getCardsByName(anything())).thenReturn(
      throwError(() => new Error('Card error'))
    );
    component.getPokemonDetails();
    expect(component.isError()).toBeTruthy();
  });

  it('should navigate back when goBack() is called', () => {
    const navigateSpy = jest.spyOn(instance(mockRouter), 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['./']);
  });

  it('should return and put isError on true', () => {
    component.name = '';
    component.getPokemonDetails();
    expect(component.isError()).toBeTruthy();
  });

  it('should show the Pokémon card', () => {
    component.showPokemonCard(true);

    expect(component.showCard()).toBeTruthy();
  });

  it('should show the table card with a given URL', () => {
    const testUrl = 'https://pokemon.com/image.png';

    component.showTableCard(testUrl);

    expect(component.cardUrlImage()).toBe(testUrl);
    expect(component.showCard()).toBeTruthy();
  });

  it('should hide the card when pressing Escape', () => {
    const event = { key: 'Escape' };

    component.hideCardWhenPressEscape(event);

    expect(component.showCard()).toBeFalsy();
  });

  it('should not hide the card if another key is pressed', () => {
    const event = { key: 'Enter' };

    const spyMock = spy(component.showCard);

    component.hideCardWhenPressEscape(event);

    verify(spyMock.set(false)).never();
  });

  it('should hide the card on touch', () => {
    component.onTouch();

    expect(component.showCard()).toBeFalsy();
  });
});
