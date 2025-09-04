import { useState } from 'react';
import { Contribuicao } from '../../../interfaces/contribuicao_interface.tsx';
import { useContribuicao } from '../../../hooks/useContribuicao.ts';
import Swal from 'sweetalert2';

interface FormContribuicaoProps {
    dimensaoId: number;
    formStyle: React.CSSProperties;
}

const FormContribuicao: React.FC<FormContribuicaoProps> = ({ dimensaoId , formStyle = {}}) => {
    const [formData, setFormData] = useState<Omit<Contribuicao, 'id' | 'fkDimensao'> & { file: File | null}>({
        nome: null,
        email: '',
        telefone: null,
        comentario: null,
        file: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { submitContribuicao } = useContribuicao();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, file: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('nome', formData.nome ?? "");
        data.append('email', formData.email ?? "");
        data.append('telefone', formData.telefone ?? "");
        data.append('comentario', formData.comentario ?? "");
        data.append('fkDimensao', dimensaoId.toString());
        if (formData.file) {
            data.append('file', formData.file);
        }

        await submitContribuicao({
            formData: data,
            onSuccess: async () => {
                await Swal.fire({
                    title: 'Contribuição enviada!',
                    text: 'Obrigado por contribuir.',
                    icon: 'success',
                    confirmButtonColor: 'var(--primary-color)',
                });
              setFormData({
                nome: '',
                email: '',
                telefone: '',
                comentario: '',
                file: null
              });
            },
            onError: async (message: string) => {
                await Swal.fire({
                    title: 'Erro!',
                    text: message,
                    icon: 'error',
                    confirmButtonColor: 'var(--primary-color)',
                  });
            }
        });
    };

    return (
        <div className="d-flex flex-column justify-content-between container dimension-details-container mt-5">
            <h1>Deixe aqui sua contribuição</h1>
            <div className="contribuicao">
                <p>Envie um comentário e/ou um arquivo contendo dados relevantes que possam contribuir com a plataforma</p>
                <form 
                    style={formStyle}
                    onSubmit={handleSubmit}
                    className="d-flex flex-column contribuicao"
                    encType="multipart/form-data"
                >
                    <label htmlFor="nome">Nome</label>
                    <input 
                        type="text" 
                        name="nome" 
                        id="nome" 
                        placeholder="Nome"
                        value={formData.nome ?? ""}
                        onChange={handleChange}
                        style={{backgroundColor: "white", color:"var(--p-color)"}}
                    />
                    
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{backgroundColor: "white", color:"var(--p-color)"}}
                    />
                    
                    <label htmlFor="telefone">Telefone</label>
                    <input 
                        type="tel" 
                        name="telefone" 
                        id="telefone" 
                        placeholder="Telefone (DDD+número)"
                        value={formData.telefone ?? ""}
                        onChange={handleChange}
                        style={{backgroundColor: "white", color:"var(--p-color)"}}
                    />
                    
                    <label htmlFor="comentario">Comentário</label>
                    <textarea 
                        name="comentario" 
                        id="comentario" 
                        placeholder="Deixe aqui seu comentário"
                        value={formData.comentario ?? ""}
                        onChange={handleChange}
                        style={{backgroundColor: "white", color:"var(--p-color)", marginLeft:"18px"}}
                    />
                    
                    <label htmlFor="file">Arquivo</label>
                    <input 
                        type="file" 
                        name="file" 
                        id="file"
                        onChange={handleFileChange}
                    />
                    
                    <button type="submit" style={{
                        color: "white",
                        padding: "10px 50px",      
                        width: "fit-content",     
                        height: "auto",
                        fontFamily: "sans-serif",            
                    }}>
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormContribuicao;