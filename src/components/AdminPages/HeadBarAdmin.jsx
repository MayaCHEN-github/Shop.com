/**
 * HeadbarAdmin.jsx:
 *  This component is to display a headbar for the admin page.
 */

import React from 'react';
import Searchbox from './SearchboxAdmin';
import ButtonBar from '../../assets/ButtonBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Headbar = (props) => {

  const navigate = useNavigate();

  /**
   * Check if it is an admin account. If not, redirect to the home page.
   */
  const navigateLogout = ()=>{
    const token = localStorage.getItem('token');

      localStorage.removeItem('token');
      localStorage.removeItem('user_type');
      navigate('/');
 
  }

  /**
   * Get the username from the token.
   */
  const getName = ()=>{
    const token = localStorage.getItem('token');
    if(!token){
      return 'stranger';
    }
  
    const decoded_token = jwtDecode(token);
    return decoded_token.username;
  }

  return (
    <div style={styles.headbar}>
      <div style={styles.headbarSection1}>
        <Link to="/"> ({/** Shop.com logo */})
          <img src="src\assets\shop_com.png" alt="Shop.com logo" style={styles.logo} />
        </Link>
      </div>
      <div style={styles.headbarSection2}>
        <Searchbox style={styles.searchbox} onSearch={props.setSearchTerm} /> ({/** Search box */})
        ({/** Buttons for navigation between user management & product management pages */})
        <ButtonBar buttons={[ 
          { label: 'User Management', onClick: () => { }, to: "/admin-user" },
          { label: 'Product Management', onClick: () => { }, to: "/admin-product" },
        ]} />
      </div>
      <div style={styles.headbarSection3}>
        ({/** Buttons for logout & username display */})
        <ButtonBar buttons={[ 
          { label: 'logout', onClick: () => navigateLogout() },
          { label: `Welcome, ${getName()}`, onClick: () => console.log('clicked') /* Username: to be completed */ },

        ]}
        />
      </div>
    </div>
  );
};

const styles = {
  headbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    padding: '20px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  headbarSection1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '15%',
  },
  headbarSection2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '60%',
  },
  headbarSection3: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '25%',
  },
  logo: {
    width: '100%',
    height: 'auto',
  },
  searchbox: {
    width: '150%',
  },
}

export default Headbar;
