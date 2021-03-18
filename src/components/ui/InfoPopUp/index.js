// Зависимости
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ToggleLayer } from 'react-laag';
import ResizeObserver from 'resize-observer-polyfill';
import { AnimatePresence } from 'framer-motion';

/**
 * Всплывашка
 * @component
 * @public
 */
function InfoPopUp({
  classes,
  top,
  children,
  hover,
  content,
  fixed,
  childWrapperWidth,
  right,
}) {
  // Получить classes
  const styles = useStyles({ classes });

  const preferX = right ? 'RIGHT' : 'LEFT';

  return (
    <ToggleLayer
      fixed={fixed}
      closeOnOutsideClick
      closeOnDisappear='partial'
      placement={{
        anchor: top ? 'TOP_CENTER' : `${preferX}_CENTER`,
        autoAdjust: true,
        snapToAnchor: false,
        triggerOffset: 12,
        scrollOffset: 16,
        preferX: preferX,
      }}
      ResizeObserver={ResizeObserver}
      container={() => document.querySelector('body')}
      renderLayer={({ layerProps, arrowStyle, isOpen }) =>
        isOpen && (
          <AnimatePresence>
            <div
              data-testid='animatePresenceInner'
              ref={layerProps.ref}
              style={{ ...layerProps.style }}
              className={styles.root}>
              <div
                data-testid='animatePresenceInnerPrefix'
                style={arrowStyle}
                className={styles.prefix}>
                <div
                  data-testid='animatePresenceInnerPrefixInner'
                  className={styles.prefixInner}
                />
                <div
                  data-testid='animatePresenceInnerPrefixInnerBox'
                  className={styles.prefixInnerBox}
                />
              </div>

              <div
                data-testid='animatePresenceInnerContent'
                className={styles.inner}>
                <div>{content}</div>
              </div>
            </div>
          </AnimatePresence>
        )
      }>
      {({ toggle, triggerRef }) => (
        <div
          data-testid='toggler'
          ref={triggerRef}
          onMouseEnter={hover ? toggle : () => {}}
          onMouseLeave={hover ? toggle : () => {}}
          style={{ width: childWrapperWidth }}
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}>
          {children}
        </div>
      )}
    </ToggleLayer>
  );
}

InfoPopUp.defaultProps = { fixed: false, right: true, top: false };

// Приватные стили
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.colorsTheme.layer,
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.5)',
    width: 'fit-content',
    zIndex: 900,
    borderRadius: 4,
  },
  inner: {
    padding: 15,
    '& .linkButtonHr': {
      background: theme.colorsTheme.hrBackgroundDefault,
      border: '0px none',
      height: 1,
      margin: 0,
      padding: 0,
    },
  },
  prefix: {
    width: 2,
    height: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  prefixInner: {
    width: 12,
    height: 12,
    transform: 'rotate(45deg)',
    position: 'absolute',
    margin: 'auto',
    backgroundColor: theme.colorsTheme.layer,
  },
  prefixInnerBox: {
    width: 12,
    height: 12,
    left: -3,
    transform: 'rotate(45deg)',
    position: 'absolute',
    margin: 'auto',
    backgroundColor: theme.colorsTheme.layer,
  },
  shareAppId: {
    textAlign: 'center',
    color: '#183C58',
    fontSize: 14,
    fontWeight: 400,
    marginTop: 20,
  },
  urlLink: {
    fontSize: 14,
    color: '#2C87C0',
    fontWeight: 300,
    textDecoration: 'underline',
    textAlign: 'center',
    marginTop: 20,
    cursor: 'pointer',
    zIndex: 90,
  },
  urlUnLink: {
    fontSize: 14,
    color: '#b9bcc0',
    fontWeight: 300,
    textAlign: 'center',
    marginTop: 20,
    zIndex: 90,
  },
}));

export default InfoPopUp;
