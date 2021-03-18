import { useMemo } from 'react';
import MoneyFormat from './MoneyFormat';

const useValueFormat = (object, p) =>
  useMemo(() => {
    const handler = {
      get: (target, prop) => {
        if (prop[0] === '_' && prop[1] === '$') {
          return String(target[prop.slice(2)]).replace(
            /(\d)(?=(\d\d\d)+([^\d]|$))/g,
            '$1 '
          );
        }

        if (prop[0] === '$') {
          return MoneyFormat(target[prop.slice(1)], p);
        }

        return target[prop];
      },
    };

    return new Proxy(object, handler);
  }, [object]);

export default useValueFormat;
