import React from "react"
import PropTypes from "prop-types"
import Cours from "./Cours";

const ListeCours  = ({ items }) => {

  const List = ({ items }) => (
    <table className="table table-striped">
      <tbody>
      { items.map((item) => (
          <Cours key={ item.id } item={ item } />
        ))
      }
      </tbody>
    </table>
  );

  return (
    <React.Fragment>
      <List items={ items } />
    </React.Fragment>
  );
};

ListeCours.propTypes = {
  items: PropTypes.array
};

export default ListeCours