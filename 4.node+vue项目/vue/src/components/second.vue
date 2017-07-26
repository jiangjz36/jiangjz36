<template>
  <div>
        <div>
            <fcheader></fcheader>
            <!-- 外部引入的组件 -->
        </div>
        <div class="index_body">
        <!-- 主题 -->
             <!-- 快捷操作开始 -->
              <div class="quick_links">
                <div class="quicklinks_one" v-on:click="courseList()">
                  <h1>课程列表</h1>
                  <h2>Course List</h2>
                  <div class="icon_wrap"><i class="icon icon-th-large"></i></div>
                  <p>查询现有课程，添加课程，管理课程</p>
                </div>
                <div class="quicklinks_one" onclick="window.location = '/courseEditList'">
                  <h1>课程添加</h1>
                  <h2>Course Add</h2>
                  <div class="icon_wrap"><i class="icon icon-plus"></i></div>
                  <p>添加、修改课程信息，为课程添加视频课件……</p>
                </div>
                <div class="quicklinks_one mouse_on" v-on:click="courseList()">
                  <h1>课程置顶</h1>
                  <h2>Course Up</h2>
                  <div class="icon_wrap"><i class="icon icon-arrow-up"></i></div>
                  <p>课程置顶，显示在移动端banner上</p>
                </div>
                <div class="quicklinks_one" onclick="window.location = '/vedioList'">
                  <h1>视频管理</h1>
                  <h2>Video Manage</h2>
                  <div class="icon_wrap"><i class="icon icon-facetime-video"></i></div>
                  <p>管理视频，上传、删除</p>
                </div>
                <div class="quicklinks_one mouse_on"  onclick="window.location = '/adminListCom'">
                  <h1>用户管理</h1>
                  <h2>User Manage</h2>
                  <div class="icon_wrap"><i class="icon icon-user"></i></div>
                  <p>管理系统用户</p>
                </div>
                <div class="quicklinks_one mouse_on"  onclick="window.location = '/studentList'">
                  <h1>学员管理</h1>
                  <h2>Student Manage</h2>
                  <div class="icon_wrap"><i class="icon icon-file"></i></div>
                  <p>管理学员</p>
                </div>
              </div>
               <!-- 图表开始 -->
                <div class="charts_wrap">
                  <div style="background:#fff; padding-top:20px; height:340px;">
                    <div style="width:400px; height:370px;" ref="chart01"></div>
                  </div>
                  <div style="background:#fff; padding-top:20px; height:340px;">
                    <div style="width:530px; height:370px;" ref="chart02"></div>
                  </div>
                  <div style="background:#fff; padding-top:20px; height:340px;">
                    <div style="width:580px; height:370px;" ref="chart03"></div>
                  </div>
                  <div style="background:#fff; padding-top:20px; height:340px;">
                    <div style="width:400px; height:370px;" ref="chart04"></div>
                  </div>
                </div>
        </div>
  </div>
</template>
<script type="text/javascript">
import fcheader from './fcheader.vue';  // 头部组件
import echarts from 'echarts';  // 表格的插件
export default {
      data () {
        return {
          input_default:{}
        }
      },
      components:{fcheader},
      mounted:function(){
        document.body.setAttribute("style","background:url(../../static/assets/images/index_body_bg.jpg) !important;min-width:1100px;font-family:'宋体';margin:0;padding:0");

          if(window.offsetWidth <= 1366){
            // 设置元素的宽度
           this.$refs.chart01.style.width='40%';
            this.$refs.chart02.style.width='40%';
             this.$refs.chart03.style.width='90%';
          };
          var mychart01 = echarts.init(this.$refs.chart01);  // 初始化一个 echarts
          mychart01.setOption( {
      				title : {
      					text: '学习人数比例',
      					subtext: '  ',
      					x:'center',
                        textStyle:{
                          color:'#008ACD'
                        }
      				},
      				tooltip : {
      					formatter: "{a} <br/>{b} : {c}%"
      				},
      				series : [
      					{
      						name:'学习人数比例66',
      						type:'gauge',
      						axisLine:{
                  show:true,
                   lineStyle: {
                          color: [
                              [0.5, '#2EC7C9'],
                              [0.8, '#5AB1EF'],
                              [1, '#D87A80']
                          ],
                          width:10
                      }
      						},
      						axisTick:{

      						    show:true,

      						    length:8,
      						    lineStyle:{
      						        color: [
                                [0.2, '#2EC7C9'],
                                [0.8, '#5AB1EF'],
                                [1, '#D87A80']
                            ],
                          width:1,
      						        type:'solid'

      						    }

      						},
      						detail : {

      						formatter:'{value}%'
      						},
      						data:[{value: 100, name: '比例'}]
      					}
      				]
      			});

          var mychart02 = echarts.init(this.$refs.chart02);
           mychart02.setOption( {
                      title : {
                          text: '考试通过率',
                          subtext: '  ',
                          x:'center',
                          textStyle:{
                              color:'#008ACD'
                          }
                      },
                      tooltip : {
                          trigger: 'item',
                          formatter: "{a} <br/>{b} : {c} ({d}%)"
                      },
                      color:['#B6A2DE','#57D2D3'],

                      series : [
                          {
                              name:'访问来源',
                              type:'pie',
                              radius : ['0','55%'],
                              center: ['50%', '50%'],
                              data:[
                                  {value:335, name:'已通过'},
                                  {value:310, name:'未通过'}
                              ]



                           }
                      ]
                   });


         var mychart03 = echarts.init(this.$refs.chart03);
         mychart03.setOption({
                				 backgroundColor: '#1b1b1b',
          tooltip : {
              formatter: "{a} <br/>{c} {b}"
          },
          toolbox: {
              show : true,
              feature : {
                  mark : {show: true},
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          series : [
              {
                  name:'速度',
                  type:'gauge',
                  min:0,
                  max:220,
                  splitNumber:11,
                  radius: '50%',
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                          width: 3,
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  axisLabel: {            // 坐标轴小标记
                      textStyle: {       // 属性lineStyle控制线条样式
                          fontWeight: 'bolder',
                          color: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  axisTick: {            // 坐标轴小标记
                      length :15,        // 属性length控制线长
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: 'auto',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  splitLine: {           // 分隔线
                      length :25,         // 属性length控制线长
                      lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                          width:3,
                          color: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  pointer: {           // 分隔线
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 5
                  },
                  title : {
                      textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                          fontWeight: 'bolder',
                          fontSize: 20,
                          fontStyle: 'italic',
                          color: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  detail : {
                      backgroundColor: 'rgba(30,144,255,0.8)',
                      borderWidth: 1,
                      borderColor: '#fff',
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 5,
                      offsetCenter: [0, '50%'],       // x, y，单位px
                      textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                          fontWeight: 'bolder',
                          color: '#fff'
                      }
                  },
                  data:[{value: 40, name: 'km/h'}]
              },
              {
                  name:'转速',
                  type:'gauge',
                  center : ['25%', '55%'],    // 默认全局居中
                  radius : '30%',
                  min:0,
                  max:7,
                  endAngle:45,
                  splitNumber:7,
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
                          width: 2,
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  axisLabel: {            // 坐标轴小标记
                      textStyle: {       // 属性lineStyle控制线条样式
                          fontWeight: 'bolder',
                          color: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  axisTick: {            // 坐标轴小标记
                      length :12,        // 属性length控制线长
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: 'auto',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  splitLine: {           // 分隔线
                      length :20,         // 属性length控制线长
                      lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                          width:3,
                          color: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  pointer: {
                      width:5,
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 5
                  },
                  title : {
                      offsetCenter: [0, '-30%'],       // x, y，单位px
                      textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                          fontWeight: 'bolder',
                          fontStyle: 'italic',
                          color: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  detail : {
                      //backgroundColor: 'rgba(30,144,255,0.8)',
                     // borderWidth: 1,
                      borderColor: '#fff',
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 5,
                      width: 80,
                      height:30,
                      offsetCenter: [25, '20%'],       // x, y，单位px
                      textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                          fontWeight: 'bolder',
                          color: '#fff'
                      }
                  },
                  data:[{value: 1.5, name: 'x1000 r/min'}]
              },
              {
                  name:'油表',
                  type:'gauge',
                  center : ['75%', '50%'],    // 默认全局居中
                  radius : '30%',
                  min:0,
                  max:2,
                  startAngle:135,
                  endAngle:45,
                  splitNumber:2,
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                          width: 2,
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  axisTick: {            // 坐标轴小标记
                      length :12,        // 属性length控制线长
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: 'auto',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  axisLabel: {
                      textStyle: {       // 属性lineStyle控制线条样式
                          fontWeight: 'bolder',
                          color: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      },
                      formatter:function(v){
                          switch (v + '') {
                              case '0' : return 'E';
                              case '1' : return 'Gas';
                              case '2' : return 'F';
                          }
                      }
                  },
                  splitLine: {           // 分隔线
                      length :15,         // 属性length控制线长
                      lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                          width:3,
                          color: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  pointer: {
                      width:2,
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 5
                  },
                  title : {
                      show: false
                  },
                  detail : {
                      show: false
                  },
                  data:[{value: 0.5, name: 'gas'}]
              },
              {
                  name:'水表',
                  type:'gauge',
                  center : ['75%', '50%'],    // 默认全局居中
                  radius : '30%',
                  min:0,
                  max:2,
                  startAngle:315,
                  endAngle:225,
                  splitNumber:2,
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                          width: 2,
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  axisTick: {            // 坐标轴小标记
                      show: false
                  },
                  axisLabel: {
                      textStyle: {       // 属性lineStyle控制线条样式
                          fontWeight: 'bolder',
                          color: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      },
                      formatter:function(v){
                          switch (v + '') {
                              case '0' : return 'H';
                              case '1' : return 'Water';
                              case '2' : return 'C';
                          }
                      }
                  },
                  splitLine: {           // 分隔线
                      length :15,         // 属性length控制线长
                      lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                          width:3,
                          color: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                      }
                  },
                  pointer: {
                      width:2,
                      shadowColor : '#fff', //默认透明
                      shadowBlur: 5
                  },
                  title : {
                      show: false
                  },
                  detail : {
                      show: false
                  },
                  data:[{value: 0.5, name: 'gas'}]
              }
          ]
        });
          setInterval(function (){
              option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
              option.series[1].data[0].value = (Math.random()*7).toFixed(2) - 0;
              option.series[2].data[0].value = (Math.random()*2).toFixed(2) - 0;
              option.series[3].data[0].value = (Math.random()*2).toFixed(2) - 0;
              myChart.setOption(option);
          },2000)

         

          var mychart04 = echarts.init(this.$refs.chart04);
         mychart04.setOption({
            tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
         });
      },
      methods:{
            courseList:function(){//55
                window.location = "/courseList";
            }
       }
}
</script>

<style>
    .index_body{
    	background:url(../../static/assets/images/index_body_bg.jpg);
    	padding-top:65px;
    	color:#fff;
    	min-width:1100px;
    }
    .quick_links{
    	overflow:hidden;
    }
    .quicklinks_one{
    	width:12%;
    	height:202px;
    	background:url(../../static/assets/images/white_opacity_bg.png);
    	position:relative;
    	text-align:center;
    	cursor:pointer;
    	float:left;
    	margin-left:4%;
    	margin-bottom:54px;
    }
    .quicklinks_one h1{
    	font-size:24px;
    	font-family:"方正大标宋", "宋体";
    	padding-top:38px;
    }
    .quicklinks_one h2{
    	font-size:12px;
    	font-family:Arial, Helvetica, sans-serif;
    	padding-top:12px;
    	font-weight:normal;
    }
    .quicklinks_one p{
    	font-size:12px;
    	padding:23px 22px 0;
    	display:none;
    	line-height:21px;
    }
    .quicklinks_one .icon_wrap{
    	position:absolute;
    	top:118px;
    	left:0;
    	width:100%;
    }
    .quicklinks_one i{
    	font-size:40px;
    }
  .quicklinks_one i{
        border:none;
        height:20px;
  }
  .quicklinks_one  .icon-plus{
    border:0px solid #fff;
    border-radius:2px;
  }
   .quicklinks_one .icon::before{
         position:absolute;
         left:85px;
         /*left: 50%;
         margin-left: -20px;*/
         top:-10px;
    }
  .quicklinks_one  .icon-plus:before{
      width:43px;
      border:4px solid #fff;
      border-radius:2px;
      left:80px;
      top:5px;

    }


  .quicklinks_one:hover{
    	background-color:#27a9e3;
    	transition: all 0.5s ease 0s;
    }
    .quicklinks_one:hover .icon_wrap{
    	top:22px;
    	transition: all 0.5s ease 0s;
    }
    .quicklinks_one:hover h1{
    	padding-top:78px;
    	transition: all 0.5s ease 0s;
    }
    .quicklinks_one:hover h2{
    	display:none;
    	transition: all 0.5s ease 0s;
    }
    .quicklinks_one:hover p{
    	display:block;
    	transition: all 0.5s ease 0s;
    }
    .quicklinks_one.disabled{
    	opacity:0.6;
    	cursor:not-allowed;
    }

/*图表*/
.charts_wrap{
	margin-left:4%;
	margin-right:4%;
	background:url(../../static/assets/images/white_opacity_bg.png);
	padding-top:50px;
	overflow:hidden;
}
.charts_wrap > div{
	float:left;
	margin-left:4%;
	overflow:hidden;
	margin-bottom:50px;
}

</style>
