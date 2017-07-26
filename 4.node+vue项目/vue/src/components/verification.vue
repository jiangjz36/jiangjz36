u<template>
        <canvas  v-on:click.stop="changVer()" class="verCanvas" width="100%" height="35px"></canvas>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      canvas: "",
      width:"",
      height:"",
      ctx:""
    }
  },
  mounted:function(){
        this.canvas=document.getElementsByClassName('verCanvas')[0];
        this.width=this.canvas.width;
        this.height=this.canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.textBaseline = 'bottom';
        // 我的验证码 真正挂载在上面的时候 ==》
        this.getVer( this.drawPic);
        // getVer 获取验证码  （ drawPic---》 画验证码  ）

  },
  computed: {
/**
 * 1.使用 axios   ==> $reqs (名字是我自己取的) 直接使用 axios
 * 2.url  ==> 请求地址  我储存在了 store.js 里面   使用字符串拼接
 * 3. 如果请求成功 .then ( )
 *    我会调用 另外一个函数 （who??  ==> 做成参数传入）
 * 目标
 * 1.url
 * 2. 调用的函数 以参数传入的  ==》 传入的实际参数是什么  （请看 mounted）
 * */

   },
    methods:{
          getVer:function(fn){
              // 后台获取  ===》 通过接口  $reqs 是我在 入口文件  赋给了 VUE的原型
              //       $store 被赋给了 vue 原型   ===》$store
              //  $el   $route       $reqs --> 交互 axios
              this.$reqs({
              	method:'get',
              	url:this.$store.state.url.BASEURL+this.$store.state.url.GETVERICOD
//                    'http://127.0.0.1:8000/VueHandler/AdminLoginAndRegHandler?action=verification'
              
              }).then(function(response){
              	// alert('请求成功')
              	// 把从后台得到的数据 （生成的验证码）==》 用canvas 画出
              	fn(response.data.data)
              });
          },
          randomNum:function (min,max){//生成随机数
            return Math.floor( Math.random()*(max-min)+min);
          },
          randomColor:function (min,max){//生成随机色
            var r = this.randomNum(min,max);
            var g = this.randomNum(min,max);
            var b = this.randomNum(min,max);
            return "rgb("+r+","+g+","+b+")";
          },
          drawPic:function (returnTxt){ /**绘制验证码图片**/
          /**绘制背景色**/
          this.ctx.fillStyle = this.randomColor(180,240); //颜色若太深可能导致看不清
          this.ctx.fillRect(0,0,this.width,this.height);
          /**绘制文字**/

          for(var i=0; i<4; i++){
            var txt = returnTxt[i];
            this.ctx.fillStyle = this.randomColor(50,160);  //随机生成字体颜色
            this.ctx.font = this.randomNum(25,30)+'px SimHei'; //随机生成字体大小
            var x = 10+i*20;
            var y = this.randomNum(25,45);
            var deg = this.randomNum(-15, 15);
            //修改坐标原点和旋转角度
            this.ctx.translate(x,y);
            this.ctx.rotate(deg*Math.PI/180);
            this.ctx.fillText(txt, 10,0);
            //恢复坐标原点和旋转角度
            this.ctx.rotate(-deg*Math.PI/180);
            this.ctx.translate(-x,-y);
          }
          /**绘制干扰线**/
          for(var i=0; i<8; i++){
            this.ctx.strokeStyle = this.randomColor(40,180);
            this.ctx.beginPath();
            this.ctx.moveTo( this.randomNum(0,this.width), this.randomNum(0,this.height) );
            this.ctx.lineTo( this.randomNum(0,this.width), this.randomNum(0,this.height) );
            this.ctx.stroke();
          }
          /**绘制干扰点**/
          for(var i=0; i<100; i++){
            this.ctx.fillStyle = this.randomColor(0,255);
            this.ctx.beginPath();
            this.ctx.arc(this.randomNum(0,this.width),this.randomNum(0,this.height), 1, 0, 2*Math.PI);
            this.ctx.fill();
          }
          return;
        },
        changVer:function(){
            this.getVer( this.drawPic);
        }

    },
   components: {}
};



</script>

<style>
    .verCanvas{
        margin-left:5px;
        position:relative !important;

    }
    .verCanvas:hover{
         cursor:pointer;
    }

</style>
