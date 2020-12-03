# firebaseの導入手順メモ

## 事前準備
* プロジェクトに登録しておく
* npmを使えるようにしておく(node.jsを入れる)
参考: [Node.js / npmをインストールする（for Windows）](https://qiita.com/taiponrock/items/9001ae194571feb63a5e)
* 導入を行う
参考: [Firebaseの始め方](https://qiita.com/kohashi/items/43ea22f61ade45972881)
ターミナルから以下のコマンドでfirebase関連のツールを導入する。
```
npm install -g firebase-tools
```
ログインする
```
firebase login
```
ディレクトリ移動し、以下のコマンドで立ち上げ
```
firebase init
```
Hosting: Configure and deploy Firebase Hostingを選択、プロジェクトは専用に作ったのでそれに設定、後はエンターキー連打。
現在のディレクトリ内にいくつかファイルが生成される。public/index.htmlファイルが最初に開かれるページ。
```
firebase serve
```
でローカルで起動
```
firebase deploy
```
で作ったページの埋め込みができる。
これで準備は完了なので、HTMLファイルをいじる。
### 実装
以下のようなおまじないをHTML内の/styleと/headの間に書く。
```html
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js"></script>
<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyALYb-gpwW_8i8HyA9cXAMKBynobmDBV4I",
    authDomain: "g-hack-project.firebaseapp.com",
    databaseURL: "https://g-hack-project.firebaseio.com",
    projectId: "g-hack-project",
    storageBucket: "g-hack-project.appspot.com",
    messagingSenderId: "82020781735",
    appId: "1:82020781735:web:e2feed88dfa4cb7e171582"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
<script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-database.js"></script>
```
以下のようにデータベースを取得する。
```javascript
var db = firebase.database();
var pos1 = db.ref("/pos_1");
```
以下のように値を設定。
この際のキー名は可変。事前に設定は不要。set()で行うとキー名全部上書きされる？キー単体で行うなら他の関数を使う？
```javascript
pos1.set({ x: 10, y: 10 });
```
以下のように値を取得できる。
```javascript
x = pos1.x;
y = pos1.y;
```
値が変更された時の取得は以下のように行う。
```javascipt
pos1.on("value", function (snapshot) {
x = snapshot.val().x;
y = snapshot.val().y;
});
```
htmlの位置変更を行うなら以下のように
```javascript
var button = document.getElementById("button");
button.style.top = (y - height / 2) + "px";
button.style.left = (x - width / 2) + "px";
```
ここまででわからないことはhttps://github.com/NNNiNiNNN/G_Hack/edit/main/firebase のソースコードを参考にしてください。それ以上はまだ未検証です。
