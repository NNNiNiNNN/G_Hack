// userlist.once("value", function (snapshot) {
//   console.log(snapshot.val());
// });
// db.ref('/users/'+username).once("value", function (snapshot) {
//   console.log(snapshot.val());
// });

// 自分以外のユーザーの情報を取得して位置情報や画像情報を更新
const divmain = document.getElementById("main");
db.ref('/users').on("value", function (snapshot) {

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
          var another_img = document.getElementById(user.name+"_img");
          var another_name = document.getElementById(user.name+"_name");
          another_img.src = user.image;
          another_name.innerText = user.name;
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
          var newImg = document.createElement("div");
          var newImg_img = document.createElement("img");
          var newImg_name = document.createElement("div");
          newImg.setAttribute("id",user.name);
          newImg_img.setAttribute("id",user.name+"_img");
          newImg_name.setAttribute("id",user.name+"_name");
          newImg_img.setAttribute("src",user.image);
          newImg_name.innerText = user.name;
          newImg_name.style.color= "black";
          newImg.style.position = "absolute";
          newImg.style.left = user.position.left;
          newImg.style.top = user.position.top;
          newImg.setAttribute("width","100px");
          newImg.appendChild(newImg_img);
          newImg.appendChild(newImg_name);

          divmain.appendChild(newImg);

        }

        x = parseInt(my_user.position.left);
        y = parseInt(my_user.position.top);

        x2 = parseInt(user.position.left);
        y2 = parseInt(user.position.top);
        

        if(isUserActive)
        {
          // 音量調整の処理
          console.log("x: " + x + " y: " + y + " x2: " + x2 + " y: " + y2);
          var distance = getDistance(x, y, x2, y2);
          var volume = DistanceToVolume(distance);
          
          var video = document.getElementById(user.peer_id);
          console.log("peer_id: " + user.peer_id);
          console.log(video);
          video.volume = volume;
          

          // サイズ調整の処理
          var another = document.getElementById(user.name+"_img");
          h = parseInt(another.height);
          w = parseInt(another.width);
          newW = DistanceToSize(distance);
          newH = getHeightByWidth(h, w, newW);
          console.log("h: " + h + " w: " + w + "H: " + newH + " W: " + newW);
          another.height = newH;
          another.width = newW;          
        }


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
