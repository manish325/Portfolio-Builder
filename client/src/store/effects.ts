import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { setUserData } from './actions';
import { DashboardService } from 'src/modules/dashboard/dashboard.service';

@Injectable()
export class AppEffects {
  loadUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setUserData),
    )
  );

  constructor(
    private actions$: Actions,
    private yourService: DashboardService
  ) {}
}
