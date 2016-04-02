import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from './Button';

export default class Monitoring extends Component {
  static PropTypes = {
    beacon = PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      on: false
    };
  }

  _start(success) {
    setTimeout(()=>success(), 0);
  }
  _stop(success) {

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
      <Text>Monitoring</Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#99FCFF',
  },
});
