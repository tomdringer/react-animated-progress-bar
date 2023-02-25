export class delay {
  constructor(time) {
    this.time = time;
    this.timeout = null;
    this.close = null;
  }

  getPromise() {
    return new Promise((resolve, reject) => {
      this.close = reject;
      this.timeout = setTimeout(() => {
        resolve();
      }, this.time);
    });
  }
  cancel() {
    this.timeout && clearTimeout(this.timeout);
    this.close && this.close();
    return { isCanceled: true };
  }
}

export const contentInView = element => {
  const scroll = window.scrollY || window.pageYOffset;
  const elementPositionProps = element.getBoundingClientRect();
  const elementTopPosition = elementPositionProps.top + scroll;

  const viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight,
  };

  const elementPosition = {
    top: Math.floor(elementTopPosition),
    bottom: Math.floor(elementTopPosition + elementPositionProps.height),
  };

  return (
    (elementPosition.bottom >= viewport.top &&
      elementPosition.bottom <= viewport.bottom) ||
    (elementPosition.top <= viewport.bottom &&
      elementPosition.top >= viewport.top)
  );
};

export const sanitizePercentage = percent => {
  let percentage = Number(percent);
  if (percentage < 0) percentage = 0;
  if (percentage > 100) percentage = 100;

  return percentage;
};

export const getPercentLevel = percentage => {
  let level = 252 - sanitizePercentage(percentage) * 2.52;
  return `${level}%`;
};

export const getColorType = (percentage, defColor) => {
  const percent = sanitizePercentage(percentage);
  const poor = (defColor && defColor.poor) || '#F32013';
  const fair = (defColor && defColor.fair) || '#ff6700';
  const good = (defColor && defColor.good) || 'rgb(255, 217, 0)';
  const excellent = (defColor && defColor.excellent) || '#48AE2C';

  const res =
    (percent =< 10 && poor) ||
    (percent =< 25 && fair) ||
    (percent =< 50 && good) ||
    excellent;
  return res;
};

export const getNumber = str => {
  const arr = str.split('');
  let res = '';
  for (let i = 0; i < arr.length; i++) {
    if (isNaN(Number(arr[i]))) break;
    res += arr[i];
  }
  return res;
};

export const getRadius = raw => {
  const width = Number(getNumber(raw));
  if (width < 20 || isNaN(width)) return 250;
  const radius = raw.trim().slice(-1) === '%' ? width / 2 + '%' : width / 2;
  return radius;
};

export const propTypeValidation = {
  width: (props, propName) => {
    if (!props[propName] || typeof props[propName] != 'string')
      return new Error(
        `Invalid ${propName} supplied to the progress bar component. Please provide a width!`
      );
  },
  percentage: (props, propName) => {
    if (
      !props[propName] ||
      (props[propName] && typeof props[propName] != 'string')
    )
      return new Error(
        `Invalid ${propName} supplied to progress bar component. Please provide a percentage value!`
      );
  },
  height: (props, propName) => {
    if (
      props['rect'] &&
      (!props[propName] ||
        (props[propName] && typeof props[propName] != 'string'))
    )
      return new Error(
        `Invalid ${propName} supplied to progress bar component. Please provide a height!`
      );
  },
  rectPadding: (props, propName) => {
    if (
      props['rect'] &&
      (!props['height'] || typeof props['height'] != 'string')
    )
      return new Error(
        `Invalid information supplied to progress bar component. Please provide a height before you provide this ${propName}!`
      );
  },
  trackBorderColor: (props, propName) => {
    if (props[propName] && typeof props[propName] != 'string')
      return new Error(
        `Invalid ${propName} supplied to progress bar component!`
      );
  },
  fontColor: (props, propName) => {
    if (props[propName] && typeof props[propName] != 'string')
      return new Error(
        `Invalid ${propName} supplied to progress bar component!`
      );
  },
  rectBorderRadius: (props, propName) => {
    if (props[propName] && typeof props[propName] != 'string')
      return new Error(
        `Invalid ${propName} supplied to progress bar component!`
      );
  },
  trackPathColor: (props, propName) => {
    if (props[propName] && typeof props[propName] != 'string')
      return new Error(
        `Invalid ${propName} supplied to progress bar component!`
      );
  },
  hollowBackgroundColor: (props, propName) => {
    if (props[propName] && typeof props[propName] != 'string')
      return new Error(
        `Invalid ${propName} supplied to progress bar component!`
      );
  },
  scrollArea: (props, propName) => {
    if (props[propName] && typeof props[propName] != 'object')
      return new Error(
        `Invalid ${propName} supplied to progress bar component!`
      );
  },
  defColor: (props, propName) => {
    if (props[propName] && typeof props[propName] == 'object') {
      const arr = Object.keys(props[propName]);
      for (let i = 0; i < arr.length; i++) {
        if (typeof props[propName][arr[i]] != 'string')
          return new Error(
            `Invalid  property Key ${arr[i]} for ${propName} supplied to progress bar component!`
          );
      }
    } else if (props[propName] && typeof props[propName] !== 'object')
      return new Error(
        `Invalid ${propName} supplied to progress bar component!`
      );
  },
};
