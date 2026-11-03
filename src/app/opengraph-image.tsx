import {ImageResponse} from 'next/og';
export const runtime='nodejs';
export const alt='UniRide · Conectamos tu ruta, compartimos el viaje';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{display:'flex',height:'100%',width:'100%',background:'#143d54',color:'#f7f4ec',padding:'65px 70px',flexDirection:'column',justifyContent:'space-between'}}><div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><span style={{fontSize:36,fontWeight:700}}>UniRide.</span><span style={{fontSize:15,letterSpacing:3,color:'#a7d3c4'}}>MOVILIDAD UNIVERSITARIA · LIMA</span></div><div style={{display:'flex',flexDirection:'column',fontSize:72,lineHeight:1.1,fontWeight:700,letterSpacing:-3}}><span>Tu campus. Tu gente.</span><span style={{color:'#adddc9'}}>Una misma ruta.</span></div><div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #577e80',paddingTop:25,fontSize:19,color:'#c7dbcf'}}><span>Conectamos tu ruta, compartimos el viaje.</span><span>Proyecto académico</span></div></div>,size);}
