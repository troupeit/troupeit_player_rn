module.exports = {

  getShows: function(query) {

    var query_string = '';

    query.split(' ').map((term,i) => {
      (i === this.length - 1) ? query_string += term : query_string += term + '+';
    });

    return fetch('http://archive.org/advancedsearch.php?q='+ query_string +'&rows=200&output=json&save=yes#raw')
  },

  getShowMetaData: function(url) {
    return fetch(url);
  }

};
