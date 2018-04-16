firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;

    if(user != null){
      var name, email, photoUrl, uid, emailVerified;
      var email_id = user.email;
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      document.getElementById("user_para").innerHTML = "Welcome User  :      " + name;

    }
    

  } else {
    // No user is signed in.

  }
});

/*function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...

  });

}*/

/*function signup()
{
  var userEmail = document.getElementById("account").value;
  var userPass = document.getElementById("pwd").value;
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}*/
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

//更改帳號名字

function changename(){
  var user = firebase.auth().currentUser;
  var change = document.getElementById("changename").value;
  user.updateProfile({
    displayName:change,
  }).then(function() {
     window.alert("success");
     document.getElementById("user_para").innerHTML = "Welcome User : " + user.displayName;
  }).catch(function(error) {
      window.alert("wrong");
  });
}
