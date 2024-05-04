/**
 * CustomProductTable.jsx:
 *  This component is to display product data in a table.
 */

import React from 'react';

const CustomProductTable = ({ data, onDelete, onEdit }) => {
  return (
    <div>
      <style>@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap')</style>
      <table style={styles.table}>
        <thead style={styles.thead}> ({/** Item titles */})
          <tr> 
            <th style={styles.td}>ID</th>
            <th style={styles.td}>Image</th>
            <th style={styles.td}>ProductName</th>
            <th style={styles.td}>Price</th>
            <th style={styles.td}>Stock</th>
            <th style={styles.td}>Delete</th>
            <th style={styles.td}>Detail</th>
          </tr>
        </thead>
        <tbody> ({/** Items' information*/})
          {data.map((item, index) => (
            <tr key={index} style={styles.tr(index)}>
              <td style={styles.td1}>{item.item_id}</td>
              <td style={styles.td2}><img src={item.url} 
                                          alt={item.name} 
                                          style={styles.image} 
                                          onError={(e) => {e.target.onerror = null; 
                                                           e.target.src="src/assets/Product_default_image.svg"
                                                           }}/></td>
              <td style={styles.td3}>{item.name}</td>
              <td style={item.price === 0 ? styles.td4ZeroPrice : styles.td4}>{item.price}</td>
              <td style={item.stock_quantity === 0 ? styles.td5ZeroStock : styles.td5}>{item.stock_quantity}</td>
              <td style={styles.td6}>
                <button style={styles.Button}> ({/** Delete buttoms */})
                  <img src="src/assets/Delete.svg" alt="Delete" style={styles.icon} onClick={() => onDelete(index)}/>
                </button>
              </td>
              <td style={styles.td7}>
                <button style={styles.Button}> ({/** Edit buttoms */})
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
    height: '120px',
  }),
  td1: {
    width: '10%',
    fontFamily: 'comfortaa',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  td2: {
    width: '15%',
    fontFamily: 'comfortaa',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  td3: {
    width: '35%',
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
  td4ZeroPrice: {
    width: '10%',
    fontFamily: 'comfortaa',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
    color: 'red',
  },
  td5: {
    width: '10%',
    fontFamily: 'comfortaa',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  td5ZeroStock: {
    width: '10%',
    fontFamily: 'comfortaa',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
    color: 'red',
  },
  td6: {
    width: '10%',
    fontFamily: 'comfortaa',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  td7: {
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
  image: {
    width: '100px', 
    height: '100px',
    
  },
};

export default CustomProductTable;
