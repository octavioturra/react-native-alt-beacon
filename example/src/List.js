import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  PropTypes,
  View
} from 'react-native';



export default class List extends Component {
  static propTypes= {
    items: PropTypes.arrayOf(PropTypes.object)
  };
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds,
      data: ds.cloneWithRows(props.items)
    };
  }
  renderRow(rowData) {
    return <View style={styles.item}>
      <Text style={styles.title}>{rowData.title}</Text>
      <Text style={styles.content}>{rowData.content}</Text>
      <View style={styles.footer}></View>
    </View>;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      data: this.state.ds.cloneWithRows(nextProps.items)
    });
  }
  render() {
    return <View style={styles.container}>
              <ListView renderRow={this.renderRow.bind(this)} dataSource={this.state.data}/>
           </View>
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#666',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    padding:10,
  },
  title: {
    fontWeight: 'bold'
  },
  content: {
    color: '#555'
  }
});
