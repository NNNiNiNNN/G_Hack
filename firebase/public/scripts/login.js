var db = firebase.database();
var camera = document.getElementById("camera");
var button = document.getElementById("button");

camera.onclick = function(){
  // Pythonのコードを呼び出す
  // ISBNを返してほしい
  console.log("カメラ起動")
  var isbn_number = "5555555555555";
  document.getElementById("isbn").value = isbn_number;
}

// 本来はformのsubmitにしてreturn falseにするべき
// そのせいで余計なバリデーション（値のチェック）が必要
button.onclick = function(){
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var isbn = document.getElementById("isbn");

  if (!name.value){
    window.alert("名前を入力してください");
  } else if (!isbn.value){
    window.alert("バーコード(ISBN)を入力してください");
  } else {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((obj) => {
      // Signed in
      // セッションにオブジェクトを保存する際、文字列出なければならない
      // また、JSONでの文字列化は深くまで探れないので、下の階層は「Object」として情報を失ってしまう。
      // このあと必要な値はobj.user.uidだけだと思うが、わからないので大きい内容をセッションに保存しておく
      // obj.user = JSON.stringify(obj.user);
      // sessionStorage.setItem('loginUser', JSON.stringify(obj));
      // エラーが治らないので、素直にobj.user.uidだけをセッションに保存する
      sessionStorage.setItem('loginUser', obj.user.uid);

      var my_user = {name: name.value, email: email.value, pwd: password.value, room_id: isbn.value, isbn: isbn.value, image: "fig/default.png", position: {left:"10px",top:"10px"}};
      console.log(my_user);
      db.ref('/users/'+obj.user.uid).set(my_user);
      // db.ref('/users/'+obj.user.uid).once("value", function (snapshot) {
      //   my_user = snapshot.val();
      //   console.log(my_user);
      // });
      // sleepがないと、おそらく非同期処理の関係で挙動がおかしくなる(苦肉の策)
      // function sleep(waitMsec) {
      //   var startMsec = new Date();
      //   // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
      //   while (new Date() - startMsec < waitMsec);
      // }
      // sleep(4000);//4秒スリープ
      // window.alert('ログイン成功')
      location.href = ('chat.html');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert(error.message+' ('+error.code+')');
    });
  }
}
