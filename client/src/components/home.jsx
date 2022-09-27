import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllRecipes,
    filterByTypeDiet,
    orderByAlphabet,
    orderByScore } from "../redux/actions/index.js"
import Recipe from './recipe'
import style from '../styles/home.module.css'
import SearchBar from './searchbar'
import Nav from "./nav"
import { Link } from "react-router-dom"


let prevId = 1

function Home(props) {

    const [/* order */, setOrder] = useState('')

    // Lógica para mostrar 9 recetas por página
    const [page, setPage] = useState(1);
    const recipesPage = 9;
    const numberOfRecipes = page * recipesPage;
    const firstRecipe = numberOfRecipes - recipesPage;
    const showRecipes = props.showedRecipes.slice(firstRecipe, numberOfRecipes);

    const paged = function (pageNumber) {
        setPage(pageNumber)
    };

    useEffect(() => {
        props.getRecipes();
    }, [props.getRecipes]);

    let handleClick = (e) => {
        e.preventDefault();
        props.getRecipes();
        setPage(1);
        setOrder('')
    }

    let handleFilterByTypeDiet = (e) => {
        e.preventDefault();
        props.filterByTypeDiet(e.target.value);
        setPage(1);
    }

    let handleOrderByAlphabet = (e) => {
        e.preventDefault();
        props.orderByAlphabet(e.target.value);
        setPage(1);
        setOrder(e.target.value);
    }

    let handleOrderByScore = (e) => {
        e.preventDefault();
        props.orderByScore(e.target.value);
        setPage(1);
        setOrder(e.target.value);
    }

    return (
        <div>
            {/* SearchBar */}
            <SearchBar />
        

            <div >

                {/* BOTON PARA REFRESCAR */}
                <div>
                    <button className={style.btn} onClick={handleClick}>REFRESH</button>
                </div>

                {/* BOTON PARA CREAR UNA RECETA  */}
                <div>
                    <Link to="/recipe">
                        <button className={style.btn}>CREATE</button>
                    </Link>
                </div>

                {/* FILTRADO POR TIPO DE DIETA */}
                <div className={style.box}>
                    <select defaultValue={'all'} name="diets" onChange={e => handleFilterByTypeDiet(e)}>
                        <option value="all">Filter by type of diet</option>
                        <option value="gluten free">Gluten Free</option>
                        <option value="ketogenic">Ketogenic</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="lacto vegetarian">Lacto Vegetarian</option>
                        <option value="ovo vegetarian">Ovo Vegetarian</option>
                        <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="pescatarian">Pescatarian</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="primal">Primal</option>
                        <option value="fodmap friendly">Fodmap Friendly</option>
                        <option value="whole 30">Whole30</option>
                        <option value="dairy free">Dairy Free</option>
                    </select>
                </div>

                {/* ORDEN ALFABÉTICO  */}
                <div className={style.box}>
                    <select defaultValue={'DEFAULT'} name="alphabetical" onChange={e => handleOrderByAlphabet(e)}>
                        <option value="DEFAULT">Order alphabetically</option>
                        <option value="atoz">A to Z</option>
                        <option value="ztoa">Z to A</option>
                    </select>
                </div>

                {/* ORDEN DE MIN A MAX - MAX A MIN  */}
                <div className={style.box}>
                    <select defaultValue={'DEFAULT'} name="numerical" onChange={e => handleOrderByScore(e)}>
                        <option value="DEFAULT" >Order by Score</option>
                        <option value="asc">Min to Max</option>
                        <option value="desc">Max to Min</option>
                    </select>
                </div>

            </div>

            <hr></hr>

           

            <br></br>

            {props.showedRecipes.length === 0 ?
                <div className={style.container}>
                    <h5>Loading...</h5>
                </div> :
                <div className={style.container}>
                    {
                        showRecipes?.map(e => {
                            return (
                                <div className={style.recipe} key={prevId++}>
                                    <Recipe
                                        image={e.image}
                                        name={e.name}
                                        score={e.score}
                                        healthScore={e.healthScore}
                                        diets={e.diets}
                                        id={e.id}
                                    ></Recipe>

                                </div>
                            )
                        })
                    }
                </div>
            }


            <hr></hr>

            <div>

                {
                    props.showedRecipes.length > 9 ?
                        <div >
                            <Nav recipesPage={recipesPage} showedRecipes={props.showedRecipes.length} paged={paged} setPage={setPage} page={page}></Nav>
                            <span > {page} of {Math.ceil(props.showedRecipes.length / recipesPage)} </span>
                        </div> :
                        <div><span > {page} of {Math.ceil(props.showedRecipes.length / recipesPage)} </span></div>
                }


            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        showedRecipes: state.showedRecipes,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipes: () => dispatch(getAllRecipes()),
        filterByTypeDiet: (payload) => dispatch(filterByTypeDiet(payload)),
        orderByAlphabet: (payload) => dispatch(orderByAlphabet(payload)),
        orderByScore: (payload) => dispatch(orderByScore(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)