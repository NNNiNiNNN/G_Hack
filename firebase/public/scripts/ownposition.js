// 自分のアバターをドラッグで移動させて
// ドラッグが終わったらサーバーへ位置情報を送信

function myUserUpdate(my_user) {
  var my_avatar = document.getElementById("my_avatar");
  my_avatar.src = my_user.image;

  let currentDroppable = null;

  my_avatar.onmousedown = function(event) {

    let shiftX = event.clientX - my_avatar.getBoundingClientRect().left;
    let shiftY = event.clientY - my_avatar.getBoundingClientRect().top;

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

    my_avatar.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      my_avatar.onmouseup = null;
    };

  };


  my_avatar.ondragstart = function() {
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
  return 1;
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