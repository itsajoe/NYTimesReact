import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Search extends Component {
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: "",
    articleId: ""
  };
  

  componentDidMount() {  
      this.loadArticles();
  }

  componentDidUpdate() {
    if (this.state.articleId) {
      this.saveArticle();
    }
  }

  loadArticles = () => {
    return ( 
    (this.state.articles.map((article, index) =>
      <ListItem key={index} id={article._id} body={article.snippet} title={article.headline.main} url={article.web_url} >
      <FormBtn 
      onClick={() => this.setState({articleId: article._id})}
      >
      Save 
      </ FormBtn>
      </ ListItem>
    )
       ) 
    )}
    

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

 saveArticle = async () => {
    let a;
     for (let i = 0; i < this.state.articles.length; i++) {
      if (this.state.articleId == this.state.articles[i]._id) {
        a = this.state.articles[i];
      }
    }
    console.log(a)
    API.saveArticle({
      title: a.headline.main,
      body: a.snippet,
      date: a.pub_date,
      url: a.web_url
    })
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err) {
      if (err) {
        console.log(err)
      }
    })
  }

  handleFormSubmit = event => {
    let comp = this;
    event.preventDefault();
    API.searchAPI(this.state.topic, this.state.startYear, this.state.endYear)
    .then(function(data) {
      // console.log(data.data.response.docs)
      comp.setState({ articles: data.data.response.docs })
    })
    .catch(function(err) {
      console.log(err)
    })
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>New York Times Search</h1>
              <Col size="md-3"></Col>
              <Col size="md-6">
              <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                label="Topic: "
                placeholder="What topic would you like to search?"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                label="Start Year: "
                placeholder="What year would you like to begin?"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                label="End Year: "
                placeholder="What year would you like to end?"
              />
              <FormBtn
                disabled={!(this.state.topic)}
                onClick={this.handleFormSubmit}
                href="/"
              >
               Search
              </FormBtn>
            </form>
            </Col>
            </Jumbotron>
          </Col>
        </Row>

      <Row>
        <Col size="md-12">
        <Link to={"/article"}>
              <FormBtn >
              Saved Articles
              </ FormBtn>
            </Link>
          <Jumbotron>
            <h1>Articles</h1>
            <List >
              {this.loadArticles()}
            </List>
          </Jumbotron>
        </Col>
      </Row>
      </Container>
    );
  }
}

export default Search;
