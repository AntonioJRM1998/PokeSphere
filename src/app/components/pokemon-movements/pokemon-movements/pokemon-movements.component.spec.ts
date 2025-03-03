import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMovementsComponent } from './pokemon-movements.component';

describe('PokemonMovementsComponent', () => {
  let component: PokemonMovementsComponent;
  let fixture: ComponentFixture<PokemonMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonMovementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
