import api from "../../../../api.tsx"
import {EstudoComplementar} from "../../../../interfaces/estudo_complementar_interface.tsx"
import Swal from "sweetalert2"

export const postEstudoComplementar = async (dimensao:string | undefined, nomeEstudoComplementar:string | undefined, arquivoEstudoComplementar: File | undefined) => {
    const form = new FormData();

    form.append("name", nomeEstudoComplementar ?? "");
    form.append("pdf", arquivoEstudoComplementar ?? new Blob([], { type: "application/pdf" }));
    console.log(form)

    try{
      console.log("tentando enviar post estudos compl")
        await fetch(`/api/admin/dimensoes/${dimensao}/estudo_complementar/`, {
          method: "POST",
          body: form,
        });
        await Swal.fire({
                title: 'Sucesso!',
                text: 'Estudo complementar adicionada com sucesso.',
                icon: 'success',
                confirmButtonColor: 'var(--primary-color)',
              });
    }
    catch (error) {
          console.error('Error submitting reference:', error);
          await Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro ao adicionar o estudo complementar. Por favor, tente novamente.',
            icon: 'error',
            confirmButtonColor: 'var(--primary-color)',
          });
        } 
}

export const patchEstudoComplementar = async (dimensao:string | undefined, nomeEstudoComplementar:string | undefined, novoNomeEstudoComplementar: string | undefined, arquivoEstudoComplementar: File | undefined) => {
    const form = new FormData();
    console.log(`nomeEstudoComplementar: ${nomeEstudoComplementar}\nnovoNomeEstudoComplementar: ${novoNomeEstudoComplementar}`)

    form.append("novo_nome", novoNomeEstudoComplementar ?? "");
    form.append("pdf", arquivoEstudoComplementar ?? new Blob([], { type: "application/pdf" }))

    try{
        await fetch(`/api/admin/dimensoes/${dimensao}/estudo_complementar/${nomeEstudoComplementar}/`, {
          method: "PATCH",
          body: form,
        });
        await Swal.fire({
                title: 'Sucesso!',
                text: 'Referência adicionada com sucesso.',
                icon: 'success',
                confirmButtonColor: 'var(--primary-color)',
              });
    }
    catch (error) {
          console.error('Error submitting reference:', error);
          await Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro ao adicionar a referência. Por favor, tente novamente.',
            icon: 'error',
            confirmButtonColor: 'var(--primary-color)',
          });
        } 
}