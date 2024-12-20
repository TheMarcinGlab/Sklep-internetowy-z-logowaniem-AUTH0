import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ThisFormService } from '../../../../src/app/services/form.service';
import { Country } from '../../../../src/app/common/country';
import { State } from '../../../../src/app/common/state';
import { ThisValidators } from '../../../../src/app/validators/validators';
import { CartService } from '../../../../src/app/services/cart.service';
import { CheckoutService } from '../../../../src/app/services/checkout.service';
import { Router } from '@angular/router';
import { Order } from '../../../../src/app/common/order';
import { OrderItem } from '../../../../src/app/common/order-item';
import { Purchase } from '../../../../src/app/common/purchase';
import { AuthService } from '@auth0/auth0-angular'; // Import AuthService

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: UntypedFormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  emailFromStorage: string = '';
  isAuthenticated: boolean = false; // Flaga logowania użytkownika

  constructor(
    private formBuilder: UntypedFormBuilder,
    private thisFormService: ThisFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router,
    public auth: AuthService // Dodanie AuthService
  ) { }

  ngOnInit(): void {
    // Sprawdzenie logowania użytkownika
    this.auth.isAuthenticated$.subscribe((loggedIn) => {
      this.isAuthenticated = loggedIn;
    });

    // Pobieranie emaila z sessionStorage
    this.emailFromStorage = sessionStorage.getItem('userEmail') || '';

    // Inicjalizacja formularza
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new UntypedFormControl('', [Validators.required, Validators.minLength(2), ThisValidators.notOnlyWhitespace]),
        lastName: new UntypedFormControl('', [Validators.required, Validators.minLength(2), ThisValidators.notOnlyWhitespace]),
        email: new UntypedFormControl({ value: this.emailFromStorage, disabled: true },
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new UntypedFormControl('', [Validators.required, Validators.minLength(2), ThisValidators.notOnlyWhitespace]),
        city: new UntypedFormControl('', [Validators.required, Validators.minLength(2), ThisValidators.notOnlyWhitespace]),
        state: new UntypedFormControl('', [Validators.required]),
        country: new UntypedFormControl('', [Validators.required]),
        zipCode: new UntypedFormControl('', [Validators.required, Validators.minLength(2), ThisValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new UntypedFormControl('', [Validators.required, Validators.minLength(2), ThisValidators.notOnlyWhitespace]),
        city: new UntypedFormControl('', [Validators.required, Validators.minLength(2), ThisValidators.notOnlyWhitespace]),
        state: new UntypedFormControl('', [Validators.required]),
        country: new UntypedFormControl('', [Validators.required]),
        zipCode: new UntypedFormControl('', [Validators.required, Validators.minLength(2), ThisValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new UntypedFormControl('', [Validators.required]),
        nameOnCard: new UntypedFormControl('', [Validators.required, Validators.minLength(2), ThisValidators.notOnlyWhitespace]),
        cardNumber: new UntypedFormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new UntypedFormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    // Wczytanie szczegółów koszyka
    this.reviewCartDetails();

    // Pobranie dostępnych miesięcy i lat karty kredytowej
    this.thisFormService.getCreditCardMonths(new Date().getMonth() + 1).subscribe((data) => {
      this.creditCardMonths = data;
    });

    this.thisFormService.getCreditCardYears().subscribe((data) => {
      this.creditCardYears = data;
    });

    // Pobranie listy krajów
    this.thisFormService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe((totalQuantity) => (this.totalQuantity = totalQuantity));
    this.cartService.totalPrice.subscribe((totalPrice) => (this.totalPrice = totalPrice));
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    if (formGroup) {
      const countryCode = formGroup.value?.country?.code;
      const countryName = formGroup.value?.country?.name;

      if (countryCode && countryName) {
        this.thisFormService.getStates(countryCode).subscribe((data) => {
          if (formGroupName === 'shippingAddress') {
            this.shippingAddressStates = data;
          } else {
            this.billingAddressStates = data;
          }

          if (data.length > 0) {
            formGroup.get('state')?.setValue(data[0]);
          }
        });
      }
    }
  }

  copyShippingAddressToBillingAddress(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    if (creditCardFormGroup) {
      const currentYear: number = new Date().getFullYear();
      const selectedYear: number = Number(creditCardFormGroup.value?.expirationYear);

      let startMonth: number;

      if (currentYear === selectedYear) {
        startMonth = new Date().getMonth() + 1;
      } else {
        startMonth = 1;
      }

      this.thisFormService.getCreditCardMonths(startMonth).subscribe((data) => {
        this.creditCardMonths = data;
      });
    }
  }

  onSubmit() {
    if (!this.isAuthenticated) {
      alert('Zaloguj się, aby złożyć zamówienie.');
      return;
    }

    console.log('Form Submitted');
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    const order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItems;
    const orderItems: OrderItem[] = cartItems.map((tempCartItem) => new OrderItem(tempCartItem));

    const purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;

    purchase.order = order;
    purchase.orderItems = orderItems;

    this.checkoutService.placeOrder(purchase).subscribe({
      next: (response) => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
        this.resetCart();
      },
      error: (err) => {
        alert(`There was an error: ${err.message}`);
      }
    });
  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl('/products');
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }
}


