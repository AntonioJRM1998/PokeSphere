import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonHeaderComponent } from './pokemon-header.component';
import { spy, verify } from 'ts-mockito';
import { FormControl, FormGroup } from '@angular/forms';
describe('PokemonHeaderComponent', () => {
  let component: PokemonHeaderComponent;
  let fixture: ComponentFixture<PokemonHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonHeaderComponent],
    });

    fixture = TestBed.createComponent(PokemonHeaderComponent);
    component = fixture.componentInstance;
    component.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit name when input value changes', () => {
    const spyEmit = spy(component.name);
    component.ngOnInit();
    component.searchForm.controls['search'].patchValue('Pikachu');
    verify(spyEmit.emit('Pikachu')).once();
  });

  it('should not emit name if input is empty', () => {
    const spyEmit = spy(component.name);
    component.ngOnInit();
    component.searchForm.controls['search'].patchValue(null);
    verify(spyEmit.emit('Pikachu')).times(0);
  });

  it('should correctly bind isLoading input', () => {
    Object.defineProperty(component, 'isLoading', {
      value: () => false,
    });
    expect(component.isLoading()).toBeFalsy();
  });
});
