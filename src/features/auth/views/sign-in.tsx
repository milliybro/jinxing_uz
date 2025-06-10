import { useMutation } from '@tanstack/react-query'
import { Button, ConfigProvider, Form, Input, Typography } from 'antd'

import { login } from '../api'
import { darkTheme } from '@/providers/theme-provider'

import ViewIcon from '@/components/icons/view'
import ViewOffIcon from '@/components/icons/view-off'
import CustomerSupportIcon from '@/components/icons/customer-support'

import videoBanner from '@/assets/intro.mp4'
import uzinfocomLogo from '@/assets/uzinfocom-logo.png'
import logo_white from '@/assets/uzlogo_white.png'
import { useTranslation } from 'react-i18next'

export default function SignIn(): React.ReactElement {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem('refresh_token', res.auth_tokens?.refresh)
      localStorage.setItem('access_token', res.auth_tokens?.access)
      localStorage.setItem('user_data', JSON.stringify(res.user_data))

      window.location.reload()
    },
    onError: () => {
      form.setFields([
        {
          name: 'username',
          errors: ['Данный пользователь не найден'],
        },
        {
          name: 'password',
          errors: ['Неверный пароль'],
        },
      ])
      form.getFieldsError()
    },
  })

  return (
    <div className="w-[100vw] h-[100vh] ">
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        className="fixed top-0 left-0 w-full object-cover h-full opacity-[0.2] z-10"
        poster="../main-banner.jpg"
      >
        <source
          src={videoBanner}
          width={1000}
          height={500}
          type="video/mp4"
          className="z-0"
        />
        Your browser does not support HTML5 video.
      </video>
      <div className="bg-[#0F172A] fixed top-0 left-0 w-screen h-screen" />
      <div className="w-full h-full flex items-center flex-col justify-around">
        <div className="max-w-[569px] h-[686px] w-full border border-[#3F416B] rounded-2xl z-10 backdrop-blur-sm bg-[#1E293B99] m-5 p-4 flex items-center justify-center">
          <div>
            <div className="flex flex-col items-center max-w-[367px] mx-auto">
              {/* <EmehmonLightBlueIcon className="mb-6" /> */}
              <img width={153} className="mb-6" src={logo_white} />

              <Typography.Text className="text-[28px] text-white font-semibold mb-4">
                {t('common.welcome')}
              </Typography.Text>
              <Typography.Text className=" font-light text-white text-center text-base mb-6">
                {t('common.sign-in-text')}
              </Typography.Text>
              <ConfigProvider theme={darkTheme}>
                <Form
                  form={form}
                  layout="vertical"
                  className="w-full mb-6"
                  onFinish={mutate}
                >
                  <Form.Item
                    label={t('user-management.modal-form.email.label')}
                    name="username"
                    className="[&_.ant-form-item-label_label]:text-white group mb-4 [&_.ant-form-item-explain-error]:text-sm [&_.ant-form-item-explain-error]:my-1 [&_.ant-form-item-required]:before:hidden"
                    rules={[
                      {
                        required: true,
                        message: t(
                          'user-management.modal-form.email.rule1',
                        ) as string,
                      },
                      {
                        type: 'email',
                        message: t(
                          'user-management.modal-form.email.rule2',
                        ) as string,
                      },
                    ]}
                  >
                    <Input
                      placeholder={
                        t(
                          'user-management.modal-form.email.placeholder',
                        ) as string
                      }
                      size="large"
                      className="text-white focus:border-primary [&.ant-input-status-error]:shadow-[0px_0px_0px_4px_#EF444440] focus:shadow-[0px_0px_0px_4px_#3B82F640]"
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div className="flex w-full">
                        <div className="grow">{t('common.password')}</div>
                        <div className="text-secondary cursor-pointer">
                          {t('common.forgot-password')}
                        </div>
                      </div>
                    }
                    labelCol={{
                      className: '*:flex *:justify-between *:w-full',
                    }}
                    name="password"
                    className="[&_.ant-form-item-label_label]:text-white [&_.ant-form-item-explain-error]:text-sm [&_.ant-form-item-explain-error]:mt-1 [&_.ant-form-item-explain-error]:mb-4 mb-6 [&_.ant-form-item-required]:before:hidden w-full"
                    rules={[
                      {
                        required: true,
                        message: t(
                          'user-management.modal-form.password.rule1',
                        ) as string,
                      },
                      {
                        min: 5,
                        message: t(
                          'user-management.modal-form.password.rule2',
                        ) as string,
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Введите пароль"
                      size="large"
                      className="text-white [&_.ant-input-password-icon]:text-white  [&_.ant-input-password-icon]:hover:text-primary focus:border-primary focus-within:border-primary focus:shadow-[0px_0px_0px_4px_#3B82F640] [&.ant-input-status-error]:shadow-[0px_0px_0px_4px_#EF444440] focus-within:shadow-[0px_0px_0px_4px_#3B82F640]"
                      classNames={{ suffix: 'text-white' }}
                      iconRender={(visible) =>
                        !visible ? (
                          <ViewOffIcon className="text-white" />
                        ) : (
                          <ViewIcon className="text-white" />
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      size="large"
                      className="w-full bg-primary hover:bg-primary/50 border-none disabled:bg-secondary disabled:text-white"
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                    >
                      {t('common.login-account')}
                    </Button>
                  </Form.Item>
                </Form>
              </ConfigProvider>

              <div className="text-sm text-white flex items-center leading-3 gap-2">
                <a href="/">
                  <CustomerSupportIcon /> {t('common.support')}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 z-10">
          <Typography.Text className="text-white/50 font-light">
            Powered by
          </Typography.Text>
          <a href="/">
            <img
              src={uzinfocomLogo}
              alt="uzinfocom logo"
              className="w-[120px]"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
