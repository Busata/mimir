import { Component, computed, effect, EffectRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SessionTrackerService } from '../services/session-tracker.service';
import { addMinutes, intervalToDuration } from 'date-fns';
import { TimeService } from '../services/time.service';
import { FadingBlocksTimeVisualizerComponent } from "../fading-blocks-time-visualizer/fading-blocks-time-visualizer.component";
import { SessionData } from '../domain/active-session';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-active-session-overview',
  standalone: true,
  imports: [FadingBlocksTimeVisualizerComponent],
  templateUrl: './active-session-overview.component.html',
  styleUrl: './active-session-overview.component.scss'
})
export class ActiveSessionOverviewComponent implements OnInit {
  
  trackCompletion: EffectRef;

  sessionTrackerService = inject(SessionTrackerService)
  timeService = inject(TimeService)
  titleService= inject(Title)

  activeSession: WritableSignal<SessionData | undefined> = signal(undefined)
  
  ngOnInit(): void {
    let sessionData = this.sessionTrackerService.getActiveSession();
    
    if(sessionData) {
      this.activeSession.set(sessionData);
    }

  }  
  
  constructor() {
    this.trackCompletion = effect(() => {
      let completed = (this.timeRemaining().seconds || Number.MAX_VALUE) <= 0;
      
      if(completed) {
        this.trackCompletion.destroy();
        this.titleService.setTitle("Mimir")
        this.sessionTrackerService.completeSession();
      }

    })

    effect(() => {
      this.titleService.setTitle(this.timeRemainingFormatted());
    })
  }

  padZero(num: number) {
    return String(num).padStart(2, '0');
  };

  timeRemaining = computed(() => {
    const activeSession = this.activeSession()!;

    let endTime = addMinutes(activeSession.startTime, activeSession.durationInMinutes)

   return intervalToDuration({start: this.timeService.currentTime(), end: endTime})
    
  })
  
  timeRemainingFormatted = computed(() => {

    const {hours, minutes, seconds} = this.timeRemaining();
    
    let time = this.formatTime(Math.max(0, hours ||0) , Math.max(0, minutes || 0), Math.max(0, seconds || 0))
    
    return time;
  })



  private formatTime(hours: number | undefined, minutes: number | undefined, seconds: number | undefined) {
    return `${hours ? this.padZero(hours) : '00'}:${minutes ? this.padZero(minutes) : '00'}:${seconds ? this.padZero(seconds) : '00'}`;
  }

  stopSession() {
    if(confirm("Are you sure to cancel this session?")) {
      this.titleService.setTitle("Mimir")
      this.sessionTrackerService.stopActiveSession();
    }
  }
}
