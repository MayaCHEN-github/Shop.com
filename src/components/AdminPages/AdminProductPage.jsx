import { React, useState, useEffect } from 'react';

import CustomProductTable from "./CustomProductTable";
import Title from "../../assets/Title";
import CustomButton from "../../assets/CustomButton";
import Headbar from './HeadBarAdmin';
import Modalbox from '../../assets/Modalbox';
import Inputbox, { Selectbox, Textareabox } from '../../assets/Inputbox';
import {useNavigate} from 'react-router-dom';
import { categories } from '../../constants/categories';

export const AdminProductPage = () => {

    const [isOpen, setIsOpen] = useState(false); 
    const [data, setData] = useState([]);
    
    const [editIndex, setEditIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [isEditProductOpen, setIsEditProductOpen] = useState(false);
    
    const [image, setImage] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [vendor, setVendor] = useState('');
    const [category, setCategory] = useState('');
    const [curated, setCurated] = useState(false);

    const [imageError, setImageError] = useState(false);
    const [productNameError, setProductNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [stockError, setStockError] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [vendorError, setVendorError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
      const userType = localStorage.getItem('user_type');
      if (userType !== "admin") {
        navigate("/")
      }
    }, [localStorage.userType])

    useEffect(() => {
        fetch('http://localhost:3001/all-products')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const handleOpenAddProductModal = () => {
        setImage('');
        setProductName('');
        setPrice('');
        setStock('');
        setUrl('');
        setDescription('');
        setVendor('');
        setCategory(categories[0]);
        setImageError(false);
        setProductNameError(false);
        setPriceError(false);
        setStockError(false);
        setUrlError(false);
        setDescriptionError(false);
        setVendorError(false);
        setCategoryError(false);
        setIsAddProductOpen(true);
        setCurated(false);
    };
    
    const handleCloseAddProductModal = () => {
        setIsAddProductOpen(false);
    };
    
    const handleOpenEditProductModal = (index) => {
        console.log("Index: ", index);
        console.log("Data at index: ", data[index]);
        setProductName(data[index].name || '');
        setPrice(data[index].price || '');
        setStock(data[index].stock_quantity || '');
        setUrl(data[index].url || '');
        setDescription(data[index].description || '');
        setVendor(data[index].vendor || '');
        setCategory(data[index].category || '');
        setProductNameError(false);
        setPriceError(false);
        setStockError(false);
        setUrlError(false);
        setDescriptionError(false);
        setVendorError(false);
        setCategoryError(false);
        setEditIndex(index);
        setIsEditProductOpen(true);
        setCurated(data[index].curated || false);

    };
    
    
    const handleCloseEditProductModal = () => {
        setIsEditProductOpen(false);
    };
    

    const checkEmptyInput = (input, setInputError) => {
        input = String(input);
        if (!input.trim()) {
            setInputError(true);
            return true;
        } else {
            setInputError(false);
            return false;
        }
    };

    const checkNumberInput = (input, setInputError) => {
        input = String(input);
        if (isNaN(input) || input.trim() === '') {
            setInputError(true);
            return true;
        } else {
            setInputError(false);
            return false;
        }
    };

    const checkIntegerInput = (input, setInputError) => {
        input = String(input);
        if (!Number.isInteger(Number(input)) || input.trim() === '') {
            setInputError(true);
            return true;
        } else {
            setInputError(false);
            return false;
        }
    };
    
    const handleAddProductOkClick = () => {
        const isProductNameEmpty = checkEmptyInput(productName, setProductNameError);
        const isPriceEmpty = checkEmptyInput(price, setPriceError);
        const isStockEmpty = checkEmptyInput(stock, setStockError);
        const isCategoryEmpty = checkEmptyInput(category, setCategoryError);
        const isPriceNotNumber = checkNumberInput(price, setPriceError);
        const isStockNotInteger = checkIntegerInput(stock, setStockError);
        const isDescriptionEmpty = checkEmptyInput(description, setDescriptionError); 
        const isVendorEmpty = checkEmptyInput(vendor, setVendorError); 
    
        if (isProductNameEmpty || isPriceEmpty || isStockEmpty || isCategoryEmpty || isPriceNotNumber || isStockNotInteger || isDescriptionEmpty || isVendorEmpty) {
            return;
        }
    
        let newItemId;
        if (data.length === 0) {
            newItemId = '00001';
        } else {
            const maxItemId = Math.max(...data.map(item => Number(item.item_id)));
            newItemId = String(maxItemId + 1).padStart(5, '0');
        }
    
        fetch('http://localhost:3001/add-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item_id: newItemId, 
                name: productName,
                price: price,
                stock_quantity: stock,
                url:  url ? url.toString() : '',
                description: description || '', 
                vendor: vendor || '', 
                category: category.toString(), 
                rating: 0,
                rating_count: 0,
                curated: curated,
            }),
        })
        .then(response => response.json())
        .then(newProduct => {
            setData(prevData => [...prevData, newProduct]);
            setIsAddProductOpen(false);
        })
        .catch(err => console.error(err));
    };
    
    

    const handleEditProductOkClick = () => {
        const isProductNameEmpty = checkEmptyInput(productName, setProductNameError);
        const isPriceEmpty = checkEmptyInput(price, setPriceError);
        const isStockEmpty = checkEmptyInput(stock, setStockError);
        const isCategoryEmpty = checkEmptyInput(category, setCategoryError);
        const isPriceNotNumber = checkNumberInput(price, setPriceError);
        const isStockNotInteger = checkIntegerInput(stock, setStockError);
        const isDescriptionEmpty = checkEmptyInput(description, setDescriptionError); 
        const isVendorEmpty = checkEmptyInput(vendor, setVendorError); 
    
        if (isProductNameEmpty || isPriceEmpty || isStockEmpty || isCategoryEmpty || isPriceNotNumber || isStockNotInteger|| isDescriptionEmpty || isVendorEmpty) {
            return;
        }
    
        fetch(`http://localhost:3001/edit-product/${data[editIndex]._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: productName,
                price: price,
                stock_quantity: stock,
                url:  url ? url.toString() : '',
                description: description || '', 
                vendor: vendor || '', 
                category: category.toString(), 
                curated: curated,
            }),
        })
        .then(response => response.json())
        .then(responseData => {
            const newData = [...data];
            newData[editIndex] = responseData;
            setData(newData);
            setIsEditProductOpen(false);
        })
        .catch(err => console.error(err));
    };
    
    const handleDelete = (index) => {
        fetch(`http://localhost:3001/delete-product/${data[index]._id}`, {
            method: 'DELETE',
        })
        .then(() => {
            const newData = [...data];
            newData.splice(index, 1);
            setData(newData);
        })
        .catch(err => console.error(err));
    };
    



    return (
        <div>
            <div>
                <Headbar setSearchTerm={setSearchTerm} />
            </div>
            <div style={{ marginTop: '160px' }}></div>
            <div style={styles.padding}>
                <Title value='Product management' fontWeight='Bold'></Title>
            </div>
            <div style={styles.padding}>
                <CustomButton styleType="style4" buttonText = 'add new Product +' onClick={handleOpenAddProductModal}/>
            </div>
            <div style={styles.padding}>
            <CustomProductTable 
                data={data && data.filter(Product => Product && Product.name && Product.name.includes(searchTerm))}
                onDelete={handleDelete} 
                onEdit={handleOpenEditProductModal}
            />

            </div>



            <Modalbox onClose={handleCloseAddProductModal} isOpen={isAddProductOpen}> 
                <div style={styles.padding2}>
                    <Title value='Add a new product' fontWeight='bold' fontSize='30px'></Title>
                </div>
                <div>
                    <Title value='Product Name*' fontSize='19px'></Title>
                    <Inputbox onChange={e => setProductName(e.target.value)}/>
                        {productNameError && <Title value='Name cannot be empty.' color='red' fontSize='14px'></Title>} 
                </div>
                <div>
                    <Title value='Vendor*' fontSize='19px'></Title>
                    <Inputbox onChange={e => setVendor(e.target.value)}/>
                        {vendorError && <Title value='Vendor cannot be empty.' color='red' fontSize='14px'></Title>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '30%' }}>
                        <Title value='Price*' fontSize='19px'></Title>
                        <Inputbox onChange={e => setPrice(e.target.value)}/>
                            {priceError && <Title value='Price must be number and cannot be empty.' color='red' fontSize='14px'></Title>} 
                    </div>
                    <div style={{ width: '65%' }}>
                        <Title value='Stock Quantity*' fontSize='19px'></Title>
                        <Inputbox onChange={e => setStock(e.target.value)}/>
                            {stockError && <Title value='Stock Quantity must be integer and cannot be empty.' color='red' fontSize='14px'></Title>} 
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '30%' }}>
                        <Title value='URL' fontSize='19px'></Title>
                        <Inputbox onChange={e => setUrl(e.target.value)}/>
                    </div>
                    <div style={{ width: '65%' }}>
                        <Title value='Category*' fontSize='19px'></Title>
                        <Selectbox selected={category[0]} onChange={e => setCategory(e.target.value)} options={categories} />
                            {categoryError && <Title value='Category cannot be empty.' color='red' fontSize='14px'></Title>} 
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Title value='Curated:' fontSize='19px' style={{ marginRight: '10px' }}/>
                    <input type="checkbox" onChange={e => setCurated(e.target.checked)} style={{ transform:'scale(1.5)', marginLeft: '15px',marginBottom: '11px' }}/>
                </div>
                <div>
                    <Title value='Description*' fontSize='19px'></Title>
                    <Textareabox onChange={e => setDescription(e.target.value)}/>
                        {descriptionError && <Title value='Description cannot be empty.' color='red' fontSize='14px'></Title>}
                </div>
                <CustomButton buttonText="OK" onClick={handleAddProductOkClick}></CustomButton>
            </Modalbox>


            <Modalbox onClose={handleCloseEditProductModal} isOpen={isEditProductOpen}> 
                <div style={styles.padding2}>
                    <Title value='Edit product' fontWeight='bold' fontSize='30px'></Title>
                </div>

                <div>
                    <Title value='Name*' fontSize='20px'></Title>
                    <Inputbox value={productName} onChange={e => setProductName(e.target.value)}/>
                    {productNameError && <Title value='Name cannot be empty.' color='red' fontSize='14px'></Title>}
                </div>

                <div>
                    <Title value='Vendor' fontSize='20px'></Title>
                    <Inputbox value={vendor} onChange={e => setVendor(e.target.value)}/>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '30%' }}>
                        <Title value='Price*' fontSize='20px'></Title>
                        <Inputbox value={price} onChange={e => setPrice(e.target.value)}/>
                        {priceError && <Title value='Price must be number and cannot be empty.' color='red' fontSize='14px'></Title>}
                    </div>

                    <div style={{ width: '65%' }}>
                        <Title value='Stock Quantity*' fontSize='20px'></Title>
                        <Inputbox value={stock} onChange={e => setStock(e.target.value)}/>
                        {stockError && <Title value='Stock Quantity must be an integer and cannot be empty.' color='red' fontSize='14px'></Title>}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '30%' }}>
                        <Title value='URL' fontSize='20px'></Title>
                        <Inputbox value={url} onChange={e => setUrl(e.target.value)}/>
                    </div>

                    <div style={{ width: '65%' }}>
                        <Title value='Category*' fontSize='20px'></Title>
                        {/* Currently categories is not multi select. 
                          But the DB is using arrays to store categories for potential future multi-cat items. 
                          So we need to access the category with 0 index. */}
                        <Selectbox selected={category[0]} onChange={e => setCategory(e.target.value)} options={categories} />
                        {categoryError && <Title value='Category cannot be empty.' color='red' fontSize='14px'></Title>}
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Title value='Curated:' fontSize='20px' style={{ marginRight: '10px' }}/>
                    <input type="checkbox"checked={curated} onChange={e => setCurated(e.target.checked)}  style={{ transform:'scale(1.5)', marginLeft: '15px',marginBottom: '11px' }} />
                </div>
                <div>
                    <Title value='Description' fontSize='20px'></Title>
                    <Textareabox value={description} onChange={e => setDescription(e.target.value)}/>
                </div>

                <CustomButton buttonText="OK" onClick={handleEditProductOkClick}></CustomButton>
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
        paddingBottom: '10px',
        textAlign: 'center',
    },
};

export default AdminProductPage;