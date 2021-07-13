import { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component'
import { socketService } from '../services/socketService'



export class SocketsNotification extends Component {
  state = {
    location: null
  }

  componentDidMount() {
    console.log('SocketsNotification is running')
    socketService.on('adopt-request-owner', (msg) => {
      this.setState({ location: 'profile' })
      setTimeout(() => this.adoptNotify(msg), 10000)
    });
    socketService.on('adopt-request-requester', (msg) => {
      this.setState({ location: 'profile' })
      this.adoptNotify(msg)
    });
    
    socketService.on('approve-requested-msg', (msg) => {
      this.setState({ location: 'profile' })
      this.adoptNotify(msg)
    });
    socketService.on('already-requested', (msg) => {
      this.alertNotify(msg)
    });
    socketService.on('alert-to-notify', (msg) => {
      // console.log('alert-to-notify', msg)
      this.alertNotify(msg)
    });
    this.setState({ location: undefined })
  }

  componentWillUnmount() {
    socketService.off('adopt-request-owner')
    socketService.off('adopt-request-requester')
    socketService.off('already-requested')
    socketService.off('alert-to-notify')
    console.log('SocketsNotification is off')
  }

  adoptNotify = (msg) => {
    store.addNotification({
      title: "Wonderful!",
      message: msg,
      type: "info",
      insert: "top",
      container: "bottom-full",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 7000,
        onScreen: false,
        pauseOnHover: true
      }
    });
  }
  alertNotify = (msg) => {
    store.addNotification({
      title: "Opps!",
      message: msg,
      type: "info",
      insert: "top",
      container: "bottom-full",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: false
      }
    });
  }
  render() {

    return (
      this.state.location ? (
        <Link to={ this.state.location && `/${this.state.location}` } >
          <ReactNotification />
        </Link>
      )
        :
        <>
          <ReactNotification />
        </>
    )
  }
}
