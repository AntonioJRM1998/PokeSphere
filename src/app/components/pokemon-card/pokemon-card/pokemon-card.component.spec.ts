import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { mock, instance, verify, spy, when } from 'ts-mockito';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let mockRouter: Router;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(() => {
    mockRouter = mock(Router);
    mockActivatedRoute = mock(ActivatedRoute);

    TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [
        { provide: Router, useValue: instance(mockRouter) },
        { provide: ActivatedRoute, useValue: instance(mockActivatedRoute) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;

    Object.defineProperty(component, 'pokemon', {
      value: () => ({ name: 'Pikachu' }),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to pokemon details on goToPokemonDetails', () => {
    when(
      mockRouter.navigate(['/pokemon', 'Pikachu'], {
        relativeTo: instance(mockActivatedRoute),
      })
    ).thenReturn();
    component.goToPokemonDetails();
  });
});
