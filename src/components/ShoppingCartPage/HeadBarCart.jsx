import React from 'react';
import {SearchBox} from './SearchboxCart';
import ButtonBar from '../../assets/ButtonBar';
import { Link } from 'react-router-dom';

import ShopComLogo from '../../assets/shop_com.png'

/*  You can use this component like this:

    <div>
        <Headbar/>
    </div>
    <div style={{ marginTop: '130px' }}></div>

    ↑Please add this div since the Headbar is fixed and it will overlay on other component.
*/

/*
import {useNavigate} from 'react-router-dom';
const navigate = require(useNavigate);

const redirectToLogin = ()) =>{
  const token = localStorage.getItem('token');
  if(token){
    navigate('/shoppingcart');
  }else{
    navigate('/login');
  }

}

*/


const Headbar = (props) => (

  <div style={styles.headbar}>
    <div style={styles.headbarSection1}>
      <Link to="/">
        <img src={ShopComLogo} alt="Shop.com logo" style={styles.logo} />
      </Link>
    </div>
    <div style={styles.headbarSection2}>
      <SearchBox style={styles.searchbox} defaultQuery={props.defaultQuery} />
      <ButtonBar buttons={[
        { label: 'Home', to: "/" },
        { label: 'Electronics', to: "/category/electronics" },
        { label: 'Cosmetics', to: "/category/cosmetics" },
        { label: 'Furniture', to: "/category/furniture" },
        { label: 'Books', to: "/category/books" },
        { label: 'Toys', to: "/category/toys" },
        { label: 'Games', to: "/category/games" },
        { label: 'Others', to: "/category/others" },
      ]} />
    </div>
    <div style={styles.headbarSection3}>
        <ButtonBar buttons={[
                { label: 'logout', onClick: () => console.log('clicked') },
                { label: 'Welcome, AdminUser', onClick: () => console.log('clicked') /* Username: to be completed */},
                { label: 'view cart', onClick: () => console.log('clicked view cart')}
            ]}
        />
    </div>
  </div>
  
);

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
    zIndex: 99,
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
    width: '65%', 
  },
  headbarSection3: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '20%', 
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
