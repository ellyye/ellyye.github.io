// 创建日期选择器
hapj(function(H){
  var obj,
    date = new Date(),
    month = date.getMonth() + 1,
    strDate = date.getDate();
    month = (month >= 1 && month <= 9) ? "0" + month : month;
    strDate = (strDate <= 9) ? "0" + strDate : strDate;
  var currentdate = date.getFullYear() + '-' + month + '-' + strDate;
  H.ui('.schedule').each(function(i,v){
     H.com('cal',{startDate:''}).active(v);
     v.value = currentdate;
  });

  H.ui('.schedule').on('click',function(){
    obj = $(this);
    $('.scheduleDialog').css('top',$(document).scrollTop()+'px');
    $('input[name=store_id]').val(obj.attr('store_id'));
  })
  H.ui('#schedule').on('click',function(){
    $('.scheduleDialog').css('top',$(document).scrollTop()+'px');
    $('input[name=store_id]').val('');
    obj = '';
  })
  $(document).delegate('.cday','click',function(){
       if(obj){
          $('input[name=schedule]').val(obj.val());
       }
  });
});

// 修改弹窗位置
hapj(function(H){
  H.ui('#schedule,.schedule').on('click',function(){
    obj = $(this);
    $('.scheduleDialog').css({'position':'fixed','top':'30%','left':'40%'});
    $('input[name=store_id]').val(obj.attr('store_id'));
  })
})
