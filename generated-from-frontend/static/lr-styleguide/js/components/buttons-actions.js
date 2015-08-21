$(function() {

  $('.print-page')
    .addClass('button-print')
    .on('click', function(e) {
      console.log(e.target);
      e.preventDefault();
      window.print();
    })
    .wrapInner('<a href="#">Print this page</a>');
  
});