window.onload = function() {
  function ga_title_search() {
    search_term = document.getElementById('search_term').value
    title_number_regex = '^([A-Z]{0,3}[1-9][0-9]{0,5}|[0-9]{1,6}[ZT])$'
    if (search_term.match(title_number_regex)) {
      ga('send', 'event', 'Search', 'TitleNumber', search_term);
    }
  }
  document.getElementById('search_button').onclick = ga_title_search;
}
