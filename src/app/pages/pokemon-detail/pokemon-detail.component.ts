import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon-service.service';
import { isEmpty, isNil } from 'lodash';
import { catchError, EMPTY, of } from 'rxjs';
import { PokemonDetail } from '../../model/pokemon-detail.model';
import { PokemonBasicInfoComponent } from '../../components/pokemon-basic-info/pokemon-basic-info/pokemon-basic-info.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [PokemonBasicInfoComponent],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent implements OnInit {
  public pokemonDetails = signal<PokemonDetail | null>(null);
  private pokemonService: PokemonService = inject(PokemonService);

  constructor(private activedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getPokemonDetails();
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
}
