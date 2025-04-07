import styled from 'styled-components';

export const FormContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #00695c;
  color: white;
`;

export const FormTitle = styled.h2`
  margin: 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
  }
`;

export const FormContent = styled.form`
  padding: 16px;
`;

export const InputRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  gap: 16px;
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
`;

export const SaveButton = styled.button`
  background-color: #00695c;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #004d40;
  }
`;