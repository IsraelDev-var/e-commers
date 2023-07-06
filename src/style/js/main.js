

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

    for(const {image,name,price,id,quantity} of db.products){
        html += `
        <div class="product" >
            <div class="products__img">
                <img src="${image}" alt="${name}">
            </div>

            <div class="product__info">
                <h4>${name} <span><b>Stock</b>: ${quantity}</span> </h4>
                <h5>
                    $${price}
                    <i class='bx bx-plus id="${id}"'></i>
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
    let count = 0;
    bxCartHTML.addEventListener("click", function(){
        cartHTML.classList.toggle("cart__show");
    })
}

function showHeader(){
    window.addEventListener("scroll", function(){
        const headerHTML = this.document.querySelector(".header");
        headerHTML.classList.toggle("header__show", this.window.scrollY > 0 )
    } )
    
}
function lookingCArd(db){

}

async function main(){
    const db = {
        products: 
        JSON.parse(window.localStorage.getItem("products")) || await getProducts(),
        cart:{},
    }
    
    lookingCArd(db)
    printProducts(db);
    showCart();
    showHeader()










}

main();