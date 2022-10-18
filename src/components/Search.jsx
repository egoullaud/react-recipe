import styled from 'styled-components'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'



function Search() {

//empty string = any value can input
  const [input, setInput] = useState("");

  const navigate = useNavigate();
//prevent refresh
  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/"+input);
  };
  return (
    <div>
      <FormStyle onSubmit={submitHandler}>
        <div> 
{/* input field - on change to set input field to input value */}
          <input onChange={(e) => setInput(e.target.value)}
         type = "text" 
         placeholder='search'
         value = {input} />
         </div>
      </FormStyle>
    </div>
  )
}


const FormStyle = styled.form`
margin: 3rem 3rem;

div{
    position: relative;
    width: 100%;
}
input{
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    padding: 1rem 3rem;
    color: white;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 100%;
}

@media (min-width: 768px){
  input{
    width: 60%;
    margin-left: 20%;
  }
}

`
export default Search
