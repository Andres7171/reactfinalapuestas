import axios from "axios"
import Global from "../Global"

export default class ServicioApuestas{
    async getApuestas(){
        let url=Global.url
        let request='api/apuestas'
        try{
            let response=await axios.get(url+request)
            return response.data
        }catch(error){
            throw error
        }
    }

    async createApuesta(apuesta){
        let url=Global.url
        let request='api/apuestas'
        try{
            let response=await axios.post(url+request,apuesta)
            return response
        }catch(error){
            throw error
        }
    }
}