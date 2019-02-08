$(document).ready(function() {

  var width = $(window).width();
  $(window).resize(function(){
    width = $(window).width();
  });

 //Всплывашка
 $(".fancybox").fancybox();

 if (width>975){

  //Анимация
  $("h1,.header_main .h3, .header_main .btn_shadow").animated("fadeInUp");
  $(".s_company .text").animated("fadeInRight");
  $(".s_company .item").animated("fadeIn");
  $(".s_services .item").animated("fadeInUp");
  $(".s_services .banks_logo .img").animated("zoomIn");
  $(".s_offer .wrap > *").animated("fadeInRight");
  $(".s_advantages .item").animated("fadeInLeft");
  $(".s_team .item .right > *").animated("fadeInRight");

   //анимация при прокрутке
   function animationScroll(section, block, animation){
     $(window).on("scroll load resize", function(){
       var scheme_top = $(section).offset().top;
       var w_top = $(window).scrollTop();
       var w_height = $(window).height();
       var top_offset_height = w_height/100*30;

       if(w_top + top_offset_height >= scheme_top){
        $(section+" "+block).addClass(animation+" animated").css("opacity","1");
      }

    });
   }
   animationScroll(".s_scheme",".item","zoomIn");
   animationScroll(".s_contacts",".bg","fadeInRight");

}else $(".header_main h1, .header_main .h3, .s_scheme .item, .s_contacts .wrap .bg").css("opacity","1");


//название формы
$(".fancybox[href='#callback']").click(function(){
  $("#callback input[name='form']").val($(this).data("title"));
});

 //маска
 $("input[name='phone']").mask("+7(999) 999-99-99");

//убрать подсказку с инпута
$("input[name='name']").focus(function(){
  if ($(this).val()=="") {
    $(this).attr('placeholder','');
  }
});
$("input[name='name']").blur(function(){
  if ($(this).val()=="") {
    $(this).attr('placeholder','Введите ваше имя');
  }
});

 //проверить поле

 $("input[name='phone'],input[name='name']").focus(function(){
  $(this).removeClass("ierror");
});
 $("input[name='phone'],input[name='name']").blur(function(){
  if ($(this).val()=="") {
    $(this).addClass("ierror");
  }
});

  //список
  $('select[name="city"]').styler({
    selectPlaceholder: 'Выберите ближайший офис'
  });
  //убрать ошибку при выборе
  $(".jq-selectbox li").click(function(){
  $(this).parents(".jq-selectbox").find(".jq-selectbox__select").removeClass("ierror");
 });

//переключатель
$(".tabs .tab").click(function(){
  var tabs = $(this).parents("section");
  $(".tab",tabs).removeClass("active").eq($(this).index()).addClass("active");
  $(".tab_item",tabs).hide().eq($(this).index()).fadeIn();
});

   //слайдер
   $(".s_team .carousel").owlCarousel({
    items : 4,
    smartSpeed: 500,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    stopOnHover : true,
    loop:true,
    nav: true,
    dots: false,
    navText: ['Назад','Вперед'],
    responsive:{
      0:{
        items: 1,
        autoplay: false
      },
      600:{
        items: 2,
        autoplay: false
      },
      1000:{
        items: 4
      }
    }
  });
   $(".s_reviews .carousel").owlCarousel({
    items : 1,
    smartSpeed: 500,
    autoHeight: true,
    loop:true,
    nav: true,
    dots: false,
    navText: ['Назад','Вперед']
  });

   //переключатель чекбокса
   $(".input_check .check").click(function(){
    $(this).toggleClass("active");
  });

 //Отправка формы
 $("form").submit(function(e) {
  e.preventDefault;
  var f = $(this);
  $('.ierror', f).removeClass('ierror');
  var name = $('input[name="name"]', f).val();
  var phone = $('input[name="phone"]', f).val();

  var error = false;
  if((name == '') && (typeof name != "undefined")) {
    $('input[name="name"]', f).addClass('ierror');
    error = true;
  }
  if((phone == '') && (typeof phone != "undefined")) {
    $('input[name="phone"]', f).addClass('ierror');
    error = true;
  } 
  if (!$('.input_check .check',f).hasClass("active")) {
   $('.input_check .check',f).addClass('ierror');
   error = true;
 }
 if(error) {
  return false;
}
$.ajax({
  type: "POST",
  url: "mail.php",
  data: $(this).serialize()
}).done(function() {
  $.fancybox.open("#thanks");
  f.trigger( 'reset' );
});
return false;
});

//  //поменять цвет меню при скролле
//  header_bg();
//  $(window).scroll(function(){
//   header_bg();
// });
//  function header_bg(){
//   if ($(window).scrollTop()>1) {
//     if ($(".header_top").hasClass("header_bg")==false){
//      $(".header_top").addClass("header_bg");
//    }
//  }else $(".header_top").removeClass("header_bg");
// }

// //скролл к блоку
// $(".scroll").on("click","a", function (event) {
//   event.preventDefault();
//   var top_offset = 90;
//   if (width<975) top_offset = 45;
//   var id  = $(this).attr('href');
//   var top = $(id).offset().top-top_offset;
//   $('body,html').animate({scrollTop: top}, 1500);
// });

// //активный пункт меню
// jQuery(window).scroll(function(){
//  var $sections = $('section,header,#services');
//  $sections.each(function(i,el){
//   var top  = $(el).offset().top;
//   var bottom = top +$(el).height();
//   var scroll = $(window).scrollTop()+100;
//   var id = $(el).attr('id');

//   if( scroll > top && scroll < bottom){
//     $('.menu li.active').removeClass('active');
//     $('.menu a[href="#'+id+'"]').parent().addClass('active');
//   }
// })
// });

// //открыть меню
// $(".menu_small").click(function(){
//   $(this).find('.c-hamburger').toggleClass("is-active");
//   $("nav").toggleClass("menu_open");
// });
// $("nav a").click(function(){
//  $("nav").removeClass("menu_open");
//  $(".c-hamburger").removeClass("is-active");
// });
// });
// $(window).load(function(){
//   $(".tab_item:not(:first-child)").css("display","none");
// });
