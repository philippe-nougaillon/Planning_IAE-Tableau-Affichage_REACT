import React from "react"
import PropTypes from "prop-types"

const Cours = ({ item }) => {
  const gommette = <span style={{backgroundColor: item.formation_color_json_v2, paddingLeft: 10, marginRight: 15 }}></span>;
  const progressBar = <div className="progress">
    <div className="progress-bar bg-dark"
      style={{ opacity: 0.3, width: item.progress_bar_pct2 + '%' }}>
    </div>
  </div>;

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
      <td><h3>{item.intervenant_json}</h3></td>
      <td><h3>{item.salle_json_v2}</h3></td>
    </tr>
  );
}

Cours.propTypes = {
  item: PropTypes.object
};

export default Cours
