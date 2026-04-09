import {useState,useEffect} from 'react';
import axios from 'axios';

function App(){
  const [users, setUsers] =useState([]);

  useEffect(()=>{
    getUsers();
  },[]);


const getUsers = async()=>{
  const response = await axios.get('http://localhost:7000/api/users');
  setUsers(response.data);
};

const addUser = async() =>{
  const name = prompt("Enter Name");
  const email =prompt("Enter Email");
 await axios.post('http://localhost:7000/api/users',{name, email});
  getUsers();
};

const updateUser = async(id)=>{
  const name = prompt("Enter Name");
  const email = prompt("Enter Email");
  await axios.put(`http://localhost:7000/api/users/${id}`,{name,email});
  getUsers();
};

const deleteUser = async(id)=>{
  await axios.delete(`http://localhost:7000/api/users/${id}`);
  getUsers();
}

return (
  <div>
    <table border="2px" width="80%" align="center" cellpadding="10px" cellspacing="10px">
    <tr>
    <th colspan="3"><h1>Welcome to Mern Crud Application </h1>
    <button onClick={addUser}>Add User</button></th>
    </tr>
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Action</th>
    </tr>
    {users.map((user)=>(
    <tr>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td><button onClick={()=>updateUser(user.id)}>Update</button> |
    <button onClick={()=>deleteUser(user.id)}>Delete</button></td>
    </tr>
    ))}


    </table>
  </div>
  );

}

export default App;
