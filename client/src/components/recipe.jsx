import React from "react";
import { Link } from 'react-router-dom';



import style from "../styles/recipe.module.css"

let prevId = 1;

export default function Recipe(props) {
    const { name, image, ready, healthScore, diets, id } = props;

    var stars = Math.round((healthScore / 10) / 2)
    if (stars === 0) {
        stars = stars + 1;
    }
    return (
        <div className={style.recipe}>
            <div>

            
                       <h1 className={style.name}>{name}</h1>
            <Link to={`/home/${id}`}>
                {
                    image ? <img src={image} alt="Img Not Found."></img>
                        :
                        <img className ={style.notFound} src={"http://www.servicioaltoque.online/uploads/services/foo.jpg"} alt="Img Not Found."></img>
                }
            </Link>
            <div>

                Health Score: {stars}/5

            </div>
            <div>

                Cooking time: {ready} minutes
            </div>
            <div>
                <h3>Types of diets: </h3>
                {
                    diets?.map(d => {
                        if (d.hasOwnProperty('name')) {
                            return (
                                <p key={prevId++}>- {d.name[0].toUpperCase() + d.name.slice(1)} </p>
                            )
                        } else {
                            return (
                                <p key={prevId++}>- {d[0].toUpperCase() + d.slice(1)} </p>
                            )
                        }
                    })
                }
            </div>

            </div>
        </div>
    )
};