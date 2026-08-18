import { test, expect } from '@playwright/test'

test.use({ viewport: { width: 390, height: 844 } })

test('creates a room and opens the reference-quality team room', async ({ page }) => {
  await page.goto('/gamesPlatformFrontend/')

  await page.getByRole('button', { name: '创建房间', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: '创建房间' })
  await expect(dialog).toBeVisible()
  await dialog.getByRole('textbox', { name: '输入房间号' }).fill('123456')
  await dialog.getByRole('button', { name: '选择500积分' }).click()
  await dialog.getByRole('button', { name: '选择星神' }).click()
  await dialog.getByRole('button', { name: '选择国际服' }).click()

  await dialog.getByRole('button', { name: '创建房间', exact: true }).click()

  await expect(page).toHaveURL(/\/gamesPlatformFrontend\/room\/123456/)
  await expect(page.getByRole('region', { name: '组队房间 123456' })).toBeVisible()
  await expect(page.getByRole('button', { name: '复制房间号' })).toBeVisible()
  await expect(page.getByRole('button', { name: '准备开始' })).toBeVisible()
  await expect(page.getByText('大家好，请大家尽快进入上面房间，点击准备按钮，人齐我们就开始')).toBeVisible()
  await expect(page.locator('.chat-message-row')).toHaveCount(1)

  const chat = page.getByRole('textbox', { name: '聊天内容' })
  await chat.fill('大家好，准备开局！')
  await page.getByRole('button', { name: '发送消息' }).click()
  await expect(page.getByText('大家好，准备开局！')).toBeVisible()
  await expect(chat).toHaveValue('')
})
