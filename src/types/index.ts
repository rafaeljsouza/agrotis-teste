export interface Laboratorio {
    id: number;
    nome: string;
  }
  
  export interface Propriedade {
    id: number;
    nome: string;
    cnpj: string;
  }
  
  export interface FormData {
    nome: string;
    dataInicial: string;
    dataFinal: string;
    propriedades: Array<{
      id: number;
      nome: string;
    }>;
    laboratorio: {
      id: number;
      nome: string;
    } | null;
    observacoes: string;
  }
  