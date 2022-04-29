import * as React from 'react';
import { useEffect,useState } from "react";
import { db,auth } from "../firebase";
import { collection, getDocs, deleteDoc, doc, onSnapshot, addDoc} from 'firebase/firestore';
import {getStorage, uploadBytes, ref, getDownloadURL} from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

const List = () => {
  const [todos, setTodos] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [message1, setMessage1] = React.useState('');
  const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const storage = getStorage();
  let unsub = null;
  let navigate = useNavigate();
  const onChangeFile = (evt) => {
    setFile(evt.target.files[0]);//lay file từ input
};
  useEffect(() => {
    console.log('List');
    (async () => {
      const collectionRef = collection(db, 'todos');
      unsub = onSnapshot(collectionRef, (snapShot) => {
        const localTodos = [];
        // console.log("Có sự thay đổi dữ liệu");
        snapShot.forEach(doc => {
          localTodos.push({
            id: doc.id,
            message: doc.data().message,
            message1: doc.data().message1,
            url: doc.data().url,

          });
        });
        setTodos(localTodos);
      });
    })();
  }, []);

  const deleteNote = async (id) => {
    const docRef = doc(db, 'todos', id);
    const imageRef = ref(storage, 'images', id);
    await deleteDoc(docRef);
    await deleteDoc(imageRef);
    alert("Xóa thành công");
  }

  const AddNote = async (evt) => {
    evt.preventDefault();
    const storage = getStorage();//base storage //unix
    if (!message) {
        alert("ghi rồi mới submit bạn êiiii");
        return;
    }
    const collectionRef = collection(db, 'todos');

    await addDoc(collectionRef, {
        message: message,
        message1: message1,
        date: Date.now()
    });
    const fileName = `images/${Date.now()}image.png`;
    const myRef = ref(storage, fileName);//tao ref
    await uploadBytes(myRef, file, fileName);
    //lưu lại file vào firestore
    const collectionRefImage = collection(db, 'images');
    const pathRef = ref(storage, fileName);
    const url = await getDownloadURL(pathRef);
    await addDoc(collectionRefImage, {
        url: url
    });
    setMessage('');
    setMessage1('');
    setFiles([])
    alert("Thêm thành công");
  }


  return (
    <div className="container mx-auto">
      <div className="block">
        <input type="text" placeholder="title"
          onChange={(e) => setMessage(e.target.value)} value={message} className=" w-5/6 border-2 border-emerald-500" />
        <input type="text" placeholder="content"
          onChange={(e) => setMessage1(e.target.value)} value={message1} className="w-5/6 border-2 border-emerald-500" />
          <div>
            <input type="file" onChange={onChangeFile}/>
        </div>
        <button onClick={AddNote} className="border-2 border-black">ADD NOTE</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <div>
            <li key={index}>
            <div>
            {files.map(url => <img className="w-32 h-32" key={url} src={url} alt=""/>)}
            </div>
            <div className="border-2 border-black m-3">
               <h1>{todo.message}</h1>
          <p>{todo.message1}</p>
            <Link to={`/edit?id=${todo.id}`} className="text-yellow-500">Edit</Link>
            <button onClick={() => {
              deleteNote(todo.id)
            }} className="text-red-500">Delete
            </button>
            </div>
          </li>
          </div>
          
        ))}
      </ul>
    </div>
  );
};

export default List;