import { useEffect, useState } from "react";
import './Profile.css'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Profile = ({ playerInfo, setPlayerInfo, masteryInfo, setMasteryInfo, getChampionName }) => {

    const [message, setMessage] = useState(() => {
        return ('loading...');
    });

    const username = sessionStorage.getItem('username');
    const region = sessionStorage.getItem('region');
    const apiKey = sessionStorage.getItem('apiKey');

    const getPlayerInfo = async(region, username, apiKey) => {
        try {
            await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${apiKey}`)
            .then(res => {
                return res.json()
            })
            .then((data) => {
                setPlayerInfo(data);
                setMessage("success");
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
            }
        } else {
            setMessage("missing username/region/apikey");
            document.getElementById('message').value = message;
        }
    }, []);

    //this runs once at the beginning and reruns everytime playerInfo is updated
    useEffect(() => {
        //makes sure playerInfo exists
        if (playerInfo && !masteryInfo) {
            console.log("NEW MASTERY INFO");
            var encryptedSummonerId = playerInfo.id ? playerInfo.id : '';
            getMasteryInfo(region, encryptedSummonerId, apiKey);
        }

    }, [playerInfo]);

    useEffect(() => {
        document.getElementById('message').innerText = message;
        if (message === "success") {
            document.getElementById('message').hidden = true;
        }
    }, [message]);

    return(
        <div>
            {playerInfo && <div className='profileDisplay'>
                <h3>{playerInfo.name}</h3>
                <h4>LEVEL {playerInfo.summonerLevel}</h4>
                <img className="summonerIcon" src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${playerInfo.profileIconId}.jpg`}></img>
            </div>}
            {masteryInfo && <div className='masteryDisplay'>
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
            <span id="message"></span>
        </div>
    )
    
    
}
export default Profile