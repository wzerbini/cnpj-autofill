<?php
/*
Plugin Name: Autopreenchimento de CNPJ em formulários
Description: Preenchimento automático de campos baseado no CNPJ informado.
Plugin URI:
Author: Weber Z.
Author URI:
Version: 1.0
*/

if ( ! ABSPATH ) exit;

/**
 * Function init plugin
**/
function cnpj_init(){
	add_action( 'wp_enqueue_scripts', 'cnpj_do_enqueue_scripts' );
}
add_action( 'plugins_loaded', 'cnpj_init' , 20 );

/**
 * Function enqueue script
 * @version 1.0 
**/
function cnpj_do_enqueue_scripts() {
    //wp_enqueue_script( 'wpcf7mf-mask', plugin_dir_url( __FILE__ ) . 'assets/js/jquery.mask.js', array('jquery'), '1.4', true );
	wp_enqueue_script( 'cnpj-app', plugin_dir_url( __FILE__ ) . 'assets/js/cnpj-autofill.js', array('jquery'), '1.4', true );
}
add_action( 'wp_enqueue_scripts', 'cnpj_do_enqueue_scripts' );