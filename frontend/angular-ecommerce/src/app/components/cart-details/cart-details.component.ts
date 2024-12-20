import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {

    // pobierz uchwyt do elementów koszyka
    this.cartItems = this.cartService.cartItems;

    // całkowita cena koszyka
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // całkowita ilość produktów w koszyku
    this.cartService.totalQuantity.subscribe( 
      data => this.totalQuantity = data
    );

    // oblicz całkowitą cenę i ilość produktów w koszyku
    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }
}
