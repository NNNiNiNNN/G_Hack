isUserActive = false;
var button = document.getElementById("button");
button.onclick = function(){
  var name = document.getElementById("name");
  my_user.name = name.value;
  db.ref('/users/'+my_user.name).set(my_user);
  myUserUpdate(my_user);
  isUserActive = true;
};
