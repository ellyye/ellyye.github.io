$('.tc_close,.go_next').click(function(){
  $('.zt_tc').hide()
})
function timer(){
        var str = new Date("2017/05/18 15:00:00");
        var times = new Date("2017/06/20 20:00:00");
        var Top = ($(window).height()-$('.zt_tc').height())/2;
        var Left = ($(window).width()-$('.zt_tc').width())/2;
if( new Date() - str > 0 && new Date() - times <0 ){
        $('.zt_tc').css({'top':Top,'left':Left}).show();
          }
          else{
            $('.zt_tc').hide()
          }
        }
timer();
function timer1(){
var str1 = new Date("2016/11/20 20:0:0");
if( new Date() - str1 > 0 ){
        $('.页面上换届模块的class名 ').html ("这里是下届的开展时间");
        $('.partner').css('display','none');
        $('.zhanlve').css('display','none');
        $('.guanming').css('display','none');
        $('.cp').css({'display':'none'})
  }
}
timer1();
