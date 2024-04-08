import { React, useState } from 'react';
import CustomProductTable from "./CustomProductTable";
import Title from "../../assets/Title";
import CustomButton from "../../assets/CustomButton";
import Headbar from './HeadBarAdmin';
import Modalbox from '../../assets/Modalbox';
import Inputbox from '../../assets/Inputbox';
import e from 'cors';

export const AdminProductPage = () => {

    const [isOpen, setIsOpen] = useState(false); 
    const [data, setData] = useState([
        {
            "_id": {
              "$oid": "660be193560e2d2fb3aec510"
            },
            "name": "Echo Blender",
            "item_id": "12005",
            "price": "89.99",
            "url": "https://images2.europris.no/produkter/vw800/19/195656/195656_main.webp",
            "description": "Echo Blender with multiple speed settings and durable design.",
            "vendor": "Echo Kitchenware",
            "stock_quantity": "80",
            "category": "Home Appliances",
            "comments": []
        },
        {
            "_id": {
              "$oid": "660be193560e2d2fb3aec50e"
            },
            "name": "Charlie Wireless Headphones",
            "item_id": "12003",
            "price": "129.99",
            "url": "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MX442?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1686764365861",
            "description": "Charlie Wireless Headphones with noise cancellation and 12-hour battery life.",
            "vendor": "Charlie Audio",
            "stock_quantity": "200",
            "category": "Audio",
            "comments": []
          },
        {
            "_id": {
              "$oid": "660be193560e2d2fb3aec511"
            },
            "name": "Foxtrot Electric Scooter",
            "item_id": "12006",
            "price": "450.00",
            "url": "https://example.com/foxtrot-scooter",
            "description": "Foxtrot Electric Scooter with 15-mile range and foldable design.",
            "vendor": "Foxtrot Mobility",
            "stock_quantity": "4",
            "category": "Transportation",
            "comments": []
          },
        {
            "_id": {
              "$oid": "660be193560e2d2fb3aec50d"
            },
            "name": "Bravo Laptop",
            "item_id": "12002",
            "price": "999.99",
            "url": "https://example.com/bravo-laptop",
            "description": "Bravo Laptop with 16GB RAM and 1TB SSD for high performance.",
            "vendor": "Bravo Computing",
            "stock_quantity": "75",
            "category": "Computers",
            "comments": []
        },
        

    ]);
    
    
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

    const [imageError, setImageError] = useState(false);
    const [productNameError, setProductNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [stockError, setStockError] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [vendorError, setVendorError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);



    const handleOpenAddProductModal = () => {
        setImage('');
        setProductName('');
        setPrice('');
        setStock('');
        setUrl('');
        setDescription('');
        setVendor('');
        setCategory('');
        setImageError(false);
        setProductNameError(false);
        setPriceError(false);
        setStockError(false);
        setUrlError(false);
        setDescriptionError(false);
        setVendorError(false);
        setCategoryError(false);
        setIsAddProductOpen(true);
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
    };
    
    
    const handleCloseEditProductModal = () => {
        setIsEditProductOpen(false);
    };
    

    const checkEmptyInput = (input, setInputError) => {
        if (!input.trim()) {
            setInputError(true);
            return true;
        } else {
            setInputError(false);
            return false;
        }
    };

    const checkNumberInput = (input, setInputError) => {
        if (isNaN(input) || input.trim() === '') {
            setInputError(true);
            return true;
        } else {
            setInputError(false);
            return false;
        }
    };

    const checkIntegerInput = (input, setInputError) => {
        if (!Number.isInteger(Number(input)) || input.trim() === '') {
            setInputError(true);
            return true;
        } else {
            setInputError(false);
            return false;
        }
    };
    


    const handleAddProductOkClick = () => {
        console.log("Add product clicked");
        const isProductNameEmpty = checkEmptyInput(productName, setProductNameError);
        const isPriceEmpty = checkEmptyInput(price, setPriceError);
        const isStockEmpty = checkEmptyInput(stock, setStockError);
        const isCategoryEmpty = checkEmptyInput(category, setCategoryError);
        const isPriceNotNumber = checkNumberInput(price, setPriceError);
        const isStockNotInteger = checkIntegerInput(stock, setStockError);

        if (isProductNameEmpty || isPriceEmpty || isStockEmpty || isCategoryEmpty || isPriceNotNumber || isStockNotInteger ) {
            return;
        }

        let newItemId;
        if (data.length === 0) {
            newItemId = '00001';
        } else {
            const maxItemId = Math.max(...data.map(item => Number(item.item_id)));
            newItemId = String(maxItemId + 1).padStart(5, '0');
        }

        const newData = [...data];
        if (isAddProductOpen) { // add new product
            newData.push({ 
                item_id: newItemId, 
                name: productName, 
                price: price, 
                stock_quantity: stock, 
                url: url || '', 
                description: description || '', 
                vendor: vendor || '', 
                category: category, 
                comments: [] 
            });
            setIsAddProductOpen(false);
        }
        setData(newData);
    };

    const handleEditProductOkClick = () => {
        const isProductNameEmpty = checkEmptyInput(productName, setProductNameError);
        const isPriceEmpty = checkEmptyInput(price, setPriceError);
        const isStockEmpty = checkEmptyInput(stock, setStockError);
        const isCategoryEmpty = checkEmptyInput(category, setCategoryError);
        const isPriceNotNumber = checkNumberInput(price, setPriceError);
        const isStockNotInteger = checkIntegerInput(stock, setStockError);
    
        if (isProductNameEmpty || isPriceEmpty || isStockEmpty || isCategoryEmpty || isPriceNotNumber || isStockNotInteger) {
            return;
        }
    
        const newData = [...data];
        if (isEditProductOpen) { // edit product
            newData[editIndex] = { 
                item_id: newData[editIndex].item_id, 
                name: productName, 
                price: price, 
                stock_quantity: stock, 
                url: url || '', 
                description: description || '', 
                vendor: vendor || '', 
                category: category, 
                comments: newData[editIndex].comments 
            };
            setIsEditProductOpen(false);
        }
        setData(newData);
        setEditIndex(null); // reset editIndex after updating data
    };
    

    const handleDelete = (index) => { // delete product
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };



    return (
        <div>
            <div>
                <Headbar setSearchTerm={setSearchTerm} />
            </div>
            <div style={{ marginTop: '130px' }}></div>
            <div style={styles.padding}>
                <Title value='Product management' fontWeight='Bold'></Title>
            </div>
            <div style={styles.padding}>
                <CustomButton styleType="style4" buttonText = 'add new Product +' onClick={handleOpenAddProductModal}/>
            </div>
            <div style={styles.padding}>
                <CustomProductTable data={data.filter(Product => Product.name.includes(searchTerm))} onDelete={handleDelete} onEdit={handleOpenEditProductModal}/>
            </div>



            <Modalbox onClose={handleCloseAddProductModal} isOpen={isAddProductOpen}> 
                <div style={styles.padding2}>
                    <Title value='Add a new product' fontWeight='bold' fontSize='30px'></Title>
                </div>
                <div>
                    <Title value='Product Name*' fontSize='20px'></Title>
                    <Inputbox onChange={e => setProductName(e.target.value)}/>
                        {productNameError && <Title value='Name cannot be empty.' color='red' fontSize='14px'></Title>} 
                </div>
                <div>
                    <Title value='Vendor' fontSize='20px'></Title>
                    <Inputbox onChange={e => setVendor(e.target.value)}/>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '30%' }}>
                        <Title value='Price*' fontSize='20px'></Title>
                        <Inputbox onChange={e => setPrice(e.target.value)}/>
                            {priceError && <Title value='Price must be number and cannot be empty.' color='red' fontSize='14px'></Title>} 
                    </div>
                    <div style={{ width: '65%' }}>
                        <Title value='Stock Quantity*' fontSize='20px'></Title>
                        <Inputbox onChange={e => setStock(e.target.value)}/>
                            {stockError && <Title value='Stock Quantity must be integer and cannot be empty.' color='red' fontSize='14px'></Title>} 
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '30%' }}>
                        <Title value='URL' fontSize='20px'></Title>
                        <Inputbox onChange={e => setUrl(e.target.value)}/>
                    </div>
                    <div style={{ width: '65%' }}>
                        <Title value='Category*' fontSize='20px'></Title>
                        <Inputbox onChange={e => setCategory(e.target.value)}/>
                            {categoryError && <Title value='Category cannot be empty.' color='red' fontSize='14px'></Title>} 
                    </div>
                </div>
                <div>
                    <Title value='Description' fontSize='20px'></Title>
                    <Inputbox onChange={e => setDescription(e.target.value)}/>
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
                        <Inputbox value={category} onChange={e => setCategory(e.target.value)}/>
                        {categoryError && <Title value='Category cannot be empty.' color='red' fontSize='14px'></Title>}
                    </div>
                </div>

                <div>
                    <Title value='Description' fontSize='20px'></Title>
                    <Inputbox value={description} onChange={e => setDescription(e.target.value)}/>
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