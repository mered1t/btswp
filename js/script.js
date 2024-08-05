let giveAmount;
let receiveAmount;
let networkSend;
let networkReceive;
function generate() {
    return Math. floor(Math. random() * 90000) + 10000;
}
function trap(){
    let cautionMessage = document.getElementById("caution_message");
    let cryptoInput = document.getElementById("from").value;
    let cryptoOutput = document.getElementById("to").placeholder;
    let cryptoAddress = document.getElementById("input__get").value;
    let cond = !cryptoInput || (cryptoOutput == "Сколько получаете") || (cryptoAddress.length < 16);
    if(cond){
        cautionMessage.style.display = "block";
        cautionMessage.style.opacity = "100%";
    } else {
        let orderNum = generate();
        localStorage.setItem("giveAmount",giveAmount);
        localStorage.setItem("receiveAmount",receiveAmount);
        localStorage.setItem("networkSend",networkSend);
        localStorage.setItem("networkReceive",networkReceive);
        localStorage.setItem("walletReceive",cryptoAddress);
        localStorage.setItem("orderNumber",orderNum);
        location.href = 'deposit.html';
    }
}

$(document).ready(function() {
    var minUSD = 90;

    $(".preloader").fadeOut(1000);
    $("body").css({
        overflow: "auto",
    });

    wow = new WOW({
        animateClass: "animate__animated",
    });
    wow.init();
    // object for symbols of binance api
    let rate = {
        "btc": "BTCUSDT",
        "eth": "ETHUSDT",
        "ada": "ADAUSDT",
        "bnbbsc": "BNBUSDT",
        "dash": "DASHUSDT",
        "doge": "DOGEUSDT",
        "ltc": "LTCUSDT",
        "xmr": "XMR",
        "trx": "TRXUSDT",
        "usdttrc20": 1,
        "usdterc20": 1
    };
    let inp = document.getElementById("from");


    // function trap(){
    //     alert("as");
    //     let cryptoInput = document.getElementById("from").value;
    //     let cryptoOutput = document.getElementById("to").placeholder;
    //     let cryptoAddress = document.getElementById("input__get").value;
    //     let cond = !cryptoInput || (cryptoOutput == "Сколько получаете") || (cryptoAddress.length < 16);
    //     if(cond){
    //         cautionMessage.style.display = "block";
    //         cautionMessage.style.opacity = "100%";
    //     } else {
    //         let orderNum = generate();
    //         localStorage.setItem("giveAmount",giveAmount);
    //         localStorage.setItem("receiveAmount",receiveAmount);
    //         localStorage.setItem("networkSend",networkSend);
    //         localStorage.setItem("networkReceive",networkReceive);
    //         localStorage.setItem("walletReceive",cryptoAddress);
    //         localStorage.setItem("orderNumber",orderNum);
    //         location.href = 'deposit.html';
    //     }
    // }

    //////////////////////////////////////////////////////////////////////
    function changeInput() {

        // variables for input and choosed crypto data
        let cryptoInput = document.getElementById("from").value;
        let cryptoOutput = document.getElementById("to");
        let cryptoGive = document.getElementById("select__current-give").children[0].alt;
        let cryptoGet = document.getElementById("select__current-get").children[0].alt;
        cryptoOutput.placeholder = "Сколько получаете";
        // changing calculator result
        if(!cryptoInput){
            cryptoOutput.placeholder = "Сколько получаете";
        } else {
            let giveRate = localStorage.getItem("giveRate");
            let getRate = localStorage.getItem("getRate");
            cryptoOutput.placeholder = (cryptoInput * giveRate / getRate).toFixed(2);
            giveAmount = cryptoInput;
            receiveAmount = cryptoOutput.placeholder;
            networkSend = cryptoGive;
            networkReceive = cryptoGet;

        }
    }

    function clickInput(){
        let cryptoOutput = document.getElementById("to");
        let cryptoGive = document.getElementById("select__current-give").children[0].alt;
        let cryptoGet = document.getElementById("select__current-get").children[0].alt;
        const burl = 'https://api.binance.com/api/v3/ticker/price?symbol=';
        cryptoOutput.placeholder = "Сколько получаете";
        // changing calculator result
        if (typeof(rate[cryptoGive]) === "string"){
            let symbol = rate[cryptoGive];
            const url = burl + symbol;
            let ourRequest = new XMLHttpRequest()

            ourRequest.open('GET', url, true);
            ourRequest.onload = function() {
                let str = ourRequest.responseText;
                let price = JSON.parse(str).price;
                let giveRate;
                price = Number(price);
                giveRate = symbol === "LTCUSDT" ? price*1.085 : price;
                localStorage.setItem("giveRate",giveRate);
                //alert("поменяои локал гив");
            }
            ourRequest.send();
        } else {
            localStorage.setItem("giveRate",1);
        };
        if (typeof(rate[cryptoGet]) === "string"){
            let symbol = rate[cryptoGet];
            const url = burl + symbol
            let ourRequest = new XMLHttpRequest()

            ourRequest.open('GET', url, true)
            ourRequest.onload = function() {
                let getRate;
                let str = ourRequest.responseText;
                let price = JSON.parse(str).price;
                price = Number(price);
                getRate = price;
                localStorage.setItem("getRate",getRate);
                //alert("поменяои локал гет");
            }
            ourRequest.send()
        } else {
            localStorage.setItem("getRate",1);
        };
    }
    inp.addEventListener("click",clickInput);
    inp.addEventListener("keyup",changeInput);



    $(".header__burger").click(function() {
        $(this).toggleClass("header__burger_active");
        if ($(".header__menu").hasClass("header__menu_active")) {
            $(".header__menu").fadeOut();
        } else {
            $(".header__menu").fadeIn();
        }
        $(".header__menu").toggleClass("header__menu_active");
    });

    $(".panel__link").click(function(e) {
        e.preventDefault();
        $(".panel__link").removeClass("panel__link_active");
        $(this).addClass("panel__link_active");
        $(".page").fadeOut(0);
        $(".page-" + $(this).data("page")).fadeIn(0);
    });

    $(".panel__btn").click(function(e) {
        e.preventDefault();
        $(".panel__btn").removeClass("panel__btn_active");
        $(this).addClass("panel__btn_active");
        $("#select__body-give .select__item").fadeOut(0);
        $("#select__body-give .select__item" + $(this).attr("data-type")).fadeIn(0);
        $("#select__current-give").html(
            $(
                "#select__body-give .select__item" +
                $(this).attr("data-type") +
                ":first"
            ).html()
        );
        if ($(this).attr("data-type") == "_bank") {
            $("#select__body-get .select__item_bank").fadeOut(0);
        } else {
            $("#select__body-get .select__item_bank").fadeIn(0);
        }
    });

    $(".select").click(function() {
        $(this).find(".select__header").toggleClass("select__header_active");
        $(this).find(".select__body").toggleClass("select__body_active");
    });

    $(".select__item").click(function() {
        $(this)
            .parent()
            .parent()
            .parent()
            .find(".input__text")
            .text($(this).find(".select__img").attr("data-coin"));
        $(this).parent().parent().find(".select__current").html($(this).html());
        if (get_lang() == "ru") {
            $(".panel__title").text(
                "Продать " +
                $("#select__current-give").text() +
                " (" +
                $("#select__current-give").find(".select__img").attr("data-coin") +
                ")" +
                " за " +
                $("#select__current-get").text() +
                " (" +
                $("#select__current-get").find(".select__img").attr("data-coin") +
                ")"
            );
            $("#input__get").attr(
                "placeholder",
                "Ваш адрес " + $.trim($("#select__current-get").text())
            );
        } else {
            $(".panel__title").text(
                "Sell " +
                $("#select__current-give").text() +
                " (" +
                $("#select__current-give").find(".select__img").attr("data-coin") +
                ")" +
                " for " +
                $("#select__current-get").text() +
                " (" +
                $("#select__current-get").find(".select__img").attr("data-coin") +
                ")"
            );
            $("#input__get").attr(
                "placeholder",
                "Your address " + $.trim($("#select__current-get").text())
            );
        }
        get_kurs(
            $("#select__current-give").find(".select__img").attr("data-coin"),
            $("#select__current-get").find(".select__img").attr("data-coin")
        );
        $("#from").val("");
        $("#to").val("");
    });

    $(".input__btn").click(function(e) {
        e.preventDefault();
        if (get_lang() == "ru") {
            if ($.trim($(this).text()) == "Показать") {
                $(this).text("Скрыть");
                $(this).parent().find("input").attr("type", "text");
            } else {
                $(this).text("Показать");
                $(this).parent().find("input").attr("type", "password");
            }
        } else {
            if ($.trim($(this).text()) == "Show") {
                $(this).text("Hide");
                $(this).parent().find("input").attr("type", "text");
            } else {
                $(this).text("Show");
                $(this).parent().find("input").attr("type", "password");
            }
        }
    });

    $(".input__copy").click(function(e) {
        e.preventDefault();
        $(this).css({
            background: "#6ACD7A",
        });
        let $tmp = $("<input>");
        $("body").append($tmp);
        $tmp.val($(this).parent().find("input").val()).select();
        document.execCommand("copy");
        $tmp.remove();
    });

    $(".application__btn-payed").click(function(e) {
        e.preventDefault();
        $(".application__wrapper-info").slideToggle(1000);
        $(".step").removeClass("step_active");
        $(".application__payment-title").addClass(
            "application__payment-title_light"
        );
        $(".application__payment-text").addClass("application__payment-text_light");
        $(".application__payment:nth-child(2) .step").addClass("step_active");
        $(
            ".application__payment:nth-child(2) .application__payment-title"
        ).removeClass("application__payment-title_light");
        $(
            ".application__payment:nth-child(2) .application__payment-text"
        ).removeClass("application__payment-text_light");
        localStorage.setItem("i_payment:" + +$("#id_exchage").val(), "pay");
    });
});

var to_kurs = $("#to_kurs").val();
var coin_dict = $("#coin_dict").val();
var check_reviews = 1;
$(window).on("load", function() {
    if ($(".create_exchange").length) {
        get_kurs(
            $("#select__current-give").find(".select__img").attr("data-coin"),
            $("#select__current-get").find(".select__img").attr("data-coin")
        );

    }
});



$("#req_form").submit(function(event) {
    event.preventDefault();
    let login = $("#req_form").find("input[name='login']").val();
    let email = $("#req_form").find("input[name='email']").val();
    let password = $("#req_form").find("input[name='password']").val();
    let rep_pass = $("#req_form").find("input[name='rep_pass']").val();
    $.ajax({
        url: "/vender/reg.php",
        type: "POST",
        dataType: "json",
        data: {
            login: login,
            email: email,
            password: password,
            rep_pass: rep_pass,
            lang: get_lang(),
        },
        success(data) {
            if (data.status == 200) {
                if (get_lang() == "ru") {
                    document.location.href = "/ru/account.php";
                } else {
                    document.location.href = "/en/account.php";
                }
            } else {
                toastr.error(data.text);
            }
        },
    });
});

$("#sign").submit(function(event) {
    event.preventDefault();
    let login = $("#sign").find("input[name='login']").val();
    let password = $("#sign").find("input[name='password']").val();
    $.ajax({
        url: "/vender/sign.php",
        type: "POST",
        dataType: "json",
        data: {
            login: login,
            password: password,
            lang: get_lang(),
        },
        success(data) {
            if (data.status == 200) {
                if (get_lang() == "ru") {
                    document.location.href = "/ru/account.php";
                } else {
                    document.location.href = "/en/account.php";
                }
            } else {
                toastr.error(data.text);
            }
        },
    });
});

$("#btn_change_pass").click(function(event) {
    var lang = get_lang();
    event.preventDefault();
    let pass = $(".panel__form").find("input[name='pass']").val();
    let req_pass = $(".panel__form").find("input[name='req_pass']").val();
    if (pass == "" || req_pass == "") {
        if (lang == "ru") {
            toastr.error("Заполните все поля!");
        } else {
            toastr.error("Fill in all fields!");
        }
    } else {
        $.ajax({
            url: "/vender/change_pass.php",
            type: "POST",
            dataType: "json",
            data: {
                pass: pass,
                req_pass: req_pass,
                lang: get_lang(),
            },
            success(data) {
                if (data.status == 200) {
                    $("#old_pass").val(pass);
                    if (get_lang() == "ru") {
                        toastr.success("Пароль успешно изменен!");
                    } else {
                        toastr.success("Password changed successfully!");
                    }
                } else {
                    toastr.error(data.message);
                }
            },
        });
    }
});

$("#read_reviews").click((e) => {
    e.preventDefault();
    var arg1 = check_reviews * 6;
    var arg2 = arg1 * 2;
    arg1 = arg1 + 1;
    $.ajax({
        url: "/vender/get_review.php",
        type: "POST",
        dataType: "json",
        data: {
            arg1: arg1,
            arg2: arg2,
        },
        success(data) {
            check_reviews = check_reviews + 1;
            if (get_lang() == "ru") {
                for (var i = 0; i < data.length; i++) {
                    var block =
                        '<div class="reviews__block wow animate__fadeIn" data-wow-delay=".25s"><div class="reviews__block-top"><img src="../img/icons/user.svg" alt="user"><div class="reviews__block-wrapper ml-20"><div class="reviews__block-username">' +
                        data[i].nameRu +
                        '</div><div class="reviews__block-date">' +
                        data[i].data +
                        '</div></div></div><div class="reviews__block-bottom"><p class="reviews__block-text">' +
                        data[i].descriptionsRu +
                        "</p></div></div>";
                    $(".reviews__wrapper").append(block);
                }
                if (data.length != 6) {
                    $("#read_reviews").css("display", "none");
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    var block =
                        '<div class="reviews__block wow animate__fadeIn" data-wow-delay=".25s"><div class="reviews__block-top"><img src="../img/icons/user.svg" alt="user"><div class="reviews__block-wrapper ml-20"><div class="reviews__block-username">' +
                        data[i].nameEn +
                        '</div><div class="reviews__block-date">' +
                        data[i].data +
                        '</div></div></div><div class="reviews__block-bottom"><p class="reviews__block-text">' +
                        data[i].descriptionsEn +
                        "</p></div></div>";
                    $(".reviews__wrapper").append(block);
                }
                if (data.length != 6) {
                    $("#read_reviews").css("display", "none");
                }
            }
        },
    });
});

function get_kurs(from, to) {
    $.ajax({
        url: "/vender/kurs.php",
        type: "POST",
        dataType: "json",
        data: {
            first: from,
            second: to,
        },
        success(data) {
            to_kurs = JSON.parse(data)["estimated_amount"];
        },
    });
}

function round(number) {
    var lengh = number.toString().split(".")[1];
}

function get_lang() {
    var link = window.location.href;
    if (link.includes("/en/")) {
        return "en";
    } else {
        return "ru";
    }
}

document.getElementById("span").addEventListener("click", copyPoop);

function copyPoop() {
    navigator.clipboard.writeText("https://365obmchange.com/ru/index.php");
    alert("You have copied the referal link!");
}


