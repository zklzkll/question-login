export interface FormData {
  mobile: string;
  code: string;
}
export interface ResData {
  success: boolean;
  data?: FormData;
  message?: string;
}
const useLoginRequest = () => {
  const login = async (formData: FormData): Promise<ResData> => {
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 返回模拟的成功响应
      return { success: true, data: formData };
    } catch (error) {
      // 更详细的错误处理
      console.error("登录请求失败:", error);
      return { success: false, message: "请求失败" };
    }
  };

  return {
    login,
  }
}

export default useLoginRequest