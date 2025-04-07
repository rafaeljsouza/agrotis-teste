import axios from 'axios';
import { Laboratorio, Propriedade } from '../types';

// Base URL para os endpoints do teste
const BASE_URL = 'https://bitbucket.org/agrotis/teste-rh/raw/3bc797776e54586552d1c9666fd7c13366fc9548/teste-front-end-1';

// Exporte a instância do axios se precisar
export const api = axios.create({
  baseURL: BASE_URL,
});

// Funções para buscar dados
export const fetchLaboratorios = async (): Promise<Laboratorio[]> => {
  const response = await axios.get(`${BASE_URL}/laboratorios.json`);
  return response.data;
};

export const fetchPropriedades = async (): Promise<Propriedade[]> => {
  const response = await axios.get(`${BASE_URL}/propriedades.json`);
  return response.data;
};
