import { getAllMatchesThunk, deleteMatchesThunk } from "../../store/match";
import { useDispatch, useSelector} from "react-redux";
import { useEffect} from "react";
import { NavLink } from 'react-router-dom';
import './matchPage.css'

function MatchedPage() {
    const dispatch = useDispatch();
    // const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const matchesObject = useSelector((state) => state.matches);
    const matches = Object.values(matchesObject);
    const usersMatches = matches.filter(match => (match.second_userId === sessionUser.id || match.first_userId === sessionUser.id) && match.matched === true)

    useEffect(() => {
        dispatch(getAllMatchesThunk());
      }, [dispatch]);

    const deleteM = (e) => {
      e.preventDefault();
      const matchId = Number(e.target.id);
      dispatch(deleteMatchesThunk(matchId))
    }

    if(usersMatches.length === 0) {
      return (
        <div className="noMatches">
          <h2>Sorry, you currently have no Matches.</h2>
          <h3>Probably because you are so awesome its intimidating.</h3>
          <p>Try showing off something interesting about yourself it is the best way to get someone interested!</p>
        </div>
      )
    } else if(matches.length > 0) {
      return (
        <>
        <div>
          <h1>List of Matched Users!</h1>
          <p>Feel free to view their page by clicking their name!</p>
        {usersMatches.map(filteredMatch  =>{
          if(sessionUser.id === filteredMatch.second_userId) {
          return (
            <div key={filteredMatch.id} className="matchPage">
            <h1><NavLink to={`/users/${filteredMatch.id}`}>{filteredMatch.liker.username}</NavLink></h1>
            <img alt='' className="profilepicture" src={filteredMatch.liker.profile_pic}/>
            <div className="buttonDiv">
            <button type='submit' id={filteredMatch.id} onClick={deleteM}>Unmatch</button>
            </div>
            </div>
            )
      } else if (sessionUser.id === filteredMatch.first_userId) {
        return (
          <div key={filteredMatch.id} className="matchPage">
          <h1><NavLink to={`/users/${filteredMatch.id}`}>{filteredMatch.liked.username}</NavLink></h1>
          <img alt='' className="profilepicture" src={filteredMatch.liked.profile_pic}/>
          <div className="buttonDiv">
          <button type='submit' id={filteredMatch.id} onClick={deleteM}>Unmatch</button>
          </div>
          </div>
          )
      }
      })}
        </div>
        </>
      );
    }
  }


  export default MatchedPage;
