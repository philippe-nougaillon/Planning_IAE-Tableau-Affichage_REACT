import React, { useState, useReducer, useRef, useEffect } from 'react';
import ListeCours from './Liste_Cours';

const API_ENDPOINT = "https://planning.iae-paris.com/api/v2/cours?d="

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const Planning = () => {

  const per_page = 7; // nombre de lignes par page
  const time_to_sleep = 10; // pause entre deux pages (en secondes)
  const [currentPage, setCurrentPage] = useState(-1); 
  const [currentTick, setCurrentTick] = useState(time_to_sleep);
  const [paginatedPlanning, setPaginatedPlanning] = useState(new Array());

  const planningReducer = (state, action) => {
    switch (action.type) {
      case 'PLANNING_FETCH_INIT':
        return{
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'PLANNING_FETCH_SUCCESS':
        return{
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
          totalPages: Math.trunc(action.payload.length / per_page),
        };
      case 'PLANNING_FETCH_FAILURE':
        return{
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  };

  const [planning, dispatchPlanning] = useReducer(
    planningReducer,
    { data: [], isLoading: false, isError: false, totalPages: 0 }
  );

  const fetchPlanning = () => {
    dispatchPlanning({ type: 'PLANNING_FETCH_INIT' });

    const today = new Date().toISOString().slice(0, 10);

    fetch(`${ API_ENDPOINT }${ today }`)
      .then((response) => response.json())
      .then((result) => {
        dispatchPlanning({
          type: 'PLANNING_FETCH_SUCCESS',
          payload: result,
        });
      })
      .catch(() => 
        dispatchPlanning({ type: 'PLANNING_FETCH_FAILURE' })
      );
  };

  useEffect(() => {
    fetchPlanning();
  }, []);

  useEffect(() => {
    // Pagine la liste des cours par tranche de 'per_page'
    const item_position = per_page * currentPage;
    setPaginatedPlanning(planning.data.slice(item_position, item_position + per_page))
    console.log(`data.length: ${ planning.data.length } | pages: ${ planning.data.length / per_page } | currentPage: ${ currentPage } | slice start: ${ item_position } | slice end: ${ item_position + per_page }`);
  }, [currentPage]);

  useInterval(() => {
    // Décompte les secondes avant le changement de page
    if (currentTick > 0) {
      setCurrentTick(currentTick - 1); 
    }
    //console.log(currentTick);
  }, 1000);

  useInterval(() => {
    // Changer de page à l'expiration du délai et recharger si première page
    if (currentPage < planning.totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      //console.log("Fetching Planning...")
      fetchPlanning();
      setCurrentPage(0);
    }
    setCurrentTick(time_to_sleep);
  }, time_to_sleep * 1000);

  return (
    <div>
      { planning.isLoading 
        ? (<h1>Chargement des données...</h1>) 
        : (<ListeCours items={ paginatedPlanning } />)
      }
      <div class="row">
        <div class="col">
          <h4>{ Date() }</h4>
        </div>
        <div class="col-sm-2">
          <h4>
            { `Page : ${ currentPage + 1} / ${ planning.totalPages + 1 }` }
          </h4>
        </div>        
        <div class="col-sm-2">
          <h4>
            <div class="progress">
              <div className="progress-bar bg-warning"
                style={{ opacity: 0.5, width: (currentTick * 10) + '%' }}>
              </div>
            </div>
          </h4>
        </div>
      </div>

    </div>
  );
};

export default Planning;