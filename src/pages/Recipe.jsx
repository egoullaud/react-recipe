
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

function Recipe() {

let params = useParams();
const [details, setDetails] = useState({});
const [activeTab, setActiveTab] = useState('instructions');

    const fetchDetails = async () =>{
        const data = await fetch (`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        setDetails(detailData);
        console.log(detailData);
    };

    useEffect(() => {
        fetchDetails();
    }, [params.name]);
    
  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt=""/>
      </div>
      <Info>
        <Button 
        className={activeTab === 'instructions' ? 'active' : ''} 
        onClick ={() => setActiveTab("instructions")}>
            Instructions
            </Button>
        <Button
        className={activeTab === 'ingredients' ? 'active' : ''} 
        onClick ={() => setActiveTab("ingredients")}>
            Ingredients
            </Button>
            {activeTab === 'instructions' && (
                <div>
                    <h3 dangerouslySetInnerHTML={{__html:details.summary}}></h3>
                    <p dangerouslySetInnerHTML={{__html: details.instructions}} ></p>
                </div>
            )}
      {activeTab === 'ingredients' && ( 
            <ul> {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
                ))}
             </ul>
      )}
      </Info>
    </DetailWrapper>
  )
}



const DetailWrapper = styled.div`
margin-top: 5rem;
margin-bottom: 5rem;
display: flex;
justify-items: center;
flex-direction: column;
.active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
}
h2{
    margin-bottom: 2rem;
    text-align: center;
}
h3{
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
    width: 100%;
}

li{
    font-size: 1rem;
    line-height: 2.5rem;
}
ul{
margin-top: 2rem;
}
img{
    border-radius:1rem;
    width: 100%;
  
}

@media (min-width: 768px){
    flex-direction: column;
}

@media (min-width: 1024px){
    flex-direction: row;


}
`;

const Button = styled.button`
padding: 1rem 1.2rem;
color: #313131;
background: white;
border: 2px solid black;
font-weight: 600;
margin: 1rem 1rem 1rem 0rem;

@media (min-width: 768px) {
    margin: 1rem 6rem;
}

@media (min-width: 1024px) {
    margin: 2rem 2rem;
}
`;

const Info = styled.div`
margin-left: 2rem;

@media (min-width: 1024px) {
    width: 50%;
    margin-left: 2rem;

}

`;
export default Recipe
