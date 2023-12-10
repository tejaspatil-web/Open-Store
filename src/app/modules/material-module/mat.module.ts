import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule,} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'

const module = [    
  CommonModule,
  MatDialogModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
]

@NgModule({
  declarations: [],
  imports:module,
  exports:module
  
})
export class MatModule { }