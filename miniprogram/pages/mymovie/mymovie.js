// pages/mymovie/mymovie.js
const db=wx.cloud.database({
  env:"fj-icpmr"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviename:"",
    content:"",
    images:[],
    fileIds:[],
  },
  jumpList:function(){
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },
  submit:function(){
    wx.showLoading({
    title: '数据正在提交',
  })
    var list=[];
    for(var i=0;i<this.data.images.length;i++){
      list.push(new Promise((resolve,reject)=>{
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
            this.data.fileIds.push(fid);
            resolve();
            //console.log(this.data.fileIds)
          }
        })
      }))
    }
    Promise.all(list).then(res=>{
      var name=this.data.moviename;
      var msg=this.data.content;
      var fileid=this.data.fileIds;
      db.collection("mymovie")
      .add({
        data:{
          msg,name,fileid
        }
      }).then(res=>{
        wx.hideLoading();
        wx.showToast({
          title: '提交成功',
        })
        console.log(res);
      }).catch(err=>{
        console.log(err)
      })
    })
  },
  upload:function(){
    wx.chooseImage({
      count:9,
      sizeType:["original","compressed"],
      sourceType:["ablum","camera"],
      success:(res)=>{
        var list=res.tempFilePaths;
        this.setData({
          images:list
        })
      }
    })
  },
  changeName:function(event){
    var name=event.detail;
    this.setData({
      moviename:name
    });
  },
  changeContent:function(event){
    this.setData({
      content:event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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