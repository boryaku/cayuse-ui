import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import CityInfo from './Components/CityInfo';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'http://localhost:8080/graphql' });

class App extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        const defaultZip = "90210";
        this.state = {
            isOpen: false,
            zip: defaultZip,
            zipSearch: defaultZip
        };

        this.handleChange = this.handleChange.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleChange(event) {
        let currentZip = event.target.value;
        this.setState({zip: currentZip});

        let isZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(currentZip);
        if(isZip === true){
            this.setState({zipSearch: currentZip});
        }
    }

    render() {
        return (
            <ApolloProvider client={client}>
              <div>
                  <Navbar color="inverse" light expand="md">
                      <NavbarBrand href="/">Home</NavbarBrand>
                      <NavbarToggler onClick={this.toggle} />
                      <Collapse isOpen={this.state.isOpen} navbar>
                          <Nav className="ml-auto" navbar>
                              <NavItem>
                                  <NavLink href="https://github.com/boryaku/cayuse-ui">Github</NavLink>
                              </NavItem>
                          </Nav>
                      </Collapse>
                  </Navbar>
                  <Jumbotron>
                      <Container>
                          <Row>
                              <Col>
                                  <h1>City Info Finder</h1>
                                  <Form inline onSubmit={this.handleSubmit}>
                                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                          <Label for="zip" className="mr-sm-2">Zip Code</Label>
                                          <Input type="text" value={this.state.zip} onChange={this.handleChange} />
                                      </FormGroup>
                                  </Form>
                              </Col>
                          </Row>
                          <Row>
                              <CityInfo zipCode={this.state.zipSearch}/>
                          </Row>
                      </Container>
                  </Jumbotron>
              </div>
            </ApolloProvider>
        );
    }
}

export default App;
