import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonHeaderComponent } from '../../components/pokemon-header/pokemon-header/pokemon-header.component';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card/pokemon-card.component';
import { Pokemon, PokemonList } from '../../model/pokemon.model';
import { PokemonServiceService } from '../../services/pokemon-service.service';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonHeaderComponent, PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  public pokemonList = signal<PokemonList>({} as PokemonList);
  public displayedPokemons = signal<Pokemon[]>([]);
  public searchTerm = signal('');
  public loading = signal(false);
  public error = signal(false);
  private pageSize = 100;
  private pokemonService: PokemonServiceService = inject(PokemonServiceService);
  private observer!: IntersectionObserver;

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
        finalize(() => this.loading.set(false))
      )
      .subscribe((response) => {
        this.pokemonList.set(response);
      });
  }

  setupInfiniteScroll(): void {
    this.observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !this.loading()) {
        this.loadMorePokemons();
      }
    });

    const sentinel = document.getElementById('sentinel');
    if (sentinel) {
      this.observer.observe(sentinel);
    }
  }

  loadMorePokemons(): void {
    const currentPokemons = this.displayedPokemons();
    const allPokemons = this.pokemonList()?.results ?? [];

    if (currentPokemons.length >= allPokemons.length) return;

    const newPokemons = allPokemons.slice(
      currentPokemons.length,
      currentPokemons.length + this.pageSize
    );

    this.displayedPokemons.set([...currentPokemons, ...newPokemons]);
    this.getAllPokemons(this.pokemonList()?.next);
  }
}
