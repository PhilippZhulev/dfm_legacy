import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';

/**
 * AppBar
 * @component
 * @public
 */
function LazyRender({ children, container, height, offset, recalc, width }) {
  const element = useRef(null);
  const activeElement = useRef(null);
  const [ready, setReady] = useState(false);

  /** ANCHOR: Регистрация события скрола */
  useEffect(() => {
    if (container && container.current) {
      container.current.scrollerElement.addEventListener('scroll', scroller);
      scroller();
    }
    return () => {
      if (container && container.current) {
        container.current.scrollerElement.removeEventListener(
          'scroll',
          scroller
        );
      }
    };
  }, [recalc]);

  /**
   * ANCHOR: Сравнение при скроле
   * @public
   */
  const scroller = () => {
    const { scrollTop } = container.current.getScrollState(true);
    const renderScroll = scrollTop + (window.screen.height - offset);

    if (element.current && renderScroll >= element.current.offsetTop - 50) {
      setReady(true);
    } else if (
      activeElement.current &&
      renderScroll < activeElement.current.offsetTop - 50
    ) {
      setReady(false);
    }
  };

  return (
    <>
      {ready ? (
        <Grow in={ready}>
          <div data-testid='withGrow' ref={activeElement}>
            {children}
          </div>
        </Grow>
      ) : (
        <div
          data-testid='withoutGrow'
          style={{ height, width }}
          ref={element}></div>
      )}
    </>
  );
}

LazyRender.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  container: PropTypes.object,
  height: PropTypes.number,
  offset: PropTypes.number,
  recalc: PropTypes.string,
  width: PropTypes.number,
};

export default LazyRender;
