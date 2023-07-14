window.addEventListener("load", () => {
    const loadingHTML = document.querySelector(".content__louding");
    loadingHTML.classList.toggle("louging2");})

    async function getProducts(){
        try {
            const data = await fetch("https://services-academlo-shopping.onrender.com/");

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

        for(const {id,image,name,price,quantity,category} of db.products){
            html += `
            <div class="product ${category}" >
                <div class="products__img">
                    <img src="${image}" alt="${name}">
                </div>

                <div class="product__info">
                <button cl>info</button>


                    <h4 class="btn__modal" id="${id}" >${name}  </h4>

                    <span class="category"><br>${category}</br></span>
                    <h5>$${price}</h5>
                    <div class="h4Stock">

                    <h4 class= "stock"><span><b>Stock</b>: ${quantity}</span></h4>


                        ${quantity
                            ?`<i class='bx bx-plus btn__product' id="${id}"></i>`
                            : "<div></div>"}
                    </div>


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
                printProductsIncart(db);
                tatolPreci(db);

            }



        });

    }

    function cartValidation (db){
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

                tatolPreci(db);
        }})

    }

    function tatolPreci(db) {
        let cartTotal = 0;
        let preciTotal = 0;

        for (const key in db.cart) {
            const {amount,price} = db.cart[key];
            cartTotal += amount;
            preciTotal += amount * price;
        }

        document.querySelector("#totalProducts").textContent = cartTotal;
        document.querySelector("#totalPreci").textContent = preciTotal;
        document.querySelector(".ball").textContent = cartTotal;

    }
    function controlTotal(db){
        document.querySelector(".cart__btn-buy").addEventListener("click",() =>{
            if(!Object.values(db.cart).length)
            return alert("SELECCIONA TUS PRODUCTOS ANTES DE COMPRAR");

            const anwer = confirm("SEGURO QUIERES COMPRAR?");
            if (!anwer) return;

            const arry = [];

            db.products.forEach(product =>{
                if ( db.cart[product.id]){
                    arry.push({
                        ...product,
                        quantity: product.quantity - db.cart[product.id].amount,
                    });
                }else{
                    arry.push(product);
                }
            });

            db.products = arry;
            db.cart = {};

            localStorage.setItem("products", JSON.stringify(db.products));
            localStorage.setItem("cart", JSON.stringify(db.cart));

            printProducts(db);
            printProductsIncart(db);
            tatolPreci(db);


        })
    }
    function darkShow(db){

        const showDark = document.querySelector(".bxs-moon");
        const bodyHTMl = document.querySelector("body");
        const headerHTML = document.querySelector("header");
        const cartHTML = document.querySelector(".cart__products");
        const cartTotalHTML = document.querySelector(".cart__total");

        if(!bodyHTMl.classList.contains("dark__body")){
            showDark.addEventListener("click", () => {
                bodyHTMl.classList.toggle("dark__body");
            });
    
            showDark.addEventListener("click", () => {
                headerHTML.classList.toggle("dark__body");
            });
    
            showDark.addEventListener("click", () => {
                cartHTML.classList.toggle("dark__body");
            });
    
            showDark.addEventListener("click", () => {
                cartTotalHTML.classList.toggle("dark__body");
            });
            localStorage.setItem("dark", JSON.stringify(db.darkShow ));
            
        }else{
            

        }
        
    }

    function modalAdd(db){
        const bodyHTML = document.querySelector(".modal");
        const btnModal = document.querySelector(".btn__modal");
    
        btnModal.addEventListener("click", ()=> {
            bodyHTML.classList.toggle("show__modal")
            
        });
        const productHTML = document.querySelector(".products");

        productHTML.addEventListener("click", (e)=>{


            if(e.target.classList.contains("btn__modal")){
                let id = Number(e.target.id)
                console.log(id);
                const productFuond = db.products.find( function(product){
                    return product.id === id;
                });


                
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
                printProductsIncart(db);
                tatolPreci(db);
                printModal(db)
                localStorage.setItem("modal", JSON.stringify(db.modal))
            }



        })
}

function printModal(db){
    let html = ``;

    for (const key in db.modal) {
        const {name,image,price,id,quantity,category} = db.modal[key];
        html += `

            <div class="product ${category}" >
                <div class="products__img">
                    <img src="${image}" alt="${name}">
                </div>

                <div class="product__info">
                <button cl>info</button>


                    <h4 class="btn__modal" id="${id}" >${name}  </h4>

                    <span class="category"><br>${category}</br></span>
                    <h5>$${price}</h5>
                    <div class="h4Stock">

                    <h4 class= "stock"><span><b>Stock</b>: ${quantity}</span></h4>


                        ${quantity
                            ?`<i class='bx bx-plus btn__product' id="${id}"></i>`
                            : "<div></div>"}
                    </div>


                </div>
            </div>
            `;
    }
    document.querySelector(".container__modal").innerHTML = html;


}



// function closetModal(){
//     const modalHTML =  document.querySelector(".modal");
//     const btnModal =  document.querySelector(".bx-x__modal");

//     btnModal.addEventListener("click", () => {
//         modalHTML.classList.toggle("show__modal")
//     });

// }

    async function main(){
        const db = {
            products:
            JSON.parse(window.localStorage.getItem("products")) || await getProducts(),
            cart:JSON.parse(window.localStorage.getItem("cart")) || {},
            modal:JSON.parse(window.localStorage.getItem("modal"))||{},
            darkShow: JSON.parse(window.localStorage.getItem("dark")) || {},
        }

        showMenu()
        addToCArd(db)
        printProducts(db);
        showCart();
        showHeader();
        exitCart();
        exitMenu();
        printProductsIncart(db);

        cartValidation(db);

        tatolPreci(db);
        controlTotal(db);
        darkShow(db);
        modalAdd(db);
        printModal(db);

        // actictModal();


        // closetModal();

        // filterClouthes(db)
        mixitup(".products", {
            selectors: {
                target: '.product'
            },
            animation: {
                duration: 200
            }
        });

    }

    main();


