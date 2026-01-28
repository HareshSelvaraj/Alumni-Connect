'use client'

import { useEffect } from 'react'

export default function Chatbot() {
  useEffect(() => {
    // Add the chatbot script to the page
    const script = document.createElement('script')
    script.innerHTML = `
      (function(){
        if(!window.chatbase||window.chatbase("getState")!=="initialized"){
          window.chatbase=(...arguments)=>{
            if(!window.chatbase.q){window.chatbase.q=[]}
            window.chatbase.q.push(arguments)
          };
          window.chatbase=new Proxy(window.chatbase,{
            get(target,prop){
              if(prop==="q"){return target.q}
              return(...args)=>target(prop,...args)
            }
          })
        }
        const onLoad=function(){
          const script=document.createElement("script");
          script.src="https://www.chatbase.co/embed.min.js";
          script.id="VeE1ZRbkJ3TOwuLykXHiS";
          script.domain="www.chatbase.co";
          document.body.appendChild(script)
        };
        if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}
      })();
    `
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      const existingScript = document.getElementById('VeE1ZRbkJ3TOwuLykXHiS')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return null // This component doesn't render anything visible, just injects the script
} 