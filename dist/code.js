!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}({11:function(e,t){function n(e){if("INSTANCE"===e.type){const t=e.masterComponent;3===t.children.length&&t.children[2].remove()}}function i(){const e=[...figma.currentPage.selection];if(0===e.length)return void figma.notify("Select item or itmes to gather");const t=e[0];let i=t.x,o=t.y;const a=t.getPluginData("assetNode");if(""===a)return;const r=figma.getNodeById(a);if(r.removed)return;if("COMPONENT"!==r.type)return;if(e.length>1){e.sort((e,t)=>e.x<t.x?-1:e.x>t.x?1:e.y<t.y?-1:e.y>t.y?1:0);for(const t of e)t.x=i,t.y=o,i+=100,r.appendChild(t);return void figma.closePlugin()}const l=t.name,f=r.children,c=[];for(const e of f)e.name===l&&(c.push(e),n(e),e.x=i,e.y=o,o--);figma.currentPage.selection=c,figma.closePlugin()}"shuffle"===figma.command?function(){const e=figma.currentPage.selection.map(e=>e.id);if(0===e.length)return;const t=figma.getNodeById(e[0]),i=t.parent;let o=t.x,a=t.y;for(let t=0;t<e.length;t++){const r=Math.floor(Math.random()*(e.length-t))+t,l=figma.getNodeById(e[r]);n(l),l.x=o,l.y=a,a--,i.insertChild(t,l);const f=e[r];e[r]=e[t],e[t]=f}figma.notify("Finished shuffling"),figma.closePlugin()}():"flip"===figma.command?function(){const e=figma.currentPage.selection;for(let t of e)if("INSTANCE"===t.type)if(t=t.masterComponent,2===t.children.length){const e=t.children[1].clone();t.appendChild(e),e.y=0}else 3===t.children.length&&t.children[2].remove();figma.closePlugin()}():"gather"===figma.command||"tidy"===figma.command?i():"count"===figma.command?(figma.notify(`${figma.currentPage.selection.length} selected`),figma.closePlugin()):function(){figma.showUI(__html__,{width:400,height:400});const e=figma.currentPage.selection;if(1!==e.length)return figma.notify("Select exactly 1 frame to start game"),void figma.closePlugin();if("FRAME"!==e[0].type)return figma.notify("Must select a frame node"),void figma.closePlugin();const t={},n={};let i=null;const o=e[0];o.setRelaunchData({players:"Click on a player to get a link for their secret hand info"});let a=new Set;for(const e of o.children)"COMPONENT"===e.type&&"assets"===e.name&&(i=e,o.insertChild(o.children.length-1,e));for(const e of figma.root.children)if("Player: "===e.name.substring(0,"Player: ".length))t[e.name]=e;else if("Assets"===e.name&&null===i){i=figma.createComponent(),i.name="assets",o.appendChild(i);const t=o.getPluginData("hiddenNode");""!==t&&figma.getNodeById(t).remove();const n=figma.createFrame();n.name="hidden-data",n.visible=!1,n.locked=!0,o.setPluginData("hiddenNode",n.id);let a=100;for(const t of e.children){if("FRAME"!==t.type)continue;let e=null,o=100;for(const r of t.children)if(null===e)e=r;else{if("COMPONENT"===r.type)continue;{const l=figma.createComponent(),f=e.clone();f.x=0,f.y=0,f.locked=!0,l.name=t.name,l.clipsContent=!1,n.appendChild(l),l.appendChild(f);const c=r.clone();l.appendChild(c),c.x=0,c.y=2e4,c.locked=!0,l.resize(c.width,c.height),l.setRelaunchData({shuffle:"",gather:"",flip:"",tidy:"",count:`Count ${t.name}s`});const s=l.createInstance();s.setPluginData("assetNode",i.id),i.appendChild(s),s.x=a,s.y=o,o--}}e&&(a+=100+e.width)}}i.resize(o.width,o.height+2e4),i.x=0,i.y=0;for(const e of o.children)if(["COMPONENT","INSTANCE","FRAME","RECTANGLE"].indexOf(e.type)>=0&&"Player: "==e.name.substring(0,"Player: ".length)){const o=e.name.substring("Player: ".length);if(a.has(o))return figma.notify("Player names must be unique"),void figma.closePlugin();let r=t[e.name];r||(r=figma.createPage(),r.name=e.name);let l=null;for(const e of r.children)"FRAME"===e.type&&"viewer"===e.name?l=e:e.remove();null===l&&(l=figma.createFrame(),r.appendChild(l),l.name="viewer"),n[o]=l.id,l.resize(e.width,e.height);let f=null;for(const e of l.children)"INSTANCE"===e.type&&"periscope"===e.name&&e.masterComponent===i?f=e:e.remove();null===f&&(f=i.createInstance(),l.appendChild(f)),f.x=i.x-e.x,f.y=i.y-e.y-2e4}const r=figma.root.getPluginData("url");null!==r&&figma.ui.postMessage({type:"setURL",url:r}),figma.ui.postMessage({type:"playerFrames",playerFrames:n}),figma.ui.onmessage=e=>{"setURL"===e.type&&figma.root.setPluginData("url",e.url)}}()}});