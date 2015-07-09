function post_to_url(e,t,a){a=a||"post";var n=document.createElement("form");n.setAttribute("method",a),n.setAttribute("action",e);for(var r in t)if(t.hasOwnProperty(r)){var s=document.createElement("input");s.setAttribute("type","hidden"),s.setAttribute("name",r),s.setAttribute("value",t[r]),n.appendChild(s)}document.body.appendChild(n),n.submit()}function show_step(e){pre_step(e),$("section div.step").fadeOut("fast"),$("div.line li").removeClass("cur"),$("div.line li").eq(e-1).addClass("cur"),$("div.line li").eq(e-1).addClass("ok"),$("section div.step"+e).fadeIn("fast"),$("section div.step div.infoblock div.text").fadeOut("fast"),$("section div.step"+e+" div.infoblock div.text").fadeIn("slow")}function next_step(){var e=parseInt($("div.line li.cur").find("span").text())+1;5==e?pre_formsend():show_step(e)}function check_step(e){switch(e=parseInt(e)){case 1:return check_step1();case 2:return check_step2();case 3:return check_step3();case 4:return check_step4();case 5:}}function check_step1(){var e=parseInt(del_spaces($('form input[name="summ"]').val())),t=!isNaN(e);return t&&void 0!==window.summ__gte&&(t=t&&e>=window.summ__gte,t||($('form input[name="summ"]').addClass("error"),alert("Сумма кредита должна быть не менее "+window.summ__gte+" рублей."))),t}function check_step2(){return!0}function check_step3(){return!0}function check_step4(){var e=del_spaces($('form input[name="name"]').val()),t=del_spaces($('form input[name="phone"]').val()),a=!0;return e.length>3?a=a&&!0:($('form input[name="name"]').addClass("error"),a=a&&!1),t.length>9?a=a&&!0:($('form input[name="phone"]').addClass("error"),a=a&&!1),a}function pre_step(e){switch(e=parseInt(e)){case 1:break;case 2:pre_step2();break;case 3:pre_step3();break;case 4:pre_step4();break;case 5:}}function pre_step2(){var e=$("section div.step2 div.infoblock div.text"),t="";void 0===e.data("str")?(t=e.html(),e.data("str",t)):t=e.data("str");var a=parseInt(del_spaces($('form input[name="summ"]').val())),n=[];1e5>=a?n=c_data.do100:3e5>=a?n=c_data.do300:75e4>=a?n=c_data.do750:1e6>=a?n=c_data.do1000:3e6>=a?n=c_data.do3000:a>3e6&&(n=c_data.posle3000),prog=n.c_program,bank=n.c_inbank,prog=parseInt(1.7*prog),bank=parseInt(1.7*bank)}function pre_step3(){var e=$("section div.step3 div.infoblock div.text"),t="";void 0===e.data("str")?(t=e.html(),e.data("str",t)):t=e.data("str");var a=parseInt(del_spaces($('form input[name="summ"]').val())),n=[];1e5>=a?n=c_data.do100:3e5>=a?n=c_data.do300:75e4>=a?n=c_data.do750:1e6>=a?n=c_data.do1000:3e6>=a?n=c_data.do3000:a>3e6&&(n=c_data.posle3000),prog=n.c_program,bank=n.c_inbank,"Санкт-Петербург"==$('#dataform select[name="region"]').val()?(prog=parseInt(1*prog),bank=parseInt(1*bank)):"Москва"==$('#dataform select[name="region"]').val()?(prog=parseInt(1.4*prog),bank=parseInt(1.4*bank)):(prog=parseInt(.7*prog),bank=parseInt(.7*bank))}function pre_step4(){var e=$("section div.step4 div.infoblock div.text"),t="";void 0===e.data("str")?(t=e.html(),e.data("str",t)):t=e.data("str");{var a=parseInt(del_spaces($('form input[name="summ"]').val())),n=.19/12,r=12,s=24,o=36,i=n*Math.pow(1+n,r)/(Math.pow(1+n,r)-1),c=n*Math.pow(1+n,s)/(Math.pow(1+n,s)-1),d=n*Math.pow(1+n,o)/(Math.pow(1+n,o)-1);parseInt(i*a),parseInt(c*a),parseInt(d*a)}}function pre_formsend(){for(var e=!0,t=1;5>t;t++)check_step(t)||(show_step(t),e=!1);e&&formsend()}function formsend(){var e={partner_id:getPrefix(),source_id:7,credit_value:del_spaces($('#dataform input[name="summ"]').val()),residence_region:$('#dataform select[name="region"]').val(),residence_registration:$('#dataform input[name="region_registration"]').attr("checked")?"1":"0",pledge_object:$('#dataform select[name="object_type"]').val(),name:$('#dataform input[name="name"]').val(),phone:$('#dataform input[name="phone"]').val(),email:$('#dataform input[name="email"]').val(),age:$('#dataform select[name="age"]').val()};glcore.createLead(e).done(function(t){try{ga("send","event","lead","post","Размещение заявки",del_spaces(e.credit_value))}catch(a){console.log(a)}try{yaCounter.reachGoal("ZAYAVKA")}catch(a){console.log(a)}window.location.href="/result.html?loc="+getPrefix()}).fail(function(e){alert("К сожалению, Ваша заявка не отправлена из-за технических неполадок на сервере. Попробуйте повторить запрос позже!"),console.log(e)})}function getPrefix(){return jQuery.deparam().loc||"fupefpic"}function get_search_param(){return window.location.search}function str_replace(e,t,a){return a.split(e).join(t)}function del_spaces(e){return e=e.replace(/\s/g,"")}function validateEmail(e){var t=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)}jQuery(document).ready(function(e){function t(){e("header").height(e("body").height()<700?167:367),setTimeout(function(){t()},100)}core.init(),e("form input").focus(function(){e(this).removeClass("error")}),e("div.line li").click(function(){e(this).hasClass("ok")&&!e(this).hasClass("cur")&&(e(this).find("span").text()<e("div.line li.cur").find("span").text()||check_step(e("div.line li.cur").find("span").text()))&&show_step(e(this).find("span").text())}),e("form div.next").click(function(){check_step(e("div.line li.cur").find("span").text())&&next_step()}),t()});