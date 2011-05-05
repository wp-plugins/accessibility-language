(function() {
	tinymce.create('tinymce.plugins.AccLangPlugin', {
		init : function(ed, url) {
			ed.addCommand('mceLang', function() {
				ed.windowManager.open({
					file : url + '/lang.htm',
					width : 350,
					height : 200,
					inline : 1
				}, {
					plugin_url : url
				});
			});
			
			ed.addButton('lang', {
				title : 'accessibility-language.button',
				cmd : 'mceLang',
				image : url + '/img/icon_lang.png'});

			ed.onNodeChange.add(function(ed, cm, n, co) {
				n = ed.dom.getParent(n, 'SPAN');

				cm.setDisabled('span', co);
				cm.setDisabled('attribs', n && n.nodeName == 'BODY');
				cm.setActive('span', 0);

				if (n) {
					do {
						cm.setDisabled(n.nodeName.toLowerCase(), 0);
						cm.setActive(n.nodeName.toLowerCase(), 1);
					} while (n = n.parentNode);
				}
			});

			ed.onPreInit.add(function() {
				ed.dom.create('span');
			});
		},

		getInfo : function() {
			return {
				longname : 'Accessibility Language',
				author : 'Hailstorm',
				authorurl : 'http://hailstorm.nl',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	tinymce.PluginManager.add('acclang', tinymce.plugins.AccLangPlugin);
})();