import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartComponent } from 'src/app/shared/components/cart-dialogbox/cart.component';
import { ProductFilterService } from 'src/app/shared/services/product-filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public cart = [];
  constructor(
    private _productFilterService: ProductFilterService,
    public dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.addToCart();
  }

  searchValue(event) {
    this._productFilterService.searchValue(event.target.value);
  }

  addToCart() {
    this._productFilterService.$_cart.subscribe((data) => {
      if (data) {
        this.cart.push(data);
      }
    });
  }

  openCart(): void {
    const dialogRef = this.dialog.open(CartComponent, {
      data: this.cart,
    });

    dialogRef.afterClosed().subscribe((result) => {
      result;
    });
  }

  navigateToLoginPage() {
    this._router.navigate(['/login/login']);
  }
}
