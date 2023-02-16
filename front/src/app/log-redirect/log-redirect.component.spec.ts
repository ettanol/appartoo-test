import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRedirectComponent } from './log-redirect.component';

describe('LogRedirectComponent', () => {
  let component: LogRedirectComponent;
  let fixture: ComponentFixture<LogRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogRedirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
