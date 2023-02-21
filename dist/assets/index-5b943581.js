(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const m="/assets/bot-aeae2605.svg",p="/assets/user-55ee9f37.svg",c=document.querySelector("form"),i=document.querySelector("#chat_container"),d=document.querySelector(".chatHello");let u;const g=t=>{t.textContent="",d.textContent="",u=setInterval(()=>{t.textContent+=".",t.textContent==="...."&&(t.textContent="")},300)},h=(t,o)=>{let r=0,s=setInterval(()=>{r<o.length?(t.innerHTML+=o.charAt(r),r++):clearInterval(s)},20)},v=()=>{const t=Date.now(),r=Math.random().toString(16);return`id-${t}-${r}`},l=(t,o,r)=>`
      <div class="wrapper ${t&&"ai"}">
        <div class="chat">
          <div class="profile">
            <img 
              src="${t?m:p}"
            />
          </div>
          <div class="message" id=${r}>
            ${o}
          </div>
        </div>
      </div>
    `,f=async t=>{t.preventDefault();const o=new FormData(c);i.innerHTML+=l(!1,o.get("prompt")),d.innerHTML="",c.reset();let r=v();i.innerHTML+=l(!0," ",r),i.scrollTop=i.scrollHeight;const s=document.getElementById(r);g(s);const e=await fetch("https://gptwellsoft.onrender.com/",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({prompt:o.get("prompt")})});if(clearInterval(u),s.innerHTML="",e.ok){const a=(await e.json()).bot.trim();console.log({parsedData:a}),h(s,a)}else{const n=await e.text();alert(n)}};c.addEventListener("submit",f);c.addEventListener("keyup",t=>{t.keyCode===13&&f(t)});
