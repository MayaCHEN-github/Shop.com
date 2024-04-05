import React from 'react';

const Title = (props) => {
    const style = {
        color: props.color || '#000000',
        fontFamily: props.fontFamily || 'comfortaa',
        fontSize: props.fontSize || '24px',
        fontWeight: props.fontWeight || 'normal',
        textAlign: props.textAlign || 'left',
        border: 'none',
    };

    return (
        <div>
            <style>@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap')</style>
            <h1 style={style}>
                {props.value || 'Title'}
            </h1>
        </div>
    );
};

export default Title;
