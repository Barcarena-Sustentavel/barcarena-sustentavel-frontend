import logoSegurança from '@assets/images/icons/seguranca2.svg'
import logoMobilidade from '@assets/images/icons/mobilidade2.svg'
import logoSaude from '@assets/images/icons/saude2.svg'
import logoOrdenamento from '@assets/images/icons/ordenamento_territorial2.svg'
import logoMeioAmbiente from '@assets/images/icons/meio_ambiente2.svg'
import logoInstituicoes from '@assets/images/icons/instituicoes2.svg'
import logoEmprego from '@assets/images/icons/emprego2.svg'
import logoEducacao from '@assets/images/icons/educacao2.svg'
import logoConectividade from '@assets/images/icons/conectividade2.svg'

const dimensoesColumn1:Record<string, any> ={ 
        "Segurança":logoSegurança,
        "Mobilidade": logoMobilidade,
        "Saúde": logoSaude,
        "Ordenamento Territorial": logoOrdenamento,
        "Meio Ambiente": logoMeioAmbiente,
}

const dimensoesColumn2: Record<string, any> = {
        "Instituições": logoInstituicoes,
        "Emprego": logoEmprego,
        "Educação": logoEducacao,
        "Conectividade": logoConectividade
}

const dimensaoCores: Record<string, string> = {
        "Segurança": "dark-blue-d",          // Confiança, proteção
        "Mobilidade": "green-light-d",       // Movimento, fluidez
        "Saúde": "blue-d",                  // Saúde, equilíbrio
        "Ordenamento Territorial": "dark-green-d", // Planejamento, controle
        "Meio Ambiente": "green-d",           // Natural, estável (também se aplica bem)
        "Instituições": "dark-red-d",        // Autoridade, seriedade
        "Emprego": "red-d",                  // Ação, urgência, energia
        "Educação": "orange-d",              // Estímulo, criatividade
        "Conectividade": "yellow-d",         // Comunicação, otimismo
};

const dimensaoAumentaIcone: Record<string, boolean> = {
        "Segurança": false,          
        "Mobilidade": true,       
        "Saúde": false,                  
        "Ordenamento Territorial": false, 
        "Meio Ambiente": false,           
        "Instituições": false,        
        "Emprego": false,                 
        "Educação": true,              
        "Conectividade": false,         
};
      

export default {dimensoesColumn2, dimensoesColumn1, dimensaoCores, dimensaoAumentaIcone}