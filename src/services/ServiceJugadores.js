import Global from "../Global";
import axios from "axios";

export default class ServiceJugadores{
    async getJugadoresEquipo(idEquipo){
        let url=Global.url
        let request='api/jugadores/jugadoresequipos/'+idEquipo
        try{
            let response=await axios.get(url+request)
            return response.data
        }catch(error){
            throw error
        }
    }
}