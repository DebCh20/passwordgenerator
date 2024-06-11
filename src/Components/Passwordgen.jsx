import { useEffect, useRef, useState } from "react";

function Passwordgen(){
  const [password, setPassword] = useState('sd');
  const [length, setLength] = useState(8);
  const [charAllow, setCharAllow] = useState(false);
  const [intAllow, setIntAllow] = useState(false);
  const [copied, setCopied] = useState('Copy');
  const copiedVal= useRef();

  const generatePassword = ()=>{
    let st1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let st2='0123456789';
    let st3='~!@#$%^&*()_+';
    let finalSt=st1;
    let passwordSent='';

    setCopied('Copy');
    
    if(charAllow){
      finalSt= finalSt+st3;
    }
    if(intAllow){
      finalSt= finalSt+st2;
    }
    console.log(length)
    while(passwordSent.length < length){
      passwordSent= passwordSent + finalSt.charAt(Math.floor(Math.random()*finalSt.length));
    }   
    setPassword(passwordSent); 
  }

  useEffect(()=>{
    generatePassword();
  },[charAllow, intAllow, length]);

  const copyToClipboard = ()=>{
    setCopied('Copied !!');
    console.log(copiedVal.current.value);
    navigator.clipboard.writeText(copiedVal.current.value)
  }
  
  return(
    <>
      <div className="outer-wrapper" style={{display:"flex", flexDirection:'column'}}>
        <div style={{display:'flex', flexDirection:'row'}}>
        <input readOnly type={'text'} style={{width: '84%'}} ref={copiedVal} className='passwordVal' value={password}/>
        <button 
        onClick={copyToClipboard}>{copied}</button>
        </div>     
        <div style={{display:'flex', flexDirection:'row', gap:'4px'}} >
          <label htmlFor='passwordRange'>Password length {length}</label>
          <input className="passwordRange" type={'range'} min={8} max={16} defaultValue={8} step={1} 
            onChange={(e)=>setLength(e.target.value)} /> 
          <label htmlFor='charAllowBtn'>Allow character</label>
          <input type={'checkbox'} className='charAllowBtn' value={charAllow} 
            onChange={(e)=>{
              if(e.target.checked)
                setCharAllow(true)
              else
               setCharAllow(false)}} /> 
          <label htmlFor='intAllowBtn'>Allow integer</label>
          <input className='intAllowBtn' type={'checkbox'} value={intAllow} 
            onChange={(e)=>{
              if(e.target.checked)
                  setIntAllow(true)
              else
                  setIntAllow(false)}} /> 
        </div>
      </div>
    </>
  )
}

export default Passwordgen;
