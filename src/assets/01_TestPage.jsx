import React,{useState} from "react";
import Inputbox from "./Inputbox.jsx";
import Title from "./Title.jsx";
import Modalbox from "./Modalbox.jsx";
import CustomButton from "./CustomButton.jsx";
import SearchBox from "./Searchbox.jsx";

export const TestPage = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div style={{width:'100%' }}>
            <Title/>
            <Inputbox />
            <Modalbox>
                <Title value='This is a test title'></Title>
                <Inputbox/>
                <CustomButton buttonText="OK"></CustomButton>
            </Modalbox>
            <SearchBox/>
            <CustomButton styleType="style1" buttonText="Style 1"></CustomButton>
            <CustomButton styleType="style2" buttonText="Style 2"></CustomButton>
            <CustomButton styleType="style3" buttonText="Style 3"></CustomButton>
            <CustomButton styleType="style4" buttonText="Style 4"></CustomButton>
        </div>
        

    );
}