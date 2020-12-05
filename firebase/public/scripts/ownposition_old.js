// 自分のアバターをドラッグで移動させて
// ドラッグが終わったらサーバーへ位置情報を送信

var my_avatar_name = "aaaaa";
var my_avatar = document.getElementById("my_avatar");

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
    my_avatar.style.left = pageX - shiftX + 'px';
    my_avatar.style.top = pageY - shiftY + 'px';
    db.ref('/users/'+my_avatar_name).set({ name: my_avatar_name, image: "a.png", position: {left:left,top:top}});
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
// my_avatar.ondragend = function() {
//   console.log("ondragend");
//   return false;
// };
