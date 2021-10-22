import { useParams } from "react-router"
import { useEffect, useState } from "react";



const History = ({data, apiKey}) => {
    const { region, name } = useParams()
    return (

        <div>
            <p>History</p>
            <p>{apiKey}</p>
            <div>
                <h3>{data.name} {region}</h3>
                <h4>Level {data.summonerLevel}</h4>
                <img src={`http://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${data.profileIconId}.png`}></img>
            </div>
        </div>
    )
}
export default History