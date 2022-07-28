import React, {useEffect, useState }from "react";
import axios from "axios";
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Profile(){
  return(
  <div className=" d-flex justify-content-center align-items-center flex-column mt-5">
    <AccountCircleIcon style={{ width: 250, height: 250 }}/>
    <p><EmailIcon style={{ width: 25, height: 25 }}/><h1>ujalajhanwar@gmail.com</h1></p>
    <p>FULLNAME</p>
  </div>
    )
};

