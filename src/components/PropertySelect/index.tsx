import { useState, useEffect } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip, 
  Box, 
  SelectChangeEvent,
  FormHelperText
} from '@mui/material';
import { Propriedade } from '../../types';
import { fetchPropriedades } from '../../services/api';
import styled from 'styled-components';

const StyledChip = styled(Chip)`
  margin: 2px 4px;
  background-color: #00695c;
  color: white;
`;

interface PropertySelectProps {
  value: number[];
  onChange: (selectedIds: number[]) => void;
  error?: boolean;
  helperText?: string;
}

const PropertySelect = ({ value, onChange, error, helperText }: PropertySelectProps) => {
  const [properties, setProperties] = useState<Propriedade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchPropriedades();
        setProperties(data);
      } catch (error) {
        console.error('Erro ao carregar propriedades:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperties();
  }, []);

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const selectedIds = event.target.value as number[];
    onChange(selectedIds);
  };

  const getPropertyNames = () => {
    return value.map(id => {
      const property = properties.find(p => p.id === id);
      return property ? property.nome : '';
    });
  };

  return (
    <FormControl fullWidth error={error}>
      <InputLabel id="property-select-label">Propriedades</InputLabel>
      <Select
        labelId="property-select-label"
        multiple
        value={value}
        onChange={handleChange}
        renderValue={() => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {getPropertyNames().map((name) => (
                <StyledChip key={name} label={name} />
              ))}
            </Box>
          )}
        disabled={loading}
      >
        <MenuItem value="all">
          <em>Todos</em>
        </MenuItem>
        {properties.map((property) => (
          <MenuItem key={property.id} value={property.id}>
            {property.nome}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default PropertySelect;
