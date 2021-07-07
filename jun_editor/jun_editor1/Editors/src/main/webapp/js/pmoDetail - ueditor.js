/** set the selectors' width*/
$('.selector').selectpicker({
	width: '120px'
});

$('.selector').selectpicker('val','Red');

/** add report */
$('.add-getData').click(function() {
	alert($(".add-select-qual  option:selected").text());
});

$('.add-getInput').click(function() {
	alert(UE.getEditor('ueditor').getContent());
});
$('.add-copyLast').click(function() {
	UE.getEditor('ueditor').setContent('<p><span style="color: rgb(255, 0, 0);"><strong>Welcome to use ueditor!</strong></span></p>');
});

/** edit report */
$('.edit-getData').click(function() {
	alert($(".edit-select-qual  option:selected").text());
});

$('.edit-getInput').click(function() {
	alert(edit_ckeditor.getData());
});
$('.edit-copyLast').click(function() {
	edit_ckeditor.setData("set data in textarea");
});