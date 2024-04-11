import React from 'react';
import Searchbox from './SearchboxAdmin';
import ButtonBar from '../../assets/ButtonBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

/*  You can use this component like this:

    <div>
        <Headbar/>
    </div>
    <div style={{ marginTop: '130px' }}></div>

    ↑Please add this div since the Headbar is fixed and it will overlay on other component.
*/

const Headbar = (props) => {

  const navigate = useNavigate();

  const navigateLogout = ()=>{
    const token = localStorage.getItem('token');

      localStorage.removeItem('token');
      localStorage.removeItem('user_type');
      navigate('/');
 
  }

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
        <Link to="/">
          <img src="src\assets\shop_com.png" alt="Shop.com logo" style={styles.logo} />
        </Link>
      </div>
      <div style={styles.headbarSection2}>
        <Searchbox style={styles.searchbox} onSearch={props.setSearchTerm} />
        <ButtonBar buttons={[
          { label: 'User Management', onClick: () => { }, to: "/admin-user" },
          { label: 'Product Management', onClick: () => { }, to: "/admin-product" },
        ]} />
      </div>
      <div style={styles.headbarSection3}>
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
