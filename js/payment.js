
// data to paste
let giveAmount = localStorage.getItem("giveAmount");
let receiveAmount = localStorage.getItem("receiveAmount")
// jiji
let networkSend = localStorage.getItem("networkSend");
let networkReceive = localStorage.getItem("networkReceive");
let receive_wallet = localStorage.getItem("walletReceive");
let orderNumber = localStorage.getItem("orderNumber");


const crypto_list = {
    "btc":"bc1qt2l7xvltl54r5cnagq0h4e3tlah065kqzs8ewj",
    "eth":"0xAF944f4F033148061Ca691dFDf6eF399A2EE6111",
    "ada":"addr1qx94hgrxlpg044zjkatv5ryycj0qr5v0d0uhp",
    "bnb":"0xAF944f4F033148061Ca691dFDf6eF399A2EE6111",
    "dash":"XdoyL2BjRPv1fBrkKqRbhu3qLhJLWsHeMe",
    "doge":"DEPEnzu7DMzHDhwC8N75K9kx1gbhKo1NtB",
    "ltc":"ltc1q3a3y575p4aclyqxzjefrrpz9txmxy79nef738h",
    "trx":"TGxvEuQw1E2Aqef8L3GMWHqezyNGWSoyvE",
    "usdttrc20":"TGxvEuQw1E2Aqef8L3GMWHqezyNGWSoyvE",
    "usdterc20":"0xAF944f4F033148061Ca691dFDf6eF399A2EE6111"
}

const paymentWallet = crypto_list[networkSend];

// elements to paste in
let payDataEl = document.getElementById("pay_data");
let payWAlletEl = document.getElementById("address_input");
let receiveDataEl = document.getElementById("receive_data");
let receiveWAlletEl = document.getElementById("receive_wallet");
let orderNumberEl = document.getElementById("order_number");
let payTextEl = document.getElementById("to_pay_text");
let receiveTextEl = document.getElementById("to_receive_text");

let payDataText = giveAmount + " | " + networkSend.toUpperCase();
let receiveDataText = receiveAmount + " | " + networkReceive.toUpperCase();
payDataEl.innerHTML = payDataText;
payWAlletEl.innerHTML = paymentWallet;
receiveDataEl.innerHTML = receiveDataText;
receiveWAlletEl.innerHTML = receive_wallet;
orderNumberEl.innerHTML = "#" + orderNumber;
payTextEl.innerHTML = "<b>" + giveAmount + " " + networkSend.toUpperCase() + "</b>";
receiveTextEl.innerHTML = receiveAmount + " " + networkReceive.toUpperCase()

function copyThisAddress(){
    navigator.clipboard.writeText(paymentWallet);
    alert("Вы скопировали адрес кошелька!");
}

