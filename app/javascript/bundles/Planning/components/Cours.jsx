import React from "react"
import PropTypes from "prop-types"

const Cours = ({ item }) => {
  return (
    <tr>
      <td><h3>{ item.debut_fin_json_v2 }</h3></td>
      <td><h3>{ item.formation_json_v2 }</h3></td>
      <td><h3>{ item.intervenant_json }</h3></td>
      <td><h3>{ item.salle_json_v2 }</h3></td>
    </tr>
  );
}

Cours.propTypes = {
  item: PropTypes.object
};

export default Cours
