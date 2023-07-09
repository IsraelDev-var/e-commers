

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

function lookingCArd(db){
    const productsHTML = document.querySelector(".products")
    productsHTML.addEventListener("click", (e) => {
    
        if(e.target.classList.contains("btn__product")){
            const id = Number(e.target.id);
            
            const productFuond = db.products.find( function(product){
                return product.id === id;
            })
            if(db.cart[productFuond.id]){
                db.cart[productFuond.id].amount++
            }else{
                db.cart[productFuond.id] = {
                    ...productFuond,
                    amount: 1
                }
            }
            console.log(db.cart)
        }



    });

}

async function main(){
    const db = {
        products: 
        JSON.parse(window.localStorage.getItem("products")) || await getProducts(),
        cart:{},
    }
    showMenu()
    lookingCArd(db)
    printProducts(db);
    showCart();
    showHeader()
    exitCart()
    exitMenu()
    


}

main();