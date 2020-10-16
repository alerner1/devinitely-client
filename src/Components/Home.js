import React from 'react';
import Button from 'react-bootstrap/Button'
import { Redirect, withRouter } from 'react-router-dom'

class Home extends React.Component {
  // state = {
  //   user: 'none'
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.user !== this.props.user) {
  //     this.setState({user: this.props.user})
  //   } else if (this.props.user === null) {
  //     this.setState({user: null})
  //   }
  // }

  // componentDidMount() {
  //     if (this.props.user === null) {
  //       console.log('nope')
  //       this.props.history.push('/login')
  //     }
    
  // }
  
  render() {
    console.log(this.props.user)
    return (
      <Button variant="danger">
          bootstrapped!
      </Button>
    )
  }
}

export default withRouter(Home)