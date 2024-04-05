import React from 'react';

const CustomUserTable = ({ }) => {
  const data = [
    {
      UserID: '1',
      UserName: 'Alice',
      UserPassword: 'password1'
    },
    {
      UserID: '2',
      UserName: 'Bob',
      UserPassword: 'password2'
    },
  ];

  return (
    <div>
      <style>@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap')</style>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.td}>UserID</th>
            <th style={styles.td}>UserName</th>
            <th style={styles.td}>UserPassword</th>
            <th style={styles.td}>Delete</th>
            <th style={styles.td}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={styles.tr(index)}>
              <td style={styles.td1}>{item.UserID}</td>
              <td style={styles.td2}>{item.UserName}</td>
              <td style={styles.td3}>{item.UserPassword}</td>
              <td style={styles.td4}>
                <button style={styles.Button}>
                  <img src="src/assets/Delete.svg" alt="Delete" style={styles.icon}/>
                </button>
              </td>
              <td style={styles.td5}>
                <button style={styles.Button}>
                  <img src="src/assets/Edit.svg" alt="Edit" style={styles.icon}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
    
  );
};

const styles = {
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  thead: {
    backgroundColor: '#FFCDCD',
    fontFamily: 'comfortaa',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    height: '40px',
  },
  tr: (index) => ({
    backgroundColor: index % 2 === 0 ? '#FFEDED' : '#FFDBDB',
    fontFamily: 'comfortaa',
    fontSize: '20px',
    textAlign: 'center',
    height: '40px',
  }),
  td1: {
    width: '15%',
    fontFamily: 'comfortaa',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  td2: {
    width: '25%',
    fontFamily: 'comfortaa',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  td3: {
    width: '40%',
    fontFamily: 'comfortaa',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  td4: {
    width: '10%',
    fontFamily: 'comfortaa',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  td5: {
    width: '10%',
    fontFamily: 'comfortaa',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  icon: {
    width: '30px', 
    height: '30px',
  },
  Button: {
    width: '30px',
    height: '30px',
    backgroundColor: 'transparent' ,
    outline: 'none',
    display: 'table-cell',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center', 
    border: 'none',
  },
};

export default CustomUserTable;
