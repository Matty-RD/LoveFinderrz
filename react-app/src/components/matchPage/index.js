import { getAllMatchesThunk, updateMatchThunk, deleteMatchesThunk } from "../../store/match";
import { useDispatch, useSelector} from "react-redux";
import { useEffect} from "react";
import { NavLink } from 'react-router-dom';
import './matchPage.css'

function MatchesPage() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const matchesObject = useSelector((state) => state.matches);
    const matches = Object.values(matchesObject);
    const usersMatches = matches.filter(match => match.second_userId === sessionUser.id && match.matched === false)

    useEffect(() => {
        dispatch(getAllMatchesThunk());
      }, [dispatch]);

    const matchButton = (e) => {
      e.preventDefault();
      const id = e.target.id
      const matched = true;
      const updateMatch = {
        matched,
      };
      dispatch(updateMatchThunk(updateMatch, id));
    }


    const deleteM = (e) => {
      e.preventDefault();
      const matchId = Number(e.target.id);
      dispatch(deleteMatchesThunk(matchId))
    }


    if(usersMatches.length === 0) {
      return (
        <div className="noMatches">
          <h1>Sorry, no matches.</h1>
          <img alt='' src={'https://c.tenor.com/B9OjyPMq5pIAAAAC/fine-this-is-fine.gif'}/>
          <h2>Maybe try making some new posts!</h2>
        </div>
      )
    } else if(usersMatches.length > 0) {
      return (
        <>
        <div>
          <h1>Admires you recieved!</h1>
          <p>Feel free to view their page by clicking their name!</p>
        {usersMatches.map(filteredMatch  =>{
          return (
            <div key={filteredMatch.id} className="matchPage">
            <h1><NavLink to={`/users/${filteredMatch.first_userId}`}>{filteredMatch.liker.username}</NavLink></h1>
            <img alt='' className="profilepicture" src={filteredMatch.liker.profile_pic} onError={(e)=>{e.target.onerror = null; e.target.src="https://i.imgur.com/PiuLhut.png"}}/>
            <div className="buttonDiv">
            <button type='submit' id={filteredMatch.id} onClick={matchButton}>Match?</button>
            <button type='submit' id={filteredMatch.id} onClick={deleteM}>Pass?</button>
            </div>
            </div>
            )
      })}
        </div>
        </>
      );
    }
  }


  export default MatchesPage;
