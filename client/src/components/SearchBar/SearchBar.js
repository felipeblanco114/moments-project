import React, { useState } from "react";

import './searchbar.css';

function SearchBar() {

    // const classes = useStyles();
    const [search, setSearch] = useState();

    // const history = useHistory();

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // history.location.pathname === "/"
        // ? history.push(`search?q=${search}&page=1`)
        // : history.push(`?q=${search}&page=1`);
        // window.location.reload();
    };

    return (
    <div className="search">
        <div className='logo'>
            {/* <img src='https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png' alt='logo' /> */}
            MOMENTAZOS
        </div>
        <form onSubmit={handleSubmit}>
            <div className='form-box'>

                <input
                    className="search-input"
                    type="text"
                    placeholder="Busca tu Momentazo"
                    onChange={handleChange}
                    id="input"
                />
                <input
                    className="search-btn"
                    type="submit"
                    id="button"
                    value="🔎"
                />
            </div>
        </form>
    </div>
    )
}
export default SearchBar;