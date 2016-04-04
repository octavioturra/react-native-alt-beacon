import React, {
  Component,
  StyleSheet,
  Text,
  View,
  PropTypes,
} from 'react-native';

import Button from './Button';

export default class Ranging extends Component {
  static PropTypes = {
    beacon : PropTypes.object.isRequired
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
      <Text>Ranging</Text>
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
