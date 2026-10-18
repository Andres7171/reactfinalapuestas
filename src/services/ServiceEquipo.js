import Global from "../Global";
import axios from "axios";


export default class ServiceEquipo{
    async getEquipos(){
        let url=Global.url
        let request='api/equipos'
        
        try{
            let response=await axios.get(url+request)
            return response.data
        }catch(error){
            throw error
        }
    }

    async getEquipoID(id){
        let url=Global.url
        let request='api/equipos/'+id
        try{
            let response=await axios.get(url+request)
            return response.data
        }catch(error){
            throw error
        }
    }
}