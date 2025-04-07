import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFormData } from '../../hooks/useFormData';
import {
  ListContainer, ListHeader, ListTitle,
  StyledTableCell, StyledTableRow, EmptyMessage
} from './styles';

const List = () => {
  const navigate = useNavigate();
  const { formDataList } = useFormData();

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) { 
      return dateString;
    }
  };
  return (
    <ListContainer>
      <ListHeader>
        <ListTitle>Cadastros</ListTitle>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          style={{ backgroundColor: '#00695c' }}
          onClick={() => navigate('/form')}
        >
          Adicionar
        </Button>
      </ListHeader>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Data Inicial</StyledTableCell>
              <StyledTableCell>Data Final</StyledTableCell>
              <StyledTableCell>Propriedades</StyledTableCell>
              <StyledTableCell>Laboratório</StyledTableCell>
              <StyledTableCell>Observações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formDataList.length > 0 ? (
              formDataList.map((item, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{formatDate(item.dataInicial)}</TableCell>
                  <TableCell>{formatDate(item.dataFinal)}</TableCell>
                  <TableCell>
                    {item.propriedades.map(prop => prop.nome).join(', ')}
                  </TableCell>
                  <TableCell>{item.laboratorio?.nome || '-'}</TableCell>
                  <TableCell>{item.observacoes || '-'}</TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <EmptyMessage>
                    Nenhum cadastro encontrado. Clique em "Adicionar" para criar um novo.
                  </EmptyMessage>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ListContainer>
  );
};

export default List;