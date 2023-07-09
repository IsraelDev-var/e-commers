

async function getProducts(){
    try {
        const data = await fetch("https://ecommercebackend.fundamentos-29.repl.co/");

        const res = await data.json();

        window.localStorage.setItem("products", JSON.stringify(res))

        return res;
    } catch (error) {
        window.location.reload();
    }
}


function printProducts(db){
    const productsHTML = document.querySelector(".products")

    let html = ``

    for(const {id,image,name,price,quantity} of db.products){
        html += `
        <div class="product" >
            <div class="products__img">
                <img src="${image}" alt="${name}">
            </div>

            <div class="product__info">
                <h4>${name}  </h4>
                <div class="h4Stock">
                <h4 class= "stock"><span><b>Stock</b>: ${quantity}</span></h4>
                </div>
                
                <h5>
                    $${price}
                    <i class='bx bx-plus btn__product' id="${id}"></i>
                </h5>
            </div>
        </div>
        `;
    }
    productsHTML.innerHTML = html;
}


function showCart(){
    const bxCartHTML = document.querySelector(".bx-cart");
    const cartHTML = document.querySelector(".cart");
    
    bxCartHTML.addEventListener("click", function(){
        cartHTML.classList.toggle("cart__show");
    })
}
function exitCart(){
    const bxCartExitHTML = document.querySelector(".bx-x__cart");
    const cartHTML = document.querySelector(".cart");

    bxCartExitHTML.addEventListener("click", function(){
        cartHTML.classList.toggle("cart__show");
    })

}

function showHeader(){
    window.addEventListener("scroll", function(){
        const headerHTML = document.querySelector(".header");
        headerHTML.classList.toggle("header__show", window.scrollY > 0 )
    } )
    
}

function showMenu(){
    const bxMenuHTML = document.querySelector(".btn-menu");
    const menuHTML = document.querySelector(".menu");

    bxMenuHTML.addEventListener("click", () => {
        menuHTML.classList.toggle("menu__show")
    })
    

    
}

function exitMenu(){
    const bxMenuExitHTML = document.querySelector(".bx-x");
    const menuHTML = document.querySelector(".menu");

    bxMenuExitHTML.addEventListener("click", () =>{
        menuHTML.classList.toggle("menu__show")
    })

}

function exitCart(){
    const bxCartExitHTML = document.querySelector(".bx-x__cart");
    const cartHTML = document.querySelector(".cart");

    bxCartExitHTML.addEventListener("click", function(){
        cartHTML.classList.toggle("cart__show");
    })

}

function printProductsIncart(db){
    let html = "";
            
    for (const key in db.cart) {
        const {amount,name,image,price,id,quantity} = db.cart[key];
        html += `
        <div class="cart__product">
            <div class="cart__product__img">
                <img src="${image}" alt=""/>
            </div>
        

            <div class="cart__product__body">
                <p>
                    <b>${name}</b>
                </p>

                <p>
                    <small>Price: ${price} | Amount: ${amount}</small>
                </p>
                <p class="quantity">
                <b>
                    <small>Stock ${quantity}</small>
                </b>
                </p>

                <p>
                    <b>
                        $<small>${amount * price}</small>
                    </b>
                </p>

                <di class="cart__product__opt" id="${id}">
                    <i class='bx bx-plus btn__product cart__opt' ></i>
                    <i class='bx bx-minus'></i>
                    <i class='bx bxs-trash'></i>
                    
                </di>
            </div>

        </div>
        `;

        
    }
    document.querySelector(".cart__products").innerHTML = html;



}

function addToCArd(db){
    const productsHTML = document.querySelector(".products")
    productsHTML.addEventListener("click", (e) => {
        
    
        if(e.target.classList.contains("btn__product")){
            const id = Number(e.target.id);
            
            const productFuond = db.products.find( function(product){
                return product.id === id;
            })


            if(db.cart[productFuond.id]){
                if( db.cart[id].amount === db.cart[id].quantity){
                
                    alert(" ARTICULO AGOTADOS");
                }else{
                    db.cart[id].amount++;
                    
                }
            }else{
                db.cart[productFuond.id] = {
                    ...productFuond,
                    amount: 1
                }
            }

            localStorage.setItem("cart", JSON.stringify(db.cart));
            printProductsIncart(db)
        
        }



    });

}

function cartValidetion (db){
    document.querySelector(".cart__products").addEventListener("click", (e)=> {
        if(e.target.classList.contains("bx")){
            if(e.target.classList.contains("bx-minus")){
                const id = Number(e.target.parentElement.id);
                

                if(db.cart[id].amount === 1){
                    delete db.cart[id];
                }else{
                    db.cart[id].amount--;
                }

                
            }
            if(e.target.classList.contains("bx-plus")){
                const id = Number(e.target.parentElement.id);
                const quantity = Number(db.cart[id].quantity);
                console.log(quantity);
                if( db.cart[id].amount === quantity){
                    
                    alert(" ARTICULO AGOTADOS");
                }else{
                    db.cart[id].amount++;
                    
                    
                }
                
                
            }
            if(e.target.classList.contains("bxs-trash")){
                const id = Number(e.target.parentElement.id);
                const anwer = confirm("DESEA ELIMINAR TODO");

                if(anwer){
                    delete db.cart[id];
                }else{

                }
                
            }
            localStorage.setItem("cart", JSON.stringify(db.cart));
            printProductsIncart(db);
            
        
}})

}

async function main(){
    const db = {
        products: 
        JSON.parse(window.localStorage.getItem("products")) || await getProducts(),
        cart:JSON.parse(window.localStorage.getItem("cart")) || {},
    }

    showMenu()
    addToCArd(db)
    printProducts(db);
    showCart();
    showHeader();
    exitCart();
    exitMenu();
    printProductsIncart(db);
    cartValidetion (db);


}

main();