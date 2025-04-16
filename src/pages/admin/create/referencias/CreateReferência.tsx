import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../../../../api.tsx';
import Swal from 'sweetalert2';
import { Referencia } from '../../../../interfaces/referencia_interface.tsx';
import { postReferencias, patchReferencias } from './crudReferencias.tsx';

const CreateReferencias: FC<{dimensao:string | undefined, referencia: string | undefined}> = ({dimensao, referencia}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patch, setPatch] = useState(false);
  const [formRef, setFormRef] = useState<Referencia>({
    nome: '',
    link: ''
  });
  console.log(referencia);
  useEffect(() => {
    if (referencia != undefined){
      api.get(`/admin/dimensoes/${dimensao}/referencias/${referencia}/`).then((response) => {
        console.log(response.data);
        setFormRef({
          nome: response.data.nome,
          link: response.data.link
        });
      });
      setPatch(true)
    }
    }, [dimensao, referencia]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRef(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.nome || !formRef.link) {
      await Swal.fire({
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos.',
        icon: 'error',
        confirmButtonColor: 'var(--primary-color)',
      });
      return;
    }

    setIsSubmitting(true);
    
    if (patch) {
      patchReferencias(dimensao, referencia, formRef.nome, formRef.link);
    }else{
      postReferencias(dimensao, formRef.nome, formRef.link);
    }
      // Reset form
      setFormRef({
        nome: '',
        link: ''
      });
      
      // Navigate back to the dimension page
      navigate(`/admin/dimensao/${dimensao}/`);
      setIsSubmitting(false);
  };

  return (
    <div className="post-referencias-container">
      <h2>{patch === true ? 'Modificar Referência': 'Adicionar Referência' }</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Título da Referência</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formRef.nome}
            onChange={handleChange}
            placeholder={formRef.nome === '' ? "Digite o título da referência" : formRef.nome}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="link">Link da Referência</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formRef.link}
            onChange={handleChange}
            placeholder={formRef.link === '' ? "Digite o link da referência" : formRef.link}
            required
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn-cancel"
            onClick={() => navigate(`/admin/dimensao/${dimensao}/`)}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adicionando...' : 'Adicionar Referência'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReferencias;
