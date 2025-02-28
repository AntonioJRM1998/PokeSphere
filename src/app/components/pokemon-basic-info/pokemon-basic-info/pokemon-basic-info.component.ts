import { Component, input, InputSignal, OnInit, signal } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {
    console.log(this.pokemonData());
  }
}
