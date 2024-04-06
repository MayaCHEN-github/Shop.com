import React from 'react';
import CustomUserTable from "./CustomUserTable";
import Title from "../../assets/Title";
import CustomButton from "../../assets/CustomButton";
import Headbar from '../../assets/HeadBarAdmin';

export const AdminUserPage = () => {
    return (
        <div>
            <div>
                <Headbar/>
            </div>
            <div style={{ marginTop: '130px' }}></div>
            <div style={styles.padding}>
                <Title value='User management' fontWeight='Bold'></Title>
            </div>
            <div style={styles.padding}>
                <CustomButton styleType="style4" buttonText = 'add new user +'/>
            </div>
            <div style={styles.padding}>
                <CustomUserTable/>
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
};
