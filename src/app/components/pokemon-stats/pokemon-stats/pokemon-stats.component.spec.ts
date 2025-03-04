import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonStatsComponent } from './pokemon-stats.component';

describe('PokemonStatsComponent', () => {
  let component: PokemonStatsComponent;
  let fixture: ComponentFixture<PokemonStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonStatsComponent],
    });

    fixture = TestBed.createComponent(PokemonStatsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total stats correctly', () => {
    Object.defineProperty(component, 'stats', {
      value: () => [{ base_stat: 50 }, { base_stat: 70 }, { base_stat: 30 }],
    });

    component.ngOnInit();

    expect(component.totalStats()).toBe(150);
  });

  it('should handle empty stats array', () => {
    Object.defineProperty(component, 'stats', {
      value: () => [],
    });

    component.ngOnInit();

    expect(component.totalStats()).toBe(0);
  });
});
