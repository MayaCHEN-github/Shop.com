import { useState, useEffect } from 'react';
import React from 'react';
import Title from "../../assets/Title";
import CustomButton from "../../assets/CustomButton.jsx";
import CustomProductTable from "../AdminPages/CustomProductTable";
import Headbar from "../../assets/HeadBar.jsx";
import Modalbox from '../../assets/Modalbox';
import Inputbox from '../../assets/Inputbox';

export const PaymentPage = () => {

    const [data, setData] = useState([]);
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

    useEffect(() => {
        fetch('http://localhost:3001/all-products')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const handleClosePay = () => {
        setIsPayOpen(false);
    };

    const handleCloseEdit = () => {
        setIsEditOpen(false);
    };

    const handleAddProductOkClick = () => {
        // const isProductNameEmpty = checkEmptyInput(productName, setProductNameError);
        // const isPriceEmpty = checkEmptyInput(price, setPriceError);
        // const isStockEmpty = checkEmptyInput(stock, setStockError);
        // const isCategoryEmpty = checkEmptyInput(category, setCategoryError);
        // const isPriceNotNumber = checkNumberInput(price, setPriceError);
        // const isStockNotInteger = checkIntegerInput(stock, setStockError);
        // const isDescriptionEmpty = checkEmptyInput(description, setDescriptionError); 
        // const isVendorEmpty = checkEmptyInput(vendor, setVendorError); 
    
        // if (isProductNameEmpty || isPriceEmpty || isStockEmpty || isCategoryEmpty || isPriceNotNumber || isStockNotInteger || isDescriptionEmpty || isVendorEmpty) {
        //     return;
        // }
    
        // let newItemId;
        // if (data.length === 0) {
        //     newItemId = '00001';
        // } else {
        //     const maxItemId = Math.max(...data.map(item => Number(item.item_id)));
        //     newItemId = String(maxItemId + 1).padStart(5, '0');
        // }
    
        // fetch('http://localhost:3001/add-product', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         item_id: newItemId, 
        //         name: productName,
        //         price: price,
        //         stock_quantity: stock,
        //         url:  url ? url.toString() : '',
        //         description: description || '', 
        //         vendor: vendor || '', 
        //         category: category.toString(), 
        //     }),
        // })
        // .then(response => response.json())
        // .then(newProduct => {
        //     setData(prevData => [...prevData, newProduct]);
        //     setIsAddProductOpen(false);
        // })
        // .catch(err => console.error(err));
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
                <div style={styles.padding2}/>
                <div style={styles.totalB}>
                    <h4>
                        Payment details
                    </h4>
                    <div style={styles.line}/>
                    <h6 style={styles.padding3}>Items total-$10590.00</h6>
                    <div style={{display:'flex'}}>
                        <h6>Discount</h6>
                        <h6 style={{color:'red'}}>-$500.00</h6>
                    </div>
                    <h6>Total shipping fee-$100</h6>
                    <h6>Total checkout</h6>
                    <h5 style={{color:'green'}}>$10190.00</h5>
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
                    <h6>Chris</h6>
                    <h6>+852 111</h6>
                    <h6>HK,HK,HK</h6>
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
                <button style={styles.Button1} onClick={handleAddProductOkClick}>
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
                <button style={styles.Button1} onClick={handleAddProductOkClick}>
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
        paddingLeft: '10px',
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
        width: '600px'
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

export default PaymentPage;