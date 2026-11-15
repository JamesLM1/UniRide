import test from 'node:test';
import assert from 'node:assert/strict';
import {guideAnswer} from '../src/lib/guide.mjs';
import {isSameOriginRequest} from '../src/lib/request-origin.mjs';

test('Registration and recovery are both answered in a compound question',()=>{
  const result=guideAnswer('¿Cómo creo una cuenta y recupero mi contraseña?');
  assert.ok(result.topics.includes('register'));
  assert.ok(result.topics.includes('recovery'));
  assert.ok(result.sources.some(source=>source.href==='/registro'));
  assert.ok(result.sources.some(source=>source.href==='/ingresar'));
});
test('Private reservations direct to the account rather than claiming account access',()=>{
  const result=guideAnswer('¿Cuál es el estado de mi reserva?');
  assert.match(result.answer,/No puedo consultar tus reservas/);
  assert.ok(result.sources.some(source=>source.href==='/app/solicitudes'));
});
test('Cancellation advice provides actions and states the limit of automatic reassignment',()=>{
  const result=guideAnswer('Me cancelaron el viaje, ¿qué hago?');
  assert.ok(result.sources.some(source=>source.href==='/guia'));
  assert.match(result.answer,/no una función activa/);
});
test('Unknown questions are explicit and still offer actionable suggestions',()=>{
  const result=guideAnswer('¿Cuál es la capital de Japón?');
  assert.equal(result.topics.length,0);
  assert.match(result.answer,/no tengo una respuesta específica/);
  assert.ok(result.suggestions.length>0);
});
test('Same public origin works when Next represents its internal URL as localhost',()=>{
  const request=new Request('http://localhost:3000/api/chat',{headers:{host:'127.0.0.1:3000',origin:'http://127.0.0.1:3000'}});
  assert.equal(isSameOriginRequest(request),true);
});
test('Foreign and opaque origins stay blocked while a trusted HTTPS proxy is supported',()=>{
  for(const origin of ['https://untrusted.example','null','http://127.0.0.1:3001']) {
    const request=new Request('http://localhost:3000/api/chat',{headers:{host:'127.0.0.1:3000',origin}});
    assert.equal(isSameOriginRequest(request),false);
  }
  const proxy=new Request('http://internal:3000/api/chat',{headers:{host:'uniride.example',origin:'https://uniride.example','x-forwarded-proto':'https'}});
  assert.equal(isSameOriginRequest(proxy),true);
});
