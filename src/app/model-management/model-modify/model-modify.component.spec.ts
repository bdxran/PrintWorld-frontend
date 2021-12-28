import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelModifyComponent } from './model-modify.component';

describe('ModelModifyComponent', () => {
  let component: ModelModifyComponent;
  let fixture: ComponentFixture<ModelModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
