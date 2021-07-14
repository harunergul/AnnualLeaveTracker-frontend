import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPermissionComponent } from './request-permission.component';

describe('RequestPermissionComponent', () => {
  let component: RequestPermissionComponent;
  let fixture: ComponentFixture<RequestPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
