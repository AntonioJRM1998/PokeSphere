import { of, throwError } from 'rxjs';
import { mock, instance, when, anything, verify, spy } from 'ts-mockito';
import { PokemonService } from '@services/pokemon-service.service';
import { PokemonListComponent } from './pokemon-list.component';
import { TestBed } from '@angular/core/testing';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let mockPokemonService: PokemonService;
  let mockObserver: IntersectionObserver;

  beforeEach(() => {
    mockPokemonService = mock(PokemonService);

    TestBed.configureTestingModule({
      providers: [
        PokemonListComponent,
        { provide: PokemonService, useValue: instance(mockPokemonService) },
      ],
    });

    component = TestBed.inject(PokemonListComponent);
    const sentinel = document.createElement('div');
    sentinel.id = 'sentinel';
    document.body.appendChild(sentinel);

    mockObserver = mock<IntersectionObserver>();
    when(mockObserver.observe(anything())).thenCall((element: Element) => {
      expect(element.id).toBe('sentinel');
    });
  });

  beforeAll(() => {
    (globalThis as any).IntersectionObserver = class {
      callback: (entries: IntersectionObserverEntry[]) => void;

      constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
        this.callback = callback;
      }

      observe(element: Element) {
        console.log(`Observando: ${element.id}`);
      }

      unobserve() {}

      disconnect() {}

      trigger(entries: IntersectionObserverEntry[]) {
        this.callback(entries);
      }
    };
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onInit', () => {
    const spyComponent = spy(component);
    when(spyComponent.getAllPokemons()).thenResolve();
    component.ngOnInit();
  });

  it('should fetch the Pokémon list on initialization', () => {
    const mockPokemonList: any = {
      results: [{ name: 'pikachu' }, { name: 'bulbasaur' }],
    };
    when(mockPokemonService.getPokemonList(undefined)).thenReturn(
      of(mockPokemonList)
    );

    when(mockPokemonService.getPokemonByName(anything())).thenReturn(
      of([
        {
          sprites: {
            other: {
              ['official-artwork']: { front_default: 'testUrl' },
            },
          },
        },
      ])
    );

    component.getAllPokemons();

    expect(component.pokemonList()).toEqual(mockPokemonList);
  });

  it('should handle errors when fetching Pokémon fails', () => {
    when(mockPokemonService.getPokemonList(undefined)).thenReturn(
      throwError(() => new Error('Error fetching data'))
    );

    component.getAllPokemons();

    expect(component.error()).toBeTruthy();
  });

  it('should filter Pokémon correctly in search', () => {
    const mockPokemons = [
      { name: 'pikachu' } as any,
      { name: 'bulbasaur' } as any,
      { name: 'charizard' } as any,
    ];
    component['loadMorePokemons'] = () => {};

    component['allPokemonsLoad'] = mockPokemons;

    component.onSearch('char');

    expect(component.displayedPokemons()).toEqual([
      { name: 'charizard' } as any,
    ]);
  });

  it('should restore the full list when the search is empty', () => {
    const mockPokemons = [
      { name: 'pikachu' } as any,
      { name: 'bulbasaur' } as any,
    ];

    component['allPokemonsLoad'] = mockPokemons;
    component.onSearch('');

    expect(component.displayedPokemons()).toEqual(mockPokemons);
  });

  it('should load more Pokémon when scrolling reaches the bottom', () => {
    const mockNextUrl = 'https://pokeapi.co/next';
    const mockPokemonList: any = {
      results: [{ name: 'squirtle' }],
      next: mockNextUrl,
    };

    component.pokemonList.set(mockPokemonList);

    when(mockPokemonService.getPokemonList(mockNextUrl)).thenReturn(
      of(mockPokemonList)
    );

    component.setupInfiniteScroll();

    const sentinel = document.getElementById('sentinel') as Element;

    // Creamos una instancia del mock y disparamos el evento
    const observerInstance = new (globalThis as any).IntersectionObserver(
      (component['observer'] as any).callback
    );

    observerInstance.trigger([
      {
        isIntersecting: true, // Simula que el sentinel está en pantalla
        target: sentinel,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: 1,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        time: 0,
      },
    ]);

    component.getAllPokemons(mockNextUrl);
    expect(component.pokemonList()?.results?.length).toBe(1);
    expect(component.pokemonList()?.results?.[0]?.name).toBe('squirtle');
  });
});
