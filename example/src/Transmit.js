import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from './Button';

export default class Transmit extends Component {
  static PropTypes = {
    beacon : PropTypes.object.isRequired,
    uuid : PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      on: false,
      error: null
    };
  }

  toggle() {
    const that = this;
    function turnOn() {
      that.setState({
        ...that.state,
        on: true,
        error: null
      });
    }
    function turnOff(){
      that.setState({
        ...that.state,
        on: false,
        error: null
      });
    }
    function sendError(error) {
      alert(JSON.stringify(error));
      that.setState({
        ...that.state,
        error: that.props.beacon.errors[error]
      });
    }
    function startTransmitting() {
      that.props.beacon
        .startTransmitting(that.props.uuid, {
          major: "1",
          minor: "2",
          manufacturer: 0x0000,
          data: [0]
        })
        .then(turnOn)
        .catch(sendError)
    }
    function stop() {
      that.props.beacon
        .stopTransmitting()
        .then(turnOff)
        .catch(sendError);
    }
    function start() {
      that.props.beacon
        .checkTransmissionSupported()
        .then(startTransmitting)
        .catch(sendError);
    }
    if(!this.state.on) {
      start();
    } else {
      stop()
    }
  }

  render() {
    return <View style={styles.container}>
      <Text>Transmit</Text>
      <Button label={this.state.on?'Stop':'Start'} onPress={this.toggle.bind(this)}/>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6FC99',
  },
});
