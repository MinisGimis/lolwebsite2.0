import { useParams } from "react-router"
import { useEffect, useState } from "react";
import './Profile.css'


const Profile = ({ apiKey }) => {

    const [playerInfo, setPlayerInfo] = useState(()=>{
        return(0)
    })

    const makeAPICall = async (region, name, apiKey) => {
        try {
          const response = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`, {mode:'cors'});
          const data = await response.json();
          setPlayerInfo(data)
          console.log(data)
          
        }
        catch (e) {
          console.log(e)
        }
    }

    const { region, name } = useParams()


    useEffect(() =>{
            makeAPICall(region, name, apiKey)
    }, [])

    if (playerInfo) {
        return(
            <div>
                <h3>{playerInfo.name} {region}</h3>
                <h4>Level {playerInfo.summonerLevel}</h4>
                <img src={`http://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${playerInfo.profileIconId}.png`}></img>
            </div>
        )
    }

    else {
        console.log(playerInfo)
        return (
            <div className="error">
                <h2>Error</h2>
                <h3>Player not found, or API Key is incorrect</h3>
            </div>
        )
    }
    

}
export default Profile