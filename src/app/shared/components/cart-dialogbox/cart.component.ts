import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
constructor(public dialogRef: MatDialogRef<CartComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any){}

ngOnInit(){
  this.data
}

  closeDialog(): void {
    this.dialogRef.close();
  }


}
