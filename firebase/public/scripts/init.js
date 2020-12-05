//

var db = firebase.database();
var room_id = "1";
var my_user = { name: "default_name", pwd: "password", room_id: room_id, image: "default.png", position: { left: "500px", top: "50px" } };




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
var isCallOk = false;
var isCallOk2 = false;

const remoteVideos = document.getElementById('js-remote-streams');


navigator.mediaDevices.getUserMedia({ video: false, audio: true })
    .then(function (stream) {
        // Success
        $('#my-video').get(0).srcObject = stream;
        localStream = stream;
        call();
    }).catch(function (error) {
        // Error
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
    });

peer = new Peer({
    key: 'a9093d62-394d-4ddf-8094-03566ed2f485',
    debug: 3
})
var roomId = room_id;

call = () =>
{
    const room = peer.joinRoom(roomId, {
        mode: "mesh",// sfuに切り替える必要？
        stream: localStream,
      });
      my_user['peer_id'] = peer.id;
      peerId = peer.id;
      room.once('open', () => {
        console.log(peerId +  ": opened");
      });
      room.on('peerJoin', peerId => {
        console.log(peerId +  ": joined");
      });
    
      // Render remote stream for new peer join in the room
      room.on('stream', async stream => {
        const newVideo = document.createElement('video');
        newVideo.srcObject = stream;
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