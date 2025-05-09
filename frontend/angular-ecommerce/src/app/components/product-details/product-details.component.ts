import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../src/app/common/product';
import { ProductService } from '../../../../src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../../src/app/services/cart.service';
import { CartItem } from '../../../../src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const theProductId: number = +id;
  
      this.productService.getProduct(theProductId).subscribe(
        data => {
          this.product = data;
        }
      );
    } else {
      console.error('Product ID not found in route!');
    }
  }
  

  addToCart() {

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
    
  }

}
