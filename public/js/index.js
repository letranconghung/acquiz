$(document).ready(function () {
  $('.captionElement').fadeIn(5000);
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
function handleWidth(x){
  if(x.matches){
    $('#mainNav').css('backgroundColor', 'rgba(255, 255, 255,0.9)');
    $('#mainNav .navbar-brand,#mainNav div .navbar-nav .nav-item .nav-link').css('color', 'rgba(37, 192, 140, 0.884)');
    $('.fa-bars').css('color', 'rgba(37, 192, 140, 0.884)');
    $('#mainNav .navbar-brand,#mainNav div .navbar-nav .nav-item .nav-link').mouseenter((event)=>{
      event.target.style.color = 'rgb(0,0,0)';
    });
    $('#mainNav .navbar-brand,#mainNav div .navbar-nav .nav-item .nav-link').mouseleave((event)=>{
      event.target.style.color = 'rgba(37, 192, 140, 0.884)';
    });
  }else{
    $('#mainNav').css('backgroundColor', 'transparent');
    $('#mainNav .navbar-brand,#mainNav div .navbar-nav .nav-item .nav-link').css('color', 'rgba(255, 255, 255,0.9)');
    $('.fa-bars').css('color', 'white');
    $('#mainNav .navbar-brand,#mainNav div .navbar-nav .nav-item .nav-link').mouseenter((event)=>{
      event.target.style.color = 'rgb(0,0,0)';
    });
    $('#mainNav .navbar-brand,#mainNav div .navbar-nav .nav-item .nav-link').mouseleave((event)=>{
      event.target.style.color = 'rgba(255, 255, 255,0.9)';
    });
  }
}
const x = window.matchMedia("(max-width: 767.98px)");
handleWidth(x);
x.addListener(handleWidth);



window.onscroll = function(){
  if(window.innerWidth >=992){
    if(window.scrollY >= ($('#mainNav').height()*5)){
      $('#mainNav').css('backgroundColor', 'rgba(255, 255, 255,0.9)');
      $('#mainNav .navbar-brand,#mainNav div .navbar-nav .nav-item .nav-link').css('color', 'rgba(37, 192, 140, 0.884)');
      $('.fa-bars').css('color', 'rgba(37, 192, 140, 0.884)');
      $('#mainNav .navbar-brand,#mainNav div .navbar-nav .nav-item .nav-link').mouseenter((event)=>{
        event.target.style.color = 'rgb(0,0,0)';
      });
      $('#mainNav .navbar-brand,#mainNav div .navbar-nav .nav-item .nav-link').mouseleave((event)=>{
        event.target.style.color = 'rgba(37, 192, 140, 0.884)';
      });
    }else{
      $('#mainNav').css('backgroundColor', 'transparent');
      $('#mainNav .navbar-brand,#mainNav div .navbar-nav .nav-item .nav-link').css('color', 'rgba(255, 255, 255,0.9)');
      $('.fa-bars').css('color', 'white');
      $('#mainNav .navbar-brand,#mainNav div .navbar-nav .nav-item .nav-link').mouseenter((event)=>{
        event.target.style.color = 'rgb(0,0,0)';
      });
      $('#mainNav .navbar-brand,#mainNav div .navbar-nav .nav-item .nav-link').mouseleave((event)=>{
        event.target.style.color = 'rgba(255, 255, 255,0.9)';
      });
    }
  }
}

