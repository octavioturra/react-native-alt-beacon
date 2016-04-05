import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  PropTypes
} from 'react-native';



export default class List extends Component {
  static propTypes= {
    items: PropTypes.arrayOf(PropTypes.object)
  };
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  renderRow(rowData) {
    return <View style={styles.container}>
      <Text style={styles.title}>{rowData.title}</Text>
      <Text style={styles.content}>{rowData.content}</Text>
      <View style={styles.footer}></View>
    </View>;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      data: ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(nextProps.items);
    })
  }
  render() {
    return <ListView renderRow={this.renderRow.bind(this)} dataSource={this.state.data}/>
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 1
  },
  item: {

  },
  title: {

  },
  content: {

  },
  footer: {

  }
});
