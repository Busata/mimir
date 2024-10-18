import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  
  public currentTime = signal(new Date())

  constructor() { 
    setInterval(() => {
        this.currentTime.set(new Date());
    })
  }
}
