import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  pokemon: InputSignal<any> = input();
  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  goToPokemonDetails() {
    const name = this.pokemon().name;
    this.router.navigate(['/pokemon', name], {
      relativeTo: this.activeRoute,
    });
  }
}
