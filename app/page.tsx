'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import useLoginRequest, { FormData } from './hooks'
import './home.css'

const initials: FormData = {
  mobile: "",
  code: "",
};


const mobileReg = /^1[3-9]\d{9}$/;
const codeReg = /^\d{6}$/;

export default function Home() {

  const { watch, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: initials,
  });
  const mobileValue = watch('mobile');
  
  const { login } = useLoginRequest()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await login(data);
    if (res.success) {
      console.log('%cpage.tsx line:63 data', 'color: #007acc;', res.data);
    }
  };

  const handleGetCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-item">
        <input
          placeholder="手机号"
          {...register('mobile', {
            required: '请输入手机号',
            pattern: {
              value: mobileReg,
              message: '手机号格式错误',
            },
          })}
        />
        {/* 表单错误提示，会出现两种情况
        1.必填校验，错误提示“请输入手机号”
        2.格式校验，需满足国内手机号规则，错误提示“手机号格式错误”
        举例：<p className="form-error">手机号格式错误</p> */}
        {errors.mobile && <p className="form-error">{errors.mobile.message}</p>}
      </div>

      <div className="form-item">
        <div className="input-group">
          <input
            placeholder="验证码"
            {...register('code', {
              required: '请输入验证码',
              pattern: {
                value: codeReg,
                message: '验证码格式错误',
              },
            })}
          />
          {/* getcode默认disabled=true，当mobile满足表单验证条件后才位false */}
          <button className={`getcode ${!mobileReg.test(mobileValue) && 'nodrop'}`} disabled={!mobileReg.test(mobileValue)} onClick={handleGetCode}>
            获取验证码
          </button>
          {/* 表单错误提示，会出现两种情况
            1.必填校验，错误提示“请输入验证码”
            2.格式校验，6位数字，错误提示“验证码格式错误”
            举例：<p className="form-error">验证码格式错误</p> */}
        </div>
        {errors.code && <p className="form-error">{errors.code.message}</p>}
      </div>
      {/* 表单提交中，按钮内的文字会变成“submiting......” */}
      <button className="submit-btn" type="submit">
        {isSubmitting ? "submiting......" : "登录"}
      </button>
    </form>
  );
}

