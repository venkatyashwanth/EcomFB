import React, { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';

const MyState = ({ children }) => {
    const [loading, setLoading] = useState(false);

    // Get All Product State
    const [getAllProduct, setGetAllProduct] = useState([]);
    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "product"),
                orderBy('time')
            )
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id })
                })
                setGetAllProduct(productArray);
                setLoading(false)
            })
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProductFunction();
    }, [])
    return (
        <MyContext.Provider value={{ loading, setLoading, getAllProduct, getAllProductFunction }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState