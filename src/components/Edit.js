import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from "../firebase";
import { useNavigate } from 'react-router-dom';
const Edit = () => {
    const [searchParam] = useSearchParams();
    const [message, setMessage] = React.useState('');
    const [message1, setMessage1] = React.useState('');
    let navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const docRef = doc(db, 'todos', searchParam.get('id'));
            const docSnapshot = await getDoc(docRef);
            setMessage(docSnapshot.data().message);
            setMessage1(docSnapshot.data().message1);
        })();
    }, []);

    const editNote = async () => {
        const docRef = doc(db, 'todos', searchParam.get('id'));
        await updateDoc(docRef, {message: message, message1: message1});
        alert("Sửa thành công");
        navigate('/');
    };

    return (
        <div>
            <h1>Edit</h1>
            <input type="text"
                   onChange={(evt) => setMessage(evt.target.value)}
                   value={message} className="w-5/6 border-2 border-emerald-500"/>
                   <input type="text"
                   onChange={(evt) => setMessage1(evt.target.value)} 
                   value={message1} className=" w-5/6 border-2 border-emerald-500"/>
            <button onClick={editNote}>Edit Note</button>
        </div>
    );
};

export default Edit;