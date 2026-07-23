import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedWeb } from './shared-web';

describe('SharedWeb', () => {
  let component: SharedWeb;
  let fixture: ComponentFixture<SharedWeb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedWeb],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedWeb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
