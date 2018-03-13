import axios from "axios";

export default {
  searchAPI: function(t, yOne, yTwo) {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5478497886e04c3f8006ccf68c5473b5";
    if (yOne && yTwo) {
      url += "&&?q=" + t + "&&?begin_date=" + yOne + "&&?end_date=" + yTwo;
      console.log(url);
      return axios.get(url);
    } else {
      url += "&&?q=" + t;
      console.log(url);
      return axios.get(url);
    }
   
  },
  // Gets all articles
  getArticle: function() {
    return axios.get("/api/Article");
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/Article/" + id);
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/Article", articleData);
  }
};
