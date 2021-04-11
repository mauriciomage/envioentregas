import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { OrdersPage } from '../orders/orders';
import { NewOrderPage } from '../new-order/new-order';
import { LoginPage } from '../login/login';
import { MessagesPage } from '../messages/messages';
@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  color:any;
  tab1Root = HomePage;
  tab2Root = OrdersPage;
  tab3Root = NewOrderPage;
  tab4Root = MessagesPage;
  tab5Root = LoginPage;

  constructor() {
  }

  selectTab(id){
  	localStorage.setItem('current_tab', id);
    this.color = '#26a69a';
  }
}
