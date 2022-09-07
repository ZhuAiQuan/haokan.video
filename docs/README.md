# 


# 前言

接触Node.js以及爬虫已经很久了，整理下零散的知识点，故而准备写一点爬虫接口数据。且刚好经常百度，被推荐新闻视频吸引，开始研究好看视频是怎么做ssr的，并在此期间发现了一个华点，~~原来百度的好看视频页面渲染数据并非一开始请求网络，也非请求于nuxt asyncData里，而是直接放进了html里，所以需要爬虫来获取这些数据~~ 后面又发现其实只需要在请求参数里加一个`_format: json`即可返回Json数据。好你个百度，这有些许潦草了，且其他请求接口也没有做签名校验，所以应该后期会加签名吧，那到时候这个文档也会失效哦！

[后台数据接口地址](https://github.com/ZhuAiQuan/haokan.video)

本项目已经添加了vercel配置，可以直接fork到本地仓库并使用vercel免费部署。

[varcel地址](https://vercel.com/dashboard)

不过 最近vercel部署的Serverless Function服务国内都无法访问，似乎dns被污染了

## 项目技术栈

- koa.js及其全家桶、axios、cheerio

# 项目运行

···
## 克隆到本地
`git clone git@github.com:ZhuAiQuan/haokan.video.git`

## 安装依赖
`pnpm i`

## 开启服务
`pnpm start`

# 项目接口

___

## 推荐视频

`/remomment`

### method
`get`
### params

- tab 
推荐视频类型 默认推荐recomment
  + **recommend**: 推荐
  + **projection_hall**: 放映厅
  + **yingshi_new**: 影视
  + **yinyue_new**: 音乐
  + **yunying_vlog**: VLOG
  + **youxi_new**: 游戏
  + **gaoxiao_new**: 搞笑
  + **zongyi_new**: 综艺
  + **yule_new**: 娱乐
  + **dongman_new**: 动漫
  + **shenghuo_new**: 生活
  + **guangchuangwu_new**: 广场舞
  + **meishi_new**: 美食
  + **chongwu_new**: 宠物
  + **sannong_new**: 三农
  + **junshi_new**: 军事
  + **shehui_new**: 社会
  + **tiyu_new**: 体育
  + **keji_new**: 科技
  + **shishang_new**: 时尚
  + **qiche_new**: 汽车
  + **qinzi_new**: 亲子
  + **wenhua_new**: 文化
  + **lvyou_new**: 旅游
  + **yunying_miaodong**: 秒懂
- firstPage
~~是否是第一页 默认是true~~ 参数已删除 不需要传入
- pageSize 每次请求返回的视频条数 不传默认是20
- shuaxin_id 刷新id 首次可不传，从第二页开始需要传入获取首次请求里返回的刷新id 或者自己`new Date().getTime()`获取时间戳传入（这样做可能会有重复视频）

___

## 视频详情

`/detail`

### method

`get`

### params

- id 视频Id
___

## 视频作者信息

`/detail/author`

### method

`post`

### data

- id 视频Id

___

## 相关视频推荐

`/detail/recomment`

### method

`post`

### data

- **title** 标题
- **id** 视频Id

___

## 猜你喜欢

`/like`

### method

`get`

___

## 排行榜

`/top/list`

### method

`post`

### data

- type 类型
  + **hotperson**: 红人榜;  
  + **newperson**: 新人榜;
  + **hotvideo**: 今日热播;
- tab 分类 今日热播不需要传入该参数!
  + **zh**: 总榜
  + **ms**: 美食
  + **ys**: 影视
  + **yx**: 游戏
  + **gx**: 搞笑
  + **sn**: 三农
  + **gcw**: 舞蹈
- page 页数
- pageSize 条数 默认20条
- period 往期id
___

## 搜索

`/search`

### method

`post`

### data

- query 搜索关键词
- type 类型
    + video： 视频;
    + anthor: 视频作者;
- pn 页码
- rn 条数

---

## 热词

`/search/hot`

### method

`get`

---

## tv电视剧

`/tv/detail`

### method

`post`

### data

- id: 视频Id

---

## 电视剧分类

`/tv/category`

### method

`post`

### data
- type 默认为0 即全部
  + **1**: 古装剧
  + **2**: 家庭剧
  + **3**: 爱情剧
  + **4**: 悬疑剧
  + **5**: 武侠剧
  + **6**: 喜剧
  + **7**: 战争剧
- pn 页码
- rn 条数

> ~~剩下的电视剧接口也有 但是暂时不想爬了 待后面没封的话再看看吧~~ 没啥需要爬的了吧 评论这种东西我感觉没必要 所以没有去请求

# 后记

本项目仅供学习交流，侵删！
  