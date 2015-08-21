function ga_search_results(number_results, page_number) {
    search_term = document.getElementById('search_term').value
    if (number_results == 0) {
      result_description = "ZeroResults"
      ga('send', 'pageview', {
            'anonymizeIp': true,
            'page': 'title-search?searchText=' + search_term + '&resultFound=No'
        }
      );
    } else {
      page_number = page_number
      result_description = "Page"+page_number
      ga('send', 'pageview', {
            'anonymizeIp': true,
            'page': 'title-search?searchText=' + search_term + '&resultFound=Yes'
        }
      );
    }
    ga('send', 'event', 'Search', result_description, search_term);
}
