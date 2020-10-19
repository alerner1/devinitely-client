import React from 'react';
import NewJobLeadForm from '../Components/NewJobLeadForm';

class FormContainer extends React.Component {
  chooseForm = () => {
    if (this.props.formType === 'new') {
      return <NewJobLeadForm user={this.props.user} />
    }
  }

  render() {
    return (<>{this.chooseForm()}</>)
    
  }
}

export default FormContainer;