import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"
import { createRecipe, getDiets } from "../redux/actions"
import style from "../styles/createRecipe.module.css"

let validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}
// Funcion para validar el nombre. (Solo caracteres a-z A-Z)
let validName = (str) => {
    let pattern = /^[a-zA-Z\s]+$/;
    return pattern.test(str);
}

let validate = (input) => {
    let errors = {};

    // Name obligatorio.
    if (!input.name) {
        errors.name = "Name cannot be null."
    }
    // Solo letras
    if (input.name && !validName(input.name)) {
        errors.name = "Name invalid."
    }
    // Summary obligatorio.
    if (!input.summary) {
        errors.summary = "Summary cannot be null."
    }
    // El score tiene que ser de 1 a 100, puede ser nulo.
    if (input.score < 1 || input.score > 100) {
        errors.score = "The score is 1 - 100."
    }
    // El healthScore tiene que ser de 1 a 100, puede ser nulo.
    if (input.healthScore < 1 || input.healthScore > 100) {
        errors.healthScore = "The health score is 1 - 100."
    }
    // La imagen puede no ingresarse, si se ingresa tiene que pasar la validación.
    if (input.image && !validURL(input.image)) {
        errors.image = "Invalid URL."
    }
    // Obligatorio los pasos.
    if (!input.steps) {
        errors.steps = "Enter the recipe steps."
    }
    // Obligatorio tipo de dieta.
    if (!input.diets.length) {
        errors.diets = "Select at least one diet."
    }
    if (input.diet && !validName(input.diet)) {
        errors.diet = "Diet invalid."
    }

    return errors;
}

function CreateRecipe(props) {
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        summary: "",
        ready: "",
        healthScore: "",
        image: "",
        steps: "",
        diets: [],
        diet: "",
    })

    useEffect(() => {
        props.getDiets()
    }, []);

    let handleChange = (e) => {
        e.preventDefault();
        setInput((prevInput) => {
            const newInput = {
                ...prevInput,
                [e.target.name]: e.target.value,
            }
            setErrors(validate(newInput));
            return newInput;
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0 && input.name !== "" && input.summary !== "") {
            if (input.diet) {
                input.diets.push(input.diet.toLowerCase());
            }
            // console.log(input)
            props.createRecipe(input);
            setInput({
                name: "",
                summary: "",
                score: "",
                healthScore: "",
                image: "",
                steps: "",
                diets: [],
                diet: "",
            })
            history.push('/home')
        } else {
            alert("Check the fields.")
        }
    }

    let handleCheck = (e) => {
        let newArray = input.diets;
        let find = newArray.indexOf(e.target.value);

        if (find >= 0) {
            newArray.splice(find, 1)
        } else {
            newArray.push(e.target.value)
        }

        setInput({
            ...input,
            diets: newArray
        });

        setErrors(validate(input));
    }

    return (
        <div>
            <div className={style.enc}>

                <div>
                    <h1 className={style.title}>
                        Create Recipe
                    </h1>
                </div>

                <div>
                    <hr className={style.hr}></hr>
                </div>

            </div>

            <form className={style.form} onSubmit={handleSubmit}>

                <div className={style.div1}>
                    <div><label>Name: </label></div>
                    <input
                        type={"text"}
                        name={"name"}
                        value={input.name}
                        onChange={e => handleChange(e)}
                    ></input>
                    {!errors.name ? null : <p className={style.err}>{errors.name}</p>}
                </div>

                <div>
                    <div className={style.txt}><label>Summary: </label></div>
                    <textarea
                        className={style.inputext}
                        type={"text"}
                        name={"summary"}
                        value={input.summary}
                        onChange={e => handleChange(e)}
                    ></textarea>
                    {!errors.summary ? null : <p className={style.err}>{errors.summary}</p>}
                </div>

                <div>
                    <div className={style.txt}><label>Cooking time: </label></div>
                    <input
                        className={style.inputScore}
                        type={"number"}
                        name={"ready"}
                        value={input.ready}
                        onChange={e => handleChange(e)}
                    ></input>
                    {!errors.ready ? null : <p className={style.err}>{errors.ready}</p>}
                </div>

                <div>
                    <div className={style.txt}><label>Health Score: </label></div>
                    <input
                        className={style.inputScore}
                        type={"number"}
                        name={"healthScore"}
                        value={input.healthScore}
                        onChange={e => handleChange(e)}
                    ></input>
                    {!errors.healthScore ? null : <p className={style.err}>{errors.healthScore}</p>}
                </div>

                <div>
                    <div className={style.txt}><label>URL Image: </label></div>
                    <input
                        className={style.input}
                        type={"url"}
                        name={"image"}
                        value={input.image}
                        onChange={e => handleChange(e)}
                    ></input>
                    {!errors.image ? null : <p className={style.err}>{errors.image}</p>}
                </div>

                <div>
                    <div className={style.txt}><label>Steps: </label></div>
                    <textarea
                        className={style.inputext}
                        type={"text"}
                        name={"steps"}
                        value={input.steps}
                        onChange={e => handleChange(e)}
                    ></textarea>
                    {!errors.steps ? null : <p className={style.err}>{errors.steps}</p>}
                </div>

                <div>
                    <div className={style.txt}><label>Types of diet: </label></div>
                    <br></br>
                    {props.diets.slice(0, 13).map(d => {
                        return (
                            <div key={d} className={style.list}>
                                <label> {d[0].toUpperCase() + d.slice(1)}</label>
                                <input type="checkbox" name={d} value={d} onChange={e => handleCheck(e)} />
                            </div>
                        )
                    })}
                    {!errors.diets ? null : <p className={style.err}>{errors.diets}</p>}
                </div>

                <div>
                    <div className={style.txt}>
                        <label>ADD Diet: </label>
                    </div>
                    <div>
                        <input type="text" name={"diet"} value={input.diet} onChange={e => handleChange(e)}></input>
                    </div>
                    {!errors.diet ? null : <p className={style.err}>{errors.diet}</p>}
                </div>

                <br></br>
                <div>
                    <button className={style.btn1} type="submit" >CREATE</button>
                </div>
                <br></br>
                <div>
                    <Link to="/home"><button className={style.btn2}>GO BACK</button></Link>
                </div>
                <br></br>

            </form>

        </div>
    )
}





function mapStateToProps(state) {
    return {
        diets: state.diets,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createRecipe: (payload) => dispatch(createRecipe(payload)),
        getDiets: () => dispatch(getDiets()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);