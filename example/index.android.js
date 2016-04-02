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

class Example extends Component {
  renderScene(route, navigator){
    switch(route.name) {
      case 'monitoring': return <Monitoring navigator={navigator}/>;
      case 'ranging': return <Ranging navigator={navigator}/>;
      case 'transmit': return <Transmit navigator={navigator}/>;
    }
  }
  navigate(page){
    return ()=> this.refs.navigation.push({name: page});
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
