import React, { Component } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import MyWizard from './MyWizard';

export default class App extends Component {
  state = {
    page: 1
  }

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (
      <React.Fragment>
        <Header as='h1' style={{textAlign: 'center'}}>
          Semantic UI React Formik {this.state.page} / 2
        </Header>
        <Container style={{ paddingTop: 0 }}>
          <Segment attached>
            <MyWizard onPageChanged={(page) => {this.setState({page: page+1});}} />
          </Segment>
        </Container>
      </React.Fragment>
    )
  }
}
