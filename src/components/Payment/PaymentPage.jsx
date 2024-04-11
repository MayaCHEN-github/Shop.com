import { useState, useEffect } from 'react';
import React from 'react';
import Title from "../../assets/Title";
import CustomButton from "../../assets/CustomButton.jsx";
import CustomProductTable from "../AdminPages/CustomProductTable";
import Headbar from "../ProductPages/HeadBarProduct.jsx";
import Modalbox from '../../assets/Modalbox';
import Inputbox from '../../assets/Inputbox';
import {CartPayCard} from './CartPayCard';
import {jwtDecode} from 'jwt-decode'

export const PaymentPage = () => {

    const [data1, setData1] = useState([]);
    const [isPayOpen, setIsPayOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [cardNumber, setCardNumber] = useState();
    const [expired, setExpired] = useState();
    const [cvv, setCvv] = useState();
    const [cardName, setCardName] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [region, setRegion] = useState();
    const [address, setAddress] = useState();
    const [total, setTotal] = useState(0);
    const [fetched, setFetched] = useState([]);

    
    const fetchUserId = ()=>{
        const token = localStorage.getItem('token');
        if(token){
            const decoded_token = jwtDecode(token);
            const user_id = decoded_token.id;
  
            return user_id;  
          }else{
            return null;
          }
      } 
    
      
    const userId = fetchUserId();

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
            setTotal(items.total); 
          } catch (err) {
            console.error(err);
          }
        }

        fetchData();    
    },[]);

    const updateTotal = (newTotal) => {
        setTotal(newTotal);
      };

    const handleClosePay = () => {
        setIsPayOpen(false);
    };

    const handleCloseEdit = () => {
        setIsEditOpen(false);
    };

    const handleAddAddressOkClick = () => {
    };

    return (
        <div>
            <div>
                <Headbar/>
            </div>
            <div style={{ marginTop: '150px' }}></div>
            <div style={styles.padding}>
                <Title value='Finish Your Purchase' fontWeight='Bold'></Title>
            </div>
            <div style={{display: 'flex'}}>
                <div style={styles.scroll}>
                {fetched.map((item,index) => (
                    <div key={item.item.item_id} style={styles.tr(index)}>
                        <CartPayCard key={item.item.item_id} product={item} onUpdateTotal={updateTotal} />
                    </div>
                ))}   
                </div>
                <div style={styles.padding2}/>
                <div style={styles.totalB}>
                    <h4>
                        Payment details
                    </h4>
                    <div style={styles.line}/>
                    <h6 style={styles.padding3}>Items total: {total}</h6>
                    <div style={{display:'flex'}}>
                        <h6>Discount: </h6>
                        <h6 style={{color:'red'}}>0</h6>
                    </div>
                    <h6>Total shipping fee: $100</h6>
                    <h6>Total checkout</h6>
                    <h5 style={{color:'green'}}>${total - 0 + 100}</h5>
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <div style={styles.addressB}>
                    <div style={{display: 'flex'}}>
                        <h4>Delivery TO:</h4>
                        <button onClick={() => setIsEditOpen(!isEditOpen)} style={styles.editB}>
                            <img src="src/assets/pen_note.png" style={styles.icon1}/>
                        </button>
                    </div>
                    <h6>hellouser</h6>
                    <h6>98765432</h6>
                    <h6>HK,Sha Tin,CUHK</h6>
                </div>
                <div style={{alignContent:'center',display:"grid",width:'50%'}}>
                    <img src="src/assets/e-pay.png" style={styles.icon2}/>
                    <button onClick={() => setIsPayOpen(!isPayOpen)}>
                        Pay
                    </button>
                </div>
            </div>
            <Modalbox onClose={handleClosePay} isOpen={isPayOpen}> 
                <div style={{position:'absolute',top:"3%"}}>
                    <Title value='E-payment' fontWeight='bold' fontSize='30px'></Title>
                </div>
                 <div style={{width: '64%'}}>
                    <Title value='Card number:' fontSize='19px'></Title>
                    <Inputbox onChange={e => setCardNumber(e.target.value)}/>
                        {/* {productNameError && <Title value='Name cannot be empty.' color='red' fontSize='14px'></Title>}  */}
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{width: '30%'}}>
                        <Title value='Expired date:' fontSize='19px'></Title>
                        <Inputbox onChange={e => setExpired(e.target.value)}/>
                            {/* {priceError && <Title value='Price must be number and cannot be empty.' color='red' fontSize='14px'></Title>}  */}
                    </div>
                    <div style={{padding:'2%'}}/>
                    <div style={{width: '30%'}}>
                        <Title value='CVV:' fontSize='19px'></Title>
                        <Inputbox onChange={e => setCvv(e.target.value)}/>
                            {/* {stockError && <Title value='Stock Quantity must be integer and cannot be empty.' color='red' fontSize='14px'></Title>}  */}
                    </div>
                </div>
                <div style={{width: '64%'}}>
                    <Title value='Name of the Card Holder:' fontSize='19px'></Title>
                    <Inputbox onChange={e => setCardName(e.target.value)}/>
                        {/* {descriptionError && <Title value='Description cannot be empty.' color='red' fontSize='14px'></Title>} */}
                </div>
                <button style={styles.Button1} onClick={handleAddAddressOkClick}>
                    <Title value='OK'></Title>
                </button>
            </Modalbox>
            <Modalbox onClose={handleCloseEdit} isOpen={isEditOpen}> 
                 <div style={{width: '64%'}}>
                    <Title value='Name:' fontSize='19px'></Title>
                    <Inputbox onChange={e => setName(e.target.value)}/>
                        {/* {productNameError && <Title value='Name cannot be empty.' color='red' fontSize='14px'></Title>}  */}
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{width: '20%'}}>
                        <Title value='Phone number:' fontSize='19px'></Title>
                        <Inputbox onChange={e => setPhone(e.target.value)}/>
                            {/* {priceError && <Title value='Price must be number and cannot be empty.' color='red' fontSize='14px'></Title>}  */}
                    </div>
                    <div style={{padding:'2%'}}/>
                    <div style={{width: '40%'}}>
                    <Title value='' fontSize='19px' color="white"></Title>
                        <Inputbox onChange={e => setPhone(e.target.value)}/>
                            {/* {stockError && <Title value='Stock Quantity must be integer and cannot be empty.' color='red' fontSize='14px'></Title>}  */}
                    </div>
                </div>
                <div style={{width: '64%'}}>
                    <Title value='Country/Region:' fontSize='19px'></Title>
                    <Inputbox onChange={e => setRegion(e.target.value)}/>
                        {/* {descriptionError && <Title value='Description cannot be empty.' color='red' fontSize='14px'></Title>} */}
                </div>
                <div style={{width: '64%'}}>
                    <Title value='Address:' fontSize='19px'></Title>
                    <Inputbox onChange={e => setAddress(e.target.value)}/>
                        {/* {descriptionError && <Title value='Description cannot be empty.' color='red' fontSize='14px'></Title>} */}
                </div>
                <button style={styles.Button1} onClick={handleAddAddressOkClick}>
                    <Title value='OK'></Title>
                </button>
            </Modalbox>
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
        paddingLeft: '10%',
        textAlign: 'center',
    },
    padding3: {
        paddingTop:'15px'
    },
    scroll: {
        overflowY: 'scroll',
        height: '210px',
        width: '600px',
    },
    tr: (index) => ({
        backgroundColor: index % 2 === 0 ? '#FFEDED' : '#FFDBDB',
        fontFamily: 'comfortaa',
        fontSize: '20px',
        textAlign: 'center',
        height: '70px',
        width: '600px',
        border: '1px solid #000000',
    }),
    icon1: {
        width: '30px', 
        height: '30px',
    },
    icon2: {
        width: '80px', 
        height: '80px',
        marginLeft:'43.5%',
        marginTop:'10%'
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
        height: '172px',
        width: '50%',
        padding:'10px',
        marginTop: '1.7%'
    },
    line: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        height: '1.5px',
        width: '400px',
    },
    editB: {
        marginLeft:'70%',
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

export default PaymentPage;