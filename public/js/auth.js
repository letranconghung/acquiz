var auth = firebase.auth();
var db = firebase.firestore();
// working code

// listen for auth status changes
auth.onAuthStateChanged( user => {
  setupUI(user);
});

// sign up
$("#signupForm").submit(function (e) { 
  e.preventDefault();
  // get input
  var signupEmail = $("#signupEmailField").val();
  var signupPassword = $("#signupPasswordField").val();
  var signupName = $("#signupNameField").val();
  // sign up user
  auth.createUserWithEmailAndPassword(signupEmail, signupPassword).then((userCred) => {
    userCred.user.updateProfile({
      displayName: signupName
    });
    $("#signupModal").modal('hide');
    $("#signupForm").trigger("reset");
    // alert("signed up succesfully");
  }).catch((err) => {
    alert("Error encountered: " + err.message);
    $("#signupForm").trigger("reset");
  });
});

// log out
$("#logout").click(function (e) { 
  e.preventDefault();
  // sign out user
  auth.signOut().then((result) => {
    // alert("signed out successfully");
  });
});

// log in
$("#loginForm").submit(function (e) { 
  e.preventDefault();
  // get input
  var loginEmail = $("#loginEmailField").val();
  var loginPassword = $("#loginPasswordField").val();
  // sign in user
  auth.signInWithEmailAndPassword(loginEmail, loginPassword).then((userCred) => {
    $("#loginModal").modal('hide');
    $("#loginForm").trigger("reset");
  }).catch((err) => {
    alert("Error encountered: " + err.message);
    $("#signupForm").trigger("reset");
  });
});

$("#quizsetForm").submit(function (e) { 
  e.preventDefault();
  db.collection('quizsets').add({
    quizsetName: $("#quizsetNameField").val(),
    ownerUID: auth.currentUser.uid,
    ownerName: auth.currentUser.displayName
  }).then(doc => {
    console.log(doc.id);
    quizsetSelected = doc.id;
    updateQuizsetUILeft();
  });
  $("#quizsetModal").modal('hide');
  $("#quizsetForm").trigger("reset");
});

$("#questionForm").submit(function (e) { 
  e.preventDefault();
  var quizsetID = $("#createQuestionQuizsetField").val();
  var questionName = $("#createQuestionNameField").val();
  var answerArr = [
    $("#createQuestionOptionFieldA").val(),
    $("#createQuestionOptionFieldB").val(),
    $("#createQuestionOptionFieldC").val(),
    $("#createQuestionOptionFieldD").val(),
  ];
  var corrIndex = $('input[name="inlineRadioOptions"]:checked').val();
  db.collection('quizsets').doc(quizsetID).collection('quizzes').add({
    question: questionName,
    correctIndex: corrIndex,
    answers: answerArr
  });
  $("#questionForm").trigger('reset');
});