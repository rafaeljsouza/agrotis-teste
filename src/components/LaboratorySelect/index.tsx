import { useState, useEffect } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText, 
  SelectChangeEvent 
} from '@mui/material';
import { Laboratorio } from '../../types';
import { fetchLaboratorios } from '../../services/api';

interface LaboratorySelectProps {
  value: number | null;
  onChange: (selectedId: number) => void;
  error?: boolean;
  helperText?: string;
}

const LaboratorySelect = ({ value, onChange, error, helperText }: LaboratorySelectProps) => {
  const [laboratories, setLaboratories] = useState<Laboratorio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaboratories = async () => {
      try {
        const data = await fetchLaboratorios();
        setLaboratories(data);
      } catch (error) {
        console.error('Erro ao carregar propriedades:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLaboratories();
  }, []);

  const handleChange = (event: SelectChangeEvent<number>) => {
    onChange(event.target.value as number);
  };

  return (
    <FormControl fullWidth error={error}>
      <InputLabel id="laboratory-select-label">Laboratório</InputLabel>
      <Select
        labelId="laboratory-select-label"
        value={value || ''}
        onChange={handleChange}
        disabled={loading}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {laboratories.map((lab) => (
          <MenuItem key={lab.id} value={lab.id}>
            {lab.nome}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default LaboratorySelect;