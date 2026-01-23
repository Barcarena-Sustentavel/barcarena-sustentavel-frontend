import { useEffect, useState } from 'react';
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

const FormContribuicao: React.FC<FormContribuicaoProps> = ({ dimensaoId , formStyle = {}}) => {
    const [formData, setFormData] = useState<Omit<Contribuicao, 'id' | 'fkDimensao'> & { file: File | null}>({
        nome: null,
        email: '',
        telefone: null,
        comentario: null,
        file: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [captchaValido, setCaptchaValido] = useState(false);
    const { submitContribuicao } = useContribuicao();
    const [errorNome, setErrorNome] = useState<string>("");
    const [errorTelefone, setErrorTelefone] = useState<string>("");
    const [errorEmail, setErrorEmail] = useState<string>("");
    const [errorComentario, setErrorComentario] = useState<string>("");
    const [errorArquivo, setErrorArquivo] = useState<string>("");

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
        const file = e.target.files ? e.target.files[0]: null;
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

        if(formData.nome){
            if(formData.nome.length === 0){
                setErrorNome(prev => ("Campo de nome vazio."));
                return;
            }
            if(formData.nome.length > 100){
                setErrorNome(prev => ("Insira um nome menor que 100 caracteres."));
                return;
            }
        }
        
        if(formData.email){
            if(formData.email.length == 0){
                setErrorEmail(prev => ("Campo de e-mail vazio."));
                return;
            }
            if(formData.email.length > 250){
                setErrorEmail(prev => ("Insira um email menor que 250 caracteres."));
                return;
            }
        }

        if(formData.telefone){
            if(formData.telefone.length === 0){
                setErrorTelefone(prev => ("Campo de telefone vazio."));
                return;
            }
            if(formData.telefone.length != 11){
                setErrorTelefone(prev => ("Insira um número de telefone no formato XX9XXXXXXXX."));
                return;
            }
            if(/[a-z]/i.test(formData.telefone)){
                setErrorTelefone(prev => ("Insira apenas números."));
                return;
            }
        }

        if(formData.comentario?.length === 0){
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
        <section className="mx-auto contribuicao-section">
            <div className="d-flex justify-content-center align-items-center header-contribuicao">
                <span>Deixe aqui sua contribuição</span>
            </div>
            <div className="">
                <div className="contribuicao-corpo">
                    <Form onSubmit={handleSubmit}>
                        {/* 1. Adicionei a Row principal para segurar as duas colunas */}
                        <Row>
                            {/* COLUNA DA ESQUERDA (Ocupa metade da tela: md={6}) */}
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formNome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    className="border border-dark" 
                                    placeholder="Digite seu nome"

                                    name="nome"                 // 1. O "nome" da chave
                                    value={formData.nome ?? ""}       // 2. O valor atual do estado
                                    onChange={handleChange}
                                    />
                                    {errorNome && (
                                        <Alert variant="danger" className="mt-2">
                                            {errorNome}
                                        </Alert>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control 
                                    type="email" 
                                    className="border border-dark" 
                                    placeholder="Digite seu e-mail"

                                    name="email"
                                    value={formData.email ?? ""}
                                    onChange={handleChange}
                                    />
                                    {errorEmail && (
                                        <Alert variant="danger" className="mt-2">
                                            {errorEmail}
                                        </Alert>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formTel">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control 
                                    type="tel" 
                                    className="border border-dark" 
                                    placeholder="Digite seu telefone"

                                    name="telefone"
                                    value={formData.telefone ?? ""}
                                    onChange={handleChange}
                                    />
                                    {errorTelefone && (
                                        <Alert variant="danger" className="mt-2">
                                            {errorTelefone}
                                        </Alert>
                                    )}
                                </Form.Group>
                            </Col>

                            {/* COLUNA DA DIREITA (Ocupa a outra metade: md={6}) */}
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formComment">
                                    <Form.Label>Comentário</Form.Label>
                                    <Form.Control 
                                    as="textarea" 
                                    className="border border-dark campo-comentario" 
                                    rows={3} 
                                    placeholder="Digite seu comentário"

                                    name="comentario"
                                    value={formData.comentario ?? ""}
                                    onChange={handleChange}
                                    />
                                </Form.Group>
                                {errorComentario && (
                                        <Alert variant="danger" className="mt-2">
                                            {errorComentario}
                                        </Alert>
                                    )}

                                <Form.Group className="mb-3" controlId="formFile">
                                    <Form.Label>Anexar Arquivo</Form.Label>
                                    <Form.Control type="file" onChange={handleFileChange}/>
                                    {errorArquivo && (
                                        <Alert variant="danger" className="mt-2">
                                            {errorArquivo}
                                        </Alert>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex align-items-center mx-auto campo-informacao">
                            <img src={info_icon} className="info-icone"></img>
                             <span className="info-texto">Deixe um feedback ou um comentário para contribuir com a plataforma, caso queira adicionar um dado 
                                interessante, anexe arquivos no botão indicado. (Máximo de 25mb)</span>
                        </div>
                        <div className="d-flex justify-content-center recaptcha">
                            <ReCAPTCHA
                            sitekey={SITE_KEY_RECAPTCHA}
                            onChange={onChangeRecaptcha}
                            />
                        </div>
                        <Button className="mx-auto botao-contribuicao" variant="primary" type="submit">Enviar</Button>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default FormContribuicao;