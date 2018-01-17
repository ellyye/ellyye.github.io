// 修改日期选择器弹窗位置
hapj(function(H){
  H.ui('#schedule,.schedule').on('click',function(){
    obj = $(this);
    $('.scheduleDialog').css({'position':'fixed','top':'30%','left':'40%'});
    $('input[name=store_id]').val(obj.attr('store_id'));
  })
})
