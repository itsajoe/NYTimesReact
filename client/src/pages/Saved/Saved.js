import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Saved extends Component {
  state = {
    articles: [],
    articleId: ""
  };
  
  componentDidMount() {
    let comp = this;
    API.getArticle()
    .then(function(data) {
      comp.setState({articles: data.data})
    })
  }
  componentDidUpdate() {
    if (this.state.articleId) {
      API.deleteArticle(this.state.articleId);
      this.setState({articleId: ""})
    } else {
      let comp = this;
      API.getArticle()
      .then(function(data) {
        comp.setState({articles: data.data})
      })
    }
    
  }
  loadArticles = () => {
    return ( 
    (this.state.articles.map((article, index) =>
      <ListItem key={index} id={article._id}  body={article.body} title={article.title} url={article.url} >
      <FormBtn 
      onClick={() => this.setState({articleId: article._id})}
      >
      Delete
      </ FormBtn>
      </ ListItem>
    )
       ) 
    )}

  render() {
    return (
      <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Articles</h1>
            <List >
              {this.loadArticles()}
            </List>
            <Link to={"/"}>
              <FormBtn >
              Search Screen
              </ FormBtn>
            </Link>
          </Jumbotron>
        </Col>
      </Row>
      </Container>
    );
  }
}

export default Saved;
