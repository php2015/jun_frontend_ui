/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights
 *          reserved. For licensing, see LICENSE.md or
 *          http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.width = 'auto';
	config.toolbar = 'Full';
	config.toolbar_Full = [
		{ name: 'tools', items : [ 'Maximize', 'ShowBlocks' ] },
        { name: 'document', items: [ 'Source', '-','Templates','-', 'NewPage','Preview','Print'] },
        { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
        {name:'editing',items:['Find','Replace','SelectAll','Scayt']},
        {name:'forms',items:['Checkbox','Radio','TextField','Textarea','Select','Button','HiddenField']},
        '/',
        { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
    	{ name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv',
    	'-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
    	{ name: 'links', items : [ 'Link','Unlink','Anchor' ] },
    	{ name: 'insert', items : [ 'Image','Table','HorizontalRule','SpecialChar','PageBreak' ] },
    	'/',
    	{ name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
    	{ name: 'colors', items : [ 'TextColor','BGColor'] }
	];
	config.language = 'en'; // 配置语言
	
	// 在 CKEditor 中集成 CKFinder，注意ckfinder 的路径选择要正确。
	config.filebrowserBrowseUrl = 'ckfinder/ckfinder.html';
	config.filebrowserImageBrowseUrl = 'ckfinder/ckfinder.html?type=Images';
	config.filebrowserFlashBrowseUrl = 'ckfinder/ckfinder.html?type=Flash';
	config.filebrowserUploadUrl = 'ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Files';
	config.filebrowserImageUploadUrl = 'ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Images';
	config.filebrowserFlashUploadUrl = 'ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Flash';
	config.filebrowserWindowWidth = '730';
	config.filebrowserWindowHeight = '580';
};
