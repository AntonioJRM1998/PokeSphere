import { Component, input, InputSignal, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { isNil } from 'lodash';

@Component({
  selector: 'app-pokemon-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pokemon-header.component.html',
  styleUrl: './pokemon-header.component.scss',
})
export class PokemonHeaderComponent implements OnInit {
  public name = output<string>();
  public isLoading: InputSignal<boolean> = input(false);
  searchForm = new FormGroup({
    search: new FormControl(''),
  });
  constructor() {}

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe((value) => {
      if (isNil(value.search)) return;
      this.name.emit(value.search);
    });
  }
}
