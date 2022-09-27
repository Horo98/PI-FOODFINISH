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
        var stars2 = Math.round((recipeDetails.healthScore / 10) / 2)
    if (stars2 === 0) {
        stars2 = stars2 + 1;
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
                                recipeDetails.image ? <img className={style.img} src={recipeDetails.image} alt="Img Not Found."></img>
                                    :
                                    <img className={style.img} src={"https://agencias.assist1.com.co/assets/images/no-image.png"} alt="Img Not Found."></img>
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
                            <h5 className={style.notFound}>This recipe has no dish type.</h5>
                        }

                        {/* DIETAS */}
                        {recipeDetails.diets ?
                            <div>
                                <h3 className={style.title}>Types of diets: </h3>
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
                            <h5 className={style.notFound}>This recipe has no diet type.</h5>
                        }

                        {/* RESUMEN */}
                        {recipeDetails.summary ?
                            <div>
                                <h3 className={style.title}>Summary: </h3>
                                <p className={style.area1}>{recipeDetails.summary?.replace(/<[^>]*>/g, '')}</p>
                            </div> :
                            <h5 className={style.notFound}>This recipe does not have summary.</h5>
                        }

                        {recipeDetails.ready ?
                            <div>
                                <h3 className={style.title}>Cooking time:</h3>
                                <p>{recipeDetails.ready} minutes</p>
                                <h3 className={style.health}>Health Score: </h3>
                                <p>{stars2}/5</p>
                            </div> :
                            <h5 className={style.notFound}>This recipe does not have score.</h5>
                        }

                        {/* PASO A PASO */}
                        {recipeDetails.steps ?
                            <div>
                                <h3 className={style.title}>Steps: </h3>
                                <ul>{Array.isArray(recipeDetails.steps) ? recipeDetails.steps.map(s => {
                                    return (
                                        <p className={style.area2} key={s.number}>{s.number}: {s.step}</p>
                                    )
                                }) :
                                    <p className={style.area2}>{recipeDetails.steps}</p>
                                } </ul>
                            </div> :
                            <h5 className={style.notFound}>This recipe does not have step by step</h5>
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