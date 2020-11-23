// caption fadeIn
$(document).ready(function () {
  $('.captionElement').fadeIn(2000);
});

// set up logged-in/logged-out UI
function setupUI(user){
  $(".logged-in, .logged-out").removeClass("d-none");
  if(user){
    console.log(user);
    var myAccount = `
      <p> <b> Account Email:</b> ${user.email}</p>
      <p> <b> Name:</b> ${user.displayName} </p>
      <p> <b> Unique UserID:</b> ${user.uid} </p>
    `;
    $("#myAccountField").html(myAccount);
    // $('#navAccountLink').text(`Hi, ${user.displayName}`);
    $("#welcomeLanding").html(`<h1>Hi, ${user.displayName}</h1>`);
    $(".logged-in").css("display", "inherit");
    $(".logged-out").css("display", "none");
    // get data
    db.collection('quizsets').onSnapshot(snapshot =>{
      generateQuizsetUILeft(snapshot.docs);
    });
  } else{
    $("#myAccountDetails").html('');
    $("#welcomeMessage").html('');
    $(".logged-out").css("display", "inherit");
    $(".logged-in").css("display", "none");
  }
}

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
function generateQuizsetUILeft(docs){
  // create left hand side UI
  var left = `
  <div class="card" id="quizsetList">
  <ul class="list-group list-group-flush">`;
  docs.forEach(quizset =>{
    left+= `
    <li class="list-group-item btn text-left font2 quizsetChoice questionsHiding">${quizset.data().quizsetName}</li>
    `;
  });
  left += `
  </ul>
  </div>`;
  console.log(left);
  $("#quizsetListContainer").html(left);
}
function generateQuizsetUIRight(qsName){
  var quizset;
  db.collection('quizsets').onSnapshot(snapshot =>{
    // find the document (quizset) that has the same quizsetName as the one in html
    snapshot.docs.forEach(doc =>{
      if(doc.data().quizsetName == qsName){
        console.log('found');
        quizset = doc;
      }
    });
    db.collection(quizset.ref.path + "/quizzes").onSnapshot(quizzes => {
      var right = ``;
      quizzes.docs.forEach(doc =>{
        right += `
        <div class="card">
        <div class="card-header">`;
        var quiz = doc.data();
        // add question title
        right += `
        <h5 class="font2 m-0 p-0">${quiz.question}</h5>`;
        right += `
        </div>
        <div class="card-body">
        <ol type="A">`;
        //add answers
        for(var i = 0;i < quiz.answers.length; i++){
          var answer = quiz.answers[i];
          if(i == quiz.correctIndex){
            right += `
            <li class="font2 fontsize2"> <span class="font2 fontsize2 correctAnswer">${answer}</span></li>`
          }else{
            right += `
            <li class="font2 fontsize2"> <span class="font2 fontsize2">${answer}</span></li>`
          }
        }
        right += `
        </ol>
        </div>
        </div>`;
        console.log(right);
      });
      console.log("final", right);
      $("#questionListContainer").html(right);
    });
  });
}

// note-to-self: always attach click listener to a static element, then find the dynamic element
// quizsetList expander
$('#quizsetListContainer').on('click','.quizsetChoice', function(e) {
  targ = e.target; 
  if($(targ).hasClass('questionsHiding')){
    $(targ).parent().children().css('background-color', 'white');
    $(targ).css('background-color', 'aquamarine');
    $(targ).parent().children().addClass('questionsHiding');
    $(targ).parent().children().removeClass('questionsShowing');
    $(targ).removeClass('questionsHiding');
    $(targ).addClass('questionsShowing');
    generateQuizsetUIRight(targ.innerText);
  }else{
    $("#questionListContainer").html('');
    $(targ).parent().children().css('background-color', 'white');
    $(targ).parent().children().addClass('questionsHiding');
    $(targ).parent().children().removeClass('questionsShowing');
  }
});

