function initApp() {
    // Login with Email/Password
    var txtEmail = document.getElementById('email_field1');
    var txtPassword = document.getElementById('password_field1');
    var btnLogin = document.getElementById('loginbut');
    var btnGoogle = document.getElementById('google');
    var btnFacebook = document.getElementById('facebook');
    var btnSignUp = document.getElementById('signup');

    btnLogin.addEventListener('click', function () {
        /// TODO 2: Add email login button event
        ///         1. Get user input email and password to login
        ///         2. Back to index.html when login success
        ///         3. Show error message by "create_alert" and clean input field
        var email = txtEmail.value;
        var password = txtPassword.value;

         firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            window.location.replace('index.html');
        }).catch(function (error) {
            // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
        
        });
    
    });

    btnGoogle.addEventListener('click', function () {
        /// TODO 3: Add google login button event
        ///         1. Use popup function to login google
        ///         2. Back to index.html when login success
        ///         3. Show error message by "create_alert"
        var btnLoginGooglePop = document.getElementById('btnLoginGooglePop');
        var btnLoginGoogleRedi = document.getElementById('btnLoginGoogleRedi');
        var provider = new firebase.auth.GoogleAuthProvider();

        console.log('signInWithPopup');
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            window.location.replace('index.html');
        }).catch(function (error) {
            console.log('error: ' + error.message);
        });
        btnLoginGoogleRedi.addEventListener('click', e => {
            console.log('signInWithPopup');
            firebase.auth().signInWithRedirect(provider);
        });

        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential)
                var token = result.credential.accessToken;
            var user = result.user;
        }).catch(function (error) {
            console.log('error: ' + error.message);
        });



    });

    btnSignUp.addEventListener('click', function () {        
        /// TODO 4: Add signup button event
        ///         1. Get user input email and password to signup
        ///         2. Show success message by "create_alert" and clean input field
        ///         3. Show error message by "create_alert" and clean input field
         var email = txtEmail.value;
        var password = txtPassword.value;
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result) {
                window.alert("完成註冊手續 歡迎");
            }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/weak-password') {
                window.alert("Error : " + errorMessage);
            } else {
                window.alert("Error : " + errorMessage);
             }
             console.log(error);
             });
    });

     btnFacebook.addEventListener('click',function(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) { 
            window.location.replace('index.html');
            // This gives you a Facebook Access Token. You can use it to access the Facebook API. 
            var token = result.credential.accessToken; // The signed-in user info. 
            var user = result.user;  }).catch(function(error) { 
            // Handle Errors here. 
            var errorCode = error.code; var errorMessage = error.message; 
            // The email of the user's account used. 
            var email = error.email; 
            // The firebase.auth.AuthCredential type that was used. 
            var credential = error.credential;  });
         firebase.auth().signInWithRedirect(provider);
         firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential)
                var token = result.credential.accessToken;
            var user = result.user;
        }).catch(function (error) {
            console.log('error: ' + error.message);
        });
     })
   


//initial的
}



window.onload = function () {
    initApp();
};

  