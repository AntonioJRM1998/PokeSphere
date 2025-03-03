import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon-service.service';
import { get, isEmpty, isNil } from 'lodash';
import { catchError, EMPTY, of } from 'rxjs';
import { PokemonDetail } from '../../model/pokemon-detail.model';
import { PokemonBasicInfoComponent } from '../../components/pokemon-basic-info/pokemon-basic-info/pokemon-basic-info.component';
import { PokemonCardService } from '../../services/pokemon-card-service.service';
import { PokemonStatsComponent } from '../../components/pokemon-stats/pokemon-stats/pokemon-stats.component';
import { PokemonMovementsComponent } from '../../components/pokemon-movements/pokemon-movements/pokemon-movements.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    PokemonBasicInfoComponent,
    PokemonStatsComponent,
    PokemonMovementsComponent,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent implements OnInit {
  public pokemonDetails = signal<PokemonDetail | null>(null);
  public name = this.activedRoute.snapshot.params['name'];
  public cardUrlImage = signal<string | undefined>(undefined);
  public showCard = signal<boolean>(false);

  private pokemonService: PokemonService = inject(PokemonService);
  private pokemonCardService: PokemonCardService = inject(PokemonCardService);
  constructor(private activedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getPokemonDetails();
    this.getPokemonCard();
  }

  goBack() {
    this.router.navigate(['./']);
  }

  getPokemonDetails(): void {
    const name = this.activedRoute.snapshot.params['name'];
    if (isNil(name) || isEmpty(name)) {
      console.error('Invalid pokemon name');
      return;
    }
    this.pokemonService
      .getPokemonByName(name)
      .pipe(
        catchError((error) => {
          console.error('Error fetching pokemon details', error);
          return of([]);
        })
      )
      .subscribe((response) => {
        const formattedData = {
          ...response,
          image: response.sprites.other['official-artwork'].front_default,
        };
        this.pokemonDetails.set(formattedData);
      });
  }

  public getPokemonCard() {
    this.pokemonCardService
      .getCardsByName(this.name)
      .pipe(
        catchError((error) => {
          console.error(error);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        const url = response.data[0].images.large;
        this.cardUrlImage.set(url);
      });
  }

  public showPokemonCard(event: boolean) {
    this.showCard.set(event);
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
