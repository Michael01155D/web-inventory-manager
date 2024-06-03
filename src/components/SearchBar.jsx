const SearchBar = ({setQuery}) => {
    return(
       <input type="text" autoFocus maxLength="18" placeholder="Search" onChange={change => setQuery(change.target.value)}/>
    )
}

export default SearchBar;