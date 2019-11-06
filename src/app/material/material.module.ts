import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatDialogModule } from  '@angular/material';



const MaterialComponents = [  MatButtonModule, 
                              MatIconModule,
                              MatDialogModule ]


@NgModule({
  imports: [ MaterialComponents ],
  exports: [ MaterialComponents ]
})
export class MaterialModule { }
 