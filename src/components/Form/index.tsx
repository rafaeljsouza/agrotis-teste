import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../../hooks/useFormData';
import { FormData, Laboratorio } from '../../types';
import {
  FormContainer, FormHeader, FormTitle, FormContent,
  InputRow
} from './styles';
import DatePicker from '../DatePicker';
import PropertySelect from '../PropertySelect';
import LaboratorySelect from '../LaboratorySelect';

interface PropItem {
    id: number;
    nome: string;
    [key: string]: unknown;
  }

const Form = () => {
  const navigate = useNavigate();
  const { addFormData } = useFormData();
  const [selectedPropriedades, setSelectedPropriedades] = useState<number[]>([]);
  const [selectedLaboratorio, setSelectedLaboratorio] = useState<number | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      nome: '',
      dataInicial: '',
      dataFinal: '',
      propriedades: [],
      laboratorio: null,
      observacoes: ''
    }
  });

  const handlePropertyChange = (ids: number[]) => {
    setSelectedPropriedades(ids);
  };

  const handleLaboratoryChange = (id: number) => {
    setSelectedLaboratorio(id);
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Buscar os detalhes do laboratório selecionado
      const labResponse = await fetch('https://bitbucket.org/agrotis/teste-rh/raw/3bc797776e54586552d1c9666fd7c13366fc9548/teste-front-end-1/laboratorios.json');
      const laboratorios: Laboratorio[] = await labResponse.json();
      const selectedLab = laboratorios.find(lab => lab.id === selectedLaboratorio);
      
      // Buscar os detalhes das propriedades selecionadas
      const propResponse = await fetch('https://bitbucket.org/agrotis/teste-rh/raw/3bc797776e54586552d1c9666fd7c13366fc9548/teste-front-end-1/propriedades.json');
      const propriedades = await propResponse.json();
      
      // Formatar os dados conforme especificado no teste
      const formattedData = {
        ...data,
        propriedades: selectedPropriedades.map(id => {
          const prop = propriedades.find((p: PropItem) => p.id === id);
          return { id, nome: prop?.nome || '' };
        }),
        laboratorio: selectedLab ? { 
          id: selectedLab.id, 
          nome: selectedLab.nome 
        } : null
      };
      
      // Adicionar ao contexto
      addFormData(formattedData);
      
      // Navegar para a lista
      navigate('/');
    } catch (error) {
      console.error('Erro ao processar o formulário:', error);
    }
  };

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>
          <IconButton color="inherit" onClick={() => navigate('/')}>
            <ArrowBackIcon />
          </IconButton>
          Teste Front-End / Novo Cadastro
        </FormTitle>
        <Button
          variant="contained"
          style={{ backgroundColor: '#00695c' }}
          onClick={handleSubmit(onSubmit)}
        >
          SALVAR
        </Button>
      </FormHeader>
      
      <FormContent onSubmit={handleSubmit(onSubmit)}>
        <InputRow>
          <Controller
            name="nome"
            control={control}
            rules={{ required: "Nome é obrigatório" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome"
                variant="outlined"
                fullWidth
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
            )}
          />
        </InputRow>
        
        <InputRow>
          <Controller
            name="dataInicial"
            control={control}
            rules={{ required: "Data Inicial é obrigatória" }}
            render={({ field }) => (
              <DatePicker
                label="Data Inicial"
                value={field.value}
                onChange={(date) => field.onChange(date)}
                error={!!errors.dataInicial}
                helperText={errors.dataInicial?.message}
              />
            )}
          />
          
          <Controller
            name="dataFinal"
            control={control}
            rules={{ required: "Data Final é obrigatória" }}
            render={({ field }) => (
              <DatePicker
                label="Data Final"
                value={field.value}
                onChange={(date) => field.onChange(date)}
                error={!!errors.dataFinal}
                helperText={errors.dataFinal?.message}
              />
            )}
          />
        </InputRow>
        
        <InputRow>
          <PropertySelect 
            value={selectedPropriedades}
            onChange={handlePropertyChange}
            error={!!errors.propriedades}
            helperText={errors.propriedades?.message as string}
          />
          
          <LaboratorySelect
            value={selectedLaboratorio}
            onChange={handleLaboratoryChange}
            error={!!errors.laboratorio}
            helperText={errors.laboratorio?.message as string}
          />
        </InputRow>
        
        <InputRow>
          <Controller
            name="observacoes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Observações"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            )}
          />
        </InputRow>
      </FormContent>
    </FormContainer>
  );
};

export default Form;