var quizsetSelected = '';
var ownerQuizsets = {};
// caption fadeIn
$(document).ready(function () {
  $('.captionElement').fadeIn(2000);
  generateQuizsetUIRight('');
});

// set up logged-in/logged-out UI
function setupUI(user){
  if(user){
    var myAccount = `
      <p> <b> Account Email:</b> ${user.email}</p>
      <p> <b> Name:</b> ${user.displayName} </p>
      <p> <b> Unique UserID:</b> ${user.uid} </p>
    `;
    $("#myAccountField").html(myAccount);
    // $("#welcomeLanding").html(`<h1>Hi, ${localDisplayName}</h1>`);
    // get data
    db.collection('quizsets').onSnapshot(snapshot =>{
      generateQuizsetUILeft(snapshot.docs);
    }, err => {});
    $(".logged-in, .logged-out").removeClass("d-none");
    $(".logged-in").css("display", "inherit");
    $(".logged-out").css("display", "none");
  } else{
    $("#myAccountDetails").html('');
    $("#welcomeMessage").html('');
    $(".logged-in, .logged-out").removeClass("d-none");
    $(".logged-out").css("display", "inherit");
    $(".logged-in").css("display", "none");
  }
}

// navbar colors
window.onscroll = function(){
  if(window.innerWidth >=992){
    if(window.scrollY >= ($('#mainNav').outerHeight())){
      $('#mainNav').css('backgroundColor', 'rgb(29, 28, 26)');
    }else{
      $('#mainNav').css('backgroundColor', 'transparent');
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
    if(quizset.data().ownerUID == auth.currentUser.uid){
      if(quizset.id == quizsetSelected){
        left+= `
        <li class="list-group-item btn text-left font2 quizsetChoice" data-questionsDisplay="show" data-docID=${quizset.id}>${quizset.data().quizsetName}</li>`;
      }else{
        left+= `
        <li class="list-group-item btn text-left font2 quizsetChoice" data-questionsDisplay="hide" data-docID=${quizset.id}>${quizset.data().quizsetName}</li>`;
      }
      // to be used in other parts
      ownerQuizsets[quizset.id + ""] = quizset.data().quizsetName;
    }
  });
  left += `
  </ul>
  </div>`;

  console.log();
  if(Object.keys(ownerQuizsets).length != 0){
    $("#quizsetListContainer").html(left);
    updateQuizsetUILeft();
  }else{
    var quizsetBlankFiller = `
    <div class="card">
    <div class="card-body">
    <p class="text-center">
    You currently do not have any quizset. Create one now!
    </p>
    </div>
    </div>`
    $("#quizsetListContainer").html(quizsetBlankFiller);
  }
  
}
function generateQuizsetUIRight(docID){
  if(docID == ''){
    var questionsBlankFiller = `
    <div class="card">
    <div class="card-body">
    <p class="text-center">
    Create or select a quizset to show questions!
    </p>
    </div>
    </div>`
    $("#questionListContainer").html(questionsBlankFiller);
  }else{
    var quizset;
    db.collection('quizsets').onSnapshot(snapshot =>{
      // find the document (quizset) that has the same quizsetName as the one in html
      snapshot.docs.forEach(doc =>{
        if(doc.id == docID){
          quizset = doc;
        }
      }, err => {});
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
        });
        $("#questionListContainer").html(right);
      });
    }, err => {});
  }
}

// note-to-self: always attach click listener to a static element, then find the dynamic element
// quizsetList expander
$('#quizsetListContainer').on('click','.quizsetChoice', function(e) {
  targ = e.target;
  if((quizsetSelected == '') || ($(targ).attr('data-docID') != quizsetSelected)){
    // hide everything except for clicked element
    quizsetSelected = $(targ).attr('data-docID');
  }else{
    quizsetSelected = '';
  }
  updateQuizsetUILeft();
});

$('#createQuestionModal').on('show.bs.modal', function (e) {
  console.log(quizsetSelected, ownerQuizsets);
  var optionsHtml = '';
  for(var key in ownerQuizsets) {
    console.log(key, quizsetSelected);
    if(key!=quizsetSelected){
      var val = ownerQuizsets[key];
      optionsHtml += `
      <option value=${key}>${val}</option>`;
      $("#createQuestionQuizsetField").html(optionsHtml);
    }
  }
  if(quizsetSelected != ''){
    $("#createQuestionQuizsetField").prepend(`
    <option value=${quizsetSelected} selected>${ownerQuizsets[quizsetSelected]}</option>`);
  }else{
    $("#createQuestionQuizsetField").prepend(`
    <option value="" selected>Select a quizset below</option>`);
  }
});

function updateQuizsetUILeft(){
  $("#quizsetListContainer .quizsetChoice").each(function(){
    if($(this).attr('data-docID') == quizsetSelected){
      $(this).css('background-color', 'burlywood');
    }else{
      $(this).css('background-color', 'white');
    }
  });
  generateQuizsetUIRight(quizsetSelected);
}