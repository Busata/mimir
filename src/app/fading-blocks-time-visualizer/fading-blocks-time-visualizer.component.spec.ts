import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadingBlocksTimeVisualizerComponent } from './fading-blocks-time-visualizer.component';

describe('FadingBlocksTimeVisualizerComponent', () => {
  let component: FadingBlocksTimeVisualizerComponent;
  let fixture: ComponentFixture<FadingBlocksTimeVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FadingBlocksTimeVisualizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FadingBlocksTimeVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
