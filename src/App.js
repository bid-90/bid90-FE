import React from 'react';
//import logo from './logo.svg';

import Menu from './components/menu/Menu'
import Pages from './components/pages/Pages'
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class App extends React.Component {
 
  render(){
    return (
      <div >
      <Menu alert={this.createNotification}/>
      <Pages alert={this.createNotification}/>
      <NotificationContainer/>
     </div>
    );
  }
}

export default App;
