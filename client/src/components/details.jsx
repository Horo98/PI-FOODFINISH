import React from "react";
import { clearDetail, getRecipeDetails } from "../redux/actions";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import style from "../styles/details.module.css"


class Details extends React.Component {
    componentDidMount() {
        this.props.getRecipeDetails(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearDetail()
    }

    render() {
        const { recipeDetails } = this.props
        var stars = Math.round((recipeDetails.healthScore / 10) / 2)
    if (stars === 0) {
        stars = stars + 1;
    }
        return (
            
            <div className={style.recipe} key={this.props.match.params.id}>

                {recipeDetails.name ?
                    <div>

                        {/* NOMBRE */}
                        <div className={style.title}>
                            <h1>{recipeDetails.name}</h1>
                        </div>

                        {/* IMAGEN */}
                        <div>
                            {
                                recipeDetails.image ? <img  src={recipeDetails.image} alt="Img Not Found."></img>
                                    :
                                    <img  src={"https://agencias.assist1.com.co/assets/images/no-image.png"} alt="Img Not Found."></img>
                            }
                        </div>

                        {/* TIPO DE PLATO */}
                        {recipeDetails.dish ?
                            <div>
                                <h3 className={style.title}>Dish Type: </h3>
                                {recipeDetails.dish?.map(d => {
                                    return (
                                        <p key={d}>- {d[0].toUpperCase() + d.slice(1)} </p>
                                    )
                                })}
                            </div> :
                            <h5>This recipe has no dish type.</h5>
                        }

                        {/* DIETAS */}
                        {recipeDetails.diets ?
                            <div>
                                <h3>Types of diets: </h3>
                                {
                                    recipeDetails.diets?.map(d => {
                                        if (d.hasOwnProperty('name')) {
                                            return (
                                                <p key={d.name}>- {d.name[0].toUpperCase() + d.name.slice(1)} </p>
                                            )
                                        } else {
                                            return (
                                                <p key={d}>- {d[0].toUpperCase() + d.slice(1)} </p>
                                            )
                                        }
                                    })
                                }
                            </div>
                            :
                            <h5>This recipe has no diet type.</h5>
                        }

                        {/* RESUMEN */}
                        {recipeDetails.summary ?
                            <div>
                                <h3 >Summary: </h3>
                                <p >{recipeDetails.summary?.replace(/<[^>]*>/g, '')}</p>
                            </div> :
                            <h5 >This recipe does not have summary.</h5>
                        }

                        {recipeDetails.ready ?
                            <div>
                                <h3 >Cooking time:</h3>
                                <p>{recipeDetails.ready} minutes</p>
                                <h3 >Health Score: </h3>
                                <p>{stars}/5</p>
                            </div> :
                            <h5 >This recipe does not have score.</h5>
                        }

                        {/* PASO A PASO */}
                        {recipeDetails.steps ?
                            <div>
                                <h3 >Steps: </h3>
                                <ul>{recipeDetails.steps.map(s => {
                                    return (
                                        <p key={s.number}>{s.number}: {s.step}</p>
                                    )
                                }) 
                                } </ul>
                            </div> :
                            <h5>This recipe does not have step by step</h5>
                        }

                    </div> : <h1>Loading...</h1>
                }

                <div>
                    <Link to="/home"> <button className={style.btn}>HOME</button> </Link>
                </div>

            </div>
        )
    }
}




function mapStateToProps(state) {
    return {
        recipeDetails: state.recipeDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipeDetails: (id) => dispatch(getRecipeDetails(id)),
        clearDetail: () => dispatch(clearDetail())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);