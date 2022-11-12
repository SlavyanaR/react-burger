import PropTypes from "prop-types";

 const TypesCategory = {
  cards: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  refer: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  headerKey: PropTypes.string.isRequired
}
export const itemTypesCategory = PropTypes.shape(TypesCategory).isRequired;

const TypesCard = {
  card: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}
export const itemTypesCard = PropTypes.shape(TypesCard).isRequired;

const TypesingredientItem = {
  element: PropTypes.object.isRequired,
}
export const itemTypesingredientItem = PropTypes.shape(TypesingredientItem).isRequired;

const TypesLayer = {
  prod: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleDrag: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired
}
export const itemTypesLayer = PropTypes.shape(TypesLayer).isRequired;

const TypesModal = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}
export const itemTypesModal = PropTypes.shape(TypesModal).isRequired;

const TypesModalOverlay = {
  onClick: PropTypes.func.isRequired,
}
export const itemTypesModalOverlay = PropTypes.shape(TypesModalOverlay).isRequired;

const TypesOrderDetails = {
  number: PropTypes.string.isRequired,
}
export const itemTypesOrderDetails = PropTypes.shape(TypesOrderDetails).isRequired;
