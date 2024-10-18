import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionData } from '../domain/active-session';

@Injectable({
  providedIn: 'root'
})
export class SessionTrackerService {

  routerService = inject(Router)


  public startSession(name: string, durationInMinutes: number) {
    let data = {
      startTime: new Date(),
      name,
      durationInMinutes
    };

    localStorage.setItem('active-session', JSON.stringify(data));
    
    this.routerService.navigate(["session"])
  }
  
  getActiveSession(): SessionData | null {
    let sessionData = localStorage.getItem('active-session')
    if(!sessionData) {
      return null;
    }
    return JSON.parse(sessionData)
  }
  
  completeSession() {
   let completedSessions = this.getCompletedSessions();

   let activeSession = this.getActiveSession()!;
   completedSessions.push(activeSession);

   localStorage.setItem('completed-sessions', JSON.stringify(completedSessions));

   this.routerService.navigate([""])

  }

  public getCompletedSessions(): SessionData[] {
    let completedSessionsRaw = localStorage.getItem('completed-sessions');

    return completedSessionsRaw ? JSON.parse(completedSessionsRaw) : [];
  }

  stopActiveSession() {
    localStorage.removeItem('active-session');
    this.routerService.navigate([""])
  }
}
