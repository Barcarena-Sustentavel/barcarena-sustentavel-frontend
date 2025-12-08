import api from "../../../api.tsx";
import Swal from "sweetalert2";

export const patchEmail = async (
    email: string
) => {
    const formData = new FormData();
    formData.append("email", email);

    try{
        // await fetch("/admin/email_contribuicao", {
        //     method: "PATCH",
        //     body: formData,
        // }
        await api.patch("/admin/email_contribuicao", formData)
    .catch((error) => {
            console.log(error);
        });

        await Swal.fire({
              title: "Sucesso!",
              text: "E-mail modificado com sucesso.",
              icon: "success",
              confirmButtonColor: "var(--primary-color)",
            });

    } catch(error){
        await Swal.fire({
              title: "Erro!",
              text: "Ocorreu um erro ao modificar o e-mail. Por favor, tente novamente.",
              icon: "error",
              confirmButtonColor: "var(--primary-color)",
            });
    }
    
}

export const postEmail = async (
    email: string
) => {
    const formData = new FormData();
    formData.append("email", email);
    
    try{
        // await fetch("/admin/email_contribuicao", {
        //     method: "POST",
        //     body: formData,
        // })
        await api.post("/admin/email_contribuicao", formData)
        .catch((error) => {
            console.log(error);
        });

        await Swal.fire({
              title: "Sucesso!",
              text: "E-mail adicionado com sucesso.",
              icon: "success",
              confirmButtonColor: "var(--primary-color)",
            });

    } catch(error){
        await Swal.fire({
              title: "Erro!",
              text: "Ocorreu um erro ao adicionar o e-mail. Por favor, tente novamente.",
              icon: "error",
              confirmButtonColor: "var(--primary-color)",
            });
    }
    
}