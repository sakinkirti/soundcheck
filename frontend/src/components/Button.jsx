import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  width: 50%;
  outline: none;
  border-radius: 2rem;
  font-size: 1.2rem;
  color: black;
  font-weight: 400;
  background-color: white;
  border: none;
  transition: all .2s;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #333;
  }
`;

const Button = ({children, disabled, ...rest}) => {
  return (
    <StyledButton disabled={disabled} {...rest}>
      {children}
    </StyledButton>
  )
}

export default Button