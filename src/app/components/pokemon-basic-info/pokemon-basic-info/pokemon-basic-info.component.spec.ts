import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBasicInfoComponent } from './pokemon-basic-info.component';

describe('PokemonBasicInfoComponent', () => {
  let component: PokemonBasicInfoComponent;
  let fixture: ComponentFixture<PokemonBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonBasicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
