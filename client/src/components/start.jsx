import React, { Component } from "react";
import { Link } from "react-router-dom"

import style from "../styles/start.module.css"


export default class Start extends Component {
    render(){
        return(
            <div >
                <div >
                    <h1 className={style.centerTitle}>PI Food</h1>
                </div>
                <div>
                 <Link to='/home'>
                    <p className={style.center}>Home</p>
                 </Link>
                </div>
                
            </div>
        )
    }
}