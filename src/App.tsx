import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './component/Login';
import './Util/css/style.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import routes from './config/routes';
import MainRoutes from './config/routes';


function App() {
  return (
    <div className="App">

      <MainRoutes/>

    </div>
  );
}

export default App;
