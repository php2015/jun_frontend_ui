/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.extraPlugins = 'xd_textfield,xd_textarea,xd_listmenu,xd_radio,xd_checkbox,xd_listview,xd_calendar,xd_calcu,xd_auto,xd_user,xd_data_select';
	//config.extraPlugins = 'htmlbuttons';
	config.pasteFromWordRemoveFontStyles = false; 
	config.pasteFromWordRemoveStyles = false; 
};
