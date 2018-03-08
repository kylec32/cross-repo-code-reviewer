import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedBranchComponent } from './matched-branch.component';

describe('MatchedBranchComponent', () => {
  let component: MatchedBranchComponent;
  let fixture: ComponentFixture<MatchedBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
