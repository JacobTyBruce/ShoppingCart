var cart = []; // fix so that is page refreshes inv still stays
var currency = "$";
//var total = 0.00;
console.log(typeof total);

function loadCheck() {
    for (var i = 0; i < sessionStorage.length; i++) {
        console.log(sessionStorage.key(i));
        // could geta in one line using getItem(i) but this is more scalable because it doesnt use specfic key names, could make global that declares key name later in final dist.
        let currentKey = sessionStorage.key(i);
        let currentValue = sessionStorage.getItem(currentKey);
        cart.push(currentValue);
    };
    findTotal();
};

function addToCart(obj) {
    // current item number
    var productNum = sessionStorage.length + 1;

    // grab and store item data
    var name = $(obj).data("name");
    //alert(name);
    var price = $(obj).data("price");
    //alert(price);

    //create object
    var currentItem = {
        name: name,
        price: price
        // can expand data below
    };
    var currentString = JSON.stringify(currentItem);
    alert(currentString);
    // store item as own item in sessionStorage
    sessionStorage.setItem("product" + productNum, currentString);

    // create array and push to cart array
    //var itemArr = [name, price];
    cart.push(currentString);
    findTotal();
};

function findTotal() {
    var total = 0.00;
    for (i = 0; i < cart.length; i++) {
        let currentSel = cart[i];
        currentSel = JSON.parse(currentSel);
        let price = currentSel.price;
        total += price;
    };
    //alert("$" + total);
    total = parseFloat(total).toFixed(2);
    //alert("$"+total);
    $("#totalAmount").html("<span style='color:lightGreen'>" + currency + "</span>" + total);
};

/*function viewCart() {
    alert(cart);
    alert(cart[0]);
    var firstItem = JSON.parse(cart[0]);
    alert(firstItem.price);
    //alert(cart.length);
    //alert(sessionStorage.getItem("product1"));
    //sessionStorage.removeItem("product1");
};
*/
function saveToLocal(name) {
    var cartItems = ""; // figure out how to make this available across both functions
    for (i = 1; i <= sessionStorage.length; i++) {
        // use global variable for product name instead of "product" in later imp if possible, making more scalable
        let currentVal = sessionStorage.getItem("product" + i);
        cartItems += currentVal + ";";
    };
    localStorage.setItem(name, cartItems);
};

function saveCart() {
    if (sessionStorage.length < 1) {
        alert("There is nothing in your cart, please add an item to continue")
        return;
    };
    $("<div></div>", {
        'id':'savePopup'
    }).appendTo('body');
    $("<p></p>", {
        'text': 'Enter A Name For Your Shopping Cart'
    }).appendTo("#savePopup");
    $("<input></input>", {
        'type': 'text',
        'placeholder': 'Something Cool'
    }).appendTo("#savePopup");
    $("<button></button>")
    /*var cartItems = "";
    let cartName = prompt("Enter a name for your shopping cart")
    cartName = "cart:" + cartName;
    if (localStorage.getItem(cartName) === null) {
        saveToLocal(cartName);
    }
    else {
        var overwrite = prompt("An existing cart has been detected with this name, would you like to overwrite it? Y/n").toUpperCase;
        alert(overwrite);
        if (overwrite === "Y") {
            saveToLocal(cartName);
        }
        else {
            let cartName = prompt("Enter a new name");
            saveToLocal(cartName);
        };
    };
};

function getCarts() {
    for (let i = 1; i <= localStorage.length; i++) {
        if (localStorage.key(i).includes("cart:")) {
            console.log(localStorage.key(i));
        }
    };*/
};

function viewCart() {
    $(".popup-item").remove()
    for (i = 0; i < cart.length; i++) {
        let currentSel = JSON.parse(cart[i]);
        let currentName = currentSel.name;
        let currentPrice = currentSel.price;
        let currentElem = document.createElement("p");
        let currentContent = document.createTextNode(currentName + " - " + currentPrice);
        currentElem.append(currentContent);
        currentElem.classList.add("popup-item");
        $("#side1").append(currentElem);
    };
    $("#popup").css("display", "flex");
};

function closePopup() {
    $("#popup").css("display", "none");
}

function alertTest(obj) {
    alert(obj.data("name"));
};

// doesnt delete last one
function deleteCart() {
    for (i = 0; i < sessionStorage.length; i++) {
        let rem = sessionStorage.key(i);
        sessionStorage.removeItem(rem);
    }
    cart.length = 0;
};
