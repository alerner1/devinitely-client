import React from 'react';
import NewJobLeadForm from '../Components/NewJobLeadForm';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

class FormContainer extends React.Component {
  chooseForm = () => {
    if (this.props.formType === 'new') {
      return <NewJobLeadForm className="background-ivory" updateActivities={this.props.updateActivities} user={this.props.user} />
    }
  }

  render() {
    return (
      <Container>
        <Card className="background-ivory" style={{  margin: 'auto' }}>
          <Card.Body className="d-flex flex-column">
            {this.chooseForm()}
          </Card.Body>
        </Card>
      </Container>
      )
    
  }
}

export default FormContainer;