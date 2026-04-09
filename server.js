const express=require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
app.use(bodyParser.json());
app.use(cors());

const pool=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'bsc_address',
});

app.get('/api/users',(req,res)=>{
	pool.query('select * from users',(error,result)=>{
		if(error) throw error;
		res.json(result);
	});	
});

app.post('/api/users',(req,res)=>{
	const {name,email}=req.body;
	pool.query("insert into users (name,email) values(?,?)",[name,email],(error,result)=>{
		if(error) throw error;
		res.json(result);
	});
});

app.put('/api/users/:id',(req,res)=>{
	const {name,email}=req.body;
	const id=req.params.id;
	pool.query("update users set name=?,email=? where id=?",[name,email,id],(error,result)=>{
		if(error) throw error;
		res.json(result);
	});
});

app.delete('/api/users/:id',(req,res)=>{
	const id=req.params.id;
	pool.query("delete from users where id=?",[id],(error,result)=>{
		if(error) throw error;
		res.json(result);
	});
});

const port=7000;
app.listen(port,()=>{
	console.log(`Server running on port ${port}`);
});
