import React from "react"
import PropTypes from "prop-types"

const Cours = ({ item }) => {
  const progressBar = <div className="progress">
    <div className="progress-bar bg-dark"
      style={{ opacity: 0.3, width: item.progress_bar_pct2 + '%' }}>
    </div>
  </div>;
  
  const gommette = <span style={{backgroundColor: item.formation_color_json_v2, paddingLeft: 10, marginRight: 15 }}></span>;
    
  const badgeSalle = <span className={item.etat === "confirmé" ? 'btn btn-lg btn-success' : 'btn btn-lg btn-danger'}>
    <h3>{item.salle_json_v2}</h3>
  </span>;

  return (
    <tr>
      <td>
        <h3>
          {item.debut_fin_json_v2}
          {progressBar}
        </h3>
      </td>
      <td>
        <h3 className="text-primary">
          {gommette}
          {item.formation_json_v2}
          <br />
          {gommette}
          {item.matiere_json}
        </h3>
      </td>
      <td>
        <h3>
          {item.intervenant_json}
          { item.intervenant_binome_json &&
            <span>
              <br />
              {item.intervenant_binome_json}
            </span>
          }
        </h3>
      </td>
      <td className="align-middle" style={{width: 170}}>
        <div style={{whiteSpace: "nowrap"}}>
          {badgeSalle}
        </div>
      </td>
    </tr>
  );
}

Cours.propTypes = {
  item: PropTypes.object
};

export default Cours
