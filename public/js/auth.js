var auth = firebase.auth();
var db = firebase.firestore();

// get data
db.collection('quizsets').get().then(snapshot =>{
  snapshot.docs.forEach(quizset => {
    console.log('generating quizset...');
    generateQuizsetUI(quizset);
  })
});

// listen for auth status changes
auth.onAuthStateChanged( user => {
  if(user){
    console.log("user logged in: ", user);
    $(".logged-in").css("display", "inherit");
    $(".logged-out").css("display", "none");
  } else{
    $(".logged-out").css("display", "inherit");
    $(".logged-in").css("display", "none");
    console.log("user not logged in");
  }
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
