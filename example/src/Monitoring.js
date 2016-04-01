import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from './Button';

export default class Monitoring extends Component {
  render() {
    return <View style={styles.container}>
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
