import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoverComponent } from './edit-cover.component';
import { reducer } from '../../store/reducer';
import { StoreModule } from '@ngrx/store';

describe('EditCoverComponent', () => {
  let component: EditCoverComponent;
  let fixture: ComponentFixture<EditCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCoverComponent],
      imports: [StoreModule.forRoot({ app: reducer })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should trigger title observable, on title change', () => {
    component.onTitleChange('changed title');

    component.title$.subscribe((next) => {
      expect(next).toBe('changed title');
      expect(next).not.toBe('test title');
    });
  });

  it('should trigger creator1 observable, on creator1 change', () => {
    component.onCreator1Change('changed creator1');

    component.creator1$.subscribe((next) => {
      expect(next).toBe('changed creator1');
      expect(next).not.toBe('test creator1');
    });
  });

  it('should trigger creator2 observable, on creator2 change', () => {
    component.onCreator2Change('changed creator2');

    component.creator2$.subscribe((next) => {
      expect(next).toBe('changed creator2');
      expect(next).not.toBe('test creator2');
    });
  });
});
