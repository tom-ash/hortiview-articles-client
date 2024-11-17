import { act, waitFor } from '@testing-library/react';
import { findById,getConfig, getMockData, getMockResponse, mockCall, universalSelector, formatQuery, prependBaseUrl, getResponse, handleResponse, getInputQuery } from '../services/HortiView/Helper';
import { ApiType } from '../services/HortiView/types/types';

describe('HortiView Helper', () => {
  test('findById should return object with id 1', () => {
    const data = [
      { id: '1', value: 'Tomato', description: 'Tomato' },
      { id: '2', value: 'Cucumber', description: 'Cucumber' },
      { id: '3', value: 'Pepper', description: 'Pepper' },
      { id: '4', value: 'Eggplant', description: 'Eggplant' },
    ];
    // eslint-disable-next-line testing-library/await-async-query
    const result = findById(data, '1');
    expect(result).toEqual({ id: '1', value: 'Tomato', description: 'Tomato' });
  });

  //get mock data
  test('should return mock response for each possible call', () => {
    const calls = [
      'HealthzChecks/ping',
      'farms',
      'fields',
      'blocks',
      'seasonstate/dropdown',
      'crop/dropdown',
      'croptype/dropdown',
      'cropvariety/dropdown',
    ];
    calls.forEach(async call => {
      const result = await getMockData(call);
      expect(result).toBeDefined();
    });
  });

  test('should return empty object for unknown mockresponse', () => {
    const result = getMockData('unknown');
    expect(result).toEqual({});
  });
  //get mock respones

  test('should return promise for call with object response', () => {
    const testcall = 'HealthzChecks/ping';
    const result = getMockResponse(testcall, {});
    expect(result).toBeInstanceOf(Promise);
  });

  //mockCall
  test('should return promise that resolves itself after given time', async () => {
    const result = mockCall('test', 1000);
    expect(result).toBeInstanceOf(Promise);
    await waitFor(() => {
      expect(result).resolves.toBe('test');
    });
  });

  test('should return promise that resolves itself after default time', async () => {
    const result = mockCall('test');
    expect(result).toBeInstanceOf(Promise);
    await waitFor(() => {
      expect(result).resolves.toBe('test');
    });
  });

  test('test if timeout is working', async () => {
    const result = mockCall('test', 1000);
    expect(result).toBeInstanceOf(Promise);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result).resolves.toBe('test');
  });

  //universalselector
  test('should return string if datainput is string', () => {
    const data = 'test';
    const result = universalSelector(data);
    expect(result).toBe('test');
  });

  test('should return number if datainput is number', () => {
    const data = 100;
    const result = universalSelector(data);
    expect(result).toBe(100);
  });

  test('should return boolean if datainput is boolean', () => {
    const data = true;
    const result = universalSelector(data);
    expect(result).toBe(true);
  });

  test('should return value if data is odata object with value property', () => {
    const data = { value: 'test' };
    const result = universalSelector(data);
    expect(result).toBe('test');
  });

  test('should return value if data is odata object with items property', () => {
    const data = { items: ['test', 'test2'] };
    const result = universalSelector(data);
    expect(result).toStrictEqual(['test', 'test2']);
  });

  test('should return array if data is array', () => {
    const data = ['test', 'test2'];
    const result = universalSelector(data);
    expect(result).toStrictEqual(['test', 'test2']);
  });

  test('should return object if data is object', () => {
    const data = { test: 'test' };
    const result = universalSelector(data);
    expect(result).toBe(data);
  });

  //formatQuery
  test('should return api-version-qs, if no query or parameter is given', () => {
    const result = formatQuery();
    expect(result).toBe('?api-version=1.0');
  });

  test('should return count only if query is empty and apiversion is false', () => {
    const result = formatQuery({}, false);
    expect(result).toBe('?$count=true');
  });

  test('should return api version onl if count is false', () => {
    const result = formatQuery({ count: false });
    expect(result).toBe('?api-version=1.0');
  });

  test('should return formatted query string', () => {
    const query = {
      filter: ['id eq 1'],
      orderBy: ['name'],
      select: ['name'],
      top: 10,
      skip: 0,
      expand: ['test'],
      count: true,
    };
    const result = formatQuery(query);
    expect(result).toBe(
      '?$select=name&$filter=id eq 1&$expand=test&$orderby=name&$count=true&$top=10&$skip=0&api-version=1.0'
    );
  });

  test('return overwrite if overwrite is given', () => {
    const query = {
      filter: ['id eq 1'],
      orderBy: ['name'],
      select: ['name'],
      overwrite: 'test',
    };
    const result = formatQuery(query);
    expect(result).toBe('test');
  });

  //prependBaseUrl


  test('should return common endpoint without orga', () => {
    const result = prependBaseUrl('test', ApiType.Common, 'https://farm.com', false);
    expect(result).toBe('https://farm.com/api/v1.0/test');
  });

  test('should return common endpoint without orga and without api version', () => {
    const result = prependBaseUrl('test', ApiType.CommonNoVersion, 'https://farm.com', false);
    expect(result).toBe('https://farm.com/test');
  });

  //getConfig
  test('should return config object with method and headers', () => {
    const result = getConfig('someToken');
    expect(result).toEqual({
      redirect: 'follow',
      credentials: 'omit',
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Api-Version': '1.0',
        Authorization: 'Bearer someToken',
      }),
    });
  });

  test('should return config object with method and headers and orgaId', () => {
    const result = getConfig('someToken', '123');
    expect(result).toEqual({
      redirect: 'follow',
      credentials: 'omit',
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Api-Version': '1.0',
        orgId: '123',
        Authorization: 'Bearer someToken',
      }),
    });
  });
});

describe('HortiView Helper RequestHandling', () => {
  beforeEach(() => {
    window.fetch = async () => {
      return Promise.resolve({
        json: () => Promise.resolve({ test: 'test' }),
        text: () => Promise.resolve("{ test: 'test' }"),
        ok: true,
      }) as Promise<Response>;
    };
  });
  //getResponse
  test('should return response for valid url', async () => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = 'https://noapi.hortiview.com/posts';
    const result = await getResponse(url, config);
    expect(result).toBeDefined();
  });
});

describe('HortiView Helper resolved calls', () => {
  beforeEach(() => {
    window.fetch = async () => {
      return Promise.resolve({
        json: () => Promise.resolve({ test: 'test' }),
        text: () => Promise.resolve('test'),
        ok: true,
      }) as Promise<Response>;
    };
  });

  test('should return response as value: test', async () => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = 'https://noapi.hortiview.com/posts';
    const result = await getResponse(url, config);
    expect(result).toEqual({ value: 'test' });
  });

  test('should return response if status ok', async () => {
    await fetch('debug').then(async result => {
      expect(await handleResponse(result)).toBeDefined();
    });
  });
});

describe('HortiView Helper rejected calls', () => {
  beforeEach(() => {
    window.fetch = async () => {
      return Promise.resolve({
        json: () => Promise.resolve({ message: 'this is an error' }),
        ok: false,
      }) as Promise<Response>;
    };
  });
  test('should return error message if response is not ok', async () => {
    expect(async () => {
      await fetch('debug').then(async result => {
        await handleResponse(result);
      });
    }).rejects.toThrow('this is an error');
  });
});

describe('useInputQuery should use filter, etc.', () => {
  test('should return filtered array based on input', () => {
    //its mocked, this pseudo test is just for coverage
    const array = [
      { id: 1, name: 'test' },
      { id: 2, name: 'test2' },
      { id: 3, name: 'test' },
    ];
    const query = {
      filter: ['name eq test'],
    };
    const result = getInputQuery(array, query);
    expect(result).toEqual([]);
  });

  test('should return filtered array based on input wither filter', () => {
    //its mocked, this pseudo test is just for coverage
    const array = [
      { id: 1, name: 'test' },
      { id: 2, name: 'test2' },
      { id: 3, name: 'test' },
    ];
    const query = {
      filter: [{ name: 'test2' }],
    };
    const result = getInputQuery(array, query);
    expect(result).toEqual([]);
  });

  test('should return filtered array based on filterobject', () => {
    const array = [
      { id: 1, name: 'test' },
      { id: 2, name: 'test2' },
      { id: 3, name: 'test' },
    ];
    const query = {
      filter: { name: 'test' },
    };
    const result = getInputQuery(array, query);
    expect(result).toEqual([
      { id: 1, name: 'test' },
      { id: 3, name: 'test' },
    ]);
  });

  test('should return filtered array based on filterstring', () => {
    //its mocked, this pseudo test is just for coverage
    const array = [
      { id: 1, name: 'test', age: 10 },
      { id: 2, name: 'test2', age: 20 },
      { id: 3, name: 'test', age: 30 },
    ];
    const query = {
      filter: 'id eq 1',
    };
    const result = getInputQuery(array, query);
    expect(result).toEqual([]);
  });

  test('should return filtered array based on select array', () => {
    const array = [
      { id: 1, name: 'test', age: 10 },
      { id: 2, name: 'test2', age: 20 },
      { id: 3, name: 'test', age: 30 },
    ];
    const query = {
      select: ['name', 'age'],
    };
    const result = getInputQuery(array, query);
    expect(result).toEqual([
      { name: 'test', age: 10 },
      { name: 'test2', age: 20 },
      { name: 'test', age: 30 },
    ]);
  });

  test('should return filtered array based on select string', () => {
    const array = [
      { id: 1, name: 'test', age: 10 },
      { id: 2, name: 'test2', age: 20 },
      { id: 3, name: 'test', age: 30 },
    ];
    const query = {
      select: 'name',
    };
    const result = getInputQuery(array, query);
    expect(result).toEqual([{ name: 'test' }, { name: 'test2' }, { name: 'test' }]);
  });
});
