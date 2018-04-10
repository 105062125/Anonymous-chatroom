firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...

  });

}

function logout(){
  firebase.auth().signOut();
}

function signup()
{
  var userEmail = document.getElementById("account").value;
  var userPass = document.getElementById("pwd").value;
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}
//email verify

function verify()
{
  var verifyBtn = document.getElementById("verifyBtn");
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    console.log("驗證信寄出");
  }, function(error) {
   	console.error("驗證信錯誤");
  });
}
