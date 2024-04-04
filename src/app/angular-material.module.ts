import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    // we need not to add this we can direct export it angular will do for us
    // imports:[
    // MatButtonModule,
    // MatCardModule,
    // MatInputModule,
    // MatToolbarModule,
    // MatExpansionModule,
    // MatProgressSpinnerModule,
    // MatPaginatorModule,
    // MatDialogModule
    // ],
    exports:[
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule]
})
export class AngularMaterialModule{

}