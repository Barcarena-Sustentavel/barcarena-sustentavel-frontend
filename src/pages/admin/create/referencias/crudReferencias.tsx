import { link } from "fs"
import api from "../../../../api.tsx"
import {Referencia} from "../../../../interfaces/referencia_interface.tsx"
import Swal from "sweetalert2"

export const postReferencias = async (dimensao:string | undefined, nomeReferencia:string | undefined, linkReferencia:string | undefined) => {
    const referenciaNova:Referencia = {
        nome: nomeReferencia,
        link: linkReferencia
    }
    try{
        await api.post(`/admin/dimensoes/${dimensao}/referencias/`, referenciaNova)
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

export const patchReferencias = async (dimensao:string | undefined, referencia:string | undefined, nomeReferencia:string | undefined, linkReferencia:string | undefined) => {
  const referenciaNova:Referencia = {
        nome: nomeReferencia,
        link: linkReferencia
    }
  const decodeReferencia = decodeURIComponent(referencia as string)
  console.log(decodeReferencia)
  try{
        await api.patch(`/admin/dimensoes/${dimensao}/referencias/`, referenciaNova,{params:{referencia:decodeReferencia}})
        await Swal.fire({
                title: 'Sucesso!',
                text: 'Referência modificada com sucesso.',
                icon: 'success',
                confirmButtonColor: 'var(--primary-color)',
              });
    }
    catch (error) {
          console.error('Error submitting reference:', error);
          await Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro ao modificar a referência. Por favor, tente novamente.',
            icon: 'error',
            confirmButtonColor: 'var(--primary-color)',
          });
        }
  }