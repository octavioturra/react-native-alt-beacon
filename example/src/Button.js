import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  PropTypes
} from 'react-native';

export default class Monitoring extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    label: PropTypes.string.isRequired
  };
  render() {
    return <TouchableHighlight style={styles.container}
      onPress={this.props.onPress}
      underlayColor="#bbb">
      <Text>{this.props.label}</Text>
    </TouchableHighlight>;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 10,
    margin:5,
    borderWidth: .5,
    borderColor: '#bbb',
    elevation: 2
  },
});
