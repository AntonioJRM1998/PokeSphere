import { Component, input, InputSignal, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-pokemon-stats',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-stats.component.html',
  styleUrl: './pokemon-stats.component.scss',
})
export class PokemonStatsComponent implements OnInit {
  public stats: InputSignal<any> = input();
  public totalStats = signal<number>(0);
  constructor() {}
  ngOnInit(): void {
    this.setTotalStats();
  }

  public setTotalStats() {
    let totalStats = 0;
    this.stats().forEach((stat: any) => {
      totalStats = totalStats + stat.base_stat;
    });
    this.totalStats.set(totalStats);
  }
}
