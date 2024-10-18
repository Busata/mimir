import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { SessionTrackerService } from '../services/session-tracker.service';
import { addMinutes, format } from 'date-fns';
import { TimeService } from '../services/time.service';

interface PresetButton {
  label: string,
  subscript: string,
  timerValue: number,
  range: [number, number]
}

@Component({
  selector: 'app-session-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-container.component.html',
  styleUrls: ['./session-container.component.scss']
})
export class SessionContainerComponent {

  public sessionTrackerService = inject(SessionTrackerService);
  private timeService = inject(TimeService);
  
  presetButtons: PresetButton[] = [{
    label: 'Quick',
    subscript: '30 mins',
    timerValue: 30,
    range: [0, 59]
  }, {
    label: 'Focused',
    subscript: '1 hour',
    timerValue: 60,
    range: [60, 119]
  }, {
    label: 'Immersive',
    subscript: '2 hours',
    timerValue: 120,
    range: [120, 239]
  }, {
    label: 'Extended',
    subscript: '4 hours',
    timerValue: 240,
    range: [240, Number.MAX_VALUE]
  }]

  updateTimer(unparsed: string | number) {
    let value;
    if (typeof unparsed === "string") {
      value = Number.parseInt(unparsed);
    } else {
      value = unparsed;
    }
    this.sessionTime.set(value);
  }

  sessionTime = signal(60)

  isPresetActive(presetButton: PresetButton) {
    return this.sessionTime() >= presetButton.range[0] && this.sessionTime() <= presetButton.range[1];
  }

  startSession(sessionName: string, durationInMinutes: number) {
    this.sessionTrackerService.startSession(sessionName, durationInMinutes);
  }

  humanReadableTime = (timeInMinutes: number) => {
    let timeInSeconds = timeInMinutes * 60
    let hours = Math.floor(timeInSeconds / 3600);
    let minutes = Math.floor((timeInSeconds % 3600) / 60);

    let time = "";

    if (hours != 0) {
      time += `${hours} hours`
    }

    if (minutes != 0) {
      time += ` ${minutes} minutes`
    }

    time = time.trim();


    return `${time}`
  }

  endTime = computed(() => {
    const now = this.timeService.currentTime();
    const futureTime = addMinutes(now, this.sessionTime());
    return format(futureTime, 'HH:mm');
  })

  formatDate(from: Date) {
    return format(from, 'HH:mm, MMMM d, yyyy');

  }

}
