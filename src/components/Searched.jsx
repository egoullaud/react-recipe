import React from 'react'
import {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';


function Searched() {
 
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();

    const getSearched = async (name) =>{
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
    };
    useEffect(() => {
        getSearched(params.search); 
    }, [params.search]);

 
    return (
    <Grid>
      {searchedRecipes.map((item) => {
        return(
            <Card key={item.id}>
                <Link to ={'/recipe/' + item.id}>
                <img src ={item.image} alt={item.title}/>
                <h4> {item.title}</h4>
                </Link>
            </Card>
        )
      })}
    </Grid>
  )
}


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem,1fr));
    grid-gap: 2rem;
    @media (min-width: 768px){
        grid-template-columns: repeat(auto-fit, minmax(25rem,1fr));
    }
    @media (min-width: 1024px){
        grid-template-columns: repeat(auto-fit, minmax(25rem,1fr));
    }
`;

const Card = styled.div`
img {
width: 100%;
border-radius: 1rem;
}

a{
text-decoration: none;
}

h4{
    text-align: center;
    padding: 1rem;
    width: 90%;
}

`;

export default Searched
