import { useEffect, useState } from "react";

const History = ({playerInfo, getChampionName, matches, setMatches}) => {

    const nextRegion = (region) => {
        if (region === 'americas') {
            return ('asia');
        } else if (region === 'asia') {
            return ('europe');
        } else {
            return ('americas');
        }
    }

    const [errorMessage, setErrorMessage] = useState(() => {
        return ('loading...');
    });

    const [matchHistoryList, setMatchHistoryList] = useState(null);

    const username = sessionStorage.getItem('username');
    const region = sessionStorage.getItem('region');
    const apiKey = sessionStorage.getItem('apiKey');
    var puuid = '';

    const getMatchHistoryList = async(region, puuid, apiKey) => {
        try {
            await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${apiKey}`)
            .then(res => {
                return res.json()
            })
            .then((data) => {
                setMatchHistoryList(data);
                console.log("match list info")
                console.log(data);
            })
        } catch (error) {
            console.error(error);
            if (region != 'europe') {
                getMatchHistoryList(nextRegion(region), puuid, apiKey);
            } else {
                setErrorMessage("failed to get match list info");
            }
        }
    }

    const getMatchInfo = async(region, matchId) => {
        try {
            await fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`)
            .then(res => {
                return res.json()
            })
            .then((data) => {
                //fix this so that it appends element to end of the array. Doesnt work because array is a react hook
                setMatches(matches.concat([{
                    gameEndTimeStamp: data.info.gameEndTimeStamp,
                    gameMode: data.info.gameMode,
                    gameType: data.info.gameType,
                }]))
                console.log("match info")
                console.log(data);
            })
        } catch (error) {
            console.error(error);
            if (region != 'europe') {
                getMatchInfo(nextRegion(region), matchId);
            } else {
                setErrorMessage("failed to get match info");
            }
        }        
    }

    useEffect(() => {
        if (!playerInfo || !username || !region || !apiKey) {

        } else {
            puuid = playerInfo.puuid;
            if (!matchHistoryList) {
                getMatchHistoryList(region, puuid, apiKey);
            } else {
                setErrorMessage(null);
            }  
        }
    }, [])
/*
    useEffect(() => {
        if (matchHistoryList && apiKey && matches.length == 0) {
            matchHistoryList.forEach(matchId => {
                console.log(matchId);
                getMatchInfo(region, matchId);
            })
        }
        console.log(matches);
    }, [matchHistoryList])
*/

    useEffect(() => {
        console.log(matches);
    }, [matches])
    
    return (
        <div>
            <p>History</p>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}
export default History