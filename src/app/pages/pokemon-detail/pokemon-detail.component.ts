import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { get, isEmpty, isNil } from 'lodash';
import { catchError, finalize, forkJoin, of } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { PokemonMovementsComponent } from '@components/pokemon-cards/pokemon-cards/pokemon-cards.component';
import { PokemonBasicInfoComponent } from '@components/pokemon-basic-info/pokemon-basic-info/pokemon-basic-info.component';
import { PokemonStatsComponent } from '@components/pokemon-stats/pokemon-stats/pokemon-stats.component';
import { PokemonCardService } from '@services/pokemon-card-service.service';
import { PokemonService } from '@services/pokemon-service.service';
import { PokemonAllCards } from 'src/app/model/pokemon-cards.model';
import { PokemonDetail } from 'src/app/model/pokemon-detail.model';
import { EmptyStateComponent } from '@components/empty-state/empty-state/empty-state.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    PokemonBasicInfoComponent,
    PokemonStatsComponent,
    PokemonMovementsComponent,
    MatIconModule,
    EmptyStateComponent,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent implements OnInit {
  public pokemonDetails = signal<PokemonDetail | undefined>(undefined);
  public allCardsByName = signal<PokemonAllCards>({} as PokemonAllCards);
  public name = this.activedRoute.snapshot.params['name'];
  public cardUrlImage = signal<string | undefined>(undefined);
  public showCard = signal<boolean>(false);
  public isLoading = signal<boolean>(false);
  public isError = signal<boolean>(false);

  private pokemonService: PokemonService = inject(PokemonService);
  private pokemonCardService: PokemonCardService = inject(PokemonCardService);
  private saveFirstCard: string = '';
  constructor(private activedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getPokemonDetails();
  }

  goBack() {
    this.router.navigate(['./']);
  }

  getPokemonDetails(): void {
    this.isLoading.set(true);

    if (isNil(this.name) || isEmpty(this.name)) {
      this.isError.set(true);
      return;
    }

    const pokemonDetails$ = this.pokemonService
      .getPokemonByName(this.name)
      .pipe(
        catchError((error) => {
          this.isError.set(true);
          return of(null);
        })
      );

    const pokemonCard$ = this.pokemonCardService.getCardsByName(this.name).pipe(
      catchError((error) => {
        this.isError.set(true);
        return of({ data: [] });
      })
    );

    forkJoin([pokemonDetails$, pokemonCard$])
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(([pokemonResponse, cardResponse]) => {
        if (pokemonResponse) {
          const formattedData = {
            ...pokemonResponse,
            image:
              pokemonResponse.sprites.other['official-artwork'].front_default,
          };
          this.pokemonDetails.set(formattedData);
        }

        if (cardResponse.data.length > 0) {
          const url = cardResponse.data[0].images.large;
          this.saveFirstCard = url;
          this.allCardsByName.set(cardResponse);
          this.cardUrlImage.set(url);
        }
      });
  }

  public showPokemonCard(event: boolean) {
    this.cardUrlImage.set(this.saveFirstCard);
    this.showCard.set(event);
  }

  public showTableCard(url: string) {
    this.cardUrlImage.set(url);
    this.showCard.set(true);
  }

  public hideCardWhenPressEscape(event: any) {
    const key = get(event, 'key', null);

    if (!isNil(key) && !isEmpty(key) && key === 'Escape') {
      this.showCard.set(false);
    }
  }

  public onTouch() {
    this.showCard.set(false);
  }
}
