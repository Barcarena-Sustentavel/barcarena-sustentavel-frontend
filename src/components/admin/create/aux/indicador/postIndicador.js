"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postIndicador = void 0;
//import { error } from "highcharts";
const api_1 = __importDefault(require("../../../../../api"));
const postIndicador = (dimensao, indicador, arrayGrafico) => __awaiter(void 0, void 0, void 0, function* () {
    const Indicador = {
        nome: indicador
    };
    try {
        yield api_1.default.post(`/admin/dimensoes/${dimensao}/indicador/`, Indicador);
    }
    catch (error) {
        console.log(error);
    }
    try {
        const endpoit = `http://0.0.0.0:8081/admin/dimensoes/${dimensao}/indicador/${indicador}/anexos/`;
        const formData = new FormData();
        for (let i = 0; i < arrayGrafico.length; i++) {
            formData.append('grafico', arrayGrafico[i].arquivo);
            formData.append('descricaoGrafico', arrayGrafico[i].descricaoGrafico);
            formData.append('tituloGrafico', arrayGrafico[i].tituloGrafico);
            formData.append('tipoGrafico', arrayGrafico[i].tipoGrafico);
            console.log(formData);
            yield fetch(endpoit, {
                method: 'POST',
                body: formData
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    catch (error) {
        console.log(error);
    }
    //return dadosIndicador;
});
exports.postIndicador = postIndicador;
