/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Monitoring from './src/Monitoring';
import Ranging from './src/Ranging';
import Transmit from './src/Transmit';
import Button from './src/Button';
import Beacon from './src/Beacon';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: '123456',
      beacon: new Beacon,
      pageName: ''
    };
  }

  renderScene(route, navigator) {
    switch(route.name) {
      case 'monitoring': return <Monitoring navigator={navigator} beacon={this.state.beacon} uuid={this.state.uuid}/>;
      case 'ranging': return <Ranging navigator={navigator} beacon={this.state.beacon} uuid={this.state.uuid}/>;
      case 'transmit': return <Transmit navigator={navigator} beacon={this.state.beacon} uuid={this.state.uuid}/>;
    }
  }

  navigate(pageName) {
    if(this.state.pageName != pageName){
      return this.setState({
        ...this.state,
        pageName: pageName
      }, ()=> this.refs.navigation.push({name: pageName}));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator ref="navigation"
          style={styles.navigator}
          initialRoute={{name: 'monitoring', index:0}}
        renderScene={this.renderScene.bind(this)}/>
        <View style={styles.bottomBar}>
          <Button onPress={this.navigate('transmit').bind(this)} label="Transmit"/>
          <Button onPress={this.navigate('monitoring').bind(this)} label="Monitoring"/>
          <Button onPress={this.navigate('ranging').bind(this)} label="Ranging"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  navigator: {
    flex:1,
    backgroundColor: '#ffffff',
    alignSelf: 'stretch'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  bottomBar: {
    justifyContent: 'space-around',
    alignItems: 'stretch',
    flexDirection: 'row'
  }
});


AppRegistry.registerComponent('example', () => Example);
