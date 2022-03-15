import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Bem from '@utils/Bem';

import './style.scss';


const bem = new Bem('logItem');

function LogItem({
  message,
  entity,
  onAnimationEnd,
}) {
  return (
    <div className={bem.block()} onAnimationEnd={onAnimationEnd}>
      <span className={bem.element('message')}>
        {message}
      </span>

      <small className={bem.element('info')}>
        #{entity.id} — {new Date(entity.created_at * 1000).toString()}
      </small>
    </div>
  );
}

LogItem.propTypes = {
  message: PropTypes.string.isRequired,
  entity: PropTypes.shape({
    id: PropTypes.number,
    created_at: PropTypes.number,
  }).isRequired,
  onAnimationEnd: PropTypes.func,
};

LogItem.defaultProps = {
  onAnimationEnd: () => { },
}

export default memo(LogItem);
