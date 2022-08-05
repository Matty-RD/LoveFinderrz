import { getAllMatchesThunk, updateMatchThunk, deleteMatchesThunk } from "../../store/match";
import { useDispatch, useSelector} from "react-redux";
import { useEffect} from "react";
import './matchPage.css'

function MatchesPage() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const matchesObject = useSelector((state) => state.matches);
    const matches = Object.values(matchesObject);
    const usersMatches = matches.filter(match => match.second_userId === sessionUser.id)

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


    const deleteM = async (e) => {
      e.preventDefault();
      const id = e.target.id;
      dispatch(deleteMatchesThunk(id))
      await window.location.reload(false);
    }

    if(usersMatches.length === 0) {
      return (
        <div className="noMatches">
          <h1>Sorry, no matches.</h1>
          <img alt='' src={'https://c.tenor.com/B9OjyPMq5pIAAAAC/fine-this-is-fine.gif'}/>
          <h2>Maybe try making some new posts!</h2>
        </div>
      )
    } else if(matches.length > 0) {
      return (
        <>
        <div>
        {usersMatches.map(filteredMatch  =>{
          return (
            <div key={filteredMatch.id} className="matchPage">
            <h1>Matches!!</h1>
            <h3>You are liked by: {filteredMatch.liker.username}</h3>
            <img alt='' className="profilepicture" src={filteredMatch.liker.profile_pic}/>
            <h3>Match Statues: {filteredMatch.matched.toString()}</h3>
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
