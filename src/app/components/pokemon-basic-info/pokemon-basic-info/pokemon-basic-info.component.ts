import {
  Component,
  input,
  InputSignal,
  OnInit,
  output,
  Output,
  signal,
} from '@angular/core';
import { PokemonDetail } from '../../../model/pokemon-detail.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-basic-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-basic-info.component.html',
  styleUrl: './pokemon-basic-info.component.scss',
})
export class PokemonBasicInfoComponent implements OnInit {
  pokemonData: InputSignal<any> = input();
  showCard = output<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.trasnformWeightAndHeight();
  }

  private trasnformWeightAndHeight() {
    const formattedWeight = this.pokemonData().weight / 10;
    const formattedHeight = this.pokemonData().height / 10;
    this.pokemonData().weight = formattedWeight;
    this.pokemonData().height = formattedHeight;
  }

  public showPokemonCard() {
    this.showCard.emit(true);
  }
}
