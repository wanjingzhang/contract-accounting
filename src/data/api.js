// 1、导入axios
import axios from "axios";

// 2、配置请求根路径
// axios.defaults.baseURL = "https://kcapi.test.com";
// axios.defaults.baseURL = "https://kc.test.com";
// axios.defaults.baseURL = "http://localhost:8080";

const API = {};
// 配置请求拦截器
axios.interceptors.request.use((config) => {
  // 调用Loading组件的service()方法，创建Loading组件的实例，并全屏展示 loading 效果

  // 配置 Token 认证
  config.headers.Authorization = "Bearer xxx";
  // console.log(config);
  // 这是固定写法，一定要return出去
  return config;
});

// 配置响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 这是固定写法，一定要return出去
    return response;
  },
  (error) => {
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
  const { data: res } = await axios.get("/dbapi/api/invoiceoffice");
  return res;
};
// 2. 获取管理员列表
API.Managers = async (str) => {
  const { data: res1 } = await axios.get(
    `/dbapi/api/teamleaderbyoffice?officeid=${str}`
  );
  const { data: res2 } = await axios.get(
    `/dbapi/api/projectleaderbyoffice?officeid=${str}`
  );
  return [res1, res2];
};
// 3. E-approval list
API.Eapproval = async (str, callback) => {
  const { data: res1 } = await axios.get(`/dbapi/api/poap1/${str}`);
  const { data: res2 } = await axios.get(`/dbapi/api/poap2/${str}`);
  const { data: res3 } = await axios.get(`/dbapi/api/pogw1/${str}`);
  callback([res1, res2, res3]);
};
// 4. Payment request approval list
API.Payment = async (str, callback) => {
  const { data: res1 } = await axios.get(`/dbapi/api/porq1/${str}`);
  const { data: res2 } = await axios.get(`/dbapi/api/porq2/${str}`);
  const { data: res3 } = await axios.get(`/dbapi/api/porq3/${str}`);
  const { data: res4 } = await axios.get(`/dbapi/api/pogw1/${str}`);
  callback([res1, res2, res3, res4]);
};

// 向外暴露 API
export default API;
