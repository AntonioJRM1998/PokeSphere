import {
  Component,
  input,
  InputSignal,
  output,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PokemonCard } from 'src/app/model/pokemon-cards.model';

@Component({
  selector: 'app-pokemon-cards',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './pokemon-cards.component.html',
  styleUrl: './pokemon-cards.component.scss',
})
export class PokemonMovementsComponent {
  public allCards: InputSignal<PokemonCard[]> = input([] as PokemonCard[]);
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource = new MatTableDataSource<any>();
  public sendUrlCard = output<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.data = this.allCards();
    this.dataSource.paginator = this.paginator;
  }

  public showCard(url: string) {
    this.sendUrlCard.emit(url);
  }
}
