(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[541],{4103:function(e,t,n){Promise.resolve().then(n.bind(n,1273))},8238:function(e,t,n){"use strict";n.d(t,{RZ:function(){return l}});var r=n(9268);n(6006);var i=n(7503),s=()=>(0,r.jsx)("div",{className:"",children:(0,r.jsx)(i.Z,{className:"animate-spin text-6xl "})});let o=e=>{let{children:t,title:n}=e;return(0,r.jsx)("div",{style:{zIndex:9999},className:"text-white rounded-md  backdrop-blur-2xl fixed top-0 left-0 w-full h-full flex items-center justify-center",children:(0,r.jsxs)("div",{className:"flex w-3/4 md:w-1/4 rounded-md shadow-2xl  flex-col p-4 text-3xl bg-zinc-900 outline outline-1 outline-zinc-700",children:[(0,r.jsx)("div",{children:n}),(0,r.jsxs)("div",{className:"my-6 items-center flex justify-center text-3xl",children:[" ",t]})]})})},l=()=>(0,r.jsx)(o,{title:"Hold on..",children:(0,r.jsx)(s,{})})},1273:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var r=n(9268),i=n(8238),s=n(308),o=n(105),l=n(6008),a=n(6006);function c(e){let{children:t}=e,n=(0,o.Z)(),c=(0,l.useRouter)(),[u,d]=(0,s.Z)(e=>{let{localMode:t,setLocalMode:n}=e;return[t,n]});(0,a.useEffect)(()=>{n||u||c.push("/login"),n&&d(!1)},[n]);let[p]=(0,s.Z)(e=>[e.globalLoading]);return(0,r.jsxs)(r.Fragment,{children:[p&&(0,r.jsx)(i.RZ,{}),t]})}},308:function(e,t,n){"use strict";var r=n(2561),i=n(4475);let s=(0,r.Ue)()((0,i.mW)(e=>({selectedMode:1,setSelectedMode(t){e({selectedMode:t})},notes:[],setNotes(t){e({notes:t})},globalLoading:!1,setGlobalLoading(t){e({globalLoading:t})},sidebarOpen:!0,setSidebarOpen(t){e(e=>({sidebarOpen:t(e.sidebarOpen)}))},session:null,setSession(t){e({session:t})},supabase:void 0,setSupabase(t){e({supabase:t})},editingNote:null,setEditingNote(t){e({editingNote:t})},isViewing:!1,setIsViewing(t){e({isViewing:t})},isEditing:!1,setEditing(t){e({isEditing:t})},localMode:!1,setLocalMode(t){e({localMode:t})}})));t.Z=s},1814:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(7332);function i(){return(0,r.eI)("https://bjvjunkbyhdpgiryeaaw.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqdmp1bmtieWhkcGdpcnllYWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5Mzk4MjgsImV4cCI6MjAwMzUxNTgyOH0.jTpzVXBFDY8Bci72Zldv4oq1TrJzBCozfDCP1-iA3CI",{auth:{persistSession:!0,storageKey:"user",storage:localStorage}})}},105:function(e,t,n){"use strict";var r=n(6006),i=n(308),s=n(1814);t.Z=()=>{let[e,t,n,o]=(0,i.Z)(e=>[e.session,e.setSession,e.setGlobalLoading,e.setSupabase]);return(0,r.useEffect)(()=>{let e=(0,s.Z)();o(e),e.auth.getSession().then(e=>{let{data:{session:n}}=e;t(n)});let{data:{subscription:r}}=e.auth.onAuthStateChange((e,r)=>{t(r),console.log(e),n(!1)});return()=>r.unsubscribe()},[]),e}},6008:function(e,t,n){e.exports=n(794)},7611:function(e,t,n){"use strict";var r=n(6054);function i(){}function s(){}s.resetWarningCache=i,e.exports=function(){function e(e,t,n,i,s,o){if(o!==r){var l=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:s,resetWarningCache:i};return n.PropTypes=n,n}},9497:function(e,t,n){e.exports=n(7611)()},6054:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},7503:function(e,t,n){"use strict";var r=n(6006),i=n(9497),s=n.n(i);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var l=(0,r.forwardRef)(function(e,t){var n=e.color,i=e.size,s=void 0===i?24:i,l=function(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}(e,["color","size"]);return r.createElement("svg",o({ref:t,xmlns:"http://www.w3.org/2000/svg",width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:void 0===n?"currentColor":n,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},l),r.createElement("line",{x1:"12",y1:"2",x2:"12",y2:"6"}),r.createElement("line",{x1:"12",y1:"18",x2:"12",y2:"22"}),r.createElement("line",{x1:"4.93",y1:"4.93",x2:"7.76",y2:"7.76"}),r.createElement("line",{x1:"16.24",y1:"16.24",x2:"19.07",y2:"19.07"}),r.createElement("line",{x1:"2",y1:"12",x2:"6",y2:"12"}),r.createElement("line",{x1:"18",y1:"12",x2:"22",y2:"12"}),r.createElement("line",{x1:"4.93",y1:"19.07",x2:"7.76",y2:"16.24"}),r.createElement("line",{x1:"16.24",y1:"7.76",x2:"19.07",y2:"4.93"}))});l.propTypes={color:s().string,size:s().oneOfType([s().string,s().number])},l.displayName="Loader",t.Z=l}},function(e){e.O(0,[323,964,253,769,744],function(){return e(e.s=4103)}),_N_E=e.O()}]);