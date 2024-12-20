package com.theglab.ecommerce.service;

import com.theglab.ecommerce.dto.Purchase;
import com.theglab.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
