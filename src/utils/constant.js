/**
 * Created by liguigong on 2019/2/27.
 */
export const Article = {
  htmlToArr (content, clientWidth, rootfontSize) {
    let imgReg = /<img.*?(?:>|\/>)/gi
    let srcReg = /src=['"]?([^'"]*)['"]?/i
    let widthReg = /width=['"]?([^'"]*)['"]?/i
    let heightReg = /height=['"]?([^'"]*)['"]?/i
    let result = content.match(imgReg)
    if (result === null) return []
    let imgArr = []
    for (var i = 0; i < result.length; i++) {
      var src = result[i].match(srcReg)[0].slice(5, -1)
      var width = result[i].match(widthReg)[0].slice(7, -1)
      var _height = result[i].match(heightReg)[0].slice(8, -1)
      let height = _height / width * clientWidth / rootfontSize
      let marginTop = (document.documentElement.clientHeight - height * rootfontSize) / rootfontSize / 2
      imgArr.push({width, height, src, marginTop})
    }
    console.log(imgArr, 'LLLLL')
    return imgArr
  }
}
export const comment = {
  picName: [
    'ok', '上', '下', '不听', '不满', '不看', '不说', '丘比特', '为难', '亮心', '亲亲', '亲亲猫', '什么', '便便', '冷', '加油', '包', '双手', '发抖', '右', '吐舌', '吻', '呵呵', '哈哈', '哭', '哭哭猫', '哼', '唇膏', '喜欢', '嘘', '嘻嘻', '噘嘴', '大哭', '大笑', '天使', '女女', '女男', '好吃', '委屈', '完了', '家人', '尖叫', '尖叫猫', '尴尬', '左', '庆祝', '开心', '开心猫', '弱', '彩带', '得意', '得意猫', '心', '心动', '心心', '心碎', '心跳', '怎么办', '怒', '思考', '怪笑', '恶魔', '惊讶', '愉快', '愉快猫', '抓狂', '抱歉', '担心', '拍手', '拜托', '挥手', '捂嘴', '捂脸', '捣蛋', '新娘', '无嘴', '星', '是吗', '晕', '欢呼', '汗', '沮丧', '泳装', '洋装', '派对', '满足', '火', '热', '爱人', '爱你', '爱你猫', '牛仔裤', '狗', '独角兽', '猪', '猫', '环绕心', '生气', '生气猫', '生病', '男男', '略略', '疲惫', '眨眼', '睡', '瞌睡', '笑', '笑哭', '笑哭猫', '笑死', '紫心', '红包', '绿心', '美甲', '胜利', '脸红', '蓝心', '被爱', '调皮', '赞', '迷糊', '酷', '钱包', '钻', '钻戒', '闪亮', '难过', '面瘫', '飞吻', '高跟', '鬼脸', '黄心'
  ],
  changTextToPic (str) {
    let resArr = str.match(/\[[^[]*\]/g)
    for (let i in resArr) {
      // 去中括号
      let picWord = resArr[i].slice(1, -1)
      if (this.picName.indexOf(picWord) != -1) {
        let imgUrl = require('../assets/emoji/' + picWord + '.png')
        str = str.replace(resArr[i], '<img style="width: .45rem;height: .45rem; vertical-align:middle; padding: .05rem .05rem" class="emoji" src="' + imgUrl + '">')
      }
    }
    return str
  },
  // 获取指定的评论数
  getCommentList (data, number) {
    const comment = []
    data.splice(0, number).forEach(item => {
      const obj = {}
      obj.id = item.id // 评论的id
      obj.uid = item.uid
      obj.avatar = ''
      var img = new Image()
      img.src = item.avatar
      img.onload = function () {
        obj.avatar = item.avatar
      }
      obj.nickName = item.nickName
      obj.authStatus = item.authStatus // 认证状态
      obj.createDateStr = item.createDateStr
      obj.likeStatus = item.likeStatus // 是否点赞
      obj.likeTotal = item.likeTotal ? item.likeTotal * 1 : 0
      obj.likeTotalStr = item.likeTotalStr
      obj.destNickName = item.destNickName
      obj.destComment = item.destComment && this.changTextToPic(item.destComment)// 被评论内容
      obj.destUid = item.destUid // 评论的uid
      obj.contComment = item.contComment && this.changTextToPic(item.contComment)
      comment.push(obj)
    })
    return comment
  }
}
