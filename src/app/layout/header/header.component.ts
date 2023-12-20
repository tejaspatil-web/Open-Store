import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { CartComponent } from 'src/app/shared/components/cart-dialogbox/cart.component';
import { ProductFilterService } from 'src/app/shared/services/product-filter.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,OnDestroy {
  public cart = [];
  public isShowLogo: boolean = false;
  private _isShowLogoSubscription: Subscription = new Subscription();
  constructor(
    private _productFilterService: ProductFilterService,
    private _userService: UserService,
    public dialog: MatDialog,
    private _router: Router,
    private _sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.addToCart();
    this.getUserData();
    this._isShowLogoSubscription = this._sharedService
      .getIsShowLogo()
      .subscribe((value) => {
        try {
          this.isShowLogo = value;
        } catch (error) {
          console.log(error);
        }
      });
  }

  searchValue(event) {
    this._productFilterService.searchValue(event.target.value);
  }

  getUserData() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this._userService.getUserDetails(userId).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
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
    this._router.navigate(['/user/login']);
    this.isShowLogo = true;
  }

  ngOnDestroy(): void {
    this._isShowLogoSubscription.unsubscribe()
  }

}
