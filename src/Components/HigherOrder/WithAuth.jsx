import { Component } from 'react';
import {  Navigate } from 'react-router-dom';
import { checkToken } from '../../Services/authService';

export function WithAuth(ComponentToProtect) {  return class extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      redirect: false,
    };
  }    
  
  async componentDidMount() {
    const res = await checkToken();
    
    if(res.status === 200) return this.setState({loading: false});
    if(res instanceof Error) return this.setState({loading: false, redirect: true});          
  }    
  
  render() {
    const { loading, redirect } = this.state;
    if (loading) {
      return null;
    }
    if (redirect) {
      return <Navigate to="/login" replace={true}/>;
    }
    
    return <ComponentToProtect {...this.props} />;
  }
}}