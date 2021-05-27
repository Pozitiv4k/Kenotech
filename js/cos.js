let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        id:1,
        name: 'HyperX Alloy Origins',
        tag: 'im1',
        price: 999,
        inCart: 0
    },
    {
        id:2,
        name: 'Razer Cynosa Chroma Pro',
        tag: 'im2',
        price: 969,
        inCart: 0
    },
    {
        id:3,
        name: 'Acer Predator AETHON500',
        tag: 'im3',
        price: 2499,
        inCart: 0
    },
    {
        id:4,
        name: 'Razer BlackWidow Lite',
        tag: 'im4',
        price: 799,
        inCart: 0
    },
    {
        id:5,
        name: 'Acer Predator Galea 350',
        tag: 'im5',
        price: 1689,
        inCart: 0
    },
    {
        id:6,
        name: 'Acer Predator Orion 9000',
        tag: 'im6',
        price: 1899,
        inCart: 0
    },
    {
        id:7,
        name: 'HyperX Alloy FPS Pro',
        tag: 'im7',
        price: 989,
        inCart: 0
    },
    {
        id:8,
        name: 'Razer BlackWidow Elite',
        tag: 'im8',
        price: 2499,
        inCart: 0
    },
    {
        id:9,
        name: 'HyperX Alloy FPS',
        tag: 'im9',
        price: 899,
        inCart: 0
    },
];
for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', ()=>{
        cartNumbers(products[i]);
        // totalCost(products[i]);
    })
}
    function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if( productNumbers){
        localStorage.setItem('cartNumbers',productNumbers);
        document.querySelector('.cart span').textContent = productNumbers;
     }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItem(product);
   
}
function setItem(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log('Obiectele din cos ', cartItems);
    product.id = Math.floor(Math.random() * 100000);
    if(cartItems != null){ 
        product.inCart = 1;
        cartItems.push(product);
    }else{
        product.inCart = 1;
        cartItems = [ product ];
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function getTotalCartCost(){
    let cartItems = getCartItems();

    let cartCost = 0;
    cartItems.forEach(element => {
        cartCost+=element.price;
    });
    return cartCost;
}

function getCartItems(){
    return JSON.parse(localStorage.getItem('productsInCart'));
}
function displayCart(){
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    let productContainer = document.querySelector(".products");
    let cartCost = getTotalCartCost(); // ... 
 
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        cartItems.forEach(item => {
            productContainer.innerHTML += `
            <div class="product">
            <i onclick="removeCartItem(${item.id})" class="fas fa-times-circle ion"></i>  
            <img src="./imagini/${item.tag}.png" width="70px" height="80px" style="margin-right: auto;">
            <span style="color: white;">${item.name}</span>
            </div>
            <div class="product">
            <div class="price" style="color: white;">${item.price}
            </div>
            <span style="color: white;">${item.inCart}</span>
            </div>
            <div class="total" style="color: white;">
            ${item.price}lei</div>
            </div>
            `;
        });

        productContainer.innerHTML +=`
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle" style="color: white;">
        Totalul este: </h4>
        <h4 class="basketTotal" style="color: white;">
        ${cartCost} lei
        </h4>
        `;
    }
}

function removeCartItem(itemId){
    let items = JSON.parse(localStorage.getItem('productsInCart'));
    let toRemove = items.findIndex(q => q.id == itemId); 
    items.splice(toRemove, 1);
    console.log(items);
    localStorage.setItem('productsInCart', JSON.stringify(items));
    displayCart();
    // location.reload();
    // items.remove(toRemove);
    // console.log(toRemove);
}
    
// var removeCartItemButtons = document.getElementsByClassName('dell')

// for(var i=0; i< removeCartItemButtons.length; i++){
//     var button = removeCartItemButtons[i];
//     button.addEventListener('click',function(event){
//         let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);
    
//     for(var i in cartItems) {
//        if(cartItems != null){
//            localStorage.removeItem('cartNumbers',cartItems[i].inCart--);
//            localStorage.removeItem('productsInCart',cartItems[i]);
//            localStorage.removeItem('totalCost');
//         }
       
//     }
//         location.reload();
//     })

//     }
displayCart();