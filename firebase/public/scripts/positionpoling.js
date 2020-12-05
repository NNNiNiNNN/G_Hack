// userlist.once("value", function (snapshot) {
//   console.log(snapshot.val());
// });
// db.ref('/users/'+username).once("value", function (snapshot) {
//   console.log(snapshot.val());
// });

// 自分以外のユーザーの情報を取得して位置情報や画像情報を更新
const divmain = document.getElementById("main");
db.ref('/users').on("value", function (snapshot) {
  x = my_user.position.left;
  y = my_user.position.top;
  var users = snapshot.val();
  Object.keys(users).forEach(function (key) {
    var user = users[key];
    // 他人のユーザかどうか
    if (user.name!=my_user.name){
      // 同じルームかどうか
      if (user.room_id==my_user.room_id){
        // すでに表示してあるかどうか
        if (document.getElementById(user.name)){
          // すでに表示してある、つまり更新
          // anotherはイメージタグ
          var another = document.getElementById(user.name);
          another.src = user.image;
          another.style.left = user.position.left;
          another.style.top = user.position.top;
          /*
                  // skywayテスト
                  if(isCallOk && isCallOk2)
                  {
                    console.log("makeCall");
                    const call = peer.call(user.peer_id, localStream);
                    setupCallEventHandlers(call);
                  }
                  */
        } else{
          // 表示していない、つまり新規
          var newImg = document.createElement("img");
          newImg.setAttribute("id",user.name);
          newImg.setAttribute("src",user.image);
          newImg.style.position = "absolute";
          newImg.style.left = user.position.left;
          newImg.style.top = user.position.top;
          newImg.setAttribute("width","100px");
          divmain.appendChild(newImg);
        }

        // 音量調整の処理 実装中
        /*
        var distance = getDistance(x, y, user.position.left, user.position.top);
        var volume = DistanceToVolume(distance);
        var video = document.getElementById(user.peer_id);
        console.log(user.peer_id);
        console.log(video);
        console.log("volume: " + volume);
        video.volume = (volume);
        console.log(volume);
        */
      }
    }
  });
});

db.ref('/users').on("child_removed", function (snapshot) {
  var users = snapshot.val();
  Object.keys(users).forEach(function (key) {
    if(key == "name")
    {
      var name = users[key];
      var remove_user = document.getElementById(name);
      remove_user.remove();
    }


  });
});
