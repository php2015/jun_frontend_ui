/** create CKEDITOR */
var add_ckeditor = CKEDITOR.replace("add-ckeditor", {height: '300px', width: '1000px'});

/** set the selectors' width*/
$('.selector').selectpicker({
	width: '120px'
});

/** add report */
$('.add-getData').click(function() {
	alert($(".add-select-qual  option:selected").text());
});

$('.add-getInput').click(function() {
	alert(add_ckeditor.getData());
});
$('.add-copyLast').click(function() {
	add_ckeditor.setData("<p><span style='color: rgb(255, 0, 0);'><strong>Welcome to use ckeditor!</strong></span></p>");
});