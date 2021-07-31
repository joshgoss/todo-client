import './LoginLayout.scss';
import React from 'react';  
import { Route } from 'react-router-dom';  
  
const LoginLayout = ({ children }) => (                         
    <div className='login-layout'>  
      <div className='brand'>
        <span className='title'><span className='primary'>To</span><span className='alt'>Do</span></span>
        <span className='tagline'>A Simple To-Do Manger</span>
      </div>
      {children}                                       
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