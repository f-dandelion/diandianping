// pages/detail/detail.js
const db = wx.cloud.database({
  env: "fj-icpmr"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileIdS:[],
    value1:"",
    score:0,
    images:[],
    detail:{},
    movieid:"111"
  },
  submit:function(){
    wx.showLoading({
      title:"正在评论中"
    });
    var rows=[];
    for(var i=0;i<this.data.images.length;i++){
      rows.push(new Promise((resolve,reject)=>{
        var item=this.data.images[i];
        var name=/\.\w+$/.exec(item)[0];
        var newFile=new Date().getTime();
        newFile+=Math.floor(Math.random()*9999);
        newFile+=name;
        wx.cloud.uploadFile({
          cloudPath:newFile,
          filePath:item,
          success:(res)=>{
            var fid=res.fileID;
            console.log(fid);
            this.data.fileIdS.push(fid);//里面的后面添加
            //上传成功后执行解析
            resolve();
          }
        })
      }))
    }
    Promise.all(rows).then(res=>{
      var score = this.data.score;
      var content = this.data.value1;
      var id = this.data.moviedid;
      var list = this.data.fileIdS;
      db.collection("comment").add({
        data: {
          content: content,
          score: score,
          movieid: id,
          fileIdS: list
        }
      }).then(res => {
        wx.hideLoading();
        wx.showToast({
          title:"评论成功",
        })
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    })
    
   
  },
  onChangeScore:function(event){
     this.setData({
       score:event.detail
     });
  },
  uploadFile:function(){
   wx.chooseImage({
     count:9,
     sizeType:["original","compressed"],
     sourceType:["ablum","camera"],
     success: (res)=>{
       var list=res.tempFilePaths;
       this.setData({
         images:list
       })
       console.log(list)
     },
   })
  },
  onContentChange:function(event){
    this.setData({
      value1:event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       movieid:options.id
     })
     this.detail()
  },
detail:function(){
  var id=this.data.movieid;
  wx.showLoading({
    title: '正在加载',
  })
  wx.cloud.callFunction({
    name:"moviedetail",
    data:{
      id:id
    }
  }).then(res=>{
    
    var obj=JSON.parse(res.result);
    //console.log(obj);
    this.setData({
      detail:obj
    })
    wx.hideLoading();
  }).catch(err=>{
    console.log(err)
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})