import React, { useState } from 'react';
import { categories } from '../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useGetUserID } from '../hooks/useGetUserID';

export const CreateItem = () => {

    const [item, setItem] = useState({
        date: "",
        name: "",
        amount: 0,
        type: "",
        category: "",
        user: useGetUserID()
    });
    
    const navigate = useNavigate();
    const [cookies] = useCookies(["access_token"]);

    const getCategories = () => {
        const cats = categories.map((item, ind) => <option key={ind} value={item}>{item}</option>);
        return cats;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({...item, [name]: value});
        //console.log(`${name} : ${value}`);
        //console.log(JSON.stringify(item));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/items", 
                { item },
                {headers: {"Authorization": cookies.access_token}}
            );
            //console.log(JSON.stringify(item));
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };


    return (<>
        {cookies.access_token !== "" ? 
            (<div className="center">
                <div className="auth-container">
                    <h1>Új tétel létrehozása</h1>
                    <form onSubmit={onSubmit}>
                        <label htmlFor="date">Dátum:</label>
                        <input 
                            type="date" 
                            name="date" 
                            id="date"        
                            onChange={handleChange}
                        />

                        <label htmlFor="name">Megnevezés:</label>
                        <input 
                            type="text" 
                            name="name"
                            id="name"
                            onChange={handleChange}
                        />

                        <label htmlFor="amount">Összeg:</label>
                        <input 
                            type="number" 
                            name="amount"
                            id="amount"
                            onChange={handleChange}
                        />

                        <label htmlFor="type">Típus:</label>
                        <select name="type" id="type" onChange={handleChange}>
                            <option value=""></option>
                            <option value="income">Bevétel</option>
                            <option value="outcome">Kiadás</option>
                        </select>

                        {item.type === "outcome" && (<><label htmlFor="category">Kategória:</label>
                        <select name="category" id="category" onChange={handleChange}> 
                            <option value=""></option>
                            {getCategories()}
                        </select></>)}
                        <button type="submit">Mentés</button>              
                    </form>
                </div>
            </div>) 
            : 
            (<h2>Tétel felvételéhez előbb be kell jelentkezned vagy ha nincs még fiókod akkor regisztrálnod!</h2>)
        }
        
        </>);
} 
