import { useState, useEffect } from 'react';
import React from 'react';
import Title from "../../assets/Title";
// import CustomButton from "../../assets/CustomButton.jsx";
// import CustomProductTable from "../AdminPages/CustomProductTable";
import Headbar from "../../assets/HeadBar.jsx";
// import Modalbox from '../../assets/Modalbox';
// import Inputbox from '../../assets/Inputbox';

export const OrderTrackShip = () => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [isPayOpen, setIsPayOpen] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/all-products')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <div style={{width:'100%'}}>
            <Headbar/>
            <div style={{ marginTop: '150px' }}></div>
            <div style={styles.padding}>
                <Title value='Follow Your Purchase' fontWeight='Bold'></Title>
            </div>
            <div style={{display:'flex',alignItems:'center',marginLeft:'10%'}}>
                <div>
                    <button style={{borderRadius:50,width:50,height:50}} onClick={() => setIsPayOpen(!isPayOpen)}></button>
                    <Title value='Select' fontWeight='Bold'></Title>
                </div>
                <div style={{width:'100px',height:'5px',backgroundColor:'black',marginBottom:30}}/>
                <div>
                    <button style={{borderRadius:50,width:50,height:50}} onClick={() => setIsPayOpen(!isPayOpen)}></button>
                    <Title value='Payment' fontWeight='Bold'></Title>
                </div>
                <div style={{width:'100px',height:'5px',backgroundColor:'black',marginBottom:30}}/>
                <div>
                    <button style={{borderRadius:50,width:50,height:50}} onClick={() => setIsPayOpen(!isPayOpen)}></button>
                    <Title value='Processing' fontWeight='Bold'></Title>
                </div>
                <div style={{width:'100px',height:'5px',backgroundColor:'black',marginBottom:30}}/>
                <div>
                    <button style={{borderRadius:50,width:50,height:50}} onClick={() => setIsPayOpen(!isPayOpen)}></button>
                    <Title value='Shipped' fontWeight='Bold'></Title>
                </div>
                <div style={{width:'100px',height:'5px',backgroundColor:'black',marginBottom:30}}/>
                <div>
                    <button style={{borderRadius:50,width:50,height:50,backgroundColor:'rgba(52, 52, 52, 0.4)'}} onClick={() => setIsPayOpen(!isPayOpen)}></button>
                    <Title value='Arrived' fontWeight='Bold'></Title>
                </div>
            </div>
            <div style={styles.padding3}/>
            <div style={{marginLeft:'10%'}}>
                {data.map((item, index) => (
                    <div key={index} style={styles.tr(index)}>
                        {/* <td style={styles.td1}>{item.item_id}</td>
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
                            <button style={styles.Button}>
                            <img src="src/assets/Delete.svg" alt="Delete" style={styles.icon} onClick={() => onDelete(index)}/>
                            </button>
                        </td>
                        <td style={styles.td7}>
                            <button style={styles.Button}>
                            <img src="src/assets/Edit.svg" alt="Edit" style={styles.icon} onClick={() => onEdit(index)}/>
                            </button>
                        </td> */}
                    </div>
                ))}
            </div>
        </div>
        

    );
}
const styles = {
    padding: {
        paddingTop: '10px',
        paddingBottom: '10px',
        textAlign: 'left',
    },
    padding2: {
        paddingLeft: '10px',
        textAlign: 'center',
    },
    padding3: {
        paddingTop:'15px'
    },
    tr: (index) => ({
        backgroundColor: index % 2 === 0 ? '#FFEDED' : '#FFDBDB',
        fontFamily: 'comfortaa',
        fontSize: '20px',
        textAlign: 'center',
        height: '100px',
        width: '920px',
        marginBottom:15,
        border: '2px solid #000000',

    }),
    icon1: {
        width: '30px', 
        height: '30px',
    },
    icon2: {
        width: '80px', 
        height: '80px',
        marginLeft:'43.5%',
        marginTop:'15%'
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
    Button1: {
        height:'60px',
        width:'100px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '6px 9px 3px rgba(0, 0, 0, 0.7)',
        border: '2px solid #000000',
        fontSize: '20px',
        fontWeight: 'bold',
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
        paddingTop:'20px',
        marginLeft:'45%'
    },
    image: {
        width: '100px', 
        height: '100px',
    },
    totalB: {
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        fontFamily: 'comfortaa',
        textAlign: 'left',
        height: '210px',
        width: '600px',
        padding:'10px'
    },
    addressB: {
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        fontFamily: 'comfortaa',
        textAlign: 'left',
        height: '200px',
        width: '50%',
        padding:'10px',
        marginTop: '10px'
    },
    line: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        height: '1.5px',
        width: '400px',
    },
    editB: {
        marginLeft:'60%',
        backgroundColor:'rgba(52, 52, 52, 0.0)'
    },
    crossB:{
        width:"1%",
        height:"6%",
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
        backgroundColor:'white'
    },
    cardBack: {
        width:'100%',
        height:'108%',
        position:'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor:'rgba(52, 52, 52, 0.4)',
        alignItems:'center',
        justifyContent:'center',
        display:'flex'
    },
    card:{
        width:'80%',
        height:'80%',
        backgroundColor:'white',
        display:'flex'
    },
};