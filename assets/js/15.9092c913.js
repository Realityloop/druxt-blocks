(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{418:function(t,e,r){"use strict";r.r(e);r(70);var n=r(320),i=(r(98),r(57)),o=r(317),a=r(409),u=r(316),s={name:"DruxtBlockRegion",components:{Druxt:u.a},mixins:[u.c],props:{name:{type:String,default:"content"},theme:{type:String,required:!0}},fetch:function(){var t=this;return Object(i.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new a.DrupalJsonApiParams).addFilter("region",t.name).addFilter("status","1").addFilter("theme",t.theme).addGroup("visibility","OR").addFilter("visibility.request_path",null,"IS NULL","visibility"),r.addGroup("pages","AND","visibility").addFilter("visibility.request_path.pages",t.route.resolvedPath,"CONTAINS","pages").addFilter("visibility.request_path.negate",0,"=","pages"),r.addGroup("front","AND","visibility").addFilter("visibility.request_path.pages","<front>","CONTAINS","front").addFilter("visibility.request_path.negate",t.route.isHomePath?0:1,"=","front"),e.next=6,t.getCollection({type:"block--block",query:r});case 6:return n=e.sent,t.blocks=n.data,e.next=10,u.c.fetch.call(t);case 10:case"end":return e.stop()}}),e)})))()},data:function(){return{blocks:[]}},druxt:function(t){var e=t.vm;return{componentOptions:[[e.name,e.theme]]}},computed:Object(n.a)({},Object(o.b)("druxtRouter",{route:function(t){return t.route}})),watch:{$route:function(){this.$fetch()}},methods:Object(n.a)({},Object(o.a)({getCollection:"druxt/getCollection"}))},c=r(42),l=Object(c.a)(s,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r(t.wrapper.component,t._b({tag:"component",class:t.wrapper.class,style:t.wrapper.style},"component",t.wrapper.propsData,!1),[r(t.component.is,t._b({tag:"component",scopedSlots:t._u([t._l(t.blocks,(function(e){return{key:e.attributes.drupal_internal__id,fn:function(n){return[r("DruxtBlock",t._b({key:e.id,attrs:{type:e.type,uuid:e.id}},"DruxtBlock",n,!1))]}}})),{key:"default",fn:function(e){return t._l(t.blocks,(function(n){return r("DruxtBlock",t._b({key:n.id,attrs:{type:n.type,uuid:n.id}},"DruxtBlock",e,!1))}))}}],null,!0)},"component",t.component.propsData,!1))],1)}),[],!1,null,null,null);e.default=l.exports}}]);