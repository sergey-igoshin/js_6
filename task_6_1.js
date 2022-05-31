/*
1. Доработать модуль корзины.
a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида
*/

const products = [
  {name: 'Asus', price: 900, quantity: 1,},
  {name: 'Lenovo', price: 1200, quantity: 5,},
  {name: 'Epson', price: 300, quantity: 2,},  
];

const cart = [];

const dict = {  
  cart_null: 'Корзина пустая',
  add_to_cart: 'В корзину',
  total: 'Всего товаров: ',
  amount: 'На сумму: ',
  in_stock: 'в наличии',
  out_of_stock: 'нет в наличии',
  currency: '₽',
  unit: 'шт', 
};

const setting = {
  display: {
    table:'table',
    tableCell: 'table-cell',
  },
  border: '1px solid black',
  radius: '5px',
  margin: '10px auto',
  verticalAlign: 'middle',
  padding: '0 10px',
  width: '120px',
  height: '30px',
  textAlignRight: 'right',  
  container: '480px',
  cursor: 'pointer',
};

const main = { 
  cart,
  products,
  dict,
  setting,
  cls: {
    product: 'product',
    cart: 'cart',
  },
  containerElement: document.querySelector('div'),
  init(){
    this.containerElement.innerHTML = '';    
    this.initProduct(); 
    this.initCart();
  },
  initProduct(){
    const store_cart = this.createStoreCart(this.cls.product);
    this.products.forEach(function(el){
      main.createProductBlocks(store_cart, el, main.dict.add_to_cart, main.cls.product, false);
    }); 
    document.querySelector(`.${this.cls.product}`).addEventListener('click', this.cartAddProduct.bind(this)); 
  },
  initCart(){
    const store_cart = this.createStoreCart(this.cls.cart); 
    const obj = {total: 0, quantity: 0};
    this.cart.forEach(function(el){
      main.createProductBlocks(store_cart, el, false, main.cls.cart, obj);
    }); 
    this.footerCart(store_cart, obj);
  },  
  createStoreCart(cls){
    const store_cart = document.createElement('div');
    store_cart.classList.add(cls);
    this.storeCartStyle(store_cart);
    this.containerElement.appendChild(store_cart);
    return store_cart;
  },
  createProductBlocks(store_cart, el, name_btn, cls, obj){
    const product_block = this.productBlock();      
     
    Object.keys(el).forEach(function(key){
      main.block(product_block, el, key, cls, obj);
    });
    if(name_btn){
      const btn = this.createButton(name_btn);          
      product_block.appendChild(btn);
    };
    store_cart.appendChild(product_block);
  },
  productBlock(){
    const product_block = document.createElement('div');
    this.storeProductStyle(product_block);
    return product_block;
  },
  createButton(name_btn){
    const btn = document.createElement('button');
    btn.innerText = name_btn;
    this.buttonStyle(btn);
    return btn
  },
  block(store_product, el, key, cls, obj){
    if(obj){
      if(key === 'price') obj.total += el[key];
      if(key === 'quantity') obj.quantity += el[key];
    } 
    const product = main.createProduct(key, el, cls);
    store_product.appendChild(product);
  },
  createProduct(key, el, cls){
    const product = document.createElement('div');
    this.setBlock(product, key, el, cls);
    return product;
  },
  setBlock(product, key, el, cls){
    let text = '';
    if(key === 'name'){
      text = el[key];
    }else if(key === 'price' && el['quantity'] > 0){
      text = el[key] + ' ' + this.dict.currency;          
      this.textAlignRight(product);
    }else if(key === 'quantity'){
      if(cls === this.cls.product) {
        el[key] < 1 ? text = this.dict.out_of_stock : text = this.dict.in_stock;
      }else if(cls === this.cls.cart){
        text = el[key] + ' ' + this.dict.unit;
      }      
      this.textAlignRight(product);
    }
    product.innerText = text;
    this.productStyle(product);    
  },
  footerCart(store_cart, obj){
    if(obj.quantity > 0){
      const total = this.dict.total + obj.quantity  + ' ' + this.dict.unit;
      const amount = this.dict.amount + obj.total + ' ' + this.dict.currency;      
      store_cart.appendChild(this.footer(total));
      store_cart.appendChild(this.footer(amount));
    }else{
      store_cart.appendChild(this.footer(this.dict.cart_null));
    }      
  },  
  footer(text){
    const footer_cart = document.createElement('div');
    footer_cart.innerText = text;
    this.storeProductStyle(footer_cart);
    return footer_cart;
  },
  cartAddProduct(event){      
    if(event.target.tagName !== 'BUTTON') return;    
    this.products.forEach(function(el){
      if(el.name === event.path[1].firstChild.innerText){
        if(el.quantity < 1){
          alert(el.name + ': ' + main.dict.out_of_stock);
        }else{
          main.cart.push({name: el.name, price: el.price, quantity: 1});
          el.quantity -= 1;          
          main.init();
        };        
      };     
    });
  },
  buttonStyle(t){
    t.style.width = this.setting.width;
    t.style.height = this.setting.height;
    t.style.cursor = this.setting.cursor;
  },
  productStyle(t){
    t.style.display = this.setting.display.tableCell;
    t.style.verticalAlign = this.setting.verticalAlign;    
    t.style.width = this.setting.width;
    this.padding(t);
  },
  textAlignRight(t){
    t.style.textAlign = this.setting.textAlignRight;
  },
  storeProductStyle(t){
    t.style.margin = this.setting.margin;
    t.style.display = this.setting.display.table;
    t.style.verticalAlign = this.setting.verticalAlign;    
    this.padding(t);
  },
  storeCartStyle(t){
    t.style.margin = this.setting.margin;
    t.style.width = this.setting.container;
    t.style.display = this.setting.display.table;    
    t.style.border = this.setting.border;
    t.style.borderRadius = this.setting.radius;
  },
  padding(t){
    t.style.padding = this.setting.padding;      
  },
}

main.init();