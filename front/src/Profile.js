import { useEffect, useState } from "react";
import './Profile.css'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Profile = ({ playerInfo, setPlayerInfo, masteryInfo, setMasteryInfo, getChampionName }) => {

    const [message, setMessage] = useState(() => {
        return (null);
    });

    const username = sessionStorage.getItem('username');
    const region = sessionStorage.getItem('region');
    const apiKey = sessionStorage.getItem('apiKey');
    const [playerIsLoaded, setPlayerIsLoaded] = useState(false);

    const getPlayerInfo = async(region, username, apiKey) => {
        try {
            await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${apiKey}`)
            .then(res => {
                return res.json()
            })
            .then((data) => {
                setPlayerInfo(data);
                setPlayerIsLoaded(true);
                console.log("player info")
                console.log(data);
            })
        } catch (error) {
            console.error(error);
            setMessage("failed to load profile, please check your username/region/apikey again");
        }
    }

    const getMasteryInfo = async(region, encryptedSummonerId, apiKey) => {
        try {
            fetch(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}?api_key=${apiKey}`)
            .then(res => {
                return res.json()
            })
            .then((data) => {
                setMasteryInfo(data);
                setMessage(null);
                console.log("mastery info")
                console.log(data);
            })
        } catch (error) {
            console.error(error);
            setMessage('failed to load mastery information');
        }
    }

    //this runs once at the beginning and sets the playerInfo
    useEffect(() => {
        if (username && region && apiKey) {
            if (!playerInfo || username != playerInfo.name.toLowerCase()) {
                setMasteryInfo(null);
                getPlayerInfo(region, username, apiKey);
            } else {
                setPlayerIsLoaded(true);
                setMessage(null);
            }
        } else {
            setMessage("missing username/region/apikey");
        }
    }, []);

    //this runs once at the beginning and reruns everytime playerInfo is updated
    useEffect(() => {
        //makes sure playerInfo exists
        if (playerInfo && !masteryInfo) {
            console.log("NEW MASTERY INFO");
            var encryptedSummonerId = playerInfo.id ? playerInfo.id : '';
            getMasteryInfo(region, encryptedSummonerId, apiKey);
        } else {
            setMessage(null);
        }

    }, [playerInfo]);

    return(
        <div>
            {playerIsLoaded && <div className='profileDisplay'>
                <h3>{playerInfo.name}</h3>
                <h4>LEVEL {playerInfo.summonerLevel}</h4>
                <img className="summonerIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${playerInfo.profileIconId}.jpg`}></img>
            </div>}
            {(playerIsLoaded && masteryInfo) && <div className='masteryDisplay'>
                {masteryInfo.map((champion) => (
                    <div title={getChampionName(champion.championId)} className="championList" >
                        <div className="championInfo">
                            <img className="championIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champion.championId}.png`}></img>      
                            <div className="championLevel"><p>MASTERY {champion.championLevel}</p></div>
                        </div>
                        <p className="championPoints">{numberWithCommas(champion.championPoints)}</p>
                        <div><p className="championName">{getChampionName(champion.championId)}</p></div>
                    </div>
                ))}
            </div>}
            {message && <span>{message}</span>}
        </div>
    )
    
    
}
export default Profile