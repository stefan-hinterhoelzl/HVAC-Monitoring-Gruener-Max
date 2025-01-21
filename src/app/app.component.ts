import { Component, OnInit } from '@angular/core';
import { DataPollingService } from './services/data-polling.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe, NgClass } from '@angular/common';
import { StateResponse } from './data/interfaces';
import { Subject, switchMap, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [MatCardModule, MatIconModule, MatDividerModule, DatePipe, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  INTERVAL: number = 15000;
  last_check: number;
  state: StateResponse;
  stopTimer$: Subject<void>;
  loading: boolean;

  constructor(private _data: DataPollingService) {
    this.state = <StateResponse> {
      Cooler: "OFF",
      Heater: "OFF",
    };
    this.last_check = Date.now();
    this.stopTimer$ = new Subject<void>();
    this.loading = true;
  }
  
  ngOnInit(): void {
    timer(0, this.INTERVAL).pipe(
      switchMap(() => this._data.getStates()),
      takeUntil(this.stopTimer$)
    ).subscribe({
      next: (value) => {
        this.last_check = Date.now();
        this.state.Cooler = value.Cooler;
        this.state.Heater = value.Heater;
        this.loading = false
      },
      error: (err) => {
        this.ngOnInit();
      }
    });
  }

  isHeating(): boolean {
    return this.state.Heater === "ON" && this.state.Cooler === "OFF";
  }

  isCooling(): boolean {
    return this.state.Cooler === "ON" && this.state.Heater === "OFF";
  }

  hasError(): boolean {
    return this.state.Cooler === "OFF" && this.state.Heater === "OFF";
  }

}
