import PropTypes from "prop-types";

const ingredientTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,

}

export const ingredientItemTypes = PropTypes.shape(ingredientTypes).isRequired;
