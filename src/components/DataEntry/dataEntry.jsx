import React from 'react';
import "./dataEntry.scss"

export const DataEntry = () => (
    <div className={'data-entry container'}>
        <input className={'input'} type='text'/>
        <button className={'btn'}>Procesar</button>
        <button className={'btn'}>Limpiar</button>
    </div>
);