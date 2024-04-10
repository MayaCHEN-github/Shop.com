import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import Title from "../../assets/Title";
import {OrderCard} from './OrderCard';
// import CustomButton from "../../assets/CustomButton.jsx";
// import CustomProductTable from "../AdminPages/CustomProductTable";
import Headbar from "../ProductPages/HeadBarProduct.jsx";
// import Modalbox from '../../assets/Modalbox';
// import Inputbox from '../../assets/Inputbox';

export const OrderTrackArrive = () => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [isPayOpen, setIsPayOpen] = useState(false);
    const [data, setData] = useState([]);
    const [fetched, setFetched] = useState([]);
    const [total, setTotal] = useState(0);

    const userId = "001";

    useEffect(() => {
        async function fetchData() {
          try {
            const data = {
              "user_id" : userId
            };

            const response = await fetch('http://localhost:3001/all-cart-items',{
              method : 'POST',
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });

            if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const items = await response.json();
            setFetched(items.items);
          } catch (err) {
            console.error(err);
          }
        }

        fetchData();    
    },[]);

    const updateTotal = (newTotal) => {
        setTotal(newTotal);
    };

    return (
        <div style={{width:'100%'}}>
            <Headbar/>
            <div style={{ marginTop: '150px' }}></div>
            <div style={styles.padding}>
                <Title value='Follow Your Purchase' fontWeight='Bold'></Title>
            </div>
            <div style={{display:'flex',alignItems:'center',marginLeft:'10%'}}>
                <div>
                    <Link to={"/"}>
                        <button style={{borderRadius:50,width:50,height:50,backgroundColor:'rgba(52, 52, 52)'}}></button>
                    </Link>
                    <Title value='Select' fontWeight='Bold'></Title>
                </div>
                <div style={{width:'100px',height:'5px',backgroundColor:'black',marginBottom:30}}/>
                <div>
                    <Link to={"/payment"}>
                        <button style={{borderRadius:50,width:50,height:50,backgroundColor:'rgba(52, 52, 52)'}}></button>
                    </Link>
                    <Title value='Payment' fontWeight='Bold'></Title>
                </div>
                <div style={{width:'100px',height:'5px',backgroundColor:'black',marginBottom:30}}/>
                <div>
                    <Link to={"/ordertrack-process"}>
                        <button style={{borderRadius:50,width:50,height:50}}></button>
                    </Link>
                    <Title value='Processing' fontWeight='Bold'></Title>
                </div>
                <div style={{width:'100px',height:'5px',backgroundColor:'black',marginBottom:30}}/>
                <div>
                    <Link to={"/ordertrack-ship"}>
                        <button style={{borderRadius:50,width:50,height:50,backgroundColor:'rgba(52, 52, 52)'}} onClick={() => setIsPayOpen(!isPayOpen)}></button>
                    </Link>
                    <Title value='Shipped' fontWeight='Bold'></Title>
                </div>
                <div style={{width:'100px',height:'5px',backgroundColor:'black',marginBottom:30}}/>
                <div>
                    <Link to={"/ordertrack-arrive"}>
                        <button style={{borderRadius:50,width:50,height:50,backgroundColor:'rgba(52, 52, 52)'}} onClick={() => setIsPayOpen(!isPayOpen)}></button>
                    </Link> 
                    <Title value='Arrived' fontWeight='Bold'></Title>
                </div>
            </div>
            <div style={styles.padding3}/>
            <div style={{marginLeft:'10%'}}>
                {fetched.map((item,index) => (
                    <div key={item.item.item_id} style={styles.tr(index)}>
                        <OrderCard key={item.item.item_id} product={item} onUpdateTotal={updateTotal} stage={"Arrived on 29-03-2023"}/>
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