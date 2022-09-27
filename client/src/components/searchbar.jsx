import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../redux/actions";


export default function SearchBar() {
    const dispatch = useDispatch()
    const [input, setInput] = useState('')


    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getRecipeByName(input));
        setInput("")
    }
    let handleChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    return (
        <div>
            <input type="text"
                placeholder="Search recipe by name..."
                value={input}
                onChange={e => handleChange(e)} />
                <button
                    
                    type="submit"
                    onClick={e => handleSubmit(e)}
                >SEARCH</button>
        </div>
    )
}