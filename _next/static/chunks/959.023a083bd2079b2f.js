"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[959],{90959:function(e,t,l){l.r(t),l.d(t,{default:function(){return z}});var s,a,i=l(9268),d=l(51213),n=l.n(d),r=l(15718),c=l(86006),o=l(72875),x=l(30308),u=l(45659),f=l(60644),h=l(86902),m=l.n(h),j=l(93432),p=l.n(j);m().extend(p());var v=m(),g=l(14453),N=l(3532),b=l(9384),w=l(69888),y=l(56844),E=e=>{let{items:t,selectedItems:l,fixed:s}=e,[a,d]=(0,c.useState)(t.map(e=>!1));return(0,c.useEffect)(()=>{l&&l(t.filter((e,t)=>a[t]))},[a]),(0,i.jsx)(i.Fragment,{children:t.map((e,t)=>(0,i.jsx)("button",{onClick:()=>{if(!s){let e=[...a];e[t]=!e[t],d(e)}},className:"py-2 px-8 rounded-md text-white  ".concat(a[t]?"border-4  border-indigo-500":" border-4 border-zinc-600"," "),children:e},t))})};(s=a||(a={}))[s.ADD_NOTE=0]="ADD_NOTE",s[s.ALL_NOTES=1]="ALL_NOTES",s[s.FAVORITES=2]="FAVORITES",s[s.ARCHIVE=3]="ARCHIVE";var C=l(36738),S=()=>{let{value:e,set:t}=(0,C.Z)("notes",{defaultValue:[],initializeWithValue:!0});return{localNotes:e,setLocalNotes:t}},A=e=>{let{note:t}=e,l=[[g.Z,t.favorite,"Favorite"],[N.Z,t.archived,"Archived"]],[s,d,n,r,c,o,u,f,h]=(0,x.Z)(e=>[e.notes,e.setEditingNote,e.setSelectedMode,e.setIsViewing,e.isEditing,e.setEditing,e.supabase,e.localMode,e.setNotes]),{setLocalNotes:m}=S();return(0,i.jsxs)("div",{className:" bg-zinc-800 justify-between   outline-zinc-700 outline outline-2 text-white rounded-md w-full flex  p-2",children:[(0,i.jsxs)("div",{className:"flex flex-col gap-y-3",children:[(0,i.jsx)("div",{className:"text-3xl font-semibold ",children:t.title}),(0,i.jsx)("div",{className:"flex gap-x-3 flex-wrap gap-y-3",children:(0,i.jsx)(E,{fixed:!0,items:t.labels})}),(0,i.jsxs)("div",{className:"flex gap-x-3 text-sm",children:[(0,i.jsxs)("div",{className:"text-zinc-400",children:["Created ",new Date(t.created).toLocaleDateString()]}),(0,i.jsx)("div",{className:"text-zinc-500",children:"• ".concat(v().to(new Date(t.created)))})]}),(0,i.jsx)("div",{className:"flex w-full h-full items-end justify-start gap-x-3",children:l.map((e,t)=>{let[l,s,a]=e;if(s)return(0,i.jsxs)("div",{className:"flex flex-col items-center justify-center text-sm",children:[(0,i.jsx)("div",{children:"string"==typeof l?l:(0,i.jsx)(l,{})}),a]},t)})})]}),(0,i.jsxs)("div",{className:"flex flex-col gap-y-3",children:[(0,i.jsx)("button",{onClick:()=>{d(s.findIndex(e=>e.id===t.id)),r(!0),n(a.ADD_NOTE)},children:(0,i.jsx)(b.Z,{})}),(0,i.jsx)("button",{onClick:()=>{d(s.findIndex(e=>e.id===t.id)),o(!0),n(a.ADD_NOTE)},children:(0,i.jsx)(w.Z,{})}),(0,i.jsx)("button",{onClick:async()=>{let e=s.filter(e=>e.id!==t.id);f?(m(e),h(e)):(await u.from("Notes").delete().eq("id",t.id),h(e))},children:(0,i.jsx)(y.Z,{})}),(0,i.jsx)("button",{onClick:async()=>{let e={...t},l=[...s];e.archived=!e.archived;let a=l.findIndex(t=>t.id===e.id);l[a]=e,f?(m(l),h(s)):(await u.from("Notes").update({data:e}).match({id:e.id}),h(l))},children:(0,i.jsx)(N.Z,{})})]})]})},k=l(66442),D=l(10184),I=()=>(0,i.jsx)("div",{className:"border border-zinc-600 shadow rounded-md p-4  w-full mx-auto",children:(0,i.jsx)("div",{className:"animate-pulse flex space-x-4",children:(0,i.jsxs)("div",{className:"flex-1 space-y-6 py-1",children:[(0,i.jsx)("div",{className:"h-2 bg-slate-700 rounded"}),(0,i.jsxs)("div",{className:"space-y-3",children:[(0,i.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,i.jsx)("div",{className:"h-2 bg-slate-700 rounded col-span-2"}),(0,i.jsx)("div",{className:"h-2 bg-slate-700 rounded col-span-1"})]}),(0,i.jsx)("div",{className:"h-2 bg-slate-700 rounded"})]})]})})}),T=l(6266),Z=e=>{let{labels:t,onChange:l,onSelectChange:s}=e;return(0,i.jsxs)("div",{className:"flex flex-col gap-y-3 my-2",children:[(0,i.jsx)("div",{children:(0,i.jsxs)("div",{className:"flex gap-x-3",children:[(0,i.jsx)(T.Z,{}),"Filters"]})}),(0,i.jsx)("div",{children:(0,i.jsxs)("div",{className:"w-full flex flex-col gap-y-2",children:[(0,i.jsx)("div",{children:" Filter by labels "}),(0,i.jsx)("div",{className:"flex gap-3 flex-wrap",children:(0,i.jsx)(E,{items:t,selectedItems:l})})]})}),(0,i.jsx)("div",{children:"Sort by:"}),(0,i.jsx)("div",{className:"flex flex-col gap-y-2",children:(0,i.jsxs)("select",{onChange:e=>{s(e.target.value)},id:"sort",className:"bg-transparent p-4 rounded-md outline outline-2 outline-zinc-800 w-min active:outline-indigo-500 focus:outline-indigo-500",children:[(0,i.jsx)("option",{value:"",children:"Choose an option"}),(0,i.jsx)("option",{value:"da",children:"Date: Newest"}),(0,i.jsx)("option",{value:"dd",children:"Date: Oldest"}),(0,i.jsx)("option",{value:"ta",children:"Title: Ascending"}),(0,i.jsx)("option",{value:"td",children:"Title: Descending"})]})})]})};let _=n()(()=>Promise.all([l.e(539),l.e(376)]).then(l.bind(l,30376)),{loadableGenerated:{webpack:()=>[30376]},ssr:!1});var z=()=>{let e=(0,x.Z)(e=>e.selectedMode);(0,c.useEffect)(()=>{0==e?document.body.classList.add("overflow-hidden"):document.body.classList.remove("overflow-hidden")},[e]);let t=(0,f.q_)({x:0===e?0:2500}),[l,s,d,n,h,m,j]=(0,x.Z)(e=>{let{session:t,supabase:l,localMode:s,notes:a,setNotes:i,isEditing:d,isViewing:n}=e;return[t,l,s,a,i,n,d]}),[p,v]=(0,c.useState)(!1),{localNotes:g}=S();(0,c.useEffect)(()=>{d&&!l&&g&&h(g)},[g,p]),(0,c.useEffect)(()=>{(async function(){if(l&&!d){let{user:e}=l;R(!0);let{data:t,error:a}=await s.from("Notes").select("id,data").eq("uid",e.id);t&&h(t.map(e=>({...e.data,id:e.id}))),a&&q("Error fetching data.."),R(!1)}})()},[l,p]);let[N,b]=(0,c.useState)(""),[w,y]=(0,c.useState)([]),[E,C]=(0,c.useState)([]);(0,k.b)(()=>{if(""==N)C(n);else{let e=new D.Z(n,{keys:["title"]}),t=e.search(N),l=t.map(e=>e.item);C(l)}},[n,N],200);let T=(0,c.useCallback)(t=>{switch(e){case a.ALL_NOTES:return!t.archived;case a.ARCHIVE:return t.archived;case a.FAVORITES:return t.favorite;default:return!0}},[e]),[z,O]=(0,c.useState)(""),L=(0,c.useCallback)((e,t)=>{switch(z){case"da":if(e.created>t.created)return -1;if(t.created>e.created)return 1;return 0;case"dd":if(e.created<t.created)return -1;if(t.created<e.created)return 1;return 0;case"ta":return e.title.localeCompare(t.title);case"td":return t.title.localeCompare(e.title);default:return 0}},[E,z]),V=(0,c.useMemo)(()=>new Set(n.flatMap(e=>e.labels)),[n]),[F,R]=(0,c.useState)(!1),[M,q]=(0,c.useState)(),[H,G]=(0,r.u)(),P=0===e||m;return(0,i.jsxs)("div",{className:"w-full h-full flex flex-col  gap-y-10 px-2 md:px-4 py-2",children:[!P&&(0,i.jsxs)("div",{className:"flex flex-col  gap-x-2 my-2",children:[(0,i.jsx)(o.I,{onChange:e=>b(e.currentTarget.value),placeholder:"Search..."}),n.length>0&&(0,i.jsx)(Z,{onSelectChange:e=>O(e),labels:Array.from(V),onChange:e=>y(e)})]}),!P&&(0,i.jsxs)("div",{ref:H,className:"w-full grid grid-cols-1 md:grid-cols-3 gap-4 h-full",children:[F&&Array(6).fill(0).map((e,t)=>(0,i.jsx)(I,{},t)),!M&&!F&&E.filter(T).filter(e=>{if(0===w.length)return!0;let t=new Set(e.labels);return w.some(e=>t.has(e))}).sort(L).map(e=>(0,i.jsx)(A,{note:e},e.id))]}),M&&(0,i.jsxs)("button",{className:"flex gap-x-2 text-red-400 items-center justify-center",onClick:()=>v(e=>!e),children:["An error occured: ",M," Retry ",(0,i.jsx)(u.Z,{})]}),(0,i.jsx)(f.q.div,{ref:H,style:t,className:"w-full h-full  flex flex-col gap-y-3 z-50 px-4 bg-zinc-900",children:P&&(0,i.jsx)(_,{refetch:()=>v(e=>!e)})})]})}},72875:function(e,t,l){l.d(t,{I:function(){return a}});var s=l(9268);l(86006);let a=e=>(0,s.jsx)("input",{...e,className:"p-4 my-2 rounded-md w-full bg-transparent text-white outline outline-2 outline-zinc-700 focus:outline-indigo-500 ".concat(e.className||"")})}}]);