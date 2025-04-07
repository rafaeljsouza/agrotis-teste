import styled from 'styled-components';
import { TableCell, TableRow } from '@mui/material';

export const ListContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ListTitle = styled.h2`
  margin: 0;
  color: #00695c;
  font-size: 24px;
`;

export const AddButton = styled.button`
  background-color: #00695c;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #004d40;
  }
`;

export const StyledTableCell = styled(TableCell)`
  background-color: #00695c;
  color: white;
  font-weight: bold;
`;

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f5f5f5;
  }
  
  &:hover {
    background-color: #e0f2f1;
  }
`;

export const EmptyMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #757575;
`;