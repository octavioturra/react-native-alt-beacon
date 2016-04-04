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
      on: false
    };
  }

  _start(success, error) {
    this.props.beacon.startTransmitting(this.props.uuid, {}, success, error)
  }
  _stop(success) {
    this.props.beacon.unbind()
  }

  toggle() {
    if(!this.state.on) {
      this._start(()=> this.setState({
        on: true
      }));
    } else {
      this._stop(()=> this.setState({
        on: false
      }));
    }
  }

  render() {
    return <View style={styles.container}>
      <Button label={`${(this.state.on?'Stop':'Start')}`} onPress={this.toggle.bind(this)}/>
      <Text>Transmit</Text>
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
