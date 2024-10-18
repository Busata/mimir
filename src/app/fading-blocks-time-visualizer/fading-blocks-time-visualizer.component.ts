import { Component, computed, inject, input } from '@angular/core';
import { TimeService } from '../services/time.service';
import { addMinutes, differenceInSeconds } from 'date-fns';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fading-blocks-time-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fading-blocks-time-visualizer.component.html',
  styleUrl: './fading-blocks-time-visualizer.component.scss'
})
export class FadingBlocksTimeVisualizerComponent {


  timeService = inject(TimeService);

  startTime = input.required<Date>();
  durationInMinutes = input.required<number>();


  secondsPassed = computed(() => {
    return Math.abs(differenceInSeconds(this.startTime(), this.timeService.currentTime()));
  })

  secondsRemaining = computed(() => {
    let endTime = addMinutes(this.startTime(), this.durationInMinutes());
    return Math.abs(differenceInSeconds(this.timeService.currentTime(), endTime));
  })

  rows = computed(() => {
    return Math.floor(this.durationInMinutes() / 15);
  })



  isDone(row: number, col: number) {
    let activeMinute = (row * 15 + (col + 1));
    
    return activeMinute <= (this.secondsPassed() / 60)
  }

  getColour(row: number,col: number): any {
    if(this.isActive(row, col)) {
      return this.getActiveColour();
    } else {
      if(this.isDone(row, col)) {
        return 'black';
      } else {
        return '#f1f5f9';
      }
    }
  }

  isActive(row: number, col: number) {
    let activeMinute = (row * 15 + (col + 1));
    return activeMinute > (this.secondsPassed() / 60) && activeMinute < (this.secondsPassed() / 60) + 1
  }

  getActiveColour() {
    const percentage = ((this.secondsPassed() % 60) / 60) * 100;
    return this.blender("#f1f5f9","#000000",percentage)
  }

  generateHex(r: number, g: number, b: number): string  {
    let R = r.toString(16);
    let G = g.toString(16);
    let B = b.toString(16);
  
    while (R.length < 2) {
      R = `0${R}`;
    }
    while (G.length < 2) {
      G = `0${G}`;
    }
    while (B.length < 2) {
      B = `0${B}`;
    }
  
    return `#${R}${G}${B}`;
  };
  
   mix(start: number, end: number, percent: number): number {
      return start + (percent / 100) * (end - start);
   }
  
  blender(color1: string, color2: string, percent: number): string {
    const red1 = parseInt(`${color1[1]}${color1[2]}`, 16);
    const green1 = parseInt(`${color1[3]}${color1[4]}`, 16);
    const blue1 = parseInt(`${color1[5]}${color1[6]}`, 16);
  
    const red2 = parseInt(`${color2[1]}${color2[2]}`, 16);
    const green2 = parseInt(`${color2[3]}${color2[4]}`, 16);
    const blue2 = parseInt(`${color2[5]}${color2[6]}`, 16);
  
    const red = Math.round(this.mix(red1, red2, percent));
    const green = Math.round(this.mix(green1, green2, percent));
    const blue = Math.round(this.mix(blue1, blue2, percent));
  
    return this.generateHex(red, green, blue);
  };
  
}
