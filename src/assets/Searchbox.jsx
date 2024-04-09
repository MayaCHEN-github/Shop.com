import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
 import 'toolcool-range-slider';

const SearchBox = ({onKeywordChange, onMinPriceChange, onMaxPriceChange} ) => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div style={styles.container}>
            <style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')</style>
            <style>@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap')</style>
            <div style={styles.dropdownContainer}>
                <button onClick={() => setIsOpen(!isOpen)} style={styles.filterButton}>
                    Filter ▼
                </button>
                {isOpen && (
                    <div style={styles.dropdownMenu}>
                        <tc-range-slider min="0" value1="0" value2="10000" max="10000" onChange ={(e)=>{
                            onMinPriceChange(e.detail.value1);
                            onMaxPriceChange(e.detail.value2);
                         }}></tc-range-slider>
                    </div>
                )}
            </div>
            <input type="text" style={styles.input} onInput={(e)=>onKeywordChange(e.target.value)}/>
            <button style={styles.searchButton}>
                <img src="src/assets/Search.svg" alt="Search" style={styles.icon}/>
            </button>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#D9D9D9',
        borderRadius: '15px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        outline: 'none',
        width: '100%',
    },
    filterButton: {
        backgroundColor: 'transparent',
        borderRight: '1px solid #333333', 
        paddingRight: '10px',
        fontFamily: 'Inter',
        outline: 'none',
        border: 'none',
    },
    dropdownContainer: {
        position: 'relative',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '125%',
        left: 0,
        backgroundColor: '#D9D9D9',
        padding: '10px',
        minWidth: '120%',
        boxSizing: 'border-box',
        outline: 'none',
    },
    dropdownItem: {
        fontFamily: 'Comfortaa',
        backgroundColor: 'transparent',
        display: 'block', 
        whiteSpace: 'nowrap',
        outline: 'none',
        border: 'none',
    },
    input: {
        flex: 1,
        marginLeft: '10px',
        marginRight: '10px',
        border: 'none', 
        fontSize: '18px',
        backgroundColor: 'transparent',
        outline: 'none',
    },
    searchButton: {
        backgroundColor: 'transparent' ,
        outline: 'none',
        border: 'none',
    },
    icon: {
        width: '30px', 
        height: '30px' 
    }
};

export default SearchBox;
