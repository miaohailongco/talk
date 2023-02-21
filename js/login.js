const loginIdValidator = new FieldValidator("txtLoginId", function (val) {
  if (!val) {
    return "请填写账号";
  }
});

const loginPwdValidator = new FieldValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "请填写密码";
  }
});

const form = $(".user-form");

form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validate(
    loginIdValidator,
    loginPwdValidator
  );
  if (!result) {
    return; // 验证没有通过
  }
  const formData = new FormData(form); // 传入表单 dom，得到一个表单数据对象
  const data = Object.fromEntries(formData.entries());
  const resp = await API.login(data);
  if (resp.code === 0) {
    alert("登录成功，点击确定，跳转聊天页");
    location.href = "./index.html";
  } else {
    // alert(`登陆失败，${resp.msg}`);
    loginIdValidator.p.innerText = resp.msg;
    loginPwdValidator.input.value = "";
  }
};
