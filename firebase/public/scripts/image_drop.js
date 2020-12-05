var target = document.getElementById('target');
target.addEventListener('dragover', function (e) {
	e.preventDefault();
	// e.stopPropagation();
	e.dataTransfer.dropEffect = 'copy';
});
target.addEventListener('drop', function (e) {
	// e.stopPropagation();
	e.preventDefault();
  target.style.border = 'solid 5px #ccc';
	const reader = new FileReader();
	reader.onload = function (e) {
		// document.getElementById('my_avatar').src = e.target.result;
		my_user.image = e.target.result;
		db.ref('/users/'+my_user.name).set(my_user);
		myUserUpdate(my_user);
	}
	reader.readAsDataURL(e.dataTransfer.files[0]);
});
target.addEventListener('dragenter', function (e) {
  console.log("dragenter");
  target.style.border = 'solid 5px #26a';
});
target.addEventListener('dragleave', function (e) {
  console.log("dragleave");
  target.style.border = 'solid 5px #ccc';
});
