import api from '../api.tsx';
import axios from 'axios';
import emailjs from "@emailjs/browser";
import { useLocation } from "react-router-dom";

interface SubmitContribuicaoParams {
  formData: FormData;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export const useContribuicao = () => {
  async function enviarEmail(form: FormData){
    
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const formParameters = {
      nome: form.get('nome'),
      email: form.get('email'),
      telefone: form.get('telefone'),
      comentario: form.get('comentario')
    }

    try{
      const resultado = await emailjs.send(
      SERVICE_ID, TEMPLATE_ID, formParameters, {publicKey: PUBLIC_KEY}
      );

      alert("E-mail enviado com sucesso!");
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao enviar a mensagem.");
    }
    
  }

  function getPathAtual(){
    const pathAtual = useLocation().pathname;

    // retira acentos da string do path atual
    return pathAtual.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const submitContribuicao = async ({ 
    formData, 
    onSuccess, 
    onError 
  }: SubmitContribuicaoParams) => {
    try {
      console.log(getPathAtual());
      await api.post(`/dimensoes/contribuicao/${getPathAtual()}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      // enviarEmail(formData);
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