var db = firebase.database();
var button = document.getElementById("button");
// 本来はformのsubmitにしてreturn falseにするべき
button.onclick = function(){
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((user) => {
    // Signed in
    location.href = ('index.html');
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(error.message+' ('+error.code+')');
  });
}
