import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  pokemon: InputSignal<any> = input();
  constructor() {}
}
