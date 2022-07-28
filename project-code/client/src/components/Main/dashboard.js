import React, { useState, useEffect } from "react";
import './App.css';
import { Button, Form } from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';
import NoImg from './noImg2.jpg';

import { Modal, show, ModalBody, ModalHeader, ModalTitle, ModalFooter } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';



const Api_Url = 'http://localhost:8000/api/v1/search?ingr=green'

export default function MainDashboard() {
    const firstname = localStorage.getItem("firstname");
    const lastname = localStorage.getItem("lastname");
    console.log(firstname);
    console.log(lastname);
    const [fooditems, setFooditems] = useState([]);
    useEffect(() => {
        fetch(Api_Url)
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                setFooditems(data.hints);
            })
    }, [])

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [ingredient, setIngredient] = useState('');

    const searchFood = async (e) => {
        e.preventDefault();
        setFooditems([]);
        console.log("searching")
        try {
            // const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=cd959ef9&app_key=11ad6e69e841d133c8f824d0ebfd6fdd&nutrition-type=cooking&ingr=${ingredient}`
            const url = `http://localhost:8000/api/v1/search?ingr=${ingredient}`
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setFooditems(data.hints);
        }
        catch (e) {
            console.log(e);
        }
    }

    const changeHandler = (e) => {
        setIngredient(e.target.value);
        console.log(e.target.value);
    }

    let navigate = useNavigate();
    return (
        <div id="bg">          
            
                <div id="main" className="d-flex flex-column justify-content-center align-items-center" >
                    <h1 className='mb-5' style={{ 'fontSize': "120px", 'color': "white" }}>Eat Well Live Well</h1>
                    <p style={{'color': "white", 'fontSize': "30px"}}>Search your Favourite Food Items here..</p>
                    <Form className="d-flex" onSubmit={searchFood} >
                        <Form.Control style={{'width': "500px"}}
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            name='ingr'
                            value={ingredient} onChange={changeHandler}></Form.Control>
                        <Button onClick={searchFood}><SearchIcon /></Button>
                    </Form>
                </div>
            
            <div className="container">
                <div className="grid">

                    {
                        fooditems.map((item) => <div key={item.food.label}>

                            <div className="card text-center bg-dark mb-1 mt-3">
                                <div className="card-body">
                                    <h4 style={{'color': "white"}}>{item.food.label}</h4>
                                    {item.food.image!==undefined
                                    ?<img className="card-img-top" style={{ width: "200px" }} src={item.food.image}/>
                                    :
                                    <img className="card-img-top" style={{ width: "200px"}} src={NoImg}/>
                                }
                                    
                                    <div className="card-body">

                                        <button type="button" className="btn btn-secondary" onClick={handleShow}>See Nutrients</button>
                                        <Modal show={show} onHide={handleClose}>
                                            <ModalHeader closeButton>
                                                <ModalTitle></ModalTitle>
                                            </ModalHeader>
                                            <ModalBody>
                                                <img className="car-img-top" src={item.food.image} />
                                                <h2>{item.food.label}</h2>
                                                <h5>{item.food.category}</h5>
                                                <br></br>
                                                <h4>Main Nutrients</h4>
                                                <p>Protein : {item.food.nutrients.PROCNT} gm</p>
                                                <p>FAts : {item.food.nutrients.FAT} gm</p>
                                                <p>Energy : {item.food.nutrients.ENERC_KCAL} gm</p>
                                                <p>Carbohydrates : {item.food.nutrients.CHOCDF} gm</p>
                                                <p>Fiber : {item.food.nutrients.FIBTG} gm</p>

                                            </ModalBody>
                                            <ModalFooter>
                                                <Button variant="danger" onClick={handleClose}>Close</Button>
                                            </ModalFooter>

                                        </Modal>
                                    </div>
                                </div>
                            </div>

                        </div>)
                    }

                </div>


            </div>

        </div>
    );
}