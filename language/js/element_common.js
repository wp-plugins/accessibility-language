/**
 * element_common.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

tinyMCEPopup.requireLangPack();

function initCommonAttributes(elm) {
	var formObj = document.forms[0], dom = tinyMCEPopup.editor.dom;

	setFormValue('lang', dom.getAttrib(elm, 'lang'));
	setFormValue('xml:lang', dom.getAttrib(elm, 'xml:lang'));
}

function setFormValue(name, value) {
	if(document.forms[0].elements[name]) document.forms[0].elements[name].value = value;
}

function addZeros(value, len) {
	var i;

	value = "" + value;

	if (value.length < len) {
		for (i=0; i<(len-value.length); i++)
			value = "0" + value;
	}

	return value;
}

function selectByValue(form_obj, field_name, value, add_custom, ignore_case) {
	if (!form_obj || !form_obj.elements[field_name])
		return;

	var sel = form_obj.elements[field_name];

	var found = false;
	for (var i=0; i<sel.options.length; i++) {
		var option = sel.options[i];

		if (option.value == value || (ignore_case && option.value.toLowerCase() == value.toLowerCase())) {
			option.selected = true;
			found = true;
		} else
			option.selected = false;
	}

	if (!found && add_custom && value != '') {
		var option = new Option('Value: ' + value, value);
		option.selected = true;
		sel.options[sel.options.length] = option;
	}

	return found;
}

function setAttrib(elm, attrib, value) {
	var formObj = document.forms[0];
	var valueElm = formObj.elements[attrib.toLowerCase()];
	tinyMCEPopup.editor.dom.setAttrib(elm, attrib, value || valueElm.value);
}

function setAllCommonAttribs(elm) {
	setAttrib(elm, 'lang');
	setAttrib(elm, 'xml:lang');
}

SXE = {
	currentAction : "insert",
	inst : tinyMCEPopup.editor,
	updateElement : null
}

SXE.focusElement = SXE.inst.selection.getNode();

SXE.initElementDialog = function(element_name) {
	addClassesToList('class', 'changelang_styles');
	TinyMCE_EditableSelects.init();

	element_name = element_name.toLowerCase();
	var elm = SXE.inst.dom.getParent(SXE.focusElement, element_name.toUpperCase());
	if (elm != null && elm.nodeName.toUpperCase() == element_name.toUpperCase()) {
		SXE.currentAction = "update";
	}

	if (SXE.currentAction == "update") {
		initCommonAttributes(elm);
		SXE.updateElement = elm;
	}

	document.forms[0].insert.value = tinyMCEPopup.getLang(SXE.currentAction, 'Insert', true); 
}

SXE.insertElement = function(element_name) {
	var elm = SXE.inst.dom.getParent(SXE.focusElement, element_name.toUpperCase()), h, tagName;

	tinyMCEPopup.execCommand('mceBeginUndoLevel');
	if (elm == null) {
		var s = SXE.inst.selection.getContent();
		if(s.length > 0) {
			tagName = element_name;

			insertInlineElement(element_name);
			var elementArray = tinymce.grep(SXE.inst.dom.select(element_name));
			for (var i=0; i<elementArray.length; i++) {
				var elm = elementArray[i];

				if (SXE.inst.dom.getAttrib(elm, '_mce_new')) {
					elm.id = '';
					elm.setAttribute('id', '');
					elm.removeAttribute('id');
					elm.removeAttribute('_mce_new');

					setAllCommonAttribs(elm);
				}
			}
		}
	} else {
		setAllCommonAttribs(elm);
	}
	SXE.inst.nodeChanged();
	tinyMCEPopup.execCommand('mceEndUndoLevel');
}

SXE.removeElement = function(element_name){
	element_name = element_name.toLowerCase();
	elm = SXE.inst.dom.getParent(SXE.focusElement, element_name.toUpperCase());
	if(elm && elm.nodeName.toUpperCase() == element_name.toUpperCase()){
		tinyMCEPopup.execCommand('mceBeginUndoLevel');
		tinyMCE.execCommand('mceRemoveNode', false, elm);
		SXE.inst.nodeChanged();
		tinyMCEPopup.execCommand('mceEndUndoLevel');
	}
}

SXE.showRemoveButton = function() {
		document.getElementById("remove").style.display = '';
}

function insertInlineElement(en) {
	var ed = tinyMCEPopup.editor, dom = ed.dom;

	ed.getDoc().execCommand('FontName', false, 'mceinline');
	tinymce.each(dom.select('span,font'), function(n) {
		if (n.style.fontFamily == 'mceinline' || n.face == 'mceinline')
			dom.replace(dom.create(en, {_mce_new : 1}), n, 1);
	});
}
