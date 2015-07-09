function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

jQuery(document).ready(function ($) {

    core.init();

    $('form input').focus(function () {
        $(this).removeClass('error');
    });


    $("div.line li").click(function () {
        if ($(this).hasClass("ok") && !$(this).hasClass("cur")) {
            if (($(this).find('span').text() < $("div.line li.cur").find('span').text()) || check_step($("div.line li.cur").find('span').text())) {
                show_step($(this).find('span').text());
            }
        }
    });

    $("form div.next").click(function () {
        if (check_step($("div.line li.cur").find('span').text())) {
            next_step();
        }
    });


    function heigthcontroll() {

        if ($('body').height() < 700) {
            $('header').height(167);
        }
        else {
            $('header').height(367);
        }
        setTimeout(function () {
            heigthcontroll();
        }, 100);
    }

    heigthcontroll();


});

function show_step(num) {
    pre_step(num);
    $("section div.step").fadeOut("fast");
    $("div.line li").removeClass("cur");
    $("div.line li").eq(num - 1).addClass("cur");
    $("div.line li").eq(num - 1).addClass("ok");
    $("section div.step" + num).fadeIn("fast");
    $("section div.step div.infoblock div.text").fadeOut("fast");
    $("section div.step" + num + " div.infoblock div.text").fadeIn("slow");
}

function next_step() {
    var go_to = parseInt($("div.line li.cur").find('span').text()) + 1;
    if (go_to == 5) {
        pre_formsend();
    }
    else {
        show_step(go_to);
    }
}

function check_step(step) {
    step = parseInt(step);
    switch (step) {
        case 1:
            return check_step1();

            break
        case 2:
            return check_step2();
            break
        case 3:
            return check_step3();
            break
        case 4:
            return check_step4();
            break
        case 5:

            break

    }
}


function check_step1() {
    var summ = parseInt(del_spaces($('form input[name="summ"]').val()));
    var ok = !isNaN(summ);
    if (ok && window.summ__gte !== undefined) {
        /* если установлено ограничение суммы снизу, то учитываем это в проверке и отображаем соответствующий alert */
        ok = ok && summ >= window.summ__gte;
        if (!ok) {
            $('form input[name="summ"]').addClass('error');
            alert('Сумма кредита должна быть не менее ' + window.summ__gte + ' рублей.');
        }
    }
   return ok;
}

function check_step2() {
   return true;
}

function check_step3() {
   return true;
}

function check_step4() {
    var name = del_spaces($('form input[name="name"]').val());
    var phone = del_spaces($('form input[name="phone"]').val());
    //var email = del_spaces($('form input[name="email"]').val());

    var ok = true;
    if (name.length > 3) {
        ok = ok && true;
    }
    else {
        $('form input[name="name"]').addClass('error');
        ok = ok && false;
    }

    if (phone.length > 9) {
        ok = ok && true;
    }
    else {
        $('form input[name="phone"]').addClass('error');
        ok = ok && false;
    }

    /*
     if (validateEmail(email))
     {
     ok = ok && true;
     }
     else
     {
     $('form input[name="email"]').addClass('error');
     ok = ok && false;
     }
     */

    return ok;
}


function pre_step(step) {
    step = parseInt(step);
    switch (step) {
        case 1:

            break
        case 2:
            pre_step2();
            break
        case 3:
            pre_step3();
            break
        case 4:
            pre_step4();
            break
        case 5:

            break

    }
}

function pre_step2() {
    var textblock = $("section div.step2 div.infoblock div.text");
    var str = "";
    if (textblock.data('str') === undefined) {
        str = textblock.html();
        textblock.data('str', str);
    }
    else {
        str = textblock.data('str');
    }


    var summ = parseInt(del_spaces($('form input[name="summ"]').val()));

    var c_d = [];

    if (summ <= 100000) {
        c_d = c_data.do100;
    }
    else if (summ <= 300000) {
        c_d = c_data.do300;
    }
    else if (summ <= 750000) {
        c_d = c_data.do750;
    }
    else if (summ <= 1000000) {
        c_d = c_data.do1000;
    }
    else if (summ <= 3000000) {
        c_d = c_data.do3000;
    }
    else if (summ > 3000000) {
        c_d = c_data.posle3000;
    }


    prog = c_d.c_program;
    bank = c_d.c_inbank;

    prog = parseInt(prog * 1.7)
    bank = parseInt(bank * 1.7);

}


function pre_step3() {
    var textblock = $("section div.step3 div.infoblock div.text");
    var str = "";
    if (textblock.data('str') === undefined) {
        str = textblock.html();
        textblock.data('str', str);
    }
    else {
        str = textblock.data('str');
    }


    var summ = parseInt(del_spaces($('form input[name="summ"]').val()));

    var c_d = [];

    if (summ <= 100000) {
        c_d = c_data.do100;
    }
    else if (summ <= 300000) {
        c_d = c_data.do300;
    }
    else if (summ <= 750000) {
        c_d = c_data.do750;
    }
    else if (summ <= 1000000) {
        c_d = c_data.do1000;
    }
    else if (summ <= 3000000) {
        c_d = c_data.do3000;
    }
    else if (summ > 3000000) {
        c_d = c_data.posle3000;
    }
    prog = c_d.c_program;
    bank = c_d.c_inbank;


    if ($('#dataform select[name="region"]').val() == "Санкт-Петербург") {
        prog = parseInt(prog * 1);
        bank = parseInt(bank * 1);
    }
    else if ($('#dataform select[name="region"]').val() == "Москва") {
        prog = parseInt(prog * 1.4);
        bank = parseInt(bank * 1.4);
    }
    else {
        prog = parseInt(prog * 0.7);
        bank = parseInt(bank * 0.7);
    }

}


function pre_step4() {
    var textblock = $("section div.step4 div.infoblock div.text");
    var str = "";
    if (textblock.data('str') === undefined) {
        str = textblock.html();
        textblock.data('str', str);
    }
    else {
        str = textblock.data('str');
    }


    var s = parseInt(del_spaces($('form input[name="summ"]').val()));

    var i = 0.19 / 12
    var n1 = 12, n2 = 24, n3 = 36;

    var k1 = (i * Math.pow((1 + i), n1)) / (Math.pow((1 + i), n1) - 1);
    var k2 = (i * Math.pow((1 + i), n2)) / (Math.pow((1 + i), n2) - 1);
    var k3 = (i * Math.pow((1 + i), n3)) / (Math.pow((1 + i), n3) - 1);

    var a1 = parseInt(k1 * s);
    var a2 = parseInt(k2 * s);
    var a3 = parseInt(k3 * s);

}

function pre_formsend() {
    var ok = true;
    for (var step_i = 1; step_i < 5; step_i++) {
        if (!check_step(step_i)) {
            show_step(step_i);
            ok = false;
        }
    }

    if (ok) {
        formsend();
    }
}

function formsend() {
    var data = {
        partner_id: getPrefix(),
        source_id: 7,
        credit_value: del_spaces($('#dataform input[name="summ"]').val()),
        residence_region: $('#dataform select[name="region"]').val(),
        residence_registration: ($('#dataform input[name="region_registration"]').attr('checked') ? "1" : "0"),
        pledge_object: $('#dataform select[name="object_type"]').val(),
        name: $('#dataform input[name="name"]').val(),
        phone: $('#dataform input[name="phone"]').val(),
        email: $('#dataform input[name="email"]').val(),
        age: $('#dataform select[name="age"]').val()
    };

    glcore.createLead(data).done(function (response) {
        try {
            ga('send', 'event', 'lead', 'post', 'Размещение заявки', del_spaces(data.credit_value));
        }
        catch (e) {
            console.log(e);
        }
        try {
            yaCounter.reachGoal('ZAYAVKA');
        }
        catch (e) {
            console.log(e);
        }
        window.location.href = '/result.html?loc=' + getPrefix();
    }).fail(function (response) {
        alert("К сожалению, Ваша заявка не отправлена из-за технических неполадок на сервере. " +
          "Попробуйте повторить запрос позже!");
        console.log(response);
    });
}

function getPrefix() {
    return jQuery.deparam().loc || "fupefpic";
}

function get_search_param() {
    return window.location.search
}

function str_replace(search, replace, subject) {
    return subject.split(search).join(replace);
}

function del_spaces(str) {
    str = str.replace(/\s/g, '');
    return str;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
