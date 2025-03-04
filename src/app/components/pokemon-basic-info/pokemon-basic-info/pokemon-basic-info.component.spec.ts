import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBasicInfoComponent } from './pokemon-basic-info.component';
import { spy, verify } from 'ts-mockito';

describe('PokemonBasicInfoComponent', () => {
  let component: PokemonBasicInfoComponent;
  let fixture: ComponentFixture<PokemonBasicInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonBasicInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonBasicInfoComponent);
    component = fixture.componentInstance;

    Object.defineProperty(component, 'pokemonData', {
      value: () => ({ weight: 51, height: 101 }),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call trasnformWeightAndHeight', () => {
    component.ngOnInit();
    expect(component.pokemonData().weight).toBe(51);
    expect(component.pokemonData().height).toBe(101);
  });

  it('should call showPokemonCard', () => {
    const spyEmit = spy(component.showCard);
    component.showPokemonCard();
    verify(spyEmit.emit(true)).once();
  });
});
