<?php
/**
 Plugin Name: Accessibility Language
 Description:
 Version: 1.0.0
 Author: Hailstorm
 Author URI: http://hailstorm.nl
 License: GNU General Public License v2.0
 License URI: http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
*/

if ( ! function_exists('plugin_mce_css') ) {
	function plugin_mce_css($wp) {
		if ( $tadv_options['importcss'] == '1' )
			$wp .= ',' . get_bloginfo('stylesheet_url');
		$wp .= ',' . WP_PLUGIN_URL . '/accessibility-language/css/accessibility-language.css';
		return trim($wp, ' ,');
	}
}
add_filter( 'mce_css', 'plugin_mce_css' );

if ( ! function_exists('mce_accessibility_language') ) {
	function mce_accessibility_language($langpath) {
		$langpath = WP_PLUGIN_DIR . '/accessibility-language/language/langs/langs.php';
	}
}
add_filter( 'mce_external_languages', 'mce_accessibility_language' );

if ( ! function_exists('mce_accessibility_language_setup') ) {
	function mce_accessibility_language_setup() {
		//only if editing permissions do we bother
		if (!current_user_can('edit_posts') && !current_user_can('edit_pages')) return;
	
		if ( get_user_option('rich_editing') == 'true') {
			add_filter("mce_external_plugins", "add_accessibility_language_tinymce_plugin");
			add_filter('mce_buttons', 'register_accessibility_language_button');
		}
	}
}

if ( ! function_exists('register_accessibility_language_button') ) {
	function register_accessibility_language_button($buttons) {
	   array_push($buttons, "lang");
	   return $buttons;
	}
}

if ( ! function_exists('add_accessibility_language_tinymce_plugin') ) {
	function add_accessibility_language_tinymce_plugin($plugin_array) {
	   $plugin_array['acclang'] = WP_PLUGIN_URL.'/accessibility-language/language/editor_plugin.js';
	   return $plugin_array;
	}
}

add_action("admin_init","mce_accessibility_language_setup");

?>