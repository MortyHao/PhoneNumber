import{
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
}from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports:[
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class MaterialModule { }