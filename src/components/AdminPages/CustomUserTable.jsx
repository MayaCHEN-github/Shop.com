import React from 'react';
import { useState } from 'react';

const CustomUserTable = ({ data, onDelete, onEdit }) => {

  const [showPassword, setShowPassword] = useState(Array(data.length).fill(false));
  const togglePassword = index => {
    const newShowPassword = [...showPassword];
    newShowPassword[index] = !newShowPassword[index];
    setShowPassword(newShowPassword);
  };

  return (
    <div>
      <style>@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap')</style>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.td}>UserID</th>
            <th style={styles.td}>UserName</th>
            <th style={styles.td}>UserPassword</th>
            <th style={styles.td}>  </th>
            <th style={styles.td}>Delete</th>
            <th style={styles.td}>Detail</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={styles.tr(index)}>
              <td style={styles.td1}>{item.user_id}</td>
              <td style={styles.td2}>{item.username}</td>
              <td style={styles.td3}>{showPassword[index] ? item.password : '***************************'}</td>
              <td style={styles.tdToggle}>
                <button style={styles.Button} onClick={() => togglePassword(index)}>
                  <img src={showPassword[index] ? "src/assets/EyeOpen.svg" : "src/assets/EyeClosed.svg"} alt="Toggle password visibility" style={styles.icon} />
                </button>
              </td>
              <td style={styles.td4}>
                <button style={styles.Button}>
                  <img src="src/assets/Delete.svg" alt="Delete" style={styles.icon} onClick={() => onDelete(index)}/>
                </button>
              </td>
              <td style={styles.td5}>
                <button style={styles.Button}>
                  <img src="src/assets/Edit.svg" alt="Edit" style={styles.icon} onClick={() => onEdit(index)}/>
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
    width: '30%',
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
  tdToggle: {
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
