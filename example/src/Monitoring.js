import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from './Button';
import List from './List';

export default class Monitoring extends Component {
  static PropTypes = {
    uuid: PropTypes.string.isRequired,
    beacon : PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      on: false,
      error: null,
      items: []
    };
  }

  componentDidMount(){
    this.props.beacon
      .on(this.props.beacon.events.DID_ENTER_REGION, (data)=> this.setState({
        ...this.state,
        items: [
          {title: 'uuid', content: data.uuid},
          {title: 'minor', content: data.minor},
          {title: 'major', content: data.major}
        ]
      }))
      .on(this.props.beacon.events.DID_EXIT_REGION, ()=> this.setState({
        ...this.state,
        items: []
      }));
  }

  _start(uuid, onSuccess, onError) {
    this.props.beacon.startMonitoring(uuid).then(onSuccess).catch(onError);
  }
  _stop(onSuccess, onError) {
    this.props.beacon.startMonitoring().then(onSuccess).catch(onError);
  }

  toggle() {
    function error(err){
      this.setState({
        ...this.state,
        error: err
      });
    }
    if(!this.state.on) {
      this._start(this.props.uuid, ()=> this.setState({
        ...this.state,
        on: true,
        error: null
      }), error.bind(this));
    } else {
      this._stop(()=> this.setState({
        ...this.state,
        on: false,
        error: null
      }), error.bind(this));
    }
  }

  render() {
    return <View style={styles.container}>
      <View style={styles.header}>
        <Text>Monitoring</Text>
        <Text>{this.state.error}</Text>
        <Button label={`${(this.state.on?'Stop':'Start')}`} onPress={this.toggle.bind(this)}/>
      </View>
      <View style={styles.body}>
        <List items={this.state.items}/>
      </View>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#99FCFF',
    flexDirection: 'column'
  },
  header: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    alignItems: 'center',
    height: 40,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin:5
  }
});
