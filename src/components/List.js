import * as React from 'react';
import { useEffect } from "react";
import { db,auth } from "../firebase";
import { collection, getDocs, deleteDoc, doc, onSnapshot, addDoc } from 'firebase/firestore';
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const List = () => {
  const [todos, setTodos] = React.useState([]);
  let unsub = null;
  let navigate = useNavigate();
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



  return (
    todos.length?(
      <div className="container mx-auto">
      <ul>
        {todos.map((todo, index) => (

          <li key={index}>
            <div className="border-2 border-black m-3">
                <h1>{todo.message}</h1>
                <p>{todo.message1}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    ):(
      <div>
        <h1 className="text-center text-gray-400 italic text-xl">Không có bài viết nào mới</h1>
      </div>
    )
  );
};

export default List;