import { Component } from "@angular/core";
import { MaterialModule } from "../MaterialModule/Material-module";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  imports: [MaterialModule],
  standalone : true
})
export class TableComponent {

}