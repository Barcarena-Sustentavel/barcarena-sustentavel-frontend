import { useEffect, useRef, useState } from 'react';
import { Contribuicao } from '../../../interfaces/contribuicao_interface.tsx';
import { useContribuicao } from '../../../hooks/useContribuicao.ts';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import { Alert, Form, Row, Col, Button } from "react-bootstrap";
import "./formContribuicao.css";
import info_icon from "@assets/images/icons/info-icon.png";

interface FormContribuicaoProps {
    dimensaoId: number;
    formStyle: React.CSSProperties;
}

const FormContribuicao: React.FC<FormContribuicaoProps> = ({ dimensaoId, formStyle = {} }) => {
    const [formData, setFormData] = useState<Omit<Contribuicao, 'id' | 'fkDimensao'> & { file: File | null }>({
        nome: '',
        email: '',
        telefone: '',
        comentario: '',
        file: null
    });

    // const [isSubmitting, setIsSubmitting] = useState(false);
    const [captchaValido, setCaptchaValido] = useState(false);
    const { submitContribuicao } = useContribuicao();
    const [errorNome, setErrorNome] = useState<string>("");
    const [errorTelefone, setErrorTelefone] = useState<string>("");
    const [errorEmail, setErrorEmail] = useState<string>("");
    const [errorComentario, setErrorComentario] = useState<string>("");
    const [errorArquivo, setErrorArquivo] = useState<string>("");
    const fileRef = useRef<HTMLInputElement>();

    const SITE_KEY_RECAPTCHA = import.meta.env.VITE_SITE_KEY_RECAPTCHA;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const onChangeRecaptcha = (value: string | null) => {
        console.log("Token recebido:", value);
        setCaptchaValido(!!value);
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) return; // nada selecionado

        // ✅ Validação de tipo (MIME)
        if (file.type !== "application/pdf") {
            setErrorArquivo("O arquivo deve ser um PDF.");
            e.target.value = ""; // limpa o campo
            return;
        }

        // ✅ Validação de tamanho (em bytes)
        const maxSizeMB = 25;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        if (file.size > maxSizeBytes) {
            setErrorArquivo(`O arquivo deve ter no máximo ${maxSizeMB} MB.`);
            e.target.value = "";
            return;
        }

        setFormData(prev => ({ ...prev, file: e.target.files![0] }));

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.nome) {
            if (formData.nome.length > 100) {
                setErrorNome(prev => ("Insira um nome menor que 100 caracteres."));
                return;
            }
        } else {
            setErrorNome(prev => ("Campo de nome vazio."));
            return;
        }

        if (formData.email) {
            if (formData.email.length > 250) {
                setErrorEmail(prev => ("Insira um email menor que 250 caracteres."));
                return;
            }
        } else {
            setErrorEmail(prev => ("Campo de e-mail vazio."));
            return;
        }

        if (formData.telefone) {
            if (formData.telefone.length != 11) {
                setErrorTelefone(prev => ("Insira um número de telefone no formato XX9XXXXXXXX."));
                return;
            }
            if (/[a-z]/i.test(formData.telefone)) {
                setErrorTelefone(prev => ("Insira apenas números."));
                return;
            }
        }

        if (!formData.comentario) {
            setErrorComentario("Campo de comentário vazio.");
        }

        const data = new FormData();
        data.append('nome', formData.nome ?? "");
        data.append('email', formData.email ?? "");
        data.append('telefone', formData.telefone ?? "");
        data.append('comentario', formData.comentario ?? "");
        // data.append('fkDimensao', dimensaoId.toString());
        if (formData.file) {
            data.append('file', formData.file);
        }

        console.log(data)

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
                if (fileRef.current) {
                    fileRef.current.value = "";
                }
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
        <form onSubmit={handleSubmit} className="contribuicao-section">
            <h2>Deixe aqui sua contribuição</h2>
            <div  className="contribuicao-grid">
                {/*<form onSubmit={handleSubmit}>*/}
                {/* 1. Adicionei a Row principal para segurar as duas colunas */}
                <div className='contribuicao-campo'><label>Nome <span className="contribuicao-requerida">*</span></label>
                    <input id="contrib-nome" type="text" name="nome" placeholder="Digite seu nome" value={formData.nome ?? ""}       // 2. O valor atual do estado
                        onChange={handleChange}></input></div>
                <div className="contribuicao-campo" style={{ gridRow: 'span 2' }}>
                    <label>Comentário <span className="contribuicao-requerida">*</span></label>
                    <textarea id="contrib-comentario" name="comentario" placeholder="Digite seu comentário" value={formData.comentario ?? ""}
                        onChange={handleChange}></textarea>
                </div>
                <div className="contribuicao-campo">
                    <label>E-mail <span className="contribuicao-requerida">*</span></label>
                    <input id="contrib-email" type="email" name="email" placeholder="exemplo@email.com" value={formData.email ?? ""}
                        onChange={handleChange}></input>
                </div>
                <div className="contribuicao-campo">
                    <label>Telefone <span className="contribuicao-requerida">*</span></label>
                    <input id="contrib-telefone" type="tel" name="telefone" placeholder="(00) 00000-0000" value={formData.telefone ?? ""}
                        onChange={handleChange}></input>
                </div>
                <div className="contribuicao-campo contrib-field-file">
                    <label>Anexar Arquivo</label>
                    <input type="file" name="file" onChange={handleChange}></input>
                </div>
                <div className="contribuicao-info">
                    <div className="contribuicao-info-icone">i</div>
                    <span>Deixe um feedback ou um comentário para contribuir com a plataforma. Caso queira adicionar um dado interessante, anexe arquivos no botão indicado. (Máximo de 25mb)</span>
                </div>
                </div>
                <div className="contribuicao-campo recaptcha">
                    <div>
                        <ReCAPTCHA
                            sitekey={SITE_KEY_RECAPTCHA}
                            onChange={onChangeRecaptcha}
                        />
                    </div>
                </div>
                <button type="submit" className="contribuicao-submit">
                    Enviar
                </button>
        </form>
    );
};

export default FormContribuicao;