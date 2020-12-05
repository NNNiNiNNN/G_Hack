// 自分のアバターをドラッグで移動させて
// ドラッグが終わったらサーバーへ位置情報を送信

function myUserUpdate(my_user) {
  
  var my_avatar = document.getElementById("my_avatar");
  var my_avatar_img = document.getElementById("my_avatar_img");
  var my_avatar_name = document.getElementById("my_avatar_name");
  my_avatar_img.src = my_user.image;
  my_avatar_name.innerText = my_user.name;
  
  let currentDroppable = null;

  my_user.position.left = my_avatar.style.left + 'px';
  my_user.position.top = my_avatar.style.top + 'px';
  db.ref('/users/'+my_user.name).set(my_user);
  /*
  var my_avatar = document.createElement("div");
  var my_avatar_img = document.createElement("img");
  var my_avatar_name = document.createElement("div");
  my_avatar.setAttribute("id",my_user.name);
  my_avatar_img.setAttribute("id",my_user.name+"_img");
  my_avatar_name.setAttribute("id",my_user.name+"_name");
  my_avatar_img.setAttribute("src",my_user.image);
  my_avatar_name.innerText = my_user.name;
  my_avatar_name.style.color= "black";
  my_avatar.style.position = "absolute";
  my_avatar.style.left = my_user.position.left;
  my_avatar.style.top = my_user.position.top;
  my_avatar.setAttribute("width","100px");
  my_avatar.appendChild(my_avatar_img);
  my_avatar.appendChild(newImy_avatar_namemg_name);

  divmain.appendChild(my_avatar);
  */
  my_avatar_img.onmousedown = function(event) {
    console.log(my_avatar);
    let shiftX = event.clientX - my_avatar.getBoundingClientRect().left;
    let shiftY = event.clientY - my_avatar.getBoundingClientRect().top;
    //let shiftX = event.clientX;
    //let shiftY = event.clientY;

    my_avatar.style.position = 'absolute';
    my_avatar.style.zIndex = 1000;
    document.body.append(my_avatar);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      let left = pageX - shiftX + 'px';
      let top = pageY - shiftY + 'px';
      my_user.position.left = pageX - shiftX + 'px';
      my_user.position.top = pageY - shiftY + 'px';
      my_avatar.style.left = my_user.position.left;
      my_avatar.style.top = my_user.position.top;
      db.ref('/users/'+my_user.name).set(my_user);
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      my_avatar.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      my_avatar.hidden = false;
    }

    document.addEventListener('mousemove', onMouseMove);

    my_avatar_img.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      my_avatar.onmouseup = null;
    };

  };


  my_avatar_img.ondragstart = function() {
    console.log("ondragstart");
    return false;
  };
  
  window.onunload = function () {
    // ウインドウを閉じた瞬間に起動
    db.ref('/users/'+my_user.name).remove();
  }

}
let getDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
let DistanceToVolume = (distance) => 
{
    theta1 = 200;
    theta2 = 400;
   if(distance < theta1)
   {
     return 1;
   }
   else if (distance < theta2) {
     return (theta2-distance)/(theta2-theta1);
   } else {
     return 0;
   }
}
let DistanceToSize = (distance) => 
{
    defaultSize = 100;
    
    max = 1.5;
    min = 0.8;
    theta1 = 200;
    theta2 = 400;
   if(distance < theta1)
   {
     return max * defaultSize;
   }
   else if (distance < theta2) {
     return (min + (max-min) * (theta2-distance)/(theta2-theta1)) * defaultSize;
   } else {
     return min * defaultSize;
   }
}

let getHeightByWidth = (originH, originW, width) =>
{
  let k = originH/originW;
  return width * k;
}