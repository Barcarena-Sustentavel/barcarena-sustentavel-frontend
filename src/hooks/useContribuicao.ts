import api from '../api.tsx';
import axios from 'axios';
import { useLocation } from "react-router-dom";

interface SubmitContribuicaoParams {
  formData: FormData;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export const useContribuicao = () => {
  const pathAtual = useLocation().pathname;

  function getPathAtual(){
    // retira acentos da string do path atual
    return pathAtual.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const submitContribuicao = async ({ 
    formData, 
    onSuccess, 
    onError 
  }: SubmitContribuicaoParams) => {
    try {
      await api.post(`/dimensoes/contribuicao${getPathAtual()}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      onSuccess?.();
    } catch (error) {
        let userFriendlyMessage = 'Não foi possível enviar sua contribuição';

        if (axios.isAxiosError(error)) {
            userFriendlyMessage = error.response?.data?.message || 
                                getCustomMessage(error.response?.status) ||
                                'Erro de conexão com o servidor';
        }
        
        onError?.(userFriendlyMessage);
    }
  };

  return { submitContribuicao };
};

// Função auxiliar para mensagens customizadas por status
function getCustomMessage(status?: number) {
    const messages: Record<number, string> = {
      400: 'Dados inválidos. Verifique as informações.',
      500: 'Erro interno no servidor. Tente novamente mais tarde.'
    };
    return status ? messages[status] : undefined;
  }