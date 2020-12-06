isUserActive = false;
startActivate = () =>{
  db.ref('/users/'+my_user.name).set(my_user);
  myUserUpdate(my_user);
  isUserActive = true;
};
