// 用户登录和注册的表单项验证的通用代码
/**
 * 对某一个表单项进行验证的构造函数
 */
class FieldValidator {
  /**
   * 构造器
   * @param {*} txtId 文本框的Id
   * @param {*} validatorFunc 验证规则函数，当需要对改文本框进行验证时，会调用该函数，函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回，则表示无错误
   */
  constructor(txtId, validatorFunc) {
    this.input = $("#" + txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    // 失去焦点，表单提交
    this.input.onblur = () => {
      this.validate();
    };
  }

  /**
   * 开始验证，验证成功，返回true，验证失败，返回false
   */
  async validate() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      // 有错误
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }

  /**
   * 对传入的所有验证器进行统一验证，如果所有的验证都通过，则返回true，否则返回false
   * @param {FieldValidator[]} validators
   */
  static async validate(...validators) {
    const proms = validators.map((v) => v.validate());
    const result = await Promise.all(proms);
    return result.every((r) => r);
  }
}

// var loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
//   if (!val) {
//     return "请填写账号";
//   }
//   const resp = await API.exists(val);
//   if (resp.data) {
//     // 账号已存在
//     return "该账号已被占用，请重新选择一个账号名";
//   }
// });

// var nickNameValidator = new FieldValidator("txtNickname", function (val) {
//   if (!val) {
//     return "请填写昵称";
//   }
// });
// function test() {
//   FieldValidator.validate(loginIdValidator, nickNameValidator).then(
//     (result) => {
//       console.log(result);
//     }
//   );
// }
