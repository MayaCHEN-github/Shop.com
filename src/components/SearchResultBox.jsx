import react from 'react';
import { Link } from 'react-router-dom';


export default function SearchResultBox({item}){
    return(
        <div className='mx-1 my-1 search-result-box'>
            <img src={item.url} alt={item.name}/>
            <div><strong>{item.name}</strong> </div>
            <div>{item.vendor}</div>
            <div>{item.price} </div>
        </div>
    )
}