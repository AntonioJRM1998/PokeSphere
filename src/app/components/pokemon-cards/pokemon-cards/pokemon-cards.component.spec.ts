import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { mock, spy, verify } from 'ts-mockito';
import { PokemonMovementsComponent } from './pokemon-cards.component';

describe('PokemonMovementsComponent', () => {
  let component: PokemonMovementsComponent;
  let fixture: ComponentFixture<PokemonMovementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonMovementsComponent, MatTableModule, MatPaginatorModule],
    });

    fixture = TestBed.createComponent(PokemonMovementsComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'allCards', {
      value: () => [
        { name: 'Pikachu', images: { large: 'url1' } },
        { name: 'Charizard', images: { large: 'url2' } },
      ],
    });

    component.paginator = mock(MatPaginator);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set paginator after view init', () => {
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toBeTruthy();
  });

  it('should emit sendUrlCard on showCard', () => {
    const spyEmit = spy(component.sendUrlCard);
    component.showCard('test-url');
    verify(spyEmit.emit('test-url')).once();
  });
});
