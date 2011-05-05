/**
 * abbr.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

function init() {
	SXE.initElementDialog('span');
	if (SXE.currentAction == "update") {
		SXE.showRemoveButton();
	}
}

function insertLang() {
	SXE.insertElement(tinymce.isIE6 == false ? 'span' : 'html:span');
	tinyMCEPopup.close();
}

function removeLang() {
	SXE.removeElement('span');
	tinyMCEPopup.close();
}

tinyMCEPopup.onInit.add(init);
