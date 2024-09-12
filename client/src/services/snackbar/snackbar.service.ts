import { Inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class SnackBarService {
    constructor(
        private _snackbar: MatSnackBar,
    ) {}

    public openSnackBar(message: string, action?: string) {
        this._snackbar.open(message, action, {
            duration: 2000,
            horizontalPosition: "center",
            verticalPosition: "top",
        });
    }
}