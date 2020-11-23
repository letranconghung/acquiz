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
    alert("signed up succesfully");
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
    alert("signed out successfully");
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
    alert("logged in succesfully");
  }).catch((err) => {
    alert("Error encountered: " + err.message);
    $("#signupForm").trigger("reset");
  });
});

$("#quizsetForm").submit(function (e) { 
  e.preventDefault();
  
  db.collection('quizsets').add({
    quizsetName: $("#quizsetNameField").val(),
    ownerUniqueID: auth.currentUser.uid
  });
  $("#quizsetModal").modal('hide');
  $("#quizsetForm").trigger("reset");
});