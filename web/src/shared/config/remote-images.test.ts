import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getRemoteImagePatterns, parseRemoteImageHostnames } from './remote-images.js';

describe('parseRemoteImageHostnames', () => {
  it('splits comma-separated hostnames', () => {
    assert.deepEqual(parseRemoteImageHostnames('localhost, raw.githubusercontent.com'), [
      'localhost',
      'raw.githubusercontent.com',
    ]);
  });

  it('returns empty array for undefined', () => {
    assert.deepEqual(parseRemoteImageHostnames(undefined), []);
  });
});

describe('getRemoteImagePatterns', () => {
  it('generates http and https patterns per hostname', () => {
    assert.deepEqual(getRemoteImagePatterns('example.com'), [
      { protocol: 'https', hostname: 'example.com' },
      { protocol: 'http', hostname: 'example.com' },
    ]);
  });
});
