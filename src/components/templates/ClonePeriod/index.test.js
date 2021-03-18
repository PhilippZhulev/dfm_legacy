import { TestWrapper } from 'helpers';
import React from 'react';
import { render } from '@testing-library/react';
import { model } from './model.mock';
import ClonePeriodComponent from '.';
import ClonePeriod from './logic';

const Component = (props) => (
  <TestWrapper>
    <ClonePeriodComponent {...props} />
  </TestWrapper>
);

jest.useFakeTimers();

const cp = new ClonePeriod();

it('Check SetPresently value', () => {
  const data = {
    periods: [
      {
        id: 56,
        label: '2019',
        type: 'Y',
        year: 2019,
      },
      {
        id: 57,
        label: '2020',
        type: 'Y',
        year: 2020,
      },
    ],
    period: 56,
  };

  cp.SetPresently = data;
  expect(cp.period.id).toBe(56);
  expect(cp.GetPresently.id).toBe(56);
});

it('Check CreaatepopoverItems value', () => {
  const periods = [
    {
      id: 56,
      label: '2019',
      type: 'Y',
      year: 2019,
    },
    {
      id: 57,
      label: '2020',
      type: 'Y',
      year: 2020,
    },
  ];

  const fn = (period) => {
    cp.SetPresently = { periods, period };
    return cp.CreaateItems({ periods, period }, (label, id) => ({
      label,
      id,
    }));
  };

  expect(fn(56)[0]).toBe(null);
  expect(fn(56)[1].id).toBe(57);
  expect(fn(56)[1].label).toBe('2020');
  expect(fn(57)[0].id).toBe(56);
  expect(fn(57)[0].label).toBe('2019');
  expect(fn(57)[1]).toBe(null);
});

it('Check CreaatepopoverItems no periods', () => {
  const fn = (period) =>
    cp.CreaateItems(
      { periods: [], period },
      (id) => id,
      () => 'none'
    );

  expect(fn(56)).toBe('none');
});

it('Check ComponentState active state', () => {
  const data = {
    periods: [
      {
        id: 56,
        label: '2019',
        type: 'Y',
        year: 2019,
      },
      {
        id: 57,
        label: '2020',
        type: 'Y',
        year: 2020,
      },
    ],
    period: 56,
    locked: true,
  };

  cp.SetPresently = data;
  expect(cp.ComponentState(data)).toBe(false);
});

it('Check ComponentState no active state', () => {
  const data1 = {
    periods: [
      {
        id: 56,
        label: '2019',
        type: 'Y',
        year: 2019,
      },
    ],
    period: 56,
    locked: true,
  };
  const data2 = {
    periods: [
      {
        id: 56,
        label: '2019',
        type: 'Y',
        year: 2019,
      },
      {
        id: 57,
        label: 'Март',
        type: 'M',
        year: 'Январь',
      },
    ],
    period: 56,
    locked: true,
  };
  const data3 = {
    periods: [],
    period: 56,
    locked: true,
  };

  cp.SetPresently = data1;
  expect(cp.ComponentState(data1)).toBe(true);

  cp.SetPresently = data2;
  expect(cp.ComponentState(data2)).toBe(true);

  cp.SetPresently = data3;
  expect(cp.ComponentState(data3)).toBe(true);
});

it('Check ComponentState edit', () => {
  const data = {
    periods: [
      {
        id: 56,
        label: '2019',
        type: 'Y',
        year: 2019,
      },
      {
        id: 57,
        label: '2020',
        type: 'Y',
        year: 2020,
      },
    ],
    period: 56,
  };

  cp.SetPresently = data;
  expect(cp.ComponentState({ ...data, locked: false })).toBe(true);
  expect(cp.ComponentState({ ...data, locked: true })).toBe(false);
});

it('Check CloneData', () => {
  cp.SetPresently = { periods: model.data.model.periodDictionary, period: 14 };
  cp.SetModel = model.data.model;
  const clone = cp.CloneData(57, 'node1', () => 'completed');
  expect(clone).toBe('completed');
  expect(model.data.model.resources[1].budcycles[1].fixed[0].price).toBe(110.0);
});

it('Check Component', () => {
  const container = render(
    <Component
      onCompleted={() => {}}
      locked={false}
      period={57}
      model={model.data.model}
      periods={model.data.model.periodDictionary}
    />
  );
  expect(container.queryByTestId('root').className).toMatch('root');
  expect(container.queryByTestId('wrap').className).toMatch('buttonWrapper');
  expect(container.queryByTestId('text').className).toMatch('text');
});
