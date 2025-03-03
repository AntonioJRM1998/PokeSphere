import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { PokemonHeaderComponent } from '../../components/pokemon-header/pokemon-header/pokemon-header.component';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card/pokemon-card.component';
import { Pokemon, PokemonList } from '../../model/pokemon.model';
import { PokemonService } from '../../services/pokemon-service.service';
import {
  catchError,
  finalize,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { isEmpty, isNil } from 'lodash';
import { PokemonDetail } from '../../model/pokemon-detail.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonHeaderComponent, PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  public pokemonList = signal<PokemonList>({} as PokemonList);
  public displayedPokemons = signal<PokemonDetail[]>([]);
  public loading = signal(true);
  public error = signal(false);
  private infiniteScrollActive: boolean = true;
  private pokemonService: PokemonService = inject(PokemonService);
  private observer!: IntersectionObserver;
  private allPokemonsLoad: PokemonDetail[] = []

  constructor() {}

  ngOnInit(): void {
    this.getAllPokemons();
    this.setupInfiniteScroll();
  }

  public getAllPokemons(url?: string): void {
    this.loading.set(true);
    this.error.set(false);

    this.pokemonService
      .getPokemonList(url)
      .pipe(
        catchError((error) => {
          console.error('Error fetching pokemon list', error);
          this.error.set(true);
          return of({ results: [] });
        }),
        switchMap((response) => {
          this.pokemonList.set(response);
          const pokemonDetails$: any = response?.results?.map((pokemon) =>
            this.pokemonService.getPokemonByName(pokemon.name).pipe(
              map((details) => this.mapResponseToPokemon(details, response)),
              catchError(() => of(null)) // Si falla, no rompe la carga
            )
          );

          return forkJoin(pokemonDetails$);
        }),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe((detailedPokemons: any) => {
        this.pokemonList().results = detailedPokemons.filter(
          (p: any) => p !== null
        );
        this.loadMorePokemons();
      });
  }

  public setupInfiniteScroll(): void {
    this.observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !this.loading() &&
        this.infiniteScrollActive
      ) {
        this.getAllPokemons(this.pokemonList()?.next);
      }
    });

    const sentinel = document.getElementById('sentinel');
    if (sentinel) {
      this.observer.observe(sentinel);
    }
  }

  public onSearch(event: string): void {
    if (isEmpty(event)) {
      this.infiniteScrollActive = true;
      this.displayedPokemons.set([]);
      this.getAllPokemons();
      return;
    }

    this.infiniteScrollActive = false;
    const filteredPokemons =
      this.allPokemonsLoad.filter((pokemon) =>
        pokemon.name.includes(event)
      ) ?? [];
    this.displayedPokemons.set(filteredPokemons);
  }

  private loadMorePokemons(): void {
    const currentPokemons = this.displayedPokemons();
    const newPokemons = this.pokemonList()?.results ?? [];
    const finalArray = [...currentPokemons, ...newPokemons];
    this.allPokemonsLoad = finalArray
    this.displayedPokemons.set(finalArray);
  }

  private mapResponseToPokemon(pokemon: any, response: PokemonList): Pokemon {
    return {
      ...pokemon,
      image: pokemon.sprites.other['official-artwork'].front_default,
    };
  }
}
