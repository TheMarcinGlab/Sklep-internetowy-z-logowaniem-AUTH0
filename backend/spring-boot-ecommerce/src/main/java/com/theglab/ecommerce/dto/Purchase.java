package com.theglab.ecommerce.dto;

import com.theglab.ecommerce.entity.Address;
import com.theglab.ecommerce.entity.Customer;
import com.theglab.ecommerce.entity.Order;
import com.theglab.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
