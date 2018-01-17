
// 获取数据
var data=JSON.parse(document.body.children[0].text);
var itemId=;
var itemData=data[itemId]

// 展示数据
var tpl=""+itemData.title+"";
document.body.innerHTML=tpl;


// 保存数据
itemData={};
document.body.children[0].text=JSON.toString(data)