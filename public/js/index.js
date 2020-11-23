// caption fadeIn
$(document).ready(function () {
  $('.captionElement').fadeIn(2000);
});

// smooth reference jumping
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// navbar colors
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

// quizsets display
function generateQuizsetUI(quizset){
  quizsetMetaData = quizset.data();
  quizsetName = quizsetMetaData.quizsetName;
  ownerUserID = quizsetMetaData.ownerUserID;
  var htmlRes = `<li class = "quizset"> Quizset: ${quizsetName} by ${ownerUserID}
  <ol>`;


  db.collection(quizset.ref.path + "/quizzes").get().then(quizzes => {
    quizzes.docs.forEach(doc => {
      var quiz = doc.data();
      var res = `
      <li  class = "quiz">${quiz.question} (Correct Answer: ${quiz.answers[quiz.correctIndex]})
        <ul>`;
      res += `
          <li> ${quiz.answers[0]} </li>
          <li> ${quiz.answers[1]} </li>
          <li> ${quiz.answers[2]} </li>
          <li> ${quiz.answers[3]} </li>`;
      res += `
        </ul>
      </li>`;
      htmlRes+= res;
    });
    htmlRes += `
    </ol>
    </li>`;
    console.log(htmlRes);
    $("#quizsetList").append(htmlRes);
  });

  
  
}

