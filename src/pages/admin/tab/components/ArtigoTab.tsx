import { FC, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import api from "../../../../adapters/api.tsx";
import { getArtigoDimensao, deleteArtigoDimensao, updateArtigoDimensao, uploadArtigoDimensao } from "../../../../services/crudArtigo.tsx";
export const ArtigoTab: FC<{ nomeDimensao: string | undefined }> = ({ nomeDimensao }) => {
    const [formDataArtigo, setFormDataArtigo] = useState<File>(new File([], ""));
    const [patchArtigo, setPatchArtigo] = useState<boolean>(false);
    const url = `/admin/dimensoes/${nomeDimensao}/artigo`

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDataArtigo(e.target.files![0]);
    }
    const handleDownloadArtigo = async (e: any) => {
        e.preventDefault();
        if (formDataArtigo.name !== "") getArtigoDimensao(nomeDimensao as string);
    };
    const handleSubmitArtigo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (patchArtigo === false) {
            uploadArtigoDimensao(nomeDimensao as string, formDataArtigo);
            return;
        }
        updateArtigoDimensao(nomeDimensao as string, formDataArtigo);
    };
    const handleDeleteArtigo = async (e: any) => {
        e.preventDefault();
        if (formDataArtigo.name !== "") deleteArtigoDimensao(nomeDimensao as string);
        setPatchArtigo(false);
        setFormDataArtigo((prev) => ({
            ...prev,
            name: "",
        }));
    };
    useEffect(() => {
        const getArtigo = async () => {
            const response = await api.get(url)
            if (response.data.artigo != "") {
                setFormDataArtigo((prev) => ({
                    ...prev,
                    name: response.data.artigo,
                }));
                setPatchArtigo(true);
            }
        }
        getArtigo()
    }, [])
    return (
        <div className="admin-forms">
            <Form onSubmit={handleSubmitArtigo}>
                <Form.Group controlId="nome">
                    {formDataArtigo.name === "" && <Form.Label>Artigo</Form.Label>}
                    {formDataArtigo.name !== "" && (
                        <Form.Label>Artigo Atual: {formDataArtigo.name}</Form.Label>
                    )}
                    <Form.Control
                        type="file"
                        name="artigo"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <div className="button-container">
                    <button type="submit">Salvar Alterações</button>
                    <button className="neutral-button" type="button" onClick={(e: any) => handleDownloadArtigo(e)}>
                        Baixar Artigo
                    </button>
                    <button type="button" onClick={(e: any) => handleDeleteArtigo(e)}>
                        Deletar Artigo
                    </button>
                </div>
            </Form>
        </div>
    );
}