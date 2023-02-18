import React from 'react'
import styled from 'styled-components'

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
  flex-direction: column;
  position: relative;
  align-items: center;

  &:last-of-type {
    margin-bottom: 4.5rem;
  }
`;

const StyledInput = styled.input`
  /* padding: 1rem 2rem; */
  background-color: white;
  width: 50%;
  border: none;
  color: black;
  font-weight: 400;
  border-radius: 2rem;
  font-size: 1.2rem;
  padding-left: 10px;

  &::placeholder {
    color: black;
    padding-left: 10px;
  }
`;

const Error = styled.div`
  color: red;
  visibility: ${({show}) => show ? 'visible' : 'hidden'};
  opacity: ${({show}) => show ? '1' : '0'};
  transform: translateY(${({show}) => show ? '20px' : '10px'});
  transition: all 0.1s;
  position: relative;
  bottom: 15px;
  left: 0;
  font-weight: 400;
  font-size: 10px;
`

const TextField = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <InputWrapper>
      <StyledInput {...field} {...props} />
      <Error show={errors[field.name] && touched[field.name]}>{errors[field.name]}</Error>
    </InputWrapper>
  )
}

export default TextField