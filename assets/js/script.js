/**
 * jQuery.deparam - The oposite of jQuery param. Creates an object of query string parameters.
 *
 * Credits for the idea and Regex:
 * http://stevenbenner.com/2010/03/javascript-regex-trick-parse-a-query-string-into-an-object/
 */
(function($) {
  $.deparam = $.deparam || function(uri) {
    if (uri === undefined) {
      uri = window.location.search;
    }
    var queryString = {};
    uri.replace(
      new RegExp(
        "([^?=&]+)(=([^&#]*))?", "g"),
      function($0, $1, $2, $3) {
        queryString[$1] = $3;
      }
    );
    return queryString;
  };
})(jQuery);
// core js
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var core = {
  getRegionOptions: function(callback) {
    return $.get('/regions.php', function(data) {
      var html = '';
      for (var index = 0; index < data.length; ++index) {
        html += '<option value="' + data[index].id + '">' + data[index].title + '</option>';
      }
      callback(html);
    }, 'json');
  },
  additionalCode: function() {
    var lead = getParameterByName('lead'),
      hash = getParameterByName('hash');
    return $.get('/additional-code.php', {
      lead_id: lead,
      prefix: hash
    });
  },
  hit: function(prefix) {
    return $.get('/hit.js', {
      'prefix': prefix || get_prefix()
    });
  },
  target: function(prefix) {
    return $.get('/target.js', {
      'prefix': prefix || get_prefix()
    });
  },
  init: function() {
    document.cookie = 'search_query=' + get_search_param();
  }
};

// start script js
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

jQuery(document).ready(function($) {

  core.init();

  $('form input').focus(function() {
    $(this).removeClass('error');
  });


  $("div.line li").click(function() {
    if ($(this).hasClass("ok") && !$(this).hasClass("cur")) {
      if (($(this).find('span').text() < $("div.line li.cur").find('span').text()) || check_step($("div.line li.cur").find('span').text())) {
        show_step($(this).find('span').text());
      }
    }
  });

  $("form div.next").click(function() {
    if (check_step($("div.line li.cur").find('span').text())) {
      next_step();
    }
  });


  function heigthcontroll() {

    if ($('body').height() < 700) {
      $('header').height(167);
    } else {
      $('header').height(367);
    }
    setTimeout(function() {
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
  } else {
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
  } else {
    $('form input[name="name"]').addClass('error');
    ok = ok && false;
  }

  if (phone.length > 9) {
    ok = ok && true;
  } else {
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
  } else {
    str = textblock.data('str');
  }


  var summ = parseInt(del_spaces($('form input[name="summ"]').val()));

  var c_d = [];

  if (summ <= 100000) {
    c_d = c_data.do100;
  } else if (summ <= 300000) {
    c_d = c_data.do300;
  } else if (summ <= 750000) {
    c_d = c_data.do750;
  } else if (summ <= 1000000) {
    c_d = c_data.do1000;
  } else if (summ <= 3000000) {
    c_d = c_data.do3000;
  } else if (summ > 3000000) {
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
  } else {
    str = textblock.data('str');
  }


  var summ = parseInt(del_spaces($('form input[name="summ"]').val()));

  var c_d = [];

  if (summ <= 100000) {
    c_d = c_data.do100;
  } else if (summ <= 300000) {
    c_d = c_data.do300;
  } else if (summ <= 750000) {
    c_d = c_data.do750;
  } else if (summ <= 1000000) {
    c_d = c_data.do1000;
  } else if (summ <= 3000000) {
    c_d = c_data.do3000;
  } else if (summ > 3000000) {
    c_d = c_data.posle3000;
  }
  prog = c_d.c_program;
  bank = c_d.c_inbank;


  if ($('#dataform select[name="region"]').val() == "Санкт-Петербург") {
    prog = parseInt(prog * 1);
    bank = parseInt(bank * 1);
  } else if ($('#dataform select[name="region"]').val() == "Москва") {
    prog = parseInt(prog * 1.4);
    bank = parseInt(bank * 1.4);
  } else {
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
  } else {
    str = textblock.data('str');
  }


  var s = parseInt(del_spaces($('form input[name="summ"]').val()));

  var i = 0.19 / 12
  var n1 = 12,
    n2 = 24,
    n3 = 36;

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

  glcore.createLead(data).done(function(response) {
    try {
      ga('send', 'event', 'lead', 'post', 'Размещение заявки', del_spaces(data.credit_value));
    } catch (e) {
      console.log(e);
    }
    try {
      yaCounter.reachGoal('ZAYAVKA');
    } catch (e) {
      console.log(e);
    }
    window.location.href = '/result.html?loc=' + getPrefix();
  }).fail(function(response) {
    alert("К сожалению, Ваша заявка не отправлена из-за технических неполадок на сервере. " +
      "Попробуйте повторить запрос позже!");
    console.log(response);
  });
}

$("#dataform").on("submit", function(e) {
  e.preventDefault();

  $(this).addClass('current-form');
  var currForm = $(this),
    credit_value = del_spaces($('#dataform input[name="summ"]').val()),
    residence_region = $('#dataform select[name="region"]').val(),
    residence_registration = ($('#dataform input[name="region_registration"]').attr('checked') ? "1" : "0"),
    pledge_object = $('#dataform select[name="object_type"]').val(),
    name = $('#dataform input[name="name"]').val(),
    phone = $('#dataform input[name="phone"]').val(),
    email = $('#dataform input[name="email"]').val(),
    age = $('#dataform select[name="age"]').val(),
    postData = $(this).serializeArray(),
    formURL = $(this).attr("action"),
    thanx = $(".current-form .thanx"),
    message = $(".current-form .message");

  $(message).fadeIn(200);
  if (name != null && name.length == 0) {
    $('form input[name="name"]').addClass('error');
    event.preventDefault();
  } else if ( phone.length < 9) {
    $('form input[name="phone"]').addClass('error');
    event.preventDefault();
  } else {

    $.ajax({
      url: formURL,
      type: 'POST',
      data: postData,
      beforeSend: function() {
        $(message).html("Отправляем...");
      },
      success: function(data) {
        $('.step4').addClass('hidden');
        $('.step5').addClass('visible');
      }
    });
  };

});

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

// aftermach
var f_data = {
  bank: 584,
  credit: 1746
};

var c_data = {
  do100: {
    c_program: 253,
    c_inbank: 166,
    c_ot: 18,
    c_do: 35
  },
  do300: {
    c_program: 253,
    c_inbank: 166,
    c_ot: 18,
    c_do: 35
  },
  do750: {
    c_program: 213,
    c_inbank: 137,
    c_ot: 14,
    c_do: 32
  },
  do1000: {
    c_program: 43,
    c_inbank: 80,
    c_ot: 14,
    c_do: 30
  },
  do3000: {
    c_program: 13,
    c_inbank: 20,
    c_ot: 15,
    c_do: 22
  },
  posle3000: {
    c_program: 11,
    c_inbank: 5,
    c_ot: 15,
    c_do: 55
  }
};

var f_data = {
  ndfl: 1,
  fbanka: 0.90,
  fsvobod: 0.80,
  fnet: 0.50
};
