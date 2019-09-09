
// Actions for metabox Summary

jQuery( document ).ready( function( $ ) {

  if ( $( '#metabox-summary' ).length === 0 )
    return;

  let button_check = $( '#metabox-summary .check-now button' );
  let spinner = $( '#metabox-summary .spinner' );

  // Starts the cron job

  function do_check() {

    button_check.attr( 'disabled', true );
    spinner.css( 'visibility', 'visible' );

    $.ajax( {
      url: local.ajaxurl,
      method: 'POST',
      data: {
        action: local.action_check,
        _ajax_nonce: local.ajax_nonce
      },
      success: function( ) {
        check_cron();
      }
    } );

  }

  // Check every 10 seconds if cron has finished

  function check_cron() {

    setTimeout( function() {
      $.ajax( {
        url: ajaxurl,
        method: 'POST',
        data: {
          action: local.action_cron,
          _ajax_nonce: local.ajax_nonce
        },
        success: function( data ) {
          if ( data === 'NO' )
            location.reload();
          else
            check_cron();
        },
        error: function ( ) {
          check_cron();
        }
      } );
    }, 1000 * 10);

  }

  // Button

  button_check.on( 'click', do_check );

} );