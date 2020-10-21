import React from 'react';
import NewJobLeadForm from '../Components/NewJobLeadForm';

class FormContainer extends React.Component {
  chooseForm = () => {
    if (this.props.formType === 'new') {
      return <NewJobLeadForm updateActivities={this.props.updateActivities} incrementActivities={this.props.incrementActivities} decrementActivities={this.props.decrementActivities} user={this.props.user} />
    }
  }

  render() {
    return (<>{this.chooseForm()}</>)
    
  }
}

export default FormContainer;