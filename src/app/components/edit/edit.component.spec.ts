import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../store/reducer';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [StoreModule.forRoot({ app: reducer })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should trigger shmexlText observable, on shmexlText change', () => {
    component.onChange('1/4 a4,');

    component.shmexlText$.subscribe((next) => {
      expect(next).toBe('1/4 a4,');
      expect(next).not.toBe('');
    });
  });
});
