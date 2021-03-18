// Зависимости
import React from 'react';
import PropTypes from 'prop-types';
import StarFavorited from '../../svg/StarFavorited';
import StarUnFavorited from '../../svg/StarUnFavorited';

// eslint-disable-next-line react/display-name
const Favorite = React.forwardRef((props, ref) => {
  const { isFavorite, onFavorite } = props;
  // Представление
  return (
    <div data-testid='favorite' onClick={(e) => onFavorite(e, !isFavorite)}>
      {isFavorite ? (
        <StarFavorited />
      ) : (
        <StarUnFavorited />
      )}
    </div>
  );
});

// Типы props
Favorite.propTypes = {
  isFavorite: PropTypes.bool,
  onFavorite: PropTypes.func,
};

Favorite.defaultProps = {
  isFavorite: false,
  onFavorite: null,
};

export default Favorite;
