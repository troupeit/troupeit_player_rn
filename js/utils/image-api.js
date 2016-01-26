module.exports = {

  getImages: function(query) {

    var query_string = '';

    query.split(' ').map((term,i) => {
      (i === this.length - 1) ? query_string += term : query_string += term + '+';
    });

    return fetch('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='+ query_string)
  },

};
