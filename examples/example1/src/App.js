import React, { Component } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import MyForm from './MyForm';

export default class App extends Component {
  state = {
    page: 1
  }

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (
      <React.Fragment>
        <Header as="h1" style={{textAlign: 'center'}}>
          Semantic UI React Formik {this.state.page} / 3
        </Header>
        <Container style={{ paddingTop: 0 }}>
          <Segment attached>
            <MyForm onPageChanged={(page) => {this.setState({page: page+1});}} />
          </Segment>
        </Container>
      </React.Fragment>
    )
  }
}
