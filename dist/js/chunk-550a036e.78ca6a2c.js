(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-550a036e"],{"5ccf":function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"playList"},[i("div",{staticClass:"head-bar"},[i("head-bar",{attrs:{ifHas2:!0}},[i("div",{staticClass:"left",attrs:{slot:"left"},on:{click:t.goBack},slot:"left"},[i("img",{attrs:{src:a("4c63"),alt:""}})]),i("div",{staticClass:"right",attrs:{slot:"right"},slot:"right"},[i("img",{attrs:{src:a("cedc"),alt:""}})]),i("div",{staticClass:"right",attrs:{slot:"right2"},slot:"right2"},[i("img",{attrs:{src:a("9958"),alt:""}})])])],1),i("div",{staticClass:"imgBoxCon"},[i("div",{staticClass:"imgBox"},[i("div",{staticClass:"imgCon"},[i("img",{staticClass:"imgBoxImg",attrs:{src:t.plist.picUrl,alt:""}})]),i("div",{staticClass:"pListText"},[i("div",{staticClass:"name"},[t._v(t._s(t.plistName))]),i("div",{staticClass:"author"},[i("div",[t._v("歌手："+t._s(t.plist.artists[0].name))]),i("div",[t._v("发行时间："+t._s(t.plist.publishTime))])]),i("div",{staticClass:"info"},[t._v(t._s(t.plistInfo))])])])]),i("div",{staticClass:"btnsBox"},[i("div",{staticClass:"btnItem"},[t._m(0),i("div",{staticClass:"btnAmount"},[i("span",[t._v(t._s(t._f("NumFormat")(t.plist.info.commentCount)))])])]),i("div",{staticClass:"btnItem"},[t._m(1),i("div",{staticClass:"btnAmount"},[i("span",[t._v(t._s(t._f("NumFormat")(t.plist.info.shareCount)))])])])]),i("div",{staticClass:"songCards"},[i("song-card",{attrs:{songs:t.songs}})],1)])},n=[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"btnImg"},[i("img",{attrs:{src:a("3433"),alt:""}})])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"btnImg"},[i("img",{attrs:{src:a("c1a3"),alt:""}})])}],e=(a("b0c0"),a("a4d3"),a("e01a"),a("bce6")),c=a("9b8a"),o=a("735b"),l={name:"Album",components:{HeadBar:e["a"],SongCard:c["a"]},data:function(){return{plist:{},plistName:"",plistImage:"",plistAuthor:"",plistInfo:"",songs:[]}},filters:{NumFormat:function(t){return t>=1e5&&t<1e8?parseInt(t/1e4)+"万":t>=1e8?parseInt(t/1e8)+"亿":t}},created:function(){console.log("album created")},activated:function(){console.log("album activated"),this.$store.commit("navbarShowChange",!1),this._getAlbumData(this.$route.query.id)},deactivated:function(){console.log("album deactivated")},mounted:function(){},methods:{_getAlbumData:function(t){var s=this;Object(o["a"])(t).then((function(t){t&&200==t.code&&(console.log(t),s.plist=t.album,s.plistName=t.album.name,s.plistInfo=t.album.description,s.songs=t.songs)}))},goBack:function(){this.$router.go(-1)}}},r=l,m=(a("8a26"),a("2877")),u=Object(m["a"])(r,i,n,!1,null,"3a07b7d6",null);s["default"]=u.exports},"8a26":function(t,s,a){"use strict";a("e2cb")},c1a3:function(t,s,a){t.exports=a.p+"img/share.f2884c4f.png"},e2cb:function(t,s,a){}}]);
//# sourceMappingURL=chunk-550a036e.78ca6a2c.js.map