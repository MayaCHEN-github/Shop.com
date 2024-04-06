import React from 'react';
import Searchbox from './SearchboxAdmin';
import ButtonBar from '../../assets/ButtonBar';

/*  You can use this component like this:

    <div>
        <Headbar/>
    </div>
    <div style={{ marginTop: '130px' }}></div>

    ↑Please add this div since the Headbar is fixed and it will overlay on other component.
*/

const Headbar = (props) => (
  <div style={styles.headbar}>
    <div style={styles.headbarSection1}>
      <img src="src\assets\shop_com.png" alt="Shop.com logo" style={styles.logo} />
    </div>
    <div style={styles.headbarSection2}>
      <Searchbox style={styles.searchbox} onSearch={props.setSearchTerm}/>
      <ButtonBar buttons={[
                { label: 'User Management', onClick: () => console.log('clicked') },
                { label: 'Product Management', onClick: () => console.log('clicked') },
            ]}
        />
    </div>
    <div style={styles.headbarSection3}>
        <ButtonBar buttons={[
                { label: 'view cart', onClick: () => console.log('clicked') },
                { label: 'Welcome, username', onClick: () => console.log('clicked') /* Username: to be completed */},
                
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
