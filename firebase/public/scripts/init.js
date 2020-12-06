// hiddenテスト

allElements = document.getElementById('all');

allElements.style.visibility ="hidden";
pizzaStyle = document.getElementById('viewport_pizza');
pizzaStyle.href = "enter.css";
// 初期設定

db = firebase.database();
var my_user = {image: "default.png", position: { left: "500px", top: "50px" } };

// 初期設定
button_clicked = () =>
{
  console.log("clicked");
  user_id = document.getElementById('user_id').value;
  my_user["name"] = user_id;
  room_id = document.getElementById('room_id').value;
  my_user["room_id"] = room_id;
  init_init();
  startActivate();
}


init_init = () =>
{
  preElements = document.getElementById('pre');

  preElements.style.visibility ="hidden";

  allElements = document.getElementById('all');

  allElements.style.visibility ="visible";
  pizzaStyle = document.getElementById('viewport_pizza');
  pizzaStyle.href = "stylesheet16.css";
  // セッションにオブジェクトごと保存するパターン（エラーが治らないので却下）
  // var obj = JSON.parse(sessionStorage.getItem('loginUser'));
  // var obj_user = JSON.parse(obj.user);
  
  // var uid = sessionStorage.getItem('loginUser');
  // console.log(uid);
  
  // セッションでログインしたユーザかどうか確認
  // ログインしていない不正なユーザーだったらホーム画面に飛ぶようにしてある
  
  // 読み込み時にこの辺の値を設定してほしい
  // 古い形式
  var my_user = { name: "default_name", pwd: "password", room_id: "1001111", image: "default.png", position: { left: "500px", top: "50px" } };
  // 新しい形式
  // var my_user = { name: "name", email: "email", pwd: "password", room_id: "1111111111111", isbn: "1111111111111", image: "fig/default.png", position: {left:"10px",top:"10px"}};
  //自分のユーザー情報をデータベースから取得
  // db.ref('/users/'+uid).once("value", function (snapshot) {
  //   my_user = snapshot.val();
  //   if (!my_user) {
  //     console.log(my_user);
  //     window.alert('ホーム画面に戻ります');
  //     location.href = ('index.html');
  //   }
  // });
  // sleepがないと、おそらく非同期処理の関係で挙動がおかしくなる(苦肉の策)
  // function sleep(waitMsec) {
  //   var startMsec = new Date();
  //   // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  //   while (new Date() - startMsec < waitMsec);
  // }
  // sleep(4000);//4秒スリープ
  
  console.log(my_user);
  
  // この値をしたで使ってたけど、「my_user.room_id」で取得できるはず
  var room_id = my_user.room_id;
  
  
  
  // db.ref('/users/'+my_user.name).set(my_user);
  
  /*
  var sinigami_user = { name: "sinigami_name", pwd: "password", room_id: 1, image: "a.png", position: {left:"300px",top:"20px"}};
  var obake_user = { name: "obake_name", pwd: "password", room_id: 2, image: "b.png", position: {left:"300px",top:"800px"}};
  db.ref('/users/'+sinigami_user.name).set(sinigami_user);
  db.ref('/users/'+obake_user.name).set(obake_user);
  */
  // db.ref('/users/'+"obake").set({ name: "obake", image: "b.png", position: {left:"30px",top:"50px"}});
  
  
  // skyway関係のinit処理を組み込む。
  
  
  
  let localStream = null;
  let peer = null;
  let existingCall = null;
  
  const remoteVideos = document.getElementById('js-remote-streams');
  
  /*
  isNotStream = true;
  //isNotCall = false;
  setInterval(() => {
    if (isNotStream) {
      call();
    }
  }, 1000);
  */
  
  navigator.mediaDevices.getUserMedia({ video: false, audio: true })
  .then(function (stream) {
    // Success
    $('#my-video').get(0).srcObject = stream;
    localStream = stream;
    //call();
  }).catch(function (error) {
    // Error
    console.error('mediaDevice.getUserMedia() error:', error);
    alert('マイク取得エラー');
    return;
  });
  
  peer = new Peer({
    key: 'a9093d62-394d-4ddf-8094-03566ed2f485',
    debug: 3
  });
  var roomId = room_id;
  
  isNotCall = true;
  //isNotCall = false;
  setInterval(() => {
    if (isNotCall) {
      call();
    }
  }, 1000);
  
  call = () => {
    const room = peer.joinRoom(roomId, {
      mode: "sfu",// sfuに切り替える必要？
      stream: localStream,
    });
    my_user['peer_id'] = peer.id;
    console.log(peer.id);
    peerId = peer.id;
    room.once('open', () => {
      console.log(peerId + ": opened");
    });
    room.on('peerJoin', peerId => {
      console.log(peerId + ": joined");
    });
  
    // Render remote stream for new peer join in the room
    room.on('stream', async stream => {
      console.log(stream.peerId + ": setStream");
      const newVideo = document.createElement('video');
      newVideo.srcObject = stream;
      newVideo.volume = 0;
      newVideo.setAttribute("id", stream.peerId);
      newVideo.playsInline = true;
      // mark peerId to find it later at peerLeave event
      newVideo.setAttribute('data-peer-id', stream.peerId);
      remoteVideos.append(newVideo); // elementを設定する
      await newVideo.play().catch(console.error);
    });
    // データの更新があった時
    room.on('data', ({ data, src }) => {
      console.log(`${src}: ${data}`);
    });
  
    // for closing room members
    room.on('peerLeave', peerId => {
      const remoteVideo = remoteVideos.querySelector(
        `[data-peer-id="${peerId}"]`
      );
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
      remoteVideo.remove();
  
      console.log(`=== ${peerId} left ===`);
    });
  
    // for closing myself
    room.once('close', () => {
      Array.from(remoteVideos.children).forEach(remoteVideo => {
        remoteVideo.srcObject.getTracks().forEach(track => track.stop());
        remoteVideo.srcObject = null;
        remoteVideo.remove();
      });
    });
    isNotCall = false;
  
  
  }
  
  
  
  
  
  
  
  
  /*
  
  peer.on('open', function () {
  my_user['peer_id'] = peer.id;
  isCallOk = true;
  })
  
  peer.on('error', function (err) {
  alert(err.message);
  })
  
  peer.on('disconnected', function () {
  isCallOk = true;
  });
  
  peer.on('call', function (call) {
  call.answer(localStream);
  setupCallEventHandlers(call);
  isCallOk = false;
  });
  
  function setupCallEventHandlers(call) {
  if (existingCall) {
  existingCall.close();
  };
  
  existingCall = call;
  
  call.on('stream', function (stream) {
  addVideo(call, stream);
  $('#their-id').text(call.remoteId);
  console.log("stream");
  });
  // 省略
  }
  function addVideo(call,stream){
  $('#their-video').get(0).srcObject = stream;
  }
  
  function removeVideo(peerId){
  $('#' + peerId).remove();
  }
  
  let call = () =>
  {
  console.log("call");
  isCallOk2 = true;
  }
  */
  
}

