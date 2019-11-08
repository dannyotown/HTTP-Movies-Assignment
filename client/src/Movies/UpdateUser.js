import React, { useState, useEffect } from "react";
import axios from "axios";


const UpdateUser = (props) => {
    const [updateMovie, setUpdateMovie] = useState({
        id:'',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(response=>setUpdateMovie(response.data))
        .catch(error=>console.log(error))
    },[props.match.params.id])
    const onHandleChange = (e) =>{
        setUpdateMovie({
            ...updateMovie,
            [e.target.name]: e.target.value
        })
    }
    const onHandleSubmit = e => {
            e.preventDefault();
            axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, updateMovie)
            .then(response=> {
                alert('User Updated!')
                props.history.push('/')
            })
            .catch(error=>console.log(error))
    }

  return (
    <>
    <div className="updateUser">
    <h1>Update User</h1>
    <form className="updateUser" onSubmit={onHandleSubmit}>
        <input type="text" onChange={onHandleChange} name="title" placeholder="Title" value={updateMovie.title} />
        <input type="text" onChange={onHandleChange} name="director" placeholder="Director" value={updateMovie.director}/>
        <input type="number" onChange={onHandleChange} name="metascore" placeholder="MetaScore" value={updateMovie.metascore} />
        <button type="submit">Save</button>
    </form>
    </div>
    </>
  );
};

export default UpdateUser;
