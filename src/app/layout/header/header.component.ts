import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { CartComponent } from 'src/app/shared/components/cart-dialogbox/cart.component';
import { ProductFilterService } from 'src/app/shared/services/product-filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,OnDestroy {
  public cart = [];
  public isShowLogo: boolean = false;
  constructor(
    private _productFilterService: ProductFilterService,
    private _userService: UserService,
    public dialog: MatDialog,
    private _router: Router,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addToCart();
    this.getUserData();
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get the active route snapshot after navigation ends
        const snapshot = this._activeRoute.snapshot;
        const validRoutes = ["/user/login","/user/signup"]
        if(snapshot['_routerState'].url && validRoutes.includes(snapshot['_routerState'].url)){
          this.isShowLogo = true;
        }else{
          this.isShowLogo = false;
        }
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

  ngOnDestroy(): void {}

}
