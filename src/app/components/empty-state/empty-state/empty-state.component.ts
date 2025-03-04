import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
  public isLoading: InputSignal<boolean> = input(false);
  public isError: InputSignal<boolean> = input(false);

  constructor() {}

  reload() {
    window.location.reload();
  }
}
