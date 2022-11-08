// 1、导入axios
import axios from "axios";
import { getCookie } from "@/utils/tools";

// 2、配置请求根路径
// axios.defaults.baseURL = "https://kcapi.test.com";
// axios.defaults.baseURL = "https://kc.test.com";
// axios.defaults.baseURL = "http://localhost:8080";

const API = {};
// 配置请求拦截器

API.setToken = async () => {
  axios.interceptors.request.use((config) => {
    // 调用Loading组件的service()方法，创建Loading组件的实例，并全屏展示 loading 效果

    // 配置 Token 认证
    let token = getCookie("accessToken");
    if (token != undefined && token.length > 0) {
      config.headers.Authorization = "Bearer " + token;
      config.headers["content-type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
    }
    // 这是固定写法，一定要return出去
    return config;
  });
};

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
  const { data: res1 } = await axios.get(`/dbapi/TeaminfoOffice/${str}`);
  const { data: res2 } = await axios.get(
    `/dbapi/api/teamleaderbyoffice?officeid=${str}`
  );
  const { data: res3 } = await axios.get(
    `/dbapi/api/projectleaderbyoffice?officeid=${str}`
  );
  return [res1, res2, res3];
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
// 5. get 珠三角 Teaminfo list
API.TeaminfoZSJ = async (callback) => {
  const { data: res } = await axios.get("/dbapi/api/TeaminfoZSJ");
  callback(res);
};

// 6. get 取得没有在contract accounting的project list
API.ImportProjectList = async (str, callback) => {
  const { data: res } = await axios.get(`/dbapi/importprojects/${str}`);
  callback(res);
};

// 7. get 传入id, 将此id 关联project copy 到 contract accounting
API.ImportProjectAction = async (str, callback) => {
  const { data: res } = await axios.get(`/dbapi/importprojectaction/${str}`);
  callback(res);
};

// 8. 传入 officeid, 取得该office 所有list, Project No 拼接规则是，Uno=0, project no=projectno, 如果 Uno<>0, Project No=projectno.Uno
API.ProjectList = async (str, callback) => {
  try {
    const { data: res } = await axios.get(`/dbapi/projectlistapi/${str}`);
    callback(res);
  } catch (e) {
    console.log(e);
  }
};

// 9. JSON body 传入 username 和 userpwd, 如验证成功则返回token, 否则返回 username password incorrect，进行比较的用户名字段是 AD_account (所有用户默认密码是： welcome4321)a
API.Login = async (data, callback) => {
  const { data: res } = await axios.post(`/dbapi/CAToken/login`, data);
  callback(res);
};

// 10. 无参数，清除token
API.Logout = async (callback) => {
  const { data: res } = await axios.delete(`/dbapi/CAToken/logout`);
  callback(res);
};

// 11. 此Get 方法更新数据库，传入 rowguid 和 userpassword 2个参数， 根据 rowguid 更新用户密码
API.Updatepassword = async (rowguid, userpassword, callback) => {
  const { data: res } = await axios.get(
    `/dbapi/capassupdate?rowguid=${rowguid}&userpassword=${userpassword}`
  );
  callback(res);
};

API.setToken();

// 向外暴露 API
export default API;
