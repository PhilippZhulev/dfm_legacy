
/** ANCHOR: Стандартные параметры анмации */
const defaultParams = {
  visibility: 'hidden',
  opacity: 0,
  willChange: 'transform, opacity',
};

/** ANCHOR: Стандартные активной параметры анмации */
const activeParams = {
  visibility: 'visible',
  opacity: 1,
  willChange: 'transform, opacity',
};

const animation = {

  /** ANCHOR: slide right */
  slideRight: {
    defaultStyle: {
      transform: 'translateX(200)',
      ...defaultParams,
    },
    animate: {
      entering: {
        transform: 'translateX(-200px)',
        ...defaultParams,
      },
      entered: {
        transform: 'translateX(0)',
        ...activeParams,
      },
      exiting: {
        transform: 'translateX(-200px)',
        ...defaultParams,
      },
      exited: {
        transform: 'translateX(-200px)',
        ...defaultParams,
      },
    },
  },

  /** ANCHOR: zoom */
  zoom: {
    defaultStyle: {
      transform: 'scale(0)',
      width: '100%',
      height: '100%',
      position: 'absolute',
      ...defaultParams,
    },
    animate: {
      entering: {
        transform: 'scale(0)',
        ...defaultParams,
      },
      entered: {
        transform: 'scale(1)',
        ...activeParams,
      },
      exiting: {
        transform: 'scale(1)',
        ...activeParams,
      },
      exited: {
        transform: 'scale(0)',
        ...defaultParams,
      },
    },
  },

  /** ANCHOR: slide left */
  slideLeft: {
    defaultStyle: {
      transform: 'translateX(-200)',
      ...defaultParams,
    },
    animate: {
      entering: {
        transform: 'translateX(200px)',
        ...defaultParams,
      },
      entered: {
        transform: 'translateX(0)',
        ...activeParams,
      },
      exiting: {
        transform: 'translateX(200px)',
        ...defaultParams,
      },
      exited: {
        transform: 'translateX(200px)',
        ...defaultParams,
      },
    },
  },

  /** ANCHOR: slide up */
  slideUp: {
    defaultStyle: {
      transform: 'translateY(200)',
      ...defaultParams,
    },
    animate: {
      entering: {
        transform: 'translateY(-200px)',
        ...defaultParams,
      },
      entered: {
        transform: 'translateY(0)',
        ...activeParams,
      },
      exiting: {
        transform: 'translateY(0)',
        ...defaultParams,
      },
      exited: {
        transform: 'translateY(-200px)',
        ...defaultParams,
      },
    },
  },

  /** ANCHOR: slide down */
  slideDown: {
    defaultStyle: {
      transform: 'translateY(-200)',
      ...defaultParams,
    },
    animate: {
      entering: {
        transform: 'translateY(200px)',
        ...defaultParams,
      },
      entered: {
        transform: 'translateY(0)',
        ...activeParams,
      },
      exiting: {
        transform: 'translateY(0)',
        ...activeParams,
      },
      exited: {
        transform: 'translateY(200px)',
        ...defaultParams,
      },
    },
  },

   /** ANCHOR: slide fade */
  fade: {
    defaultStyle: { ...defaultParams },
    animate: {
      entering: { ...defaultParams },
      entered: { ...activeParams },
      exiting: { ...activeParams },
      exited: { ...defaultParams },
    },
  },
};

export default animation;
