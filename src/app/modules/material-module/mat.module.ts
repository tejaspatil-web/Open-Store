import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule,} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

const module = [    
  CommonModule,
  MatDialogModule,
  MatSnackBarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports:module,
  exports:module
  
})
export class MatModule { }