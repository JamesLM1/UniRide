/** Compare the browser Origin with the public Host, not Next's internal URL host. */
export function isSameOriginRequest(request) {
  const origin=request.headers.get('origin');
  if(!origin)return true;
  try {
    const internal=new URL(request.url);
    const forwardedProtocol=request.headers.get('x-forwarded-proto');
    const protocol=forwardedProtocol==='https'||forwardedProtocol==='http'?forwardedProtocol+':':internal.protocol;
    const host=request.headers.get('host')||internal.host;
    if(/[\s\\/@,?#]/.test(host))return false;
    const expected=new URL(protocol+'//'+host);
    const provided=new URL(origin);
    return (provided.protocol==='http:'||provided.protocol==='https:')&&provided.origin===origin&&provided.origin===expected.origin;
  }catch{return false;}
}
