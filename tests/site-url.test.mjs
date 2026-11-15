import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveSiteURL} from '../src/lib/site-url.mjs';

test('canonical URL uses the production domain rather than a temporary preview', () => {
  assert.equal(resolveSiteURL({VERCEL:'1',VERCEL_URL:'preview.vercel.app',VERCEL_PROJECT_PRODUCTION_URL:'uniride-campus.vercel.app'}), 'https://uniride-campus.vercel.app');
  assert.equal(resolveSiteURL({NEXT_PUBLIC_SITE_URL:'https://uniride.example/'}), 'https://uniride.example');
});

test('a cloud build cannot publish localhost canonical URLs', () => {
  assert.throws(() => resolveSiteURL({VERCEL:'1',NEXT_PUBLIC_SITE_URL:'http://localhost:3000'}));
  assert.throws(() => resolveSiteURL({NEXT_PUBLIC_SITE_URL:'https://user:password@example.com'}));
  assert.equal(resolveSiteURL({}), 'http://localhost:3000');
});
