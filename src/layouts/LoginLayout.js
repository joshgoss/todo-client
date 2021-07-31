import './LoginLayout.scss';
import React from 'react';  
import { Route } from 'react-router-dom';  

import Notification from '../features/notifications/Notification';
  
const LoginLayout = ({ children }) => (                         
    <div className='login-layout'>  
      <Notification />
      <div className='page'>
        <div className='brand'>
          <span className='title'><span className='primary'>To</span><span className='alt'>Do</span></span>
          <span className='tagline'>A Simple To-Do Manger</span>
        </div>
        {children}  
      </div>                                    
    </div>  
  );  
  
  const LoginLayoutRoute = ({component: Component, ...rest}) => {  
    return (  
      <Route {...rest} render={props => (  
        <LoginLayout>  
            <Component {...props} />  
        </LoginLayout>  
      )} />  
    )  
  };  
  
export default LoginLayoutRoute;  