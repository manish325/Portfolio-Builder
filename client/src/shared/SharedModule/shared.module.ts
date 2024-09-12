import { NgModule } from "@angular/core";
import { TableComponent } from "../Table/table.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";

@NgModule({
    imports : [TableComponent,
         PageNotFoundComponent
    ],
    exports : [TableComponent,
        PageNotFoundComponent
   ]
})
export class SharedModule {

}