import React,{useState} from "react";
import Inputbox from "./Inputbox.jsx";
import Title from "./Title.jsx";
import Modalbox from "./Modalbox.jsx";
import CustomButton from "./CustomButton.jsx";
import SearchBox from "./Searchbox.jsx";
import ButtonBar from "./ButtonBar.jsx";
import Headbar from "./HeadBar.jsx";

export const TestPage = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div style={{width:'100%' }}>
            <Headbar/>
            <Title sytle={{marginTop: '200px'}}/>
            <Inputbox />
            <Modalbox>
                <Title value='This is a test title'></Title>
                <Inputbox/>
                <CustomButton buttonText="OK"></CustomButton>
            </Modalbox>
            <SearchBox/>

            <ButtonBar buttons={[
                { label: 'Home', onClick: () => console.log('clicked') },
                { label: 'Electronics', onClick: () => console.log('clicked') },
                { label: 'Cosmetics', onClick: () => console.log('clicked') }, 
                { label: 'Furniture', onClick: () => console.log('clicked') },
                { label: 'Books', onClick: () => console.log('clicked') }, 
                { label: 'Toys', onClick: () => console.log('clicked') },
                { label: 'Games', onClick: () => console.log('clicked') },
            ]}
            />

            <ButtonBar buttons={[
                { label: 'view cart', onClick: () => console.log('clicked') },
                { label: 'Welcome, username', onClick: () => console.log('clicked') /* Username: to be completed */},
                
            ]}
            />

            <ButtonBar buttons={[
                { label: 'user management', onClick: () => console.log('clicked') },
                { label: 'product management', onClick: () => console.log('clicked') },
            ]}
            />
            
            <CustomButton styleType="style1" buttonText="Style 1"></CustomButton>
            <CustomButton styleType="style2" buttonText="Style 2"></CustomButton>
            <CustomButton styleType="style3" buttonText="Style 3"></CustomButton>
            <CustomButton styleType="style4" buttonText="Style 4"></CustomButton>
        </div>
        

    );
}