$(function() {

  $('.case-list .summary td:first-child').wrapInner('<a href="#"></a>');
  $('.case-list .details').attr('aria-hidden', 'true');

  $('.case-list').on('click', '.summary', function(e) {
    e.preventDefault();
    var $el = $(this).next();
    var hidden = ($el.attr('aria-hidden') ? 'false' : 'true');
    $el
      .toggleClass('js-hidden')
      .attr('aria-hidden', hidden);
  });
  
});