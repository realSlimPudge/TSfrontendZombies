import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Home.module.scss';


const Home: React.FC =  () => {
    return (
        <div className='Home'>
            <Link to = '/faculties'>
            <button>Войти</button>
            </Link>
        </div>
    );
}