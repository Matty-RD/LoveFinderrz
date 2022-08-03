import { getAllMatchesThunk, updateMatchThunk, deleteMatchesThunk } from "../../store/match";
import { useDispatch, useSelector} from "react-redux";
import { useEffect} from "react";

function MatchesPage() {
    const dispatch = useDispatch();

    const matchesObject = useSelector((state) => state.matches);
    const matches = Object.values(matchesObject);

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

    const deleteButton = (e) => {
      e.preventDefault();
      const id = Number(e.target.id)
      for (const match of matches) {
        if(match.id === id) {
          dispatch(deleteMatchesThunk(match, id));
        }
    }
  }

      return (
        <>
        <div>
        { matches.map(match =>{
        return (
        <div key={match.id} style={{border:'solid'}}>
        <h1>Matches!!</h1>
        <h3>Id for liker: {match.first_userId}</h3>
        <h3>Id for liked: {match.second_userId}</h3>
        <h3>Match Statues: {match.matched.toString()}</h3>
        <button type='submit' id={match.id} onClick={matchButton}>Match?</button>
        <button type='submit' id={match.id} onClick={deleteButton}>Pass?</button>
        </div>
        )})}
        </div>
        </>
      );
    }


  export default MatchesPage;
