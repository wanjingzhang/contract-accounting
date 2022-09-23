// 1、导入axios
import axios from "axios";
import { Loading } from "element-ui";
// 2、配置请求根路径
// axios.defaults.baseURL = "https://kcapi.test.com";
// axios.defaults.baseURL = "https://kc.test.com";
// axios.defaults.baseURL = "http://localhost:8080";

const API = {};

// 声明变量，用来存储Loading组件的实例对象
let loadingInstance = null;
// 配置请求拦截器
axios.interceptors.request.use((config) => {
  // 调用Loading组件的service()方法，创建Loading组件的实例，并全屏展示 loading 效果
  loadingInstance = Loading.service({ fullscreen: true });
  // 配置 Token 认证
  config.headers.Authorization = "Bearer xxx";
  // console.log(config);
  // 这是固定写法，一定要return出去
  return config;
});

// 配置响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 关闭 loading 效果
    loadingInstance.close();
    // 这是固定写法，一定要return出去
    return response;
  },
  (error) => {
    loadingInstance.close();
    console.log(error.response);
    if (error.response) {
      if (error.response.status == 401) {
        console.log("登录");
        // 这种情况一般调到登录页
      } else if (error.response.status == 403) {
        // 提示无权限等
        console.log("无权");
      } else {
        // 其他错误处理
        console.log("错误");
      }
    }
    return { data: [] };
  }
);
// 1. 获取office列表
API.Offices = async () => {
  const { data: res } = await axios.get("/api/invoiceoffice");
  return res;
};
// 2. 获取管理员列表
API.Managers = async (str) => {
  const { data: res1 } = await axios.get(
    `/api/teamleaderbyoffice?officeid=${str}`
  );
  const { data: res2 } = await axios.get(
    `/api/projectleaderbyoffice?officeid=${str}`
  );
  return [res1, res2];
};
// 3. 搜索项目
// projectsearch.aspx;  包含 strname = 搜索内容， officelocation = 搜索哪个office, optype= view (只查看)
API.Search = async (data) => {
  console.log(data); //, data
  const { data: res } = await axios.post(
    "/invoiceaspx/projectsearch.aspx",
    data
  );
  return res;
};

// 向外暴露 request
export default API;
