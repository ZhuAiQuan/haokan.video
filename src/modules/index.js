const cheerio = require("cheerio");
const axios = require("axios");
const https = require("https");
const { baseUrl } = require("../config");

// 忽略https ssl证书配置限制
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const instance = axios.create({
  // baseURL: baseUrl,
  httpsAgent,
});

instance.defaults.timeout = 20 * 1000;
instance.defaults.headers = {
  // host: baseUrl,
  // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
  cookie: `BIDUPSID=81301B4E55DF0F73F9A724B122F304E8; PSTM=1662012922; BAIDUID=81301B4E55DF0F73358D68A421EBF60E:FG=1; H_PS_PSSID=36553_36466_36884_37273_36570_36786_37076_37135_26350_37205; BA_HECTOR=2kag2k21al0ha0a4240lu1h21hh0jfq16; BAIDUID_BFESS=81301B4E55DF0F73358D68A421EBF60E:FG=1; ZFY=8tVUwBJhLZodpqxDX4YJBLpxjkHbcf0HWnHqOnvawWI:C`,
};
// tab分类
async function getRecomment(params) {
  const { tab, pageSize, shuaxin_id } = params;
  let url = `${baseUrl}/tab/${tab}?_format=json`;
  // if (firstPage) {
  //   sfrom && (url += `&sfrom=${sfrom}`);
  // } else {
  if (pageSize && shuaxin_id) {
    url = `${baseUrl}/web/video/feed?tab=${tab}&act=pcFeed&pd=pc&num=${pageSize}&shuaxin_id=${shuaxin_id}`;
  }
  const { data: html } = await instance.get(url);

  // if (firstPage) {
  //   // const _ = cheerio.load(html);
  //   // const json = _('body #_page_data').text();
  //   // const start = json.indexOf("{");
  //   // const end = json.lastIndexOf("};");
  //   return {
  //     // code: 0,
  //     // data: JSON.parse(json.substring(start, end + 1)),
  //     ...html,
  //     // msg: 'success'
  //   }
  // } else {
    return html
  // }
}
// 视频详情
async function detail(id) {
  const { data: html } = await instance.get(`${baseUrl}/v?vid=${id}&_format=json`);
  return {
    ...html
  }
  // const _ = cheerio.load(html);
  // const json = _('body #_page_data').text();
  // const start = json.indexOf("{");
  // const end = json.lastIndexOf("};");
  // return JSON.parse(json.substring(start, end + 1)) || null
}
// 作者详情
async function author(id) {
  const { data } = await instance.get(`${baseUrl}/videoui/api/videoauthor?vid=${id}`);
  return data
};
// 相关推荐
async function aboutRecomment(params) {
  const { title, id } = params
  instance.defaults.headers.referer = `${baseUrl}/v?vid=${id}&tab=recommend&sfrom=recommend`;
  const { data } = await instance.get(`${baseUrl}/videoui/api/videorec?title=${encodeURI(title)}&vid=${id}&act=pcRec&pd=pc`);
  return data
}
// 猜你喜欢
async function videolandfeed() {
  const { data } = await instance.get(`${baseUrl}/videoui/api/Getvideolandfeed?time=${new Date().getTime()}`);
  return data
}
// 热词
async function hotword() {
  const { data } = await instance.get('https://haokan.baidu.com/videoui/api/hotwords?sfrom=pc');
  return data
}
// 搜索 -- 不知道它pn rn有啥用 pn可能是分页第几页 rn反正不是每页条数
async function searchWord({ query, type = 'video', pn = 1, rn = 10 }) {
  const { data } = await instance.get(`https://haokan.baidu.com/web/search/api?pn=${pn}&rn=${rn}&type=${type}&query=${encodeURI(query)}`);
  return data
}
// 榜 巨离谱 hotvideo今日热播 hotperson好看红人 newperson 好看新人 榜
async function list({ type = 'hotperson', tab = 'zh', pageSize = 20, page = 1 }) {
  let url = "https://haokan.hao123.com/videoui/page/pc/toplist?_format=json";
  if (type === 'hotvideo') {
    url += `&type=${type}&page=${page}&pageSize=${pageSize}`
  } else {
    url += `&tab=${tab}&type=${type}`
  }
  const { data: html } = await instance.get(url);
  // const $ = cheerio.load(html);
  // const json = $('body #_page_data').text();
  // const start = json.indexOf('{');
  // const end = json.lastIndexOf('};');
  // return JSON.parse(json.substring(start, end+1)) || null
  return html
}
// 新人榜

module.exports = {
  getRecomment,
  detail,
  author,
  aboutRecomment,
  videolandfeed,
  hotword,
  searchWord,
  list
};
